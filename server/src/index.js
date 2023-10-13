import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(3000);
console.log("Listening to port", 3000);
