const querystring = require('querystring')
const axios = require('axios')
const config = require('../../config/index.js')

const { clientId, clientSecret, redirectUri, stateKey, verifierKey } = config

const callback = (req, res) => {
	// your application requests refresh and access tokens
	// after checking the state parameter

	const code = req.query.code || null
	const state = req.query.state || null
	const storedState = req.cookies ? req.cookies[stateKey] : null
	const storedVerifier = req.cookies ? req.cookies[verifierKey] : null

	console.log(state)
	console.log(req.cookies)
	
	if (state === null || state !== storedState) {
		res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`)
	} else {
		res.clearCookie(stateKey)
		res.clearCookie(verifierKey)

		const authOptions = {
			method: 'post',
			url: 'https://accounts.spotify.com/api/token',
			params: {
				client_id: clientId,
				code,
				grant_type: 'authorization_code',
				redirect_uri: redirectUri,
				code_verifier: storedVerifier,
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${clientId}:${clientSecret}`
				).toString('base64')}`,
			},
			json: true
		}

		axios(authOptions).then((response) => {
			const { data } = response

			res.redirect(`${process.env.FRONTEND_URL}/dashboard?${querystring.stringify(data)}`)

		}).catch(console.log)
	}
}

module.exports = callback
