const registercontroller = require('../controller/registercontroller')
const jobcontroller = require('../controller/jobcontroller')
const admincontroller = require('../controller/admincontroller')


function initRoutes(app)
	{
    app.get('/datapost', registercontroller().register),
    app.post('/datapost', registercontroller().post),
    app.post('/jobpost', jobcontroller().post),
    app.post('/logout', registercontroller().logout),
    app.post('/login', admincontroller().login)
    
	}

module.exports = initRoutes