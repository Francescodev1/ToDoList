import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    props.onUpdate(props.id, editedTitle, editedContent);
    setIsEditing(false);
  }

  function handleTitleChange(event) {
    setEditedTitle(event.target.value);
  }

  function handleContentChange(event) {
    setEditedContent(event.target.value);
  }
  function formatContent(content) {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }
  

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input type="text" value={editedTitle} onChange={handleTitleChange} />
          <textarea value={editedContent} onChange={handleContentChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{formatContent(props.content)}</p>
          <button onClick={handleEdit} className="edit-button">
            <EditIcon />
          </button>
          <button onClick={handleDelete} className="delete-button">
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default Note;
