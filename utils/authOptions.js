import connectDB from '@/config/database'
import User from '@/models/User'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions ={
    providers :[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params: {
                    access_type: 'offline',
                    prompt: 'consent',
                    response_type: "code"
                },
            },
        })
    ],
    callbacks:{
        async signIn({profile}){ 
            //connect db
            await connectDB()
            //check if user exist 
            const userExists = await User.findOne({ email: profile.email });       
             //if  ot then add user to db
            if(!userExists){
                const username =profile.name.slice(0,20)
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture,
                });
                //return true to allow sign in
            }
            return true;
        },
        //modify session object
        async session({session}){
            //get user from db
            const user = await User.findOne({email:session.user.email})
            session.user.id = user._id.toString()
            //return session
            return session
        }
    }
}




// import connectDB from '@/config/database'
// import User from '@/models/User';
// import GoogleProvider from 'next-auth/providers/google'

// export const authOptions ={
//     providers:[
//         GoogleProvider({
//             clientId:process.env.GOOGLE_CLIENT_ID,
//             clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//             authorization:{
//                 params: {
//                     access_type: 'offline',
//                     prompt: 'consent',
//                     response_type: "code"
//                 },
//             },
//         })
//     ],
//     callbacks:{
//         async signIn(profile){
//             await connectDB();
//             const userExists =await User.findOne({email:profile.email});
//             if(!userExists){
//                 const username = profile.name.slice(0,20)
//                 await User.create({
//                     email: profile.email,
//                     username,
//                     image: profile.picture,
//                 });
//             }
//             return true;
//         },
//         async session(session){
//             const user= await User.findOne({email:session.user.email})
//             session.user.id=user._id.toString();
//             return session;
//         }
//     }
// }