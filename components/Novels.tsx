"use client"

import { FormEvent, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'

import { GET_NOVELS } from '@/graphql/queries';
import { ADD_NOVEL } from '@/graphql/mutations';
import { INovels } from '@/typings';
import { Novel } from './Novel';

type Props = {}

const Novels = (props: Props) => {

    const { data, loading, error } = useQuery(GET_NOVELS);
    const [ title, setTitle ] = useState("");
    const [ image, setImage ] = useState("");
    const [ addNovel ] = useMutation(ADD_NOVEL, { variables: { image, title } });

    const novels: INovels[] = data?.novels;

    if(loading) return <h1 className="flex flex-col items-center justify-center text-5xl font-bold mt-4 text-white">Loading...</h1>
    if(error) return <h3 className="flex flex-col items-center justify-center text-5xl font-bold mt-4 text-white">Oops!.... something went wrong <br /></h3>

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault();

      addNovel({ variables: { image, title } });

      if(image === "" || title === "") return alert("Enter data in the fields");
      setTitle("");
      setImage("");

    }
    

  return (
    <div className="flext flex-col items-center justify-center mt-[3%] ml-[3%]">
        <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter title"
            className="bg-transparent border text-white p-2 rounded-lg"
          /> <br/>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            placeholder="Enter Image url"
            className="bg-transparent border text-white p-2 rounded-lg"
          /> <br />
          <button className="bg-yellow-500 p-2 rounded-lg ">
            Add Novel
          </button>
        </form>
        <div className="grid grid-cols-4 gap-2">
          {novels.map((novel) => (
            <Novel key={novel.id} novel={novel} />
          ))}
        </div>
    </div>
  )
}

export default Novels