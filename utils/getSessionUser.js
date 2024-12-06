import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export const getSessionUser =async()=>{
    try {
        const session =await getServerSession(authOptions);
        if(!session){
            return null;
        }
        return {
            user: session.user,
            userId: session.user.id,
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}









// import { getServerSession } from "next-auth";
// import { authOptions } from "@/utils/authOptions";

// export const getSessionUser =async()=>{
//     try {
//         const session =await getServerSession(authOptions);
//         if(!session){
//             return null;
//         }
//         return {
//             user: session.user,
//             userId: session.user.id,
//         }
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }
