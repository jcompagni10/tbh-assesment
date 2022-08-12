var express = require('express');
var router = express.Router();
var forms = require('../db');

router.get("/form/:formID", async function(req, res, next) {
    let formID = req.params.formID;
    let form = await forms.getFormForSession(formID);
    res.json(form);});

router.post("/form/", function(req, res, next) {
    let form = req.params.form;
    console.log(req.body);
    res.json({status: 200});});





module.exports = router;

