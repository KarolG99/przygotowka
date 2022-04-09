import React from "react";
import { NoContent } from "../../atoms/NoContent.styles";
import { Task } from "./RestaurantInfo.styles";

interface Props {
  tasks: [];
  username: string;
}

export interface ITask {
  username?: string;
  title: string;
  category: string;
  description: string;
  _id?: string;
}

const RestaurantInfo = ({ tasks, username }: Props) => {
  return (
    <>
      {tasks.length ? (
        tasks.map((task: ITask) => (
          <Task className="fav-restaurants" key={task._id}>
            <h4 className="username">{username}</h4>
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
