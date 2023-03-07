import React, { useState } from "react";
import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../App.css";

function Subtopics() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [formList, setFormList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage?.getItem("formData"));
    if (data) setFormList(data);
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(formList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormList(items);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormObject = {
      id: Math.floor(Math.random() * 100) + "",
      name: formData.name,
    };
    setFormList((prevState) => [...prevState, newFormObject]);
    setFormData({ name: "" });
  };

  const handleDelete = (id) => {
    const updatedFormList = formList.filter(
      (formObject) => formObject.id !== id
    );
    setFormList(updatedFormList);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("formData", JSON.stringify(formList));
  };

  return (
    <>
      <div className="head">
        <h2>Subjects</h2>
        <div className="inputModel">
          <form className="inputModel" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="button">
              Add Form
            </button>
          </form>
          <button className="button" onClick={saveToLocalStorage}>
            Save To Local Storage
          </button>
          <div></div>
        
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="formList">
          {(provided) => (
            <ul
              className="subject"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {formList.map((formObject, index) => {
                return (
                  <Draggable
                    key={formObject.id}
                    draggableId={formObject.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{formObject.name}</p>
                        <button
                          className="delete"
                          onClick={() => handleDelete(formObject.id)}
                        >
                          Delete
                        </button>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Subtopics;
