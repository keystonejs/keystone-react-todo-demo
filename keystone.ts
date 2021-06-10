import { config } from '@keystone-next/keystone/schema';
import { lists } from './schema';

export default config({
  db: { url: 'file:./app.db', provider: 'sqlite' },
  lists,
});
