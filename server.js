
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
const connection = require('./models/config/db')
const Message = require('./models/message')

//Moteur de template
app.set('view engine', 'ejs')

//Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'azert',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  app.use(require('./middlewares/flash'))

//Routes  
app.get('/', (req, resp) =>{
    console.log(process.env.NODE_ENV)
    let Message = require('./models/message')
    Message.all(function (messages) {
        resp.render('pages/index', {messages: messages})
    })
})

app.post('/', (req, resp) =>{
    console.log(req.body)
    console.log('connection ID ' + connection.threadId)
    console.log('etat connection ' + connection.state)
    if (req.body.message === undefined || req.body.message ===''){
        req.flash('error', "Vous n'avez pas posté de message")
        resp.redirect('/')
    } else {
        let Message = require('./models/message')
        Message.create(req.body.message, function(){
            req.flash('success', "Merci !")
            resp.redirect('/')
        })
    }
})

app.get('/message/:id', (req, resp) => {
    let Message = require('./models/message')
    Message.find(req.params.id, function(message){
        resp.render('messages/show', {message: message})
    })
})

app.listen(8080)