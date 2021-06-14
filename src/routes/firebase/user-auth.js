const fbAdmin = require('./firebaseClient')

const userAuth = (req) => {
	const userID = req.body.id
	fbAdmin.auth().createCustomToken(userID)
		.then(function (customToken) {
			// Send token back to client
			return {
				statusCode: 200,
				body: customToken
			}
		})
		.catch(function (error) {
			console.log('Error creating custom token:', error)
			return {
				statusCode: 500,
				body: error
			}
		})
}

module.exports = userAuth