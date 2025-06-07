import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;
    const { note, updatenote } = props;

    return (

        <div>
            <div className="block my-3  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{note.description}</p>
                <i className="fa-solid fa-trash-can text-red-500 cursor-pointer float-right " onClick={() => { deleteNote(note._id) }}></i>
                <i className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer   mx-2" onClick={() => { updatenote(note) }}></i>
            </div>
        </div>
    )
}

export default NoteItem