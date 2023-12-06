const dpeModel = require('../models/DPE');
const debug = require('debug')('backend:services:dpe');

exports.searchMaison = (Etiquette_GES, Etiquette_DPE, Code_postal, done) => {
    let query = {};

    if (Etiquette_GES) {
        query.Etiquette_GES = Etiquette_GES;
    }
    if (Etiquette_DPE) {
        query.Etiquette_DPE = Etiquette_DPE;
    }
    if (Code_postal) {
        query.Code_postal = Code_postal;
    }

    if (Object.keys(query).length === 0) {
        return done(new Error('Pas de DPE, GES ou Code postal fourni'));
    }

    dpeModel.find(query).then(data => {
        debug('Filtrage réussi');
        return done(undefined, data);
    }).catch(err => {
        if (err) return done(err);
    });
}