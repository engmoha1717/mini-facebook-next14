import mongoose from 'mongoose';
let connected =false;

const connectDB = async () => {
      mongoose.set('strictQuery',true)
    if(connected){
        console.log('DB already connected..');
        return ;
    };
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected');
        connected = true;
    } catch (error) {
        console.log(error);
       // process.exit(1);
    }
}

export default connectDB;
// export default mongoose; // for testing purpose only
 