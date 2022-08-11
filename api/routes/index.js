var express = require('express');
var router = express.Router();
var forms = require('../db');

router.get("/form/:formID", async function(req, res, next) {
    let formID = req.params.formID;
    let form = await forms.getFormForSession(formID);
    res.json(form);});




module.exports = router;

