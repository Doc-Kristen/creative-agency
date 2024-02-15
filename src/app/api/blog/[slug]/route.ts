import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  slug: string;
}

export const GET = async (
  _req: NextRequest,
  { params }: { params: Params }
) => {
  const { slug } = params;
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Params }
) => {
  const { slug } = params;
  try {
    connectToDb();
    const post = await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete post!");
  }
};
