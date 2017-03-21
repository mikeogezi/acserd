'use strict'

let views = {}

views.index = (req, res) => {
    res.render('index', {
        title : `${req.app.locals.company} | African Centre for Sustainable Environment And Resources Development`,
        view: 'index'
    })
}

views.about = (req, res) => {
    res.render('about', {
        title : `About | ${req.app.locals.company}`,
        view: 'about'
    })
}

views.contact = (req, res) => {
    res.render('contact', {
        title : `Contact | ${req.app.locals.company}`,
        view: 'contact'
    })
}

views.gallery = (req, res) => {
    res.render('gallery', {
        title : `Gallery | ${req.app.locals.company}`,
        view: 'gallery'
    })
}

views.download = (req, res) => {
    res.render('download', {
        title : `Download | ${req.app.locals.company}`,
        view: 'download',
        shareLink: 'http://acserdnigeria.com/download'
    })
}

/*
views.blog = (req, res) => {
    res.render('blog', {
        title : `Blog | ${req.app.locals.company}`,
        view: 'blog'
    })
}

views.tickets = (req, res) => {
    res.render('tickets', {
        title : `Tickets | ${req.app.locals.company}`,
        view: 'tickets'
    })
}

views.upload = (req, res) => {
    res.render('upload', {
        title : `Upload | ${req.app.locals.company}`,
        view: 'upload'
    })
}
*/

let resolveView = (req, res, next) => {
    if (views[req.path.replace('/', '')]) {
        views[req.path.replace('/', '')](req, res)
    }
    else {
        next()
    }
}

exports.index = views.index
exports.about = views.about
exports.blog = views.blog
exports.contact = views.contact
exports.rides = views.rides
exports.tickets = views.tickets
exports.resolveView = resolveView
