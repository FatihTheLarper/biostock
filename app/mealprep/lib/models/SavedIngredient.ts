import mongoose, { Schema, Model } from "mongoose";

interface SavedIngredient {
  userId: string;
  idIngredient: string;
  strIngredient: string;
  strThumb: string;
  strDescription: string;
}

const savedIngredientSchema = new Schema<SavedIngredient>({
  userId: { type: String, required: true },
  idIngredient: { type: String, required: true },
  strIngredient: { type: String, required: true },
  strThumb: { type: String, required: true },
  strDescription: { type: String, default: "" },
}, { timestamps: false });

savedIngredientSchema.index({ userId: 1, idIngredient: 1 }, { unique: true });

declare global {
  var SavedIngredientModel: Model<SavedIngredient> | undefined;
}

const SavedIngredient = global.SavedIngredientModel ?? (global.SavedIngredientModel = mongoose.model<SavedIngredient>("SavedIngredient", savedIngredientSchema));

export default SavedIngredient;
