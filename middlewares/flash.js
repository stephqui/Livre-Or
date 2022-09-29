module.exports = function(req, resp, next){
if (req.session.flash){
    resp.locals.flash = req.session.flash
    req.session.flash = undefined
}

    req.flash = function (type, content){
        if (req.session.flash === undefined){
            req.session.flash = {}
        }
        req.session.flash[type] = content
    }
    next()
}