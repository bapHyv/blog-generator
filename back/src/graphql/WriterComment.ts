import { objectType } from "nexus";

export const WriterComment = objectType({
  name: "WriterComment",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("createdAt");
    t.nonNull.boolean("isValidated");
    t.nonNull.string("content");
    t.int("note");
  },
});
