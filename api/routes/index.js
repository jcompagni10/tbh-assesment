var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properly2");
});

router.get("/test", function(req, res, next) {
    res.send("this is a test page4");
});


module.exports = router;
