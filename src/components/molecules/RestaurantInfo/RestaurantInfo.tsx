import axios from "axios";
import React, { useState } from "react";
import { DoneIcon } from "../../atoms/Icons.styles";
import Modal from "../../atoms/Modal/Modal";
import { NoContent } from "../../atoms/NoContent.styles";
import { Task } from "./RestaurantInfo.styles";

interface Props {
  tasks: [];
  restaurantID: string;
}

export interface ITask {
  username?: string;
  title: string;
  category: string;
  description: string;
  _id?: string;
}

const RestaurantInfo = ({ tasks, restaurantID }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteTask = (id: any) => {
    axios
      .delete(
        `https://przygotowka.herokuapp.com/restaurants/${restaurantID}/delete-task/${id}`
      )
      .then(() => setIsModalOpen(false))
      .catch((err) => console.log(err));
  };
  return (
    <>
      {tasks.length ? (
        tasks.map((task: ITask) => (
          <React.Fragment key={task._id}>
            <Task className="fav-restaurants">
              <div className="username-doneIcon">
                <h4 className="username">{task.username}</h4>
                <button onClick={() => setIsModalOpen(true)}>
                  <DoneIcon />
                </button>
              </div>
              <h4 className="title">{task.title}</h4>
              <h4 className="category">{task.category}</h4>
              <p className="description">{task.description}</p>
            </Task>

            {isModalOpen && (
              <Modal
                onClickNo={() => setIsModalOpen(false)}
                onClickYes={() => handleDeleteTask(task._id)}
              />
            )}
          </React.Fragment>
        ))
      ) : (
        <NoContent>Nie ma jeszcze żadnych zadań</NoContent>
      )}
    </>
  );
};

export default RestaurantInfo;
