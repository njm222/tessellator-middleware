const querystring = require('querystring')
const pkceChallenge = require('pkce-challenge')
const generateRandomString = require('../../helpers/generateRandomString.js')
const config = require('../../config/index.js')

const { clientId, redirectUri, stateKey, challengeKey, verifierKey } = config

const login = (req, res) => {
	const { code_challenge: challenge, code_verifier: verifier } = pkceChallenge()
	const state = generateRandomString(16)
	res.cookie(challengeKey, challenge)
	res.cookie(verifierKey, verifier)
	res.cookie(stateKey, state)
	
	// your application requests authorization
	const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-modify-playback-state user-read-playback-state user-read-currently-playing app-remote-control streaming user-library-modify user-library-read'
	const uri = `https://accounts.spotify.com/authorize?${querystring.stringify({
		response_type: 'code',
		client_id: clientId,
		redirect_uri: redirectUri,
		code_challenge_method: 'S256',
		code_challenge: challenge,
		state,
		scope,
	})}`

	return {
		statusCode: 200,
		headers: {},
		body: {
			uri
		}
	}
}

module.exports = login
