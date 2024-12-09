import db from "@/app/services/mongodb";
import { questionStatus } from "@/app/utilities/requiredData";
import { generateToken } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
const questionsCollection = db.collection("questions");

export async function POST(req) {
  const body = await req.json();

  // Destructure the action/type from the body
  const {
    action,
    categoryId,
    isHavingCode,
    experience,
    questionEntered,
    codeSnippetEntered,
    answerEntered,
    userId,
  } = body;

  // Destructure the action/type from the body
  // const { action, name, icon , categoryId} = body;
  // console.log('action', action, 'name', name, 'icon', icon, 'categoryId', categoryId);
  // Handle different actions based on the 'action' or 'type' field
  // switch (action) {
  //   case 'add':
  console.log("sdfljnsd", body, action);
  if (action === "add") {
    const requiredFields = [
      { field: "questionEntered", message: "Question is required" },
      { field: "categoryId", message: "Category ID is required" },
      { field: "userId", message: "User ID is required" },
      { field: "answerEntered", message: "Answer is required" },
    ];

    for (const field of requiredFields) {
      if (!body[field.field]) {
        return NextResponse.json(
          { success: false, message: field.message },
          400
        );
      }
    }

    try {
      const result = await questionsCollection.insertOne({
        questionEntered,
        categoryId,
        isHavingCode,
        experience,
        userId,
        answerEntered,
        codeSnippetEntered,
        questionStatus: questionStatus.pending
      });
      return NextResponse.json(
        { success: true, message: "Question added successfully" },
        { status: 200, data: result }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error while adding category" },
        { status: 500 }
      );
    }
  } else {
    const requiredFields = [
      { field: "questionId", message: "Question ID is required" },
    ];

    for (const field of requiredFields) {
      if (!body[field.field]) {
        return NextResponse.json(
          { success: false, message: field.message },
          400
        );
      }
    }

    try {
      let data = {
        questionEntered,
        categoryId,
        isHavingCode,
        experience,
        answerEntered,
        codeSnippetEntered,
      }
      if(questionStatus){
        data = {
          ...data,
          questionStatus
        }
      }
      const result = await questionsCollection.updateOne(
        { _id: ObjectId.createFromHexString(body.questionId) },
        {
          $set: data,
        }
      );
      console.log("updated question ",result,data)
      return NextResponse.json(
        { success: true, message: "Question updated successfully" },
        { status: 200, data: result }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error while updating category" },
        { status: 500 }
      );
    }
  }

  //   case 'update':

  //   default:
  //     return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 });
  // }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    console.log("searchParams", searchParams);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }
    const questions = await questionsCollection
      .find({ userId: userId })
      .toArray();
    if (!questions.length || questions.length === 0) {
      return NextResponse.json(
        { success: false, message: "No questions found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: questions,
        message: "Questions fetched successfully",
      },
      { status: 200, data: questions }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while fetching Questions" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // console.log("sdfsdfsdf sdfsdf" ,req);
    // const body = await req.json();
    // console.log("sdfsdfsdf beforreee", body);
    // const { id : categoryId } = req.query;
    // if (!categoryId) {
    //   return NextResponse.json(
    //     { success: false, message: "Category ID is required" },
    //     { status: 400 }
    //   );
    // }
    // console.log("sdfsdfsdf beforreee 2", categoryId);

    const { searchParams } = new URL(req.url);
    console.log("sdfsdfsdf beforreee 3", searchParams);
    const categoryId = searchParams.get("id");
    console.log("sdfsdfsdf beforreee 4", categoryId);
    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: "Category ID is required" },
        { status: 400 }
      );
    }

    await questionsCollection.deleteOne({
      _id: ObjectId.createFromHexString(categoryId),
    });
    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
      data: categoryId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while deleting category" },
      { status: 500 }
    );
  }
}
