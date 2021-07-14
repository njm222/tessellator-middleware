const axios = require('axios')
const config = require('../../config/index.js')

const { clientId } = config

const refreshToken = async (req) => {
	// requesting access_token from refresh_token
	const refreshToken = req.body?.refreshToken
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

	try {
		const { data, status } = await axios(authOptions)
		return {
			statusCode: status,
			body: data,
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: error,
		}
	}
}

module.exports = refreshToken
