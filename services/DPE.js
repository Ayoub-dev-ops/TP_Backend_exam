const pokedex = require('../models/DPE');
const debug = require('debug')('backend:services:dpe');

exports.searchMaison = (Etiquette_GES, Etiquette_DPE, Code_postal, done) => {

    if (Etiquette_GES != undefined) {
        pokedex.find(Etiquette_GES).then(data => {
            debug('filtrage par GES');
            return done(undefined, data);
        }).catch(err => {
            if (err) return done(err);
        });
    } else {
        if (Etiquette_DPE != undefined) {
            pokedex.find(Etiquette_DPE).then(data => {
                debug('filtrage par DPE');
                return done(undefined, data);
            }).catch(err => {
                if (err) return done(err);
            });
        } else {
            if (Code_postal != undefined) {
                pokedex.find(Code_postal).then(data => {
                    debug('filtrage par Code postal');
                    return done(undefined, data);
                }).catch(err => {
                    if (err) return done(err);
                });
            }
            return done(new Error('Pas de DPE ou GES correspondant'));
        }
    }
}