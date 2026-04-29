import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
await connectDB();
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
