"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function SignUp(params: SignUpParams) {
  const { uid, name, email, photoURL } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists please sign in instead",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
      photoURL: photoURL || "",
    });

    return {
      success: true,
      message: "Account created successfully, Please sign in ",
    };
  } catch (error: any) {
    console.log("Error creating a User", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "this email already in use",
      };
    }

    return {
      success: false,
      message: "Something went wrong, Failed to create account",
    };
  }
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found, Create an account instead",
      };
    }

    await setSessionCookie(idToken);
    
    return {
      success: true,
      message: "Successfully signed in",
    };
  } catch (error: any) {
    console.log("Error signing in", error);
    return {
      success: false,
      message: "Something went wrong, Failed to sign in",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log("Error getting current user", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
