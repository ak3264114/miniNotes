import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { createNote, getNotes, updateNote } from "@/services/notes";
import Note from "@/components/Note";
import NoteForm from "@/components/NoteForm";
import NotesHeader from "@/components/NotesHeader";
import EmptyNotes from "@/components/EmptyNotes";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import { summarizeNotes } from "@/services/summary";
import { createModal } from "@/lib/summary.helper";


interface Note {
    id: number;
    title: string;
    content: string;
}

interface NewNote {
    title: string;
    content: string;
}

interface EditNote extends NewNote {
    id: number;
}

export default function Dashboard() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editNote, setEditNote] = useState<EditNote>({ title: "", content: "", id: 0 });
    const [selectedNotes, setSelectedNotes] = useState<number[]>([]);
    const [createNoteLoading, setCreateNoteLoading] = useState<boolean>(false);
    const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleCreateNote = async (newNote: NewNote) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            toast.error("You need to be logged in to create a note.");
            return;
        }
        const userId = session.user.id;
        try {
            setCreateNoteLoading(true);
            const res = await createNote(newNote, userId);
            if (res) {
                toast.success("Note created successfully!");
                fetchNotes();
                setEditNote({ title: "", content: "", id: 0 });
            }
            setCreateNoteLoading(false)
        } catch (error) {
            toast.error("Error creating note.");
            console.error("Error creating note:", error);
            setCreateNoteLoading(false);
        }
        finally {
            setCreateNoteLoading(false);
        }
    };

    const handleUpdateNote = async (updatedNote: NewNote) => {
        try {
            setCreateNoteLoading(true);
            const result = await updateNote(editNote.id, updatedNote);
            if (result) {
                fetchNotes();
                setIsEditing(false);
                setEditNote({ title: "", content: "", id: 0 });
                toast.success("Note updated successfully!");
            }
            setCreateNoteLoading(false);
        } catch (error) {
            console.error("Error updating note:", error);
            setCreateNoteLoading(false);
        }
        finally {
            setCreateNoteLoading(false);
        }
    };

    const handleDeleteNote = async (noteId: number) => {
        try {
            await supabase.from("notes").delete().eq("id", noteId);
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
            setSelectedNotes((prev) => prev.filter((id) => id !== noteId));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const handleEditNote = (note: Note) => {
        setIsEditing(true);
        setEditNote({ title: note.title, content: note.content, id: note.id });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSelectNote = (noteId: number) => {
        setSelectedNotes((prev) =>
            prev.includes(noteId)
                ? prev.filter((id) => id !== noteId)
                : [...prev, noteId]
        );
    };

    const handleSelectAll = () => {
        if (selectedNotes.length === notes.length) {
            setSelectedNotes([]);
        } else {
            setSelectedNotes(notes.map((note) => note.id));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedNotes.length === 0) {
            toast.error("Please select at least one note to delete");
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedNotes.length} notes?`);

        if (confirmDelete) {
            try {
                for (const noteId of selectedNotes) {
                    await supabase.from("notes").delete().eq("id", noteId);
                }
                setNotes((prevNotes) => prevNotes.filter((note) => !selectedNotes.includes(note.id)));
                setSelectedNotes([]);
            } catch (error) {
                console.error("Error deleting notes:", error);
            }
        }
    };



    const handleSummarize = async () => {
        if (selectedNotes.length === 0) {
            toast.error("Please select at least one note to summarize");
            return;
        }

        const selectedNotesData = notes.filter((note) =>
            selectedNotes.includes(note.id)
        ).map(note => ({ id: note.id, title: note.title, content: note.content }));

        const messageContent = selectedNotesData.map(note =>
            `Title: ${note.title}\nContent: ${note.content}`
        ).join("\n\n");

        try {
            setSummaryLoading(true);

            const data = await summarizeNotes(messageContent);

            if (data && data.choices && data.choices.length > 0) {
                const summarizedContent = data.choices[0].message.content;
                createModal(summarizedContent);
            } else {
                toast.error("Failed to summarize the notes.");
            }
        } catch (error) {
            console.error("Error summarizing notes:", error);
            toast.error("Error summarizing the notes. Please try again.");
        } finally {
            setSummaryLoading(false);
        }
    };


    const fetchNotes = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
            console.error("Error getting session:", error);
            return;
        }
        if (!session) {
            router.push("/auth/login");
            return;
        }
        const userId = session.user.id;
        const fetchedNotes = await getNotes(userId);
        setNotes(fetchedNotes);
    };
    useEffect(() => {
        fetchNotes();
    }, []);

    const handleNoteSubmit = (noteData: NewNote) => {
        if (isEditing) {
            handleUpdateNote(noteData);
        } else {
            handleCreateNote(noteData);
        }
    };

    if (createNoteLoading && notes.length === 0) {
        return <LoadingSpinner fullScreen={true} />;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg mb-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Your Notes</h1>
                <p className="opacity-80">Organize your thoughts, ideas, and information in one place.</p>
            </div>

            <NoteForm
                isEditing={isEditing}
                noteData={editNote}
                loading={createNoteLoading}
                onSubmit={handleNoteSubmit}
                onCancel={() => {
                    setIsEditing(false);
                    setEditNote({ title: "", content: "", id: 0 });
                }}
            />

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                <NotesHeader
                    selectedCount={selectedNotes.length}
                    totalCount={notes.length}
                    onSelectAll={handleSelectAll}
                    onDeleteSelected={handleBulkDelete}
                    onSummarize={handleSummarize}
                    summaryLoading={summaryLoading}
                />

                {notes.length === 0 ? (
                    <EmptyNotes />
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {notes.map((note) => (
                            <Note
                                key={note.id}
                                note={note}
                                onEdit={handleEditNote}
                                onDelete={handleDeleteNote}
                                isSelected={selectedNotes.includes(note.id)}
                                onSelect={handleSelectNote}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}