'use server'

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const one_week = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: 'User Already Exists. Please SIGN-IN instead.'
      };
    }

    await db.collection('users').doc(uid).set({ name, email });

    return {
      success: true,
      message: "Account created successfully. Please Sign-In."
    };
  } catch (e: any) {
    console.log('Error creating a user', e);

    if (e.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'This email is already in use'
      };
    }

    return {
      success: false,
      message: 'Failed to create an account'
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exist. Create an Account instead.'
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: 'Signed in successfully'
    };

  } catch (e) {
    console.log(e);

    return {
      success: false,
      message: 'Failed to log into an Account'
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: one_week * 1000,
  });

  (await cookieStore).set('session', sessionCookie, {
    maxAge: one_week,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session')?.value;
  if (!sessionCookie) return null;

  try {
    const decodeClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection('users').doc(decodeClaims.uid).get(); // fixed collection name

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;

  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

