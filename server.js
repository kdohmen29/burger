var express = require('express')

var app = express()

var sequelize = require('sequelize')

var exphbs = require('express-handlebars')

var db = require('./models/index.js')

var port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({
  extended:true
}))

// set rendering engine
// expres allows a sever side rendering engine to be installed
// this sticks front end and back end together
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', function(req,res){
  db.Burger.findAll({}).then(function(data){
    res.render('index', {items: data})
  })
})

//this route devours a burger
app.put('/devour', function(req,res){
  console.log(req.body.id);
  
  db.Burger.update({
    devoured:true
  },
  {
    where:{
      id:req.body.id
    }
  }).then(function(data){
    res.send("Burger Updated!")
  })
})


//this route makes a burger
app.post('/add', function(req,res){
  console.log(req.body.text);
  
  db.Burger.create({
    burger_name: req.body.text
  }).then(function(data){
    res.send("Burger Added!")
  })
})



// db.Burger.create({
//   burger_name: 'old nasty burger'
// })


app.get('/all-burgers', function(req,res){
  db.Burger.findAll({}).then(function(data){
    res.send(data)
  })
})


/// route that will take id of burger and update the boolean of devoured to true


db.sequelize.sync().then(function(){
  app.listen(port)
})
