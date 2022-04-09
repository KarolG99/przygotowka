import React from "react";
import { Id } from "../../atoms/Id.styles";
import { NoContent } from "../../atoms/NoContent.styles";
import { Username } from "../../atoms/username.styles";
import { Task } from "./RestaurantInfo.styles";

interface Props {
  _id: string;
  name: string;
  tasks: [];
}

interface ITask {
  title: string;
  category: string;
  description: string;
  _id: string;
}

const RestaurantInfo = ({ _id, name, tasks }: Props) => {
  return (
    <>
      <Username className="restaurant-name">{name}</Username>
      <h4>
        ID: <Id>{_id}</Id>
      </h4>
      {tasks.length ? (
        tasks.map((task: ITask) => (
          <Task className="fav-restaurants" key={task._id}>
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
