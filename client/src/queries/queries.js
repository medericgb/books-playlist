import { gql } from 'apollo-boost';


//// QUERY
// GET BOOKS
const GET_BOOKS = gql`
    {
        books {
            id
            name
            gender
            author {
                name
            }
        }
    }
`

// GET AUTHORS
const GET_AUTHORS = gql`
    {
        authors {
            id
            name
            age
        }
    }
`

//// MUTATION
// ADD BOOK
const ADD_BOOK = gql`
    mutation {
        addBook(name: "", gender: "", authorId: "" ) {
            name
            id
        }
    }
`

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK };

