const mongoose = require('mongoose');

const SearchResultSchema = new mongoose.Schema({
    Etiquette_GES: {
        type: String,
        required: true
    },
    Etiquette_DPE: {
        type: String,
        required: true
    },
    Code_postal: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('SearchResult', SearchResultSchema);