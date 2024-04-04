'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Form from '@/components/Form';
import { noteValidation } from '@/validation/noteValidation';

const CreateNote = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState({});

  const createNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await noteValidation.validate(note, { abortEarly: false });

      const response = await fetch('/api/notes', {
        method: 'POST',
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
        console.log(error.inner)
      } else {
        // Other errors
        console.log('Failed to create a new note:', error);
      } } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Create'
      note={note}
      setNote={setNote}
      errors={errors}
      submitting={submitting}
      handleSubmit={createNote}
    />
  )
}

export default CreateNote