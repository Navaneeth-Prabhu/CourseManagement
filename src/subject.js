import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const courses = [
  {
    id: 1,
    name: "Course 1",
    subjects: [
      {
        id: 1,
        name: "Subject 1",
        modules: [
          {
            id: 1,
            name: "Module 1",
            topics: [
              {
                id: 1,
                name: "Topic 1",
                subtopics: [
                  { id: 1, name: "Subtopic 1" },
                  { id: 2, name: "Subtopic 2" },
                ],
              },
              {
                id: 2,
                name: "Topic 2",
                subtopics: [{ id: 3, name: "Subtopic 3" }],
              },
            ],
          },
        ],
      },
    ],
  },
];

function App() {
  const [characters, setCharacters] = useState(courses[0].subjects[0].modules[0].topics[0].subtopics);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCharacters(items);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>{name}</p>
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
      </header>
    </div>
  );
}

export default App;
