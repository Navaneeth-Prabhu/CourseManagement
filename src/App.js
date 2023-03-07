import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Subtopics from "./components/Subtopics";
import "./App.css";
import Course from "./components/Course";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="reminder">
          <h5>please save after making changes</h5>
        </div>
        <Course />
        <Subtopics />
      </header>
    </div>
  );
}

export default App;
