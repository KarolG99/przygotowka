import axios from "axios";
import React from "react";
import { DoneIcon } from "../../atoms/Icons.styles";
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


const RestaurantInfo = ({ tasks, restaurantID}: Props) => {

  const handleDeleteTask = (id: any) => {
    axios.delete(`http://localhost:8000/restaurants/${restaurantID}/delete-task/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  return (
    <>
      {tasks.length ? (
        tasks.map((task: ITask) => (
          <Task className="fav-restaurants" key={task._id}>
            <div className="username-doneIcon">
              <h4 className="username">{task.username}</h4>
              <button onClick={() => handleDeleteTask(task._id)}>
                 <DoneIcon />
              </button>
            </div>
            <h4 className="title">{task.title}</h4>
            <h4 className="category">{task.category}</h4>
            <p className="description">{task.description}</p>
          </Task>
        ))
      ) : (
        <NoContent>Nie ma jeszcze żadnych zadań</NoContent>
      )}
    </>
  );
};

export default RestaurantInfo;
