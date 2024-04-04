import { Schema, model, models } from 'mongoose';

const noteSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  }
},
{
  timestamps: true
});

const Note = models.Note || model('Note', noteSchema);

export default Note;