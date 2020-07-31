import { AuthenticationError, UserInputError } from "apollo-server";

import Post from "../../models/Post";
import checkAuth from "../../utils/check-auth";

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post no found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post Body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.username === username)) {
            //Post already like, unlike it
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            //Not liked, like post
            post.likes.push({
              username,
              createAt: new Date().toISOString(),
            });
          }

          await post.save();
          return post;
        } else throw new UserInputError("Post not found");
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
  },
};
