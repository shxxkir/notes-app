import { connectToDB } from "@/utils/database";
import Note from "@/models/note";
import { NextResponse } from "next/server";
import { noteValidation } from "@/validation/noteValidation";

// Add a new note to the database
export const POST = async (req) => {
  const { title, content } = await req.json();

  try {
    const result = await noteValidation.validate({ title, content }); // Validate the request data

    await connectToDB();

    const newNote = new Note({
      title,
      content
    })

    await newNote.save();

    return NextResponse.json({ 
      message: 'New Note Created Successfully', data: newNote}, 
    { status: 201 })
  } catch (error) {
    if(error.name === 'ValidationError'){
      return NextResponse.json({ 
        message: 'Failed to create a new note. Invalid request data', error: error.errors}, 
      { status: 400 })
    }
    else{
      console.log(error);
      return NextResponse.json({
        message: 'Failed to create a new note', error: error.message
      }, { status: 500 })
    }
  }
}

// Retrieve all notes from the database
export const GET = async () => {
  try {
    await connectToDB();

    const notes = await Note.find();

    return NextResponse.json({
      message: 'Fetched All Notes', data: notes},
    { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch all notes', error: error.message
    }, { status: 500 })
  }
}