const NoteCard = ({ note, onUpdate, onDelete }) => {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 text-white">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">{note.title}</h3>
      <p className="text-gray-400 mb-4">{note.content}</p>
      <div className="flex justify-end">
        <button
          className="bg-gray-600 text-gray-200 py-2 px-4 rounded mr-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={onUpdate}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;