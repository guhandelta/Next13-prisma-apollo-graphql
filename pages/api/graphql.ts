import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";

import { prisma } from "../../prisma/db";
import { resolvers, typeDefs } from "../../graphql";

export type Context = {
    prisma: PrismaClient
};

// typedefs are a way to document the schema, queries and mutations
// apollo server 4 uses #graphql instead of gql


// Resolvers are fn() for performing CRUD operations


// Context here is shared across all the resolvers, which is Prisma
const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(apolloServer,{ 
        context: async(req: any, res: any) => ({ req, res, prisma })
    }
);