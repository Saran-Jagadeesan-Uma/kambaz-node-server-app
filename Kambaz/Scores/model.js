import mongoose from "mongoose";
import schema from "./schema.js";
const QuestionModel = mongoose.model("scores", schema);
export default QuestionModel;
