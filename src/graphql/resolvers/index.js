import postsResolvers from "./post";
import usersResolvers from "./user";
import commentsResolvers from "./comment";

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
