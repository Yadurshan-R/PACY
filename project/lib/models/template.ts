import mongoose from 'mongoose';

const ElementSchema = new mongoose.Schema({
  id: String,
  type: String,
  content: String,
  left: Number,
  top: Number,
  fontSize: Number,
  fill: String,
  editable: Boolean,
  selectable: Boolean,
});

const TemplateSchema = new mongoose.Schema({
  degreeName: { type: String, required: true, unique: true },
  elements: [ElementSchema],
  backgroundImage: String,
  originalWidth: Number,
  originalHeight: Number,
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Template || mongoose.model('Template', TemplateSchema);
