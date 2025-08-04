import superjson from "superjson";

export const apiGET = async <T>(url: string): Promise<T> => {
  try {
    // Determine which tag to use based on URL path
    let tag = "player-stats"; // default tag
    if (url.includes("weapon")) {
      tag = "weapon-stats";
    } else if (url.includes("map")) {
      tag = "map-stats";
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/api${url}`,
      {
        // cache: "force-cache",
        next: {
          revalidate: 7200, // Cache for 2 hours (7200 seconds)
          tags: [tag], // Tag-based revalidation
        },
        cache: "no-store", // Disable caching for API calls
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const text = await response.text();
    return superjson.parse<T>(text);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
