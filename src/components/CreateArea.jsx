import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    id: Date.now(), // Genera un ID univoco
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      id: Date.now(), // Genera un nuovo ID univoco
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  function submitNote(event) {
    event.preventDefault();  // Previene il comportamento di invio predefinito del form
  
    // Controlla se i campi 'title' e 'content' sono vuoti
    if (!note.title.trim() || !note.content.trim()) {
      // Mostra un messaggio di errore se uno dei campi è vuoto
      alert("Per favore, completa tutti i campi richiesti.");
      return;  // Interrompe l'esecuzione della funzione se i campi sono vuoti
    }
  
    // Se i campi sono validi, procedi con l'aggiunta della nota
    props.onAdd(note);
    // Reimposta i campi del form a vuoti per una nuova nota
    setNote({
      id: Date.now(),  // Genera un nuovo ID univoco per la prossima nota
      title: "",
      content: "",
    });
  }
  

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Titolo"
            
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Scrivi una nota..."
          rows={isExpanded ? 3 : 1}
          
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
