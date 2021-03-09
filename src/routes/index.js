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
].map(({ handler, ...rest }) => ({
  // eslint-disable-next-line import/no-dynamic-require, global-require
  handler: require(`./${handler}`),
  ...rest,
}));
