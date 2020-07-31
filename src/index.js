import "@babel/polyfill";

import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
require("dotenv").config({ path: "variables.env" });

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB Conectada");
  } catch (error) {
    console.log("hubo un error");
    console.log(error);
    process.exit(1); // Detener la app
  }
};

const main = async () => {
  await conectarDB();
  server.listen({ port: process.env.PORT || 5000 }).then((res) => {
    console.log(`Server running at ${res.url}`);
  });
};

main();
