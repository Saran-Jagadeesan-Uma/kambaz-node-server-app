import mongoose from "mongoose";
import schema from "./schema.js";

const AttemptModel = mongoose.model("quiz_attempts", schema); // 👈 matches collection name
export default AttemptModel;