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
