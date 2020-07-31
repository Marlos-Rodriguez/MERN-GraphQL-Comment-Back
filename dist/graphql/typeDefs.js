"use strict";

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Post {\n    id: ID!\n    body: String!\n    createAt: String!\n    username: String!\n    comments: [Comment]!\n    likes: [Like]!\n  }\n  type Comment {\n    id: ID!\n    createAt: String!\n    username: String!\n    body: String!\n  }\n  type Like {\n    id: ID!\n    createAt: String!\n    username: String!\n  }\n  type User {\n    id: ID!\n    email: String!\n    token: String!\n    username: String!\n    createAt: String!\n  }\n  input RegisterInput {\n    username: String!\n    password: String!\n    confirmPassword: String!\n    email: String!\n  }\n  type Query {\n    getPosts: [Post]\n    getPost(postId: ID!): Post\n  }\n  type Mutation {\n    register(registerInput: RegisterInput): User!\n    login(username: String!, password: String!): User!\n    createPost(body: String!): Post!\n    deletePost(postId: ID!): String!\n    createComment(postId: String!, body: String!): Post!\n    deleteComment(postId: ID!, commentId: ID!): Post!\n    likePost(postId: ID!): Post!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _apolloServer.gql)(_templateObject());