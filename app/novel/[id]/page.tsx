"use client";

import { useMutation, useQuery } from "@apollo/client"

import { GET_NOVEL } from "@/graphql/queries"
import { FormEvent, useState } from "react";
import { INovel } from "@/typings";

import { AiFillMinusCircle } from "react-icons/ai";
import { ADD_AUTHOR, DELETE_AUTHOR, UPDATE_NOVEL } from "@/graphql/mutations";
import Link from "next/link";

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

    const [updateNovel] = useMutation(UPDATE_NOVEL, {
        variables: { id: id, title: title, image: url },
        refetchQueries: [{ query: GET_NOVEL, variables: { id } }] 
    });

    const [addAuthor] = useMutation(ADD_AUTHOR, {
        variables: { novelId: id, name },
        refetchQueries: [{ query: GET_NOVEL, variables: { id } }]
    });

    const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
        /* The variables is not provided here, as the id is not accessible here, due ot the fact that it
        comes in an array of authors, and individual authors cannot be accessed here*/
        refetchQueries: [{ query: GET_NOVEL, variables: { id } }]
    });

    const novel: INovel = data?.novel;
    if(loading){
        return(
            <p className="text-white flex items-center justify-center">
                Loading...
            </p>
        )
    }
    if(error){
        console.log(`Error:\t${error}`);
        
        return(
            <p className="text-white flex items-center justify-center">
                Oops! Something went wrong...
                <br /><br /><br />
                <h5></h5>
            </p>
        )
    }

    const handleUpdateNovel = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(title === "") return alert("Please enter the Novel's title");
        if(url ==="") return alert("Please enter the Novel's Image URL");
        updateNovel({ variables: { id, title, image: url  } });
        setTitle("");
        setUrl("");
    }

    const handleAddAuthor = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name === "") return alert("Please enter the Author's Name");
        addAuthor({ variables: { novelId: id, name  } });
        
        setName("");
    }
    
  return (
    <article className="max-w-5xl mx-auto text-white mt-40 ">
        
        <Link href="/">
            <button 
                className=" ml-[50%] items-center border p-2 rounded-lg disables bg-green-600 text-white mb-12 -mt-16"
            >
                Home
            </button>
        </Link>

        <section className="flex gap-2">
            {novel.image && (
                <img height={200} width={200} src={novel.image} alt="" />
            )}

            <div className="p-2 flex flex-col">
                <h1 className="text-4xl">Title: {novel.title}</h1>
                <div className="flex gap-2">
                    {/* The list of authors are iterated here as the individual id of an author is not accessible 
                    to the query, due to the fact that it comes in an array of authors. Since the array of authors
                    cannot be iterated and accessed at the Query level, it it done here to fetch the id of each
                    specific authors*/}
                    {novel?.authors?.map(author =>(
                        <div
                            key={author.id} 
                            className="flex items-center gap-2">
                            <h2 className="font-bold">{author?.name}</h2>
                            <AiFillMinusCircle 
                                onClick={()=>
                                    deleteAuthor({
                                        variables:{
                                            id: author.id
                                        }
                                    })
                                }
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
                {/* add author form */}
                <form 
                    onSubmit={handleAddAuthor} 
                    className="mt-5 space-x-2"
                >
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text" 
                        placeholder="Enter Author"
                        className="bg-transparent border p-2 mx-2 my-4" 
                    />
                    <button 
                        disabled={!name}
                        className="border p-2 rounded-lg disables bg-green-600 text-white"
                    >
                        Add Author
                    </button>
                </form>
            </div>
        </section>
        {/* update form */}
        <form 
            onSubmit={handleUpdateNovel} 
            className="flex gap-2 mt-16"
        >
            <input 
                value={title}
                type="text" 
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter new Title"
                className="bg-transparent border text-white p-2 rounded-lg mr-7" 
            />
            <input 
                value={url}
                type="text" 
                onChange={e => setUrl(e.target.value)}
                placeholder="Enter new URL"
                className="bg-transparent border text-white p-2 rounded-lg mr-7" 
            />
            <button className="p-2 rounded-lg bg-yellow-500">Update</button>
        </form>
    </article>
  )
}

export default Novel