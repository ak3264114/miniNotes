import { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";

interface NoteData {
    title: string;
    content: string;
}

interface EditNoteData extends NoteData {
    id: number;
}

interface NoteFormProps {
    isEditing: boolean;
    noteData: EditNoteData | null;
    loading: boolean;
    onSubmit: (note: NoteData) => void;
    onCancel: () => void;
}

export default function NoteForm({
    isEditing,
    noteData,
    loading,
    onSubmit,
    onCancel
}: NoteFormProps) {
    const [note, setNote] = useState<NoteData>({ title: "", content: "" });

    // Update local state when props change
    useEffect(() => {
        if (isEditing && noteData) {
            setNote({ title: noteData.title, content: noteData.content });
        } else {
            setNote({ title: "", content: "" });
        }
    }, [isEditing, noteData]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please provide both title and content.");
            return;
        }
        onSubmit(note);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                {isEditing ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Note
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create a New Note
                    </>
                )}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter note title"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                        id="content"
                        placeholder="Write your note here..."
                        value={note.content}
                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                        className="border rounded-lg p-3 w-full h-36 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                </div>
                <div className="flex justify-end space-x-3">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : isEditing ? (
                            "Update Note"
                        ) : (
                            "Create Note"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}