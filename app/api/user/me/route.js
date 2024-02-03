import { connectToDb } from "@/database/db";
import { Users } from "@/database/models/Users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
connectToDb();

export async function GET(req) {
  let authToken = req.cookies.get("authToken")?.value;
  if (authToken) {
    let userId = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log("userId: ", userId);

    let user = await Users.findOne({ _id: userId }).select("-password");
    //   console.log("authToken: ", authToken);
    return NextResponse.json(
      { message: "Ok", success: true, userDetails: user },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "Ok", success: false, userDetails: [] },
    { status: 200 }
  );
}
