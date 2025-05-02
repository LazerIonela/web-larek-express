import mongoose, { Schema } from 'mongoose';

export type IProduct = {
    title: string;
    image: {fileName: string, originelName: string};
    category: string;
    description?: string;
    price?: number | null;
}

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
  image: {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    default: null,
    required: false,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
