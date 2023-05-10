"use client"

import { ReactNode } from 'react'
import { 
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client"


type Props = {}

const Providers = ({ children }: { children: ReactNode }) => {

    const client = new ApolloClient({
        uri: "http://localhost:3001/api/graphql",
        cache: new InMemoryCache()
    });

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default Providers