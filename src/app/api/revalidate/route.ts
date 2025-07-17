import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Check for secret to confirm this is a valid request
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { success: false, message: "Invalid secret" },
      { status: 401 }
    );
  }

  try {
    // Revalidate specific tags that we use for caching
    revalidateTag("player-stats");
    revalidateTag("weapon-stats");
    revalidateTag("map-stats");

    // Revalidate the main pages
    revalidatePath("/");
    revalidatePath("/all-time");
    revalidatePath("/session");
    revalidatePath("/general");
    revalidatePath("/history");

    return NextResponse.json({
      success: true,
      revalidated: true,
      message: "Cache invalidated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Error revalidating: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
