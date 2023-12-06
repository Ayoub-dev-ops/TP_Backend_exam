const dpeModel = require('../models/DPE');
const SearchResult = require('./models/SearchResult');
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
        // Sauvegardez chaque résultat de recherche
        for (const result of resultat) {
            const searchResult = new SearchResult(result);
            await searchResult.save();
        }
        return done(null, resultat);
    } catch (err) {
        return done(err);
    }

    // Fonction pour récupérer les résultats de recherche
    async function getSearchResults() {
        try {
            const searchResults = await SearchResult.find({});
            console.log(searchResults);
        } catch (err) {
            console.error(err);
        }
    }

    // Fonction pour mettre à jour un résultat de recherche
    async function updateSearchResult(id, newValue) {
        try {
            const query = { _id: id };
            const update = { Etiquette_GES: newValue };
            const options = { new: true };

            const updatedResult = await SearchResult.findOneAndUpdate(query, update, options);
            console.log(updatedResult);
        } catch (err) {
            console.error(err);
        }
    }

    // Fonction pour supprimer un résultat de recherche
    async function deleteSearchResult(id) {
        try {
            const query = { _id: id };

            const deletedResult = await SearchResult.findOneAndDelete(query);
            console.log(deletedResult);
        } catch (err) {
            console.error(err);
        }
    }

    // ...

    try {
        const resultat = await dpeModel.find(query);
        if (Code_postal) {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${Code_postal}&format=json`);
            const location = response.data[0];
            const resultatWithLocation = resultat.map(resultat => ({ ...resultat._doc, location }));
            return done(null, resultatWithLocation);
        }
        for (const result of resultat) {
            const searchResult = new SearchResult(result);
            await searchResult.save();
        }
        return done(null, resultat);
    } catch (err) {
        return done(err);
    }
}