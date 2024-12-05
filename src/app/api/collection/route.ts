import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { collections } from "@/drizzle/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/features/auth/lib/auth";
import { headers } from "next/headers";
import { createId } from "@paralleldrive/cuid2";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const selectCollections = await db
      .select()
      .from(collections)
      .where(eq(collections.userId, session?.user?.id))
      .orderBy(asc(collections.createdAt));

    if (selectCollections === undefined) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    return NextResponse.json({ data: selectCollections }, { status: 200 });
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

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(createId());

  try {
    const insertCollection = await db
      .insert(collections)
      .values({
        id: createId(),
        name: data.name,
        description: data.description,
        userId: session?.user?.id,
      })
      .returning();

    revalidatePath("/dashboard");

    return NextResponse.json({ data: insertCollection }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 },
    );
  }
}
