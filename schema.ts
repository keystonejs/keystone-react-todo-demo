import { checkbox, password, relationship, text } from '@keystone-next/fields';
import { createSchema, list } from '@keystone-next/keystone/schema';

const access = {
  isAdmin: ({ session }: { session: any }) => !!session?.data?.isAdmin,
  isSelfOrAdminListLevel: ({ session, itemId }: any) => {
    if (access.isAdmin({ session })) return true;
    if (!session?.data) {
      return false;
    }
    return { id: session.itemId };
  },
  isSelfOrAdminFieldLevel: ({ session, item }: any) =>
    access.isAdmin({ session }) ||
    (session?.data && session.itemId === item.id.toString()),
};

export const lists = createSchema({
  Todo: list({
    fields: {
      label: text(),
      isComplete: checkbox(),
      assignedTo: relationship({ ref: 'User.todos' }),
    },
  }),
  User: list({
    access: {
      update: access.isSelfOrAdminListLevel,
      delete: access.isSelfOrAdminListLevel,
    },
    fields: {
      name: text(),
      email: text({
        isUnique: true,
        isRequired: true,
        access: {
          read: access.isSelfOrAdminFieldLevel,
        },
      }),
      password: password(),
      isAdmin: checkbox({ access: access.isAdmin }),
      todos: relationship({ ref: 'Todo.assignedTo', many: true }),
    },
  }),
});
