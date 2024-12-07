import { NextResponse } from "next/server";
import { auth } from "@/features/auth/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { collections } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collectionId: string }> },
) {
  const { collectionId } = await params;
  console.log(collectionId);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [selectCollection] = await db
      .select()
      .from(collections)
      .where(eq(collections.id, collectionId));

    return NextResponse.json({ data: selectCollection }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ collectionId: string }> },
) {
  const { collectionId } = await params;
  console.log(collectionId);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleteCollection = await db
      .delete(collections)
      .where(eq(collections.id, collectionId));

    return NextResponse.json({ data: deleteCollection }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
