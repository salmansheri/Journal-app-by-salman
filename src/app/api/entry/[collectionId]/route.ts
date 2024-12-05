import { NextResponse } from "next/server";
import { auth } from "@/features/auth/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { entry } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { collectionId: string } },
) {
  const { collectionId } = await params;
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const selectEntriesByCollectionId = await db
      .select()
      .from(entry)
      .where(eq(entry.collectionId, collectionId));

    return NextResponse.json(
      { data: selectEntriesByCollectionId },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
