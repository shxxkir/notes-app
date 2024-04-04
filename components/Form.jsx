import { useRouter } from 'next/navigation';

const Form = ({ type, note, setNote, errors, submitting, handleSubmit }) => {
  const router = useRouter();

  return (
    <section>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-md md:max-w-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">{type} Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-lg font-medium text-gray-200 mb-2">Title</label>
              <input
                type="text"
                id="title"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                required
              />
              {errors.title && <div className="text-red-500">{errors.title}</div>}
            </div>
            <div className="mb-6">
              <label htmlFor="content" className="block text-lg font-medium text-gray-200 mb-2">Content</label>
              <textarea
                id="content"
                className="w-full h-32 py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                required
              />
              {errors.content && <div className="text-red-500">{errors.content}</div>}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.back()}
                className="w-full md:w-auto bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 focus:outline-none focus:bg-red-600 mr-4 md:mr-0"
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={submitting}
                className="w-full md:w-auto bg-gray-600 text-white py-3 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                {submitting ? `${type.slice(0, -1)}ing...` : type}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;