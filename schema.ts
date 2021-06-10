import { checkbox, password, relationship, text } from '@keystone-next/fields';
import { createSchema, list } from '@keystone-next/keystone/schema';

export const lists = createSchema({
  Todo: list({
    fields: {
      label: text(),
      isComplete: checkbox(),
      assignedTo: relationship({ ref: 'User.todos' }),
    },
  }),
  User: list({
    fields: {
      name: text(),
      email: text({ isUnique: true, isRequired: true }),
      password: password(),
      todos: relationship({ ref: 'Todo.assignedTo', many: true }),
    },
  }),
});
