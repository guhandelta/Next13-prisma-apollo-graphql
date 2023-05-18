import { gql } from "@apollo/client"

export const ADD_NOVEL= gql`
    mutation Mutation($title: String, $image: String){
        addNovel(title: $title, image: $image) {
            createdAt
            id
            image
            title
            updatedAt
            authors {
                id
                name
                novelID
            }
        }
    }
`
export const DELETE_NOVEL= gql`
    mutation Mutation($id: ID!) {
        deleteNovel(id: $id) {
            authors {
                id
                name
                novelID
            }
            createdAt
            id
            image
            title
            updatedAt
        }
    }
  
`
export const UPDATE_NOVEL= gql`
    mutation Mutation($id: ID!, $title: String, $image: String){
        updateNovel(id: $id, title: $title, image: $image) {
        authors {
            id
            name
            novelID
        }
        createdAt
        id
        image
        title
        updatedAt
        }
    }
  
`
export const ADD_AUTHOR = gql`
    mutation AddAuthor($novelId: ID!, $name: String) {
        addAuthor(novelId: $novelId, name: $name) {
            id
            name
            novelID
        }
    }
  
`
export const DELETE_AUTHOR = gql`
    mutation DeleteAuthor($id: ID!) {
        deleteAuthor(id: $id) {
            id
            name
            novelID
        }
    }
  
`
