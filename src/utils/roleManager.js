import { clerkClient } from "@clerk/nextjs";

export async function assignRole(userId, role) {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Error assigning role:', error);
    return { success: false, error: error.message };
  }
}

export async function getUserRole(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user.publicMetadata?.role || 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user';
  }
}