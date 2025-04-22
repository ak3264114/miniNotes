import { supabase } from "@/lib/supabaseClient";

export const getNotes = async (userId: string) => {
    const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching notes:", error);
        return [];
    }

    return data;
};


export const createNote = async (newNote: { title: string; content: string }, userId: string) => {
    const {  error } = await supabase
        .from("notes")
        .insert([{ title: newNote.title, content: newNote.content, user_id: userId }]);

    if (error) {
        console.error("Error creating note:", error);
        return null;
    }


    return true;
};


export const updateNote = async (noteId: number, updatedNote: { title: string; content: string }) => {
    const { error } = await supabase
        .from("notes")
        .update({ title: updatedNote.title, content: updatedNote.content })
        .eq("id", noteId);

    if (error) {
        console.error("Error updating note:", error);
        return false;
    }

    return true;
};