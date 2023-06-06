import { objectType } from "nexus";

export const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("label");
  },
});
