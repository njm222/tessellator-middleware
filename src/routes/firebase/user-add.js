const fbAdmin = require('./firebaseClient')
const FieldValue = fbAdmin.firestore.FieldValue

/** Move to a separate firestore-utils */
function incrementTotalUsers () {
	const allUsersDataRef = fbAdmin.firestore().collection('aggregateUserData').doc('userCount')
	allUsersDataRef.set({
		count: FieldValue.increment(1)
	}, { merge: true })
}
  
function incrementTotalUsersCountries (countryToIncrement) {
	const allUsersDataRef = fbAdmin.firestore().collection('aggregateUserData').doc('userCountryCount')
	const object = {}
	object[countryToIncrement] = FieldValue.increment(1)
	allUsersDataRef.set(object, { merge: true })
}

const userAdd = (req) => {
	const userData = req.body.userData
	const userRef = fbAdmin.firestore().collection('users').doc(userData.id)

	userRef.get().then((snapshot) => {
		if (!snapshot.exists) {
			incrementTotalUsers()
			incrementTotalUsersCountries(userData.country)
		}
		userRef.set({
			userData: userData
		}, { merge: true }).then(() => {
			return {
				statusCode: 200,
				body: { message: `user ${userData.id} has been updated`}
			}
		}).catch((error) => {
			console.log(error)
			return {
				statusCode: 500,
				body: error
			}
		})
	})
}

module.exports = userAdd