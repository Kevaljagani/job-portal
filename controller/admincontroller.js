const Admin = require('../models/admin')


function admincontroller() {
    return {
         async login(req, res) {
            console.log(req.body)

            if ( req.body.email == 'admin@admin.com' && req.body.password == 'password'){
            	


const {email, password} = req.body
           
     
            const hello = new Admin({
             email,
             password
         })
            
            	hello.save().then((hello) => {
            return res.redirect('/admindashboard')
         }).catch(err => {
                return res.redirect('/')
         })    
            	
            }
            else{
             return res.redirect('/')
            }
    
        }


   } 
  }


module.exports = admincontroller