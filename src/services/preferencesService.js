const Preferences = require('../models/Preferences');

const getPreferencesByUserId = async (userId) => {
  let prefs = await Preferences.findOne({ userId });

  
  if (!prefs) {
    prefs = await Preferences.create({ userId });
  }

  return prefs;
};

const updatePreferences = async (userId, updates) => {
  const updated = await Preferences.findOneAndUpdate(
    { userId },
    { $set: updates },
    { new: true, upsert: true }
  );

  return updated;
};

const resetPreferences = async (userId) => {
  const resetValues = {
    language: 'es',
    theme: 'light',
    emailNotifications: true,
    timezone: 'America/Guayaquil'
  };

  return await Preferences.findOneAndUpdate(
    { userId },
    resetValues,
    { new: true, upsert: true }
  );
};

module.exports = {
  getPreferencesByUserId,
  updatePreferences,
  resetPreferences
};
