const User = require("../models/user")

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login")
}

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to Wanderlust")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)

}
module.exports.logout = (req, res) => {
    req.logout((error) => {
        if (error) {
            return next(error)
        }
        req.flash("success", "Logged you out!")
        res.redirect("/listings")
    })
}

module.exports.signup = async(req, res) => {
    // here wrapAsync do not redirect us to the error middleware because of try catch
    try {
        let { email, username, password } = req.body
        const newUser = new User({ username, email })
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err)
            }

            req.flash("success", "Welcome to wanderlust")
            res.redirect("/listings")
        })

    } catch (err) {
        console.log(err)
        req.flash("error", err.message)
        res.redirect("/signup")
    }


}