import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // ✅ Explicitly pass `req` to getAccessToken
    const { accessToken } = await  getAccessToken(req);

    if (!accessToken) {
      return NextResponse.json({ error: "No token found" }, { status: 400 });
    }

    return NextResponse.json({ token: accessToken });
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json({ error: "Failed to fetch token" }, { status: 500 });
  }
};



