var Codefile = require('../models/codefile-model.js');
var codefiles = require('../services/codefile.js');

module.exports = function(app, passport) {
    var bodyParser = require('body-parser');
    var jsonParser = bodyParser.json();

    app.get('/codefiles', function(req, res) {
        codefiles.list(function(codefile) {
            res.json(codefile);
        }, function(err) {
            res.status(400).json(err);
        });
    });
    
    app.post('/codefiles', jsonParser, function(req, res) {
        if (!req.body) {
            return res.status(400).json({
                message: "No request body"
            });
        }
        
        var chosenHeader = req.body.chosenHeader;
        var chosenParagraph = req.body.chosenParagraph;
        var headerLink = req.body.headerLink;
        var paragraphLink = req.body.paragraphLink;
        var username = req.body.username;
        
        // var chosenHeader = "Chosen Header";
        // var chosenParagraph = "Chosen Paragraph";
        // var headerLink = "New Header Link";
        // var paragraphLink = "Paragraph Link";
        // var username = "Username";
        
        var codefile = new Codefile({
            chosenHeader: chosenHeader,
            chosenParagraph: chosenParagraph,
            headerLink: headerLink,
            paragraphLink: paragraphLink,
            username: username
        });
        
        console.log(req.body, codefile);

        codefile.save(function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            return res.status(201).json({});
        });

    });

};