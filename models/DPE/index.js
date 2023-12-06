var mongoose = require('mongoose');

var DpeSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  N_département : {type: Number, required: true},
  Date_récéption_DPE: {type: Date, required: true},
  Date_visite_diagnostiqueur : {type: Date, required: true},
  Etiquette_GES : {type: String, required: true},
  Etiquette_DPE : {type: String, required: true},
  Année_construction : {type: Number, required: true},
  Surface_habitable_logement : {type: Number, required: true},
  Adresse: {type: String, required: true},
  Code_postal: {type: Number, required: true}
});

module.exports = mongoose.model('DPE', DpeSchema);