const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    default: 'es'
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  emailNotifications: {
    type: Boolean,
    default: true
  },
  timezone: {
    type: String,
    default: 'America/Guayaquil'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Preferences', preferencesSchema);
