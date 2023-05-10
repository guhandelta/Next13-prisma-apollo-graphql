export type Context = {
    prisma: PrismaClient
};

// Resolvers are fn() for performing CRUD operations
export const resolvers = {
    Query: {
       // args => anything that is passed in, eg: novelId to get a specific novel
       novels: async (parent: any, args: any, context: Context) =>{
           return await context.prisma.novel.findMany();
       },
       novel: async (parent: any, args: any, context: Context) =>{
           return await context.prisma.novel.findUnique({
               where: {
                   id: args.id
               }
           });
       },
       
   },
   // chaining resolvers to reference data from another model
   Novel: {
           authors: async (parent: any, args: any, context: Context) =>{
           return await context.prisma.author.findMany({
               where:{
                   novelId: parent.id,
               },
           });
       }
   },
   Mutation:{
       addNovel: async (parent: any, args: any, context: Context) =>{
                   return await context.prisma.novel.create({
                       data: {
                           title: args.title,
                           image: args.image,
                       }
                   });
               },
       updateNovel: async (parent: any, args: any, context: Context) =>{
                   return await context.prisma.novel.update({
                       where:{
                           id: args.id
                       },
                       data: {
                           title: args.title,
                           image: args.image,
                       }
                   });
               },
       deleteNovel: async (parent: any, args: any, context: Context) =>{
                   return await context.prisma.novel.delete({
                       where:{
                           id: args.id
                       }
                   });
               },
       addAuthor: async (parent: any, args: any, context: Context) =>{
           return await context.prisma.author.create({
               data: {
                   novelId: args.novelId,
                   name: args.name,
               }
           });
       },
       updateAuthor: async (parent: any, args: any, context: Context) =>{
               return await context.prisma.author.update({
               where:{
                   id: args.id,
               },
               data: {
                   name: args.name,
               }
           });
       },
       deleteAuthor: async (parent: any, args: any, context: Context) =>{
           return await context.prisma.author.delete({
               where: {
                   id: args.id,
               }
           });
       },
   }
};