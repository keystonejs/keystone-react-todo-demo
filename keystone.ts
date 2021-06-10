import { config } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';
import { lists } from './schema';
import { createAuth } from '@keystone-next/auth';

const auth = createAuth({
  identityField: 'email',
  secretField: 'password',
  listKey: 'User',
  sessionData: 'id name isAdmin',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: { isAdmin: true },
  },
});

export default auth.withAuth(
  config({
    db: {
      url:
        process.env.DATABASE_URL ||
        `postgres://${process.env.USER}@localhost/keystone-todo-project`,
      provider: 'postgresql',
      useMigrations: true,
    },
    ui: { isAccessAllowed: ({ session }) => !!session?.data?.isAdmin },
    lists,
    session: statelessSessions({
      secret: 'sadjnfsdhajfjiasdkjnasfnhqwiudwdnhiqwiufnwerihvbwhi',
    }),
  })
);
