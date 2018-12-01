const mongoose = require('mongoose');

var claseModel = mongoose.Schema({
    name: String,
    uvs: Number,
    descripcion: String
});

module.exports = mongoose.model('clase', claseModel);