import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import SearchBar from "./SearchBar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function addNote(newNote) {
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.filter(noteItem => noteItem.id !== id));
  }

  function updateNote(id, newTitle, newContent) {
    setNotes(prevNotes => prevNotes.map(noteItem => {
      if (noteItem.id === id) {
        return { ...noteItem, title: newTitle, content: newContent };
      }
      return noteItem;
    }));
  }

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNotes(items);
  }

  // Listener per aggiornare la larghezza della finestra
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determina la direzione basata sulla larghezza dello schermo
  const droppableDirection = screenWidth >= 768 ? "horizontal" : "vertical";

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CreateArea onAdd={addNote} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="notes" direction={droppableDirection}>
          {(provided) => (
            <div className="note-grid" {...provided.droppableProps} ref={provided.innerRef}>
              {notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((noteItem, index) => (
                  <Draggable key={noteItem.id} draggableId={noteItem.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="note-draggable">
                        <Note
                          id={noteItem.id}
                          title={noteItem.title}
                          content={noteItem.content}
                          onDelete={deleteNote}
                          onUpdate={updateNote}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Footer />
    </div>
  );
}

export default App;
