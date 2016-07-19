var mongoose = require('mongoose');

var CodefileSchema = new mongoose.Schema({
    chosenHeader: {
        type: Object,
        required: true
    },
    chosenParagraph: {
        type: Object,
        required: true
    },
    headerLink: {
        type: String,
        required: true
    },
    paragraphLink: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    }
});

var Codefile = mongoose.model('Codefile', CodefileSchema);

module.exports = Codefile;