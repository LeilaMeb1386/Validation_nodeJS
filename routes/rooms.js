var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Mongo = require('../bin/mongo');
var uniqid = require('uniqid');
// var multer  = require('multer');
const ObjectId = require('mongodb').ObjectId;


// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, __dirname + "/../uploads");
//   },
//   filename: function (req, file, cb) {
//     let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
//     let fileName = uniqid('pdfFile-') + ext ;
//     console.log(fileName)
//     cb(null, fileName);
//   }
// });
// const upload = multer({storage: storage});


/* admin avec formulaire login/creation */
router.get('/', function(req, res, next) {
  if(req.session.user) {
    return next() ;
  }
  res.render('rooms/index', {title:"Rooms"});
});

router.use(function(req, res, next) {
  // si la session n'exite pas
  if(!req.session || !req.session.user) {
    return next(createError(403));
  }
  return next();
})

/* retourne le dashboard */
router.get('/', function(req, res, next) {
  Mongo.getInstance()
  .collection('rooms')
  .find()
  .toArray((err, rooms) => {
    res.render('rooms/index', {title:"Liste des rooms", rooms:rooms});
  })

});
module.exports = router;
