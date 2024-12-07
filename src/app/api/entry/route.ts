import { NextResponse } from "next/server";
import { MOODS } from "@/lib/constant";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/features/auth/lib/auth";
import { headers } from "next/headers";
import { entry } from "@/drizzle/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const journalEntries = await db
      .select()
      .from(entry)
      .where(eq(entry.userId, session?.user?.id));

    return NextResponse.json({ data: journalEntries }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { data } = await request.json();

  console.log(data);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mood = MOODS[data.mood.toUpperCase()];
  if (!mood)
    return NextResponse.json(
      { error: "Mood not found" },
      {
        status: 400,
      },
    );

  try {
    const insertEntry = await db
      .insert(entry)
      .values({
        id: createId(),
        title: data?.title as string,
        content: data?.content,
        mood: mood.id as string,
        moodScore: mood.score,
        userId: session?.user?.id as string,
        collectionId: data?.collectionId || null,
      })
      .returning();

    revalidatePath("/dashboard");
    revalidatePath(`/collection/${data?.collectionId}`);

    return NextResponse.json({ data: insertEntry }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 },
    );
  }
}
