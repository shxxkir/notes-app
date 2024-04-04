import * as Yup from 'yup';

export const noteValidation = Yup.object({
  title: Yup.string().trim().required('Title is required').min(5).max(25),
  content: Yup.string().trim().required('Content is required').min(3).max(255),
});

