const dpeModel = require('../models/DPE');
const debug = require('debug')('backend:services:dpe');

const axios = require('axios');

exports.searchMaison = async (Etiquette_GES, Etiquette_DPE, Code_postal, done) => {
    let query = {};

    if (Etiquette_GES) {
        query.Etiquette_GES = Etiquette_GES;
    }
    if (Etiquette_DPE) {
        query.Etiquette_DPE = Etiquette_DPE;
    }
    if (Object.keys(query).length === 0 && !Code_postal) {
        return done(new Error('Pas de DPE, GES ou Code postal fourni'));
    }

    try {
        const resultat = await dpeModel.find(query);
        if (Code_postal) {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${Code_postal}&format=json`);
            const location = response.data[0];
            // Ajoutez la localisation à chaque maison
            const resultatWithLocation = resultat.map(resultat => ({ ...resultat._doc, location }));
            return done(null, resultatWithLocation);
        }
        return done(null, resultat);
    } catch (err) {
        return done(err);
    }
    
}