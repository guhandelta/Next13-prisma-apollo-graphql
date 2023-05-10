import { Author, Novel } from "@prisma/client";

/* Extending all the attributes of Novel to INovels with an additional field of authors, which is an array of 
 authors */
interface INovels extends Novel{
    authors: Author[]
}