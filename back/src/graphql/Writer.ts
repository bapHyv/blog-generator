import { objectType } from "nexus";

export const Redacteur = objectType({
  name: "Redacteur",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("role");
    t.nonNull.string("pseudo");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("description");
    t.nonNull.string("avatar");
    t.nonNull.string("createdAt");
    t.nonNull.string("BlogLabel");
  },
});
