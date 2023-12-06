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

  exports.getOne = (req, res, next) => {
    debug('recherche de maison');
    Service.getMaison(req.params.id,(err, data) => { 
      if (err) return next(err);
      return res.status(200).json(data);
    });
  }

  exports.create = (req, res, next) => {
    debug('création de maison');
    Service.createMaison(req.body,(err, data) => { 
      if (err) return next(err);
      return res.status(201).json(data);
    });
  }

  exports.update = (req, res, next) => {
    debug('mise à jour de maison');
    Service.updateMaison(req.params.id, req.body,(err, data) => { 
      if (err) return next(err);
      return res.status(200).json(data);
    });
  }

  exports.delete = (req, res, next) => {
    debug('suppression de maison');
    Service.deleteMaison(req.params.id,(err, data) => { 
      if (err) return next(err);
      return res.status(200).json(data);
    });
  }