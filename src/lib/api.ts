import superjson from "superjson";

export const apiGET = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/api${url}`,
      {
        cache: "no-store", // Don't cache this data
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
