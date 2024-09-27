import db from "@/app/services/mongodb";
import { generateToken } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
const categoriesCollection = db.collection("categories");

export async function POST(req) {
  const body = await req.json();

  // Destructure the action/type from the body
  const { action, categoryName, categoryImage, categoryId, categoryStatus } = body;
 
  
  // Destructure the action/type from the body
  // const { action, name, icon , categoryId} = body;
  // console.log('action', action, 'name', name, 'icon', icon, 'categoryId', categoryId);
  // Handle different actions based on the 'action' or 'type' field
  // switch (action) {
    //   case 'add':
    console.log("sdfljnsd",body ,action)
    if (action === "add") {
      if (!categoryName) {
        return NextResponse.json(
          { success: false, message: "Category name is required" },
          400
        );
      }
      
      try {
      const existingCategory = await categoriesCollection.findOne({
        categoryName,
      });
      console.log("sdfljnsd adfterr", existingCategory);
      if (existingCategory) {
        return NextResponse.json(
          { success: false, message: "Category already exists" },
          { status: 409 }
        );
      }

      // if (categoryImage) {
      //   console.log("categpryImage", categoryImage);
      //   // const uploadImageResponse = await fetch("/api/upload", {
      //   //   method: "POST",
      //   //   body: categoryImage,
      //   // }); // the base64 encoded image
      //   const uploadedResponse = await cloudinary.uploader.upload(categoryImage, {
      //     upload_preset: 'your_preset', // Ensure to create an unsigned upload preset in your Cloudinary settings
      //   });
      //   res.status(200).json({ url: uploadedResponse.secure_url, public_id: uploadedResponse.public_id });

      //   var uploadImage = await uploadImageResponse.json();
      // }
      const category = {
        categoryName,
        categoryImage,
        categoryStatus,
        createdAt: new Date(),
      };
      console.log("DSSDFSDFSDSD",category)
      const result = await categoriesCollection.insertOne(category);
      console.log("result===>", result);

      return NextResponse.json({
        success: true,
        message: "Category added successfully!",
        data: {
          categoryId: result.insertedId,
          categoryName,
          categoryImage,
          categoryStatus,
        }
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error while adding category" },
        { status: 500 }
      );
    }
  } else {
    if (!categoryName) {
      return NextResponse.json(
        { success: false, message: "Category name is required" },
        400
      );
    }

    try {
      console.log("sdfljnsd beforreee moreee", categoryId);
      console.log("sdfljnsd beforreee sfdglkj", ObjectId.createFromHexString(categoryId));
      const existingCategory = await categoriesCollection.findOne({
        _id: ObjectId.createFromHexString(categoryId),
      });
      console.log("sdfljnsd beforreee", existingCategory);
      if (!existingCategory) {
        return NextResponse.json(
          { success: false, message: "Category not found" },
          { status: 404 }
        );
      }
      console.log("sdfljnsd adfterr", existingCategory);
      
      try {
        var updateResult = await categoriesCollection.updateOne(
          { _id: ObjectId.createFromHexString(categoryId), },
          { $set: { categoryName, categoryImage, categoryStatus } }
        );
        console.log(`Update result: ${updateResult}`);
      } catch (error) {
        console.error(`Error updating category: ${error}`);
      }
      console.log("updateResult", updateResult);
      if (updateResult.modifiedCount === 0) {
        return NextResponse.json(
          { success: false, message: "Category not updated" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Category updated successfully!",
        data: {
          categoryId,
          categoryName,
          categoryImage,
          categoryStatus,
        }
      });
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
    const categories = await categoriesCollection.find({}).toArray();
    if (!categories.length || categories.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No categories found",
        data: [],
      });
    }
    return NextResponse.json({ success: true, data: categories ,message: "Categories fetched successfully"});
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while fetching categories" },
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
    const categoryId = searchParams.get('id');
    console.log("sdfsdfsdf beforreee 4", categoryId);
    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: "Category ID is required" },
        { status: 400 }
      );
    }

    await categoriesCollection.deleteOne({ _id: ObjectId.createFromHexString(categoryId) });
    return NextResponse.json({ success: true, message: "Category deleted successfully" , data: categoryId});
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while deleting category" },
      { status: 500 }
    );
  }
}