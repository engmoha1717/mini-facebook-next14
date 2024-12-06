import connectDB from "@/config/database";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server"; // 

export const POST=async(request)=>{
   try {
    connectDB()
    const {content,recipient, post}=await request.json();
    const sessionUser= await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        return new Response({message :'you must be log in'})
    }
    const {user}=sessionUser;
    // const newComment={
    //         comment,
    //         recipient,
    //         post,
    //         user
    //     }
         const newComment=await Comment.create({
            content,
            recipient,
            post,
            sender:user.id
        })
        console.log(newComment)
        await newComment.populate('sender', 'username image')

    // Add comment to post's comments array
    await Post.findByIdAndUpdate(
      post,
      { 
        $push: { comments: newComment._id },
        // $inc: { commentsCount: 1 }
      },
      { new: true }
    )

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ message: "Failed to add comment", error: error.message }, { status: 500 });
  }
}



export async function GET(request) {
  await connectDB();
 
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return new Response("Post ID is required", { status: 400 });
  }

  try {
    // Find comments associated with the given postId
    const comments = await Comment.find({ post: postId })
    .populate('sender', 'username image email') // Add this line to populate sender info
    .sort({ createdAt: -1 })
    .lean();
   
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Failed to fetch comments", { status: 500 });
  }
}
