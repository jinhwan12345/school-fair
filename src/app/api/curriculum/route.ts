import { NextResponse } from "next/server";
import curriculumData from "@/data/curriculumData.json";

export async function GET() {
  return NextResponse.json({
    success: true,
    total: curriculumData.length,
    data: curriculumData,
  });
}
