import { entry, SelectEntry } from "@/drizzle/schema";
import { auth } from "@/features/auth/lib/auth";
import { db } from "@/lib/db";
import { asc, gte } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const period = searchParams.get("period");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const startDate = new Date();

  switch (period) {
    case "7d":
      startDate.setDate(startDate.getDate() - 7);
      break;
    case "15d":
      startDate.setDate(startDate.getDate() - 15);
      break;
    case "30d":
      startDate.setDate(startDate.getDate() - 30);
      break;
  }

  const entries = await db
    .select()
    .from(entry)
    .where(gte(entry.createdAt, startDate))
    .orderBy(asc(entry.createdAt));

  const moodData = entries.reduce((acc: SelectEntry, entry: SelectEntry) => {
    const date = entry.createdAt.toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = {
        totalScore: 0,
        count: 0,
        entries: [],
      };

      acc[date].totalScore += entry.moodScore;
      acc[date].count += 1;
      acc[date].entries.push(entry);

      return acc;
    }
  }, {});

  const analyticsData = Object.entries(moodData).map(([date, data]) => ({
    date,
    averageScore: Number((data.totalScore / data.count).toFixed(1)),
    entryCount: data.count,
  }));
}
