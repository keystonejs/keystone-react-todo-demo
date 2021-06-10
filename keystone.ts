import { config } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';
import { lists } from './schema';
import { createAuth } from '@keystone-next/auth';

const auth = createAuth({
  identityField: 'email',
  secretField: 'password',
  listKey: 'User',
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
    ui: { isAccessAllowed: () => true },
    lists,
    session: statelessSessions({
      secret: 'sadjnfsdhajfjiasdkjnasfnhqwiudwdnhiqwiufnwerihvbwhi',
    }),
  })
);
