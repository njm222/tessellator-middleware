const axios = require('axios')
const config = require('../../config/index.js')

const { clientId } = config

const refreshToken = (req) => {
	// requesting access token from refresh token
	const { refreshToken } = req.query
	const authOptions = {
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		params: {
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: clientId,
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		json: true
	}

	axios(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			const { accessToken } = body
			return {
				statusCode: response.statusCode,
				body: accessToken,
			}
		} else {
			return {
				statusCode: response.statusCode,
				body: error
			}
		}
	}).catch(console.log)
}

module.exports = refreshToken
