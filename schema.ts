import { checkbox, text } from "@keystone-next/fields";
import { createSchema, list } from "@keystone-next/keystone/schema";

export const lists = createSchema({
  Todo: list({
    fields: {
      label: text(),
      isComplete: checkbox(),
    },
  }),
});
