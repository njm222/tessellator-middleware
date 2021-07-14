const fbAdmin = require('firebase-admin')

const serviceAccount = {
	type: process.env.Type,
	project_id: process.env.Project_id,
	private_key_id: process.env.Private_key_id,
	private_key: process.env.Private_key.replace(/\\n/g, '\n'),
	client_email: process.env.Client_email,
	client_id: process.env.Client_id,
	auth_uri: process.env.Auth_uri,
	token_uri: process.env.Token_uri,
	auth_provider_x509_cert_url: process.env.Auth_provider_x509_cert_url,
	client_x509_cert_url: process.env.Client_x509_cert_url
}
  
fbAdmin.initializeApp({
	credential: fbAdmin.credential.cert(serviceAccount),
	databaseURL: 'https://tessellator-space.firebaseio.com'
})

module.exports = fbAdmin
