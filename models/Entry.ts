import { Entry } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

//extiendo por si quiero agegar metodos o propiedades que solo aplican al modelo
export interface IEntry extends Entry {

}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    default: "pending",
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} no es un estado permitido'
    }
  }
})


const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel