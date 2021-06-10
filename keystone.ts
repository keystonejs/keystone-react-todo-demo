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
    db: { url: 'file:./app.db', provider: 'sqlite' },
    ui: { isAccessAllowed: () => true },
    lists,
    session: statelessSessions({
      secret: 'sadjnfsdhajfjiasdkjnasfnhqwiudwdnhiqwiufnwerihvbwhi',
    }),
  })
);
