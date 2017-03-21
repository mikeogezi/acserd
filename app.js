'use strict'

// \n.{1,}\| &#x9.*

let path = require('path')

let express = require('express')
let stylus = require('stylus')
let nib = require('nib')
let bodyParser = require('body-parser')
let favicon = require('serve-favicon')
// let multer = require('multer')
let ms = require('ms')

let routes = require('./app/routes')
let views = require('./app/views')

let app = express()

/*
let maxSize = 10485760
let storage = multer.memoryStorage()
let limits = {
    fileSize: maxSize
}
let multerOpts = {
    storage: storage,
    limits: limits
}
let upload = multer(multerOpts)
*/

let compile = (str, _path) => {
    return stylus(str).set('filename', _path).use(nib());
}

app.set('homedir', __dirname)
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/public/views/pug')
app.set('view engine', 'pug')
app.set('company', 'ASCERD')
app.set('company_full', 'African Centre for Sustainable Environment And Resources Development')
app.set('handle', 'ascerdnigeria')
app.set('year', new Date().getFullYear())
app.set('designer person', 'Michael Ogezi')
app.set('designer company', 'Makerloom')
app.set('designer person site', 'https://github.com/okibeogezi')
app.set('designer company site', 'https://makerloom-web.herokuapp.com')
app.set('phone', '073-464251')
app.set('phone_href', '073-464251')
app.set('fax', '073-463679')
app.set('fax_href', '073-463679')
app.set('addr_one', '15982 Barki Akawo, Dadin Kowa, Jos')
app.set('addr_two', 'Plateau, Nigeria')
app.set('email', 'ascerdnigeria@gmail.com')
app.set('founder', 'Prof. A. E. Ogezi')
app.set('facebook share', 'https://facebook.com/sharer/sharer.php?u=')
app.set('google share', 'https://plus.google.com/share?url=')
app.set('twitter share', 'https://twitter.com/home?status=')

// app.use(routes.songDownload)
app.use(express.static(path.join(__dirname + '/public')))
app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))
app.use(stylus.middleware({
    src: path.join(__dirname, '/public'),
    compile: compile
}))
app.use(bodyParser.urlencoded({
    extended: false
}))

app.locals.company = app.get('company')
app.locals.companyFull = app.get('company_full')
app.locals.handle = app.get('handle')
app.locals.year = app.get('year')
app.locals.designerPerson = app.get('designer person')
app.locals.designerCompany = app.get('designer company')
app.locals.designerPersonSite = app.get('designer person site')
app.locals.designerCompanySite = app.get('designer company site')
app.locals.phone = app.get('phone')
app.locals.phoneHref = app.get('phone_href')
app.locals.fax = app.get('fax')
app.locals.faxHref = app.get('fax_href')
app.locals.addrOne = app.get('addr_one')
app.locals.addrTwo = app.get('addr_two')
app.locals.email = app.get('email')
app.locals.founder = app.get('founder')
app.locals.facebookShare = app.get('facebook share')
app.locals.twitterShare = app.get('twitter share')
app.locals.googleShare = app.get('google share')

app.get('/*.html', routes.handleHtml)
app.get('/', views.index)
app.post('/contact', routes.contactSendMail)
app.post('/newsletter', routes.newsletterSubscribe)
// app.post('/upload', upload.single('song'), routes.songUpload)
app.get('/:view', views.resolveView)

app.locals.pretty = true

app.listen(app.get('port'), () => {
    console.log(`Listening or port ${app.get('port')}`)
})
