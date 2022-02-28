import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    email: { type: String }
})

const docente = mongoose.model('users',ProductSchema);

export default docente;