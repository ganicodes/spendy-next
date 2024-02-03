import { connectToDb } from "@/database/db";
import { Users } from "@/database/models/Users";
import { verifyPassword } from "@/helper/bcryptHelper";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";
connectToDb();

export async function POST(req) {
  const userBody = await req.json();

  const loginPayload = z.object({
    email: z.string(),
    password: z.string(),
  });

  try {
    // checking if the inputs are correct
    const { success } = loginPayload.safeParse(userBody);

    if (!success) {
      return NextResponse.json(
        { message: "Invalid inputs", success: false },
        { status: 411 }
      );
    }

    const tempUser = await Users.findOne({ email: userBody?.email });

    //   check if the user exist or not
    if (!tempUser) {
      return NextResponse.json(
        { message: "User does not exists", success: false },
        { status: 400 }
      );
    }

    // if the user exist check password and return the token
    const isValidPassword = await verifyPassword(
      userBody.password,
      tempUser.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 411 }
      );
    }

    const userId = tempUser?._id?.toString();

    const token = jwt.sign(userId, process.env.JWT_SECRET);

    let response = NextResponse.json(
      { message: "User logged in successfully", success: true, data: tempUser },
      { status: 200 }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 3600000 * 24),
    });

    return response;
    // return NextResponse.json(
    //   { message: "User logged in successfully", success: true },
    //   { status: 200 }
    // );

    // return new Response("Hello, Next.js!", {
    //   status: 200,
    // });
  } catch (error) {
    console.error("Error: ", error.message);
  }
}
