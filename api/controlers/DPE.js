const DPE= require('../../models/DPE');
const Service = require('../../services/DPE');
const debug = require('debug')('backend:ctrl:dpe');

exports.search = (req, res, next) => {
    var GES = req.query.Etiquette_GES;
    var DPE = req.query.Etiquette_DPE;
    var CP = req.query.Code_postal;

    if (GES == null && DPE == null && CP == null) {
      return res.status(400).json({message: 'vous devez fournir au moins un critère de recherche'});
    } 
    debug('recherche de maison');
    Service.searchMaison(GES, DPE, CP,(err, data) => { 
      if (err) return next(err);
      return res.status(200).json(data);
    });
  };