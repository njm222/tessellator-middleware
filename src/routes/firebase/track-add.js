const fbAdmin = require('./firebaseClient')
const FieldValue = fbAdmin.firestore.FieldValue

const addTrackPlayed = (userId, trackData) => {
	const trackRef = fbAdmin.firestore().collection('topUserTracks').doc(trackData.id)

	trackRef.set({
		count: FieldValue.increment(1),
		trackData: trackData
	}, { merge: true }).then(() => {
		trackRef.collection('users').doc(userId).set({
			count: FieldValue.increment(1)
		}, { merge: true })
	})
}

const addArtistsPlayed = (userId, artistsData) => {
	artistsData.forEach(artist => {
		const artistRef = fbAdmin.firestore().collection('topUserArtists').doc(artist.id)
		artistRef.set({
			count: FieldValue.increment(1),
			artistData: artist
		}, { merge: true }).then(() => {
			artistRef.collection('users').doc(userId).set({
				count: FieldValue.increment(1)
			}, { merge: true })
		})
	})
}

const trackAdd = (req) => {
	try {
		addTrackPlayed(req.userId, req.body.trackData)
		addArtistsPlayed(req.userId, req.body.artistsData)
		return {
			statusCode: 200,
			body: { message: 'Added track & artists to played'}
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: error
		}
	}
}

module.exports = trackAdd