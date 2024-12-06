// test api simple 

import connectDB from "@/config/database";
import Post from "@/models/Post";
import { getSessionUser } from "@/utils/getSessionUser";

export async function GET(request) {
    await connectDB()
    
    const posts =await Post.find()
    .populate('author', 'username image email')
    .sort({ createdAt: -1 })
    .lean()
    return new Response(JSON.stringify(posts))
  // return new Response('Hello, World!');
}