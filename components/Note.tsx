// components/Note.tsx
import { useState } from "react";

interface NoteProps {
    note: {
        id: number;
        title: string;
        content: string;
    };
    onEdit: (note: { id: number; title: string; content: string }) => void;
    onDelete: (noteId: number) => void;
    isSelected: boolean;
    onSelect: (noteId: number) => void;
}

export default function Note({ note, onEdit, onDelete, isSelected, onSelect }: NoteProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            className={`border rounded-lg p-4 transition-all duration-300 ${isHovered ? "shadow-lg transform translate-y-[-2px]" : "shadow"
                } ${isSelected ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-start">
                <div className="mr-3 pt-1">
                    <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 rounded cursor-pointer focus:ring-blue-500"
                        checked={isSelected}
                        onChange={() => onSelect(note.id)}
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
                    <p className="text-gray-600 mt-2 mb-4">{note.content}</p>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(note)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-md text-sm transition duration-200 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(note.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded-md text-sm transition duration-200 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}