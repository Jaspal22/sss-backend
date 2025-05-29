import app from "./app.js";
import databaseConnect from "./src/config/databaseConfig.js";


const PORT = process.env.PORT || 3000;


app.listen(PORT,async () => {
    await databaseConnect();
    console.log(`Server is running on port ${PORT}`);
})