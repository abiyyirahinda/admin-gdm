import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    sizeUnit: { type: String, required: true },
    sizeValue: { type: Number, required: true },
}, { timestamps: true });

const Size = mongoose.models.Size || mongoose.model("Size", sizeSchema);

export default Size;