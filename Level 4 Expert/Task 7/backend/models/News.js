const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  source: { // Change 'sourse' to 'source' and ensure it's an object
    name: {
      type: String
    }
  },
  author: {
    type: String
  },
  urlToImage: {
    type: String
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
 }
});

module.exports = mongoose.model('News', newsSchema);
