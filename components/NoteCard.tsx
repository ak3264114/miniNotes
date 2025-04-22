import React from 'react';

type NoteCardProps = {
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
};

const NoteCard: React.FC<NoteCardProps> = ({ title, content, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="font-bold">{title}</h3>
      <p>{content}</p>
      <button onClick={onEdit} className="bg-blue-500 text-white p-2 rounded mt-2">Edit</button>
      <button onClick={onDelete} className="bg-red-500 text-white p-2 rounded mt-2 ml-2">Delete</button>
    </div>
  );
};

export default NoteCard;
