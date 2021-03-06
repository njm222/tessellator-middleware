require('dotenv').config()
const express = require('express') // Express web server framework
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index.js')
const config = require('./config/index.js')
const { frontendUrl } = config

const app = express()

app
	.use(express.static(`${__dirname}/public`))
	.use(cors({credentials: true, origin: frontendUrl}))
	.use(cookieParser())
	.use(express.json())

routes.forEach(({ pattern, handler, method = 'GET', redirect = false }) => {
	app[method.toLowerCase()](pattern, async (req, res) => {
		if (redirect) {
			handler(req, res)
		} else {
			res.setHeader('Access-Control-Allow-Origin', frontendUrl)
			res.setHeader('Access-Control-Allow-Credentials', true)

			const { statusCode, headers = {}, body } = await handler(req, res)

			Object.entries(headers).forEach(([key, value]) => res.header(key, value))

			res.status(statusCode).send(body)
		}
	})
})

const port = '8888'
app.listen(port, (err) => {
	if (err) {
		// eslint-disable-next-line no-console
		console.error('Unable to listen on port', port, err)
		return
	}

	// eslint-disable-next-line no-console
	console.log('Listening on port', port)
})
