const Joi = require('joi'); 
const {
  getPreferencesByUserId,
  updatePreferences,
  resetPreferences
} = require('../services/preferencesService');

// GET /me
const getMyPreferences = async (req, res) => {
  try {
    const prefs = await getPreferencesByUserId(req.user.userId);
    res.status(200).json(prefs);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener preferencias', error: err.message });
  }
};


const updateMyPreferences = async (req, res) => {

  const schema = Joi.object({
    language: Joi.string().valid('es', 'en').optional(),
    theme: Joi.string().valid('light', 'dark').optional(),
    emailNotifications: Joi.boolean().optional(),
    timezone: Joi.string().optional()
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'Datos inválidos',
      details: error.details.map(d => d.message)
    });
  }

  try {
    const updated = await updatePreferences(req.user.userId, value); 
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar preferencias', error: err.message });
  }
};

// POST /reset
const resetMyPreferences = async (req, res) => {
  try {
    const reset = await resetPreferences(req.user.userId);
    res.status(200).json(reset);
  } catch (err) {
    res.status(500).json({ message: 'Error al restaurar preferencias', error: err.message });
  }
};

module.exports = {
  getMyPreferences,
  updateMyPreferences,
  resetMyPreferences
};
