import mongoose, { Document, Schema } from "mongoose";
import DiaryEntryType, { FileType } from "../types/diaryEntry";

const DiaryEntrySchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: { type: [String], default: [] },
    files: { type: [String], default: [] },
    date: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure user_id is required
});

const DiaryEntry = mongoose.model<DiaryEntryType>(
  "DiaryEntry",
  DiaryEntrySchema
);

export default DiaryEntry;
export type { DiaryEntryType, FileType };