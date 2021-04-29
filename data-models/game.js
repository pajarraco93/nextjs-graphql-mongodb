import mongoose from 'mongoose';

const { Schema } = mongoose;

const gameSchema = Schema({
  name: String,
  genre: String,
  score: Number,
  platform: String,
}, {
  collection: 'videogames',
});

// Duplicate the ID field.
gameSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
gameSchema.set('toJSON', {
  virtuals: true
});

mongoose.models = {};

export default mongoose.model('VideoGame', gameSchema);
