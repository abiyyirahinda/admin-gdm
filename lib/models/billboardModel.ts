import mongoose from "mongoose";

const billboardSchema = new mongoose.Schema({
    billboardLabel : { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const Billboard = mongoose.models.Billboard || mongoose.model("Billboard", billboardSchema);

export default Billboard