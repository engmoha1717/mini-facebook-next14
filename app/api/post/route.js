import connectDB from "@/config/database"
import Post from "@/models/Post";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export const POST = async (request) => {
    try {
        await connectDB()
        const sessionUser =await getSessionUser()
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
          }
          const userId = sessionUser.userId
        const formData = await request.formData(); 
        const postDta ={
            content : formData.get("content"),
            image : formData.get("image"),
            author:userId 
        }
        
         const newPost = await Post(postDta)
         await newPost.save()

         revalidatePath('/posts')

         return Response.redirect(
            `${process.env.NEXTAUTH_URL}/posts/${newPost._id}`
          )
        // return new Response(JSON.stringify({ 
        //     message: "Post created successfully", postDta }), {
        //     status: 201,
        //   });
        
    } catch (error) {
        console.error(error);
       return new Response('Failed to add property', error,{ status: 500 });
    }
}