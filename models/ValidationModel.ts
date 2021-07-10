import mongoose, { Schema } from 'mongoose';

/**
 * Validation Schema
 */
const validationSchema = new Schema({
	sp: Number, // Speed
	si: Number, // Size
	g: Boolean, // is green
	f: String // The 10 symbol hash reference
});

const ValidationModel = mongoose.model('ValidationModel', validationSchema);

export default ValidationModel;