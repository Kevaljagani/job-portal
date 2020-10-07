const Job = require('../models/jobs')


function jobcontroller() {
    return {
         async post(req, res) {
            console.log(req.body)

const {title, description, skill, salary, experience} = req.body
           
     
            const hello = new Job({
             title, 
             description,
             skill, 
             salary, 
             experience
         })
            
            	hello.save().then((hello) => {
            return res.redirect('/rdashboard')
         }).catch(err => {
                return res.redirect('/rdashboard')
         })           
        }
   } 
  }


module.exports = jobcontroller


