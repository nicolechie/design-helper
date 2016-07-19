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
        
        console.log(req.body);
        var chosenHeader = req.body.chosenHeader;
        var chosenParagraph = req.body.chosenParagraph;
        var headerLink = req.body.headerLink;
        var paragraphLink = req.body.paragraphLink;
        var username = req.body.username;
        var projectName = req.body.projectName;
        
        var codefile = new Codefile({
            chosenHeader: chosenHeader,
            chosenParagraph: chosenParagraph,
            headerLink: headerLink,
            paragraphLink: paragraphLink,
            user: username,
            projectName: projectName
        });

        codefile.save(function(err, codefile) {
            console.log(err, codefile);
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            return res.status(201).json({});
        });

    });
    
       app.put('/codefiles/:id', jsonParser,  function(req, res) {
          console.log("req.body", req.body);
        codefiles.edit(req.body, function(codefile) {
            res.status(201).json(codefile);
        }, function(err) {
            res.status(400).json(err);
        });
    });
        
};