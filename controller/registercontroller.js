const User = require('../models/user')


function registercontroller() {
    return {
        async register(req, res) {
            return res.send("route working");
        },
         async post(req, res) {
            console.log(req.body)

const {name, email, number, role, url} = req.body
           
     
            const hello = new User({
             name, 
             email,
             number, 
             role, 
             url
         })
            if(role == 'user'){
            	hello.save().then((hello) => {
            return res.redirect('/userdashboard')
         }).catch(err => {
                return res.redirect('/register')
         })
            }
            else{
            	hello.save().then((hello) => {
            return res.redirect('/rdashboard')
         }).catch(err => {
                return res.redirect('/register')
         })
            }       

        }

   } 
  }


module.exports = registercontroller


