var express = require('express');
var router = express.Router();



router.get('/', index);



function index(req, res){
	res.render('index.html');
}


module.exports = router;
