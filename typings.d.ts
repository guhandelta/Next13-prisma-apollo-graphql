import { Author, Novel } from "@prisma/client";
/* While using Prisma the schemas can be used as type definitions*/

/* Extending all the attributes of Novel to INovels with an additional field of authors, which is an array of 
 authors */
interface INovel extends Novel{
    authors: Author[]
}