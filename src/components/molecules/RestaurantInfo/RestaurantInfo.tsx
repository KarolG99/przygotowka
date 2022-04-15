import axios from "axios";
import React, { useState } from "react";
import { URL } from "../../../apiurl";
import { DoneIcon } from "../../atoms/Icons.styles";
import Modal from "../../atoms/Modal/Modal";
import { NoContent } from "../../atoms/NoContent.styles";
import { Task } from "./RestaurantInfo.styles";

interface Props {
  tasks: {
    _id: string;
    username: string;
    title: string;
    category: string;
    description: string;
  }[];
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
  const [taskID, setTaskID] = useState<any>();

  const handleDeleteTask = (id: any) => {
    axios
      .delete(`${URL}/restaurants/${restaurantID}/delete-task/${id}`)
      .then(() => setIsModalOpen(false))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          onClickNo={() => setIsModalOpen(false)}
          onClickYes={() => handleDeleteTask(taskID)}
        />
      )}

      {tasks.length ? (
        tasks.map((task: ITask, index) => (
          <React.Fragment key={task._id}>
            <Task className="fav-restaurants">
              <div className="username-doneIcon">
                <h4 className="username">{task.username}</h4>
                <button
                  onClick={() => {
                    setTaskID(task._id);
                    setIsModalOpen(true);
                  }}
                >
                  <DoneIcon />
                </button>
              </div>
              <h4 className="title">{task.title}</h4>
              <h4 className="category">{task.category}</h4>
              <p className="description">{task.description}</p>
            </Task>
          </React.Fragment>
        ))
      ) : (
        <NoContent>Nie ma jeszcze żadnych zadań</NoContent>
      )}
    </>
  );
};

export default RestaurantInfo;
