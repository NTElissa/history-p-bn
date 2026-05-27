import mongoose from 'mongoose';

const exhibitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  arFrameworkType: {
    type: String,
    enum: ['image', 'arrow', 'audio'],
    default: 'image'
  },
  audioUrl: {
    type: String
  },
  metadata: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

const Exhibit = mongoose.model('Exhibit', exhibitSchema);
export default Exhibit;
