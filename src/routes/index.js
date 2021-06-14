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
		pattern: '/refresh_token',
		handler: 'spotify/refresh-token',
	},
	{
		pattern: '/user/auth',
		handler: 'firebase/user-auth',
	},
	{
		pattern: '/user/add',
		handler: 'firebase/user-add',
	},
	{
		pattern: 'stats/track/add',
		handler: 'firebase/track-add'
	}
  
].map(({ handler, ...rest }) => ({
	handler: require(`./${handler}`),
	...rest,
}))
