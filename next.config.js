module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://keystone-react-todo-demo-production.up.railway.app'
            : 'http://localhost:3000/api/graphql',
      },
    ];
  },
};
