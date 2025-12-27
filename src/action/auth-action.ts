import { authClient } from "@/lib/auth/auth-client";

//SIGN-UP
export const signUp = async ({
  email,
  password,
  name,
  image,
}: {
  email: string;
  password: string;
  name?: string;
  image?: string;
}) => {
  try {
    const resp = await authClient.signUp.email({
      email,
      password,
      name: name || "New User",
      image: image || "https://example.com/image.png",
    });
    return resp;
  } catch (error) {
    console.error("Sign-up failed:", error);
    throw error;
  }
};

//SIGN-IN
export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const resp = await authClient.signIn.email({
      email,
      password,
    });
    return resp;
  } catch (error) {
    console.error("Sign-in failed:", error);
    throw error;
  }
};

//SIGN-OUT
export const signOut = async () => {
  try {
    const resp = await authClient.signOut();
    return resp;
  } catch (error) {
    console.error("Sign-out failed:", error);
    throw error;
  }
};

// RESET PASSWORD
export const resetPassword = async (newPassword: string, token: string) => {
  try {
    const resp = await authClient.resetPassword({
      newPassword,
      token,
    });
    return resp;
  } catch (error) {
    console.error("Password reset request failed:", error);
    throw error;
  }
};

//CHANGE PASSWORD
export const changePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const resp = await authClient.changePassword({
      newPassword,
      currentPassword,
    });
    return resp;
  } catch (error) {
    console.error("Password change failed:", error);
    throw error;
  }
};
