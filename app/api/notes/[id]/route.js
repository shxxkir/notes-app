import { connectToDB } from "@/utils/database";
import Note from "@/models/note";
import { NextResponse } from "next/server";

// Retrieve a specific note using its Object ID
export const GET = async ( request, { params } ) => {
  try {
    await connectToDB();

    const note = await Note.findById(params.id);

    if(!note)
      return NextResponse.json({
        message: 'Note not found with the id ' + params.id
      }, { status: 404 })

    return NextResponse.json({
      message: 'Note Retrieved Successfully',
      data: note
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch the note with id ' + params.id,
      error: error.message
    }, { status: 500 })
  }
}

// Update a note using its Object ID
export const PUT = async ( req, { params } ) => {
  const { title, content } = await req.json();

  try {
    await connectToDB();

    // Find the existing note by ID
    const existingNote = await Note.findById(params.id);

    if (!existingNote) {
      return NextResponse.json({
        message: 'Note not found with the id ' + params.id
      }, { status: 404 })
    }

    // Update the note with new data
    existingNote.title = title;
    existingNote.content = content;

    await existingNote.save();

    return NextResponse.json({
      message: "Successfully Updated the Note",
      updatedData: existingNote
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Error Updating Note with the id" + params.id,
      error: error.message
    }, { status: 500 });
  }
}

// Delete a note using its Object ID
export const DELETE = async ( request, { params } ) => {
  try {
    await connectToDB();

    // Find the note by id and remove it
    const deletedNote = await Note.findByIdAndDelete(params.id);

    if (!deletedNote) {
      return NextResponse.json({
        message: 'Note not found with the id ' + params.id
      }, { status: 404 })
    }

    return NextResponse.json({
      message: "Prompt deleted successfully",
      deletedNote
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting note with id" + params.id,
      error: error.message
    }, { status: 500 });
  }
}