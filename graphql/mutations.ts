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
