import mongoose from "mongoose";

const NLUSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true //acá hay agregar esto para que sea único el nombre
  },
  text: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const NLU = mongoose.model("NLU", NLUSchema);

export default NLU;