'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import NoteCard from '@/components/NoteCard';

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const fetchNotes = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();

    setNotes(data.data);
  }
        
  useEffect(() => {
    fetchNotes();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const handleUpdate = (id) => {
    router.push(`/update-note?id=${id}`)
  };

  const handleDelete = async (id) => {
    const hasConfirmed = confirm("Are you sure you want to delete this note?");
  
    if (hasConfirmed) {
      try {
        await fetch(`/api/notes/${id.toString()}`, {
          method: "DELETE"
        });
  
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        
        alert("Deleted Successfully");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-black py-10 lg:py-20">
        <span className='text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-8 text-center font-bold text-gray-200'>
          Browse Your Notes: {isSmallScreen && <br/>} Dive Into Your World of Ideas!
        </span>
        <div className="flex flex-col max-w-7xl w-full p-4">
          <button
            onClick={() => router.push('/add-note')}
            className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 mb-4 self-end">
              Add New Note
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div key={note._id}>
                <NoteCard
                  note={note}
                  onUpdate={() => handleUpdate(note._id)}
                  onDelete={() => handleDelete(note._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}