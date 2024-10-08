import db from "@/app/services/mongodb";
import { generateToken } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
// import { db } from '@/app/services/mongodb';
const usersCollection = db.collection("users");
// const usersCollection = "";
export async function POST(req) {
  const body = await req.json();

  // Destructure the action/type from the body
  const { action, name, password, mobile_number, userRole, email, userId ,userStatus } =
    body;

  // Handle different actions based on the 'action' or 'type' field
  console.log("action", action, "name", name, "password", password ,userStatus, userId);
  switch (action) {
    case "signup":
      if (!name || !password) {
        return NextResponse.json(
          { success: false, message: "Username and password are required" },
          400
        );
      }

      try {
        console.log(
          "action",
          action,
          "username",
          name,
          "password",
          "email",
          email,
          password,
          "mobile_number",
          mobile_number
        );
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          console.log("existingUser", existingUser);
          return NextResponse.json(
            { success: false, message: "User already exists" },
            { status: 409 }
          );

          // return NextResponse.json({ success: false, message: 'Username already exists' }, 409);
        }

        const user = {
          name,
          // password: await bcrypt.hash(password, 12),
          password,
          email,
          mobile_number,
          userRole,
          userStatus: "inActive",
          createdAt: new Date(),
        };

        const result = await usersCollection.insertOne(user);
        console.log("result===>", result);

        const token = generateToken(user);
        const data = {
          userId: result.insertedId,
          name,
          email,
          mobile_number,
          userRole,
          userStatus: "inActive",
          createdAt: new Date(),
          token,
        };

        return NextResponse.json({
          success: true,
          message: "User signed up successfully!",
          data,
        });
      } catch (error) {
        return NextResponse.json(
          { success: false, message: "Error while signing up" },
          { status: 500 }
        );
      }

    case "login":
      if (!email || !password) {
        return NextResponse.json(
          { success: false, message: "Username and password are required" },
          { status: 400 }
        );
      }

      try {
        const user = await usersCollection.findOne({ email, password });
        if (!user) {
          return NextResponse.json(
            { success: false, message: "Invalid username or password" },
            { status: 401 }
          );
        }

        // const passwordMatch = await bcrypt.compare(password, user.password);
        const passwordMatch = password === user.password;
        if (!passwordMatch) {
          return NextResponse.json(
            { success: false, message: "Password does not match" },
            { status: 401 }
          );
        }
        console.log("user", user);
        if (user.userStatus === "inActive") {
          return NextResponse.json(
            { success: false, message: "User is not active, contact admin" },
            { status: 401 }
          );
        }
        const token = generateToken(user);
        const data = {
          userId: user._id,
          name: user.name,
          email: user.email,
          mobile_number: user.mobile_number,
          userRole: user.userRole,
          userStatus: user.userStatus,
          token,
        };

        return NextResponse.json({
          success: true,
          message: "User logged in successfully!",
          data,
        });
      } catch (error) {
        return NextResponse.json(
          { success: false, message: "Error while logging in" },
          { status: 500 }
        );
      }

    case "updateProfile":
      if (!userId) {
        return NextResponse.json(
          {
            success: false,
            message: "User ID and new profile data are required",
          },
          { status: 400 }
        );
      }

      try {
        const user = await usersCollection.findOne({
          _id: new ObjectId(userId),
        });
        if (!user) {
          return NextResponse.json(
            { success: false, message: "User not found" },
            { status: 404 }
          );
        }

        const updateResult = await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: newProfileData }
        );

        if (updateResult.modifiedCount === 0) {
          return NextResponse.json(
            { success: false, message: "Profile not updated" },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: "Profile updated successfully!",
        });
      } catch (error) {
        return NextResponse.json(
          { success: false, message: "Error while updating profile" },
          { status: 500 }
        );
      }
    case "updateUserStatus":
      if (!userId) {
        return NextResponse.json(
          {
            success: false,
            message: "User ID and new profile data are required",
          },
          { status: 400 }
        );
      }

      try {
        const user = await usersCollection.findOne({
          _id: new ObjectId(userId),
        });
        if (!user) {
          return NextResponse.json(
            { success: false, message: "User not found" },
            { status: 404 }
          );
        }
        const updateResult = await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { userStatus } }
        );
        console.log("updateResult", updateResult);
        if (updateResult.modifiedCount === 0) {
          return NextResponse.json(
            { success: false, message: "User Status not updated" },
            { status: 500 }
          );
        }
        return NextResponse.json({
          success: true,
          message: "User Status updated successfully!",
         data: user
        });
      } catch (error) {
        return NextResponse.json(
          { success: false, message: "Error while updating User Status" },
          { status: 500 }
        );
      }
    default:
      return NextResponse.json(
        { success: false, message: "Unknown action" },
        { status: 400 }
      );
  }
}
export const validateAdmin = async (userId) => {
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
  console.log("user admin", user);
  if (!user) {
    return false;
  }
  if (user.userRole === "admin") {
    return true;
  }
  return false;
};
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!validateAdmin(userId))
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  try {
    const users = await usersCollection.find({ userRole: "user" }).toArray();
    console.log("users", users);
    if (!users.length || users.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No users found",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while fetching users" },
      { status: 500 }
    );
  }
}
// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get('userId');

//   if (!userId) {
//     return NextResponse.json({ success: false, message: 'User ID is required' }, 400);
//   }

//   try {
//     const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
//     if (!user) {
//       return NextResponse.json({ success: false, message: 'User not found' }, 404);
//     }

//     return NextResponse.json({ success: true, data: user });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: 'Error while fetching user' }, 500);
//   }
// }
