var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Movie = require("../model/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.find((err,docs)=>{
    if(!err){
      res.render("movielist",{data:docs});
    }
    else{console.log("err in users")}
  })
  // res.render('index', { title: 'Movie | App' });
});

router.get("/moviedetails/:id",(req,res)=>{
  console.log(req.params.id);
  Movie.findById(req.params.id,(err,doc)=>{
    console.log(req.params.id);
    if(!err){
      res.render("moviedetails",{
        existingdata : doc,
      })
    }
    else{console.log(err)}
  });
});

router.get("/addmovie",(req,res)=>{
  res.render("movieform");
});

router.post("/movieform/:id",(req,res)=>{
  Movie.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,data)=>{
    if(err){console.log(err)}
    res.redirect("/");
  })
})

router.get("/delete/:id",(req,res)=>{
  Movie.findByIdAndDelete(req.params.id,(err,data)=>{
    if(err){console.log(err)}
    res.redirect("/");
  })
});

router.post('/', function(req, res, next) {
  let data = req.body;
  Movie.create(data,(err,newuser)=>{
    if(err){console.log(err)}
    res.redirect("/");
  })
});

module.exports = router;
