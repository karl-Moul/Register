const LocalStrategy = require("passport-local").Strategy
const  bcrypt = require("bcrypt")



function initialize(passport, getUserByid){
    //function to authenticate users
    const authenticateUsers = async (email, password, done) => {
        //get user by awwait
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, {message: "No user founde width that email"})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done (null, false, {message: "passport incorrect"})
            }
        } catch (e) {
               console.log(e);
               return done(e)
        }

    }

    passport.use(new LocalStrategy({usernamefield: 'emal'}, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserBy(id))
    })
}


module.exports = initialize