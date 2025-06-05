import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });   
// timestamps: true adds createdAt and updatedAt fields to the schema
const shortUrl = mongoose.model("shortUrl", shortUrlSchema);    
export default shortUrl;