import axios from "axios";
import React, { useState } from "react";
import { DoneIcon } from "../../atoms/Icons.styles";
import { NoContent } from "../../atoms/NoContent.styles";
import { DeleteTaskInfo, Task } from "./RestaurantInfo.styles";

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
  const [isHelpInfoOpen, setIsHelpInfoOpen] = useState(true);

  const handleDeleteTask = (id: any) => {
    axios
      .delete(
        `https://przygotowka.herokuapp.com/restaurants/${restaurantID}/delete-task/${id}`
      )
      .then(() => setIsHelpInfoOpen(false))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isHelpInfoOpen && (
        <DeleteTaskInfo>
          {" "}
          Naciśnij dwa razy znak ptaszka żeby usunąć zadanie{" "}
          <button onClick={() => setIsHelpInfoOpen(false)}>𝘅</button>{" "}
        </DeleteTaskInfo>
      )}

      {tasks.length ? (
        tasks.map((task: ITask) => (
          <React.Fragment key={task._id}>
            <Task className="fav-restaurants">
              <div className="username-doneIcon">
                <h4 className="username">{task.username}</h4>
                <button
                  onDoubleClick={() => {
                    handleDeleteTask(task._id);
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
