import mongoose, { Document, Types } from 'mongoose';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  price: number;
  description: string;
  image: string;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
});

export default mongoose.model<IProduct>('Product', productSchema);
