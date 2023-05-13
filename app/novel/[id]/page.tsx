"use client";

import { useQuery } from "@apollo/client"

import { GET_NOVEL } from "@/graphql/queries"
import { useState } from "react";
import { INovels } from "@/typings";

import { AiFillMinusCircle } from "react-icons/ai";

type Props = {
    params:{
        id: string
    }
}

const Novel = ({params: { id }}: Props) => {

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const { data, loading, error } = useQuery(GET_NOVEL, {
        variables: { id }
    })

    const novel: INovels = data?.novel;
    if(loading){
        return(
            <p className="text-white flex items-center justify-center">
                Loading...
            </p>
        )
    }
    if(error){
        return(
            <p className="text-white flex items-center justify-center">
                Oops! Something went wrong...
            </p>
        )
    }
    
  return (
    <article className="max-w-5xl mx-auto text-white">
        <section className="flex gap-2">
            {novel.image && (
                <img height={200} width={200} src={novel.image} alt="" />
            )}

            <div className="p-2 flex flex-col">
                <h1 className="text-4xl">Title: {novel.title}</h1>
                <div className="flex gap-2">
                    {novel?.authors?.map(author =>(
                        <div
                            key={author.id} 
                            className="flex items-center gap-2">
                            <h2 className="font-bold">author?.name</h2>
                            <AiFillMinusCircle 
                                // onClick={()=>
                                //     deleteAuthor({
                                //         variables:{
                                //             id: author.id
                                //         }
                                //     })
                                // }
                                color="yellow"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quidem sequi deleniti 
                    commodi, id dolorem illum, ipsum odio odit labore placeat nisi! Suscipit officiis illo 
                    molestias tempore quaerat praesentium ipsa. Lorem ipsum dolor, sit amet consectetur 
                    adipisicing elit. Quas sapiente sit aliquid. Neque, quam adipisci. Accusantium beatae 
                    voluptas, facilis nisi placeat porro ipsum corrupti incidunt consequuntur voluptatum est 
                    cupiditate debitis!
                </p>
                 
            </div>
        </section>
    </article>
  )
}

export default Novel