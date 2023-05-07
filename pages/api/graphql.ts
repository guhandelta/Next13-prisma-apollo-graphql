import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';

import { prisma } from '../../prisma/db'

export type Context = {
    prisma: PrismaClient
};

// typedefs are a way to document the schema, queries and mutations
// apollo server 4 uses #graphql instead of gql
const typeDefs = `#graphql

    type Novel {
        id: ID!
        title: String
        image: String
        createdAt: String
        updatedAt: String
        authors: [Author]
    }
    
    type Author {
        id: ID!
        name: String
        novelID: String
    }

    type Query {
        novels: [Novel]
    }
`;

// Resolvers are fn() for performing CRUD operations
const resolvers = {
     Query: {
        // args => anything that is passed in, eg: novelId to get a specific novel
        novels: async (parent: any, args: any, context: Context) =>{
            return await context.prisma.novel.findMany();
        },
    },
    // chaining resolvers to rference data from another model
    Novel: {
            authors: async (parent: any, args: any, context: Context) =>{
            return await context.prisma.author.findMany({
                where:{
                    novelId: parent.id,
                },
            });
        }
    },
};

// Context here is shared across all the resolvers, which is Prisma
const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(apolloServer,{ 
        context: async(req: any, res: any) => ({ req, res, prisma })
    }
);