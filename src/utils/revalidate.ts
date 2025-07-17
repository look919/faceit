// This file will be used to call Next.js revalidation API endpoints
// to ensure cache is properly cleared after data changes

import { apiGET } from "../lib/api";

/**
 * Revalidates all API routes to force new data to be fetched
 * This should be called after any database modifications
 */
export const revalidateAllData = async () => {
  try {
    // Call a special revalidation endpoint we will create
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}`,
      {
        method: "POST",
      }
    );
    console.log("Revalidation request sent successfully.");
  } catch (error) {
    console.error("Failed to send revalidation request:", error);
  }
};
