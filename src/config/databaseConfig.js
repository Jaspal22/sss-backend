import dotenv from 'dotenv';
dotenv.config();
import mongoose, { connect } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);

const databaseConnect = async () => {
try {
    
        const {connection } = await mongoose.connect(MONGO_URI, {
            dbName: "APP1",
        });
    
        if(connection){
            console.log(`Database connected successfully connected in ${connection.host} to ${MONGO_URI}`);
        }
    
    
} catch (error) {
    console.log("error in database connect");
    
    console.log(`Error: ${error.message}`);
    process.exit(1);    
}
}



export default databaseConnect;