import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Create response with success message
  const response = NextResponse.json({ success: true });
  
  // Set cookie to expire
  response.cookies.set({
    name: "session",
    value: "",
    expires: new Date(0), // Set to epoch time to expire immediately
    path: "/",
  });
  
  return response;
}
