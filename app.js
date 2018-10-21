const express = require('express')
var path    = require("path")
const app = express()
const port = 3000
require('es6-promise').polyfill();
//require('isomorphic-fetch')
var fetchUrl = require("fetch").fetchUrl;

function myMiddleware (req, res, next) {
   if (req.method === 'GET') {
     // Do some code
     console.log(req.url)
   }
   // keep executing the router middleware
   next()
}

app.use(myMiddleware)



app.get('/website', (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/*',(req,res) => {
	fetchUrl(req.params[0],(error, meta, body) => {
		res.set('Content-Type', 'text/html').status(200).send(body);
	})
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
