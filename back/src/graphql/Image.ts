import { objectType } from "nexus";

export const Image = objectType({
  name: "Image",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("createdAt");
    t.nonNull.string("url");
  },
});
