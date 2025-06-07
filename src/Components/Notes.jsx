import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
    const navigate = useNavigate();
    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const [isModalOpen, setIsModalOpen] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login");
        }
    }, [])

    const ref = useRef(null)

    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeModal();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <>
            <AddNote />
            <div>
                {/* Hidden button to trigger modal */}
                <button
                    onClick={openModal}
                    ref={ref}
                    data-modal-target="default-modal"
                    data-modal-toggle="default-modal"
                    className="hidden"
                    type="button"
                >
                    Toggle modal
                </button>

                {isModalOpen && (
                    <div
                        id="default-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 dark:bg-opacity-80"
                    >
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-800">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Edit Note
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <div className="p-4 md:p-5 space-y-4">
                                    <form className="max-w-sm mx-auto">
                                        <div className="mb-5">
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                            <input
                                                type="text"
                                                id="etitle"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Title of Note"
                                                name='etitle'
                                                value={note.etitle}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <input
                                                type="text"
                                                id="edescription"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder='Description of Note'
                                                name='edescription'
                                                value={note.edescription}
                                                onChange={onChange}
                                                minLength={5}
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                                            <input
                                                type="text"
                                                id="etag"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder='Tag of Note'
                                                name='etag'
                                                value={note.etag}
                                                onChange={onChange}
                                                minLength={5}
                                                required
                                            />
                                        </div>
                                    </form>
                                </div>

                                {/* Modal footer */}
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        onClick={handleClick}
                                        type="button"
                                        className="text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        disabled={note.etitle.length < 5 || note.edescription.length < 5}
                                    >
                                        Update Note
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <h1 className='text-2xl p-3 text-center font-bold text-gray-800 dark:text-white'>Your Notes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5">
                {notes.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-300">
                        No notes to display
                    </div>
                )}
                {notes.map((note) => (
                    <NoteItem key={note._id} updatenote={updatenote} note={note} />
                ))}
            </div>
        </>
    )
}

export default Notes;
