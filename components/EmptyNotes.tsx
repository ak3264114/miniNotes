import { MouseEvent } from 'react';

export default function EmptyNotes() {
  const handleCreateNoteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const titleInput = document.getElementById('title');
    if (titleInput) {
      titleInput.focus();
    }
  };

  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-700 mb-2">No notes available</h3>
      <p className="text-gray-500 mb-6">Create your first note to get started!</p>
      <div className="flex justify-center">
        <button 
          onClick={handleCreateNoteClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create a Note
        </button>
      </div>
    </div>
  );
}