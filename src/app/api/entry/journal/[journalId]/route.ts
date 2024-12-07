import { NextResponse } from "next/server";
import { auth } from "@/features/auth/lib/auth";
import { headers } from "next/headers";
import { entry, SelectEntry } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ journalId: SelectEntry["id"] }> },
) {
  const { journalId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [selectEntryById] = await db
      .select()
      .from(entry)
      .where(eq(entry.id, journalId));

    return NextResponse.json({ data: selectEntryById }, { status: 200 });
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
  { params }: { params: Promise<{ journalId: SelectEntry["id"] }> },
) {
  const { journalId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleteEntry = await db.delete(entry).where(eq(entry.id, journalId));

    return NextResponse.json({ data: deleteEntry }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ journalId: string }> },
) {
  const { journalId } = await params;
  const data = await request.json();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!journalId) {
    return NextResponse.json(
      { error: "Journal ID is required" },
      { status: 400 },
    );
  }

  if (!Object.keys(data).length) {
    return NextResponse.json(
      { error: "No data provided for update" },
      { status: 400 },
    );
  }

  try {
    const updateEntry = await db
      .update(entry)
      .set({ title: data.title, content: data.content, updatedAt: new Date() })
      .where(eq(entry.id, journalId))
      .returning();

    return NextResponse.json({ data: updateEntry }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
