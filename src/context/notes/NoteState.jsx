import { useState } from "react";
import { toast } from 'react-toastify';
import NoteContext from "./noteContext";

const NotesState = (props) => {
    const host = import.meta.env.VITE_HOST;
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // get all notes
    const getNotes = async () => {

        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
            },
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }


    // Add a note
    const addNote = async (title, description, tag) => {

        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        toast.success("Note added successfully", { position: "top-right", autoClose: 2000 });
        console.log("Adding a note with title: " + title);
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            // API call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
                },
            });

            // Check if the response is valid JSON
            let json;
            try {
                json = await response.json();
            } catch (error) {
                console.error("Invalid JSON response:", error);
                alert("An error occurred while processing the response.Please try again.");
                if (alert) { location.reload() }
                throw new Error("The server returned an invalid response.");
            }

            if (response.ok) {
                // Logic to delete a note locally
                const notesCopy = notes.filter((note) => note._id !== id);
                setNotes(notesCopy);
                toast.success("Note deleted successfully", { position: "top-right", autoClose: 2000 });
                console.log("Deleted note with id: " + id);
            } else {
                console.error("Failed to delete the note:", json.message || "Unknown error");
            }
        } catch (error) {
            console.error("An error occurred while deleting the note:", error);
        }
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            // API call
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
                },
                body: JSON.stringify({ title, description, tag })
            });

            const json = await response.json();

            if (response.ok) {
                let newNotes = JSON.parse(JSON.stringify(notes));
                // Logic to edit a note locally
                for (let index = 0; index < newNotes.length; index++) {
                    const element = newNotes[index];
                    if (element._id === id) {
                        newNotes[index].title = title;
                        newNotes[index].description = description;
                        newNotes[index].tag = tag;
                        break;
                    }

                }
                setNotes(newNotes);
                toast.success("Note updated successfully", { position: "top-right", autoClose: 2000 });

                console.log("Note updated successfully");
            } else {
                console.error("Failed to update the note:", json.message || "Unknown error");
            }
        } catch (error) {
            console.error("An error occurred while updating the note:", error);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NotesState;