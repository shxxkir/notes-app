'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/Form';
import { noteValidation } from '@/validation/noteValidation';

const EditNote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState({
    title: '',
    content: ''
  })
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getNoteDetails = async () => {
      const response = await fetch(`/api/notes/${noteId}`)
      const data = await response.json();

      console.log(data.data)

      setNote({
        title: data.data.title,
        content: data.data.content
      })
    }

    if(noteId) getNoteDetails();
  }, [noteId])

  const updateNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!noteId) return alert('Note to be updated not found!')

    try {
      await noteValidation.validate(note, { abortEarly: false });


      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: note.title,
          content: note.content
        })
      })

      if(response.ok){
        router.push('/')
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Yup validation error
        const yupErrors = {};
        error.inner.forEach((err) => {
          yupErrors[err.path] = err.message;
        });
        setErrors(yupErrors);
      } else {
        // Other errors
        console.log('Failed to update the note:', error);
      } } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Update'
      note={note}
      setNote={setNote}
      errors={errors}
      submitting={submitting}
      handleSubmit={updateNote}
    />    
  )
}

export default EditNote