module.exports = [
	{
		pattern: '/login',
		handler: 'spotify/login',
	},
	{
		redirect: true,
		pattern: '/callback',
		handler: 'spotify/callback',
	},
	{
		pattern: '/refresh-token',
		handler: 'spotify/refresh-token',
		method: 'POST',
	},
	{
		pattern: '/user/auth',
		handler: 'firebase/user-auth',
	},
	{
		pattern: '/user/add',
		handler: 'firebase/user-add',
		method: 'POST',
	},
	{
		pattern: 'stats/track/add',
		handler: 'firebase/track-add',
		method: 'POST',
	}
  
].map(({ handler, ...rest }) => ({
	handler: require(`./${handler}`),
	...rest,
}))
