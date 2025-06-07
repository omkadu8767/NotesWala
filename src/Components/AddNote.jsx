import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const { addNote } = context;

    const  handleClick = (e) => {
        e.preventDefault();
        if (note.title.length < 5 || note.description.length < 5) {
            return toast.error("Title and Description must be at least 5 characters long", { position: "top-right", autoClose: 2000 });
        }
        addNote(note.title, note.description, note.tag);

        // reset the form after adding
        setNote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    // Check if all fields are filled
    const isFormValid = note.title.trim() && note.description.trim() && note.tag.trim();

    return (
        <div>
            <div className='container'>
                <h1 className='text-2xl p-3 text-center font-bold'>Add a Note</h1>
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of Note" name='title' value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Description of Note' name='description' value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                        <input type="text" id="tag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Tag of Note' name='tag' value={note.tag} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">

                        </div>
                        <button type="submit" className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick} >Add Note</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddNote