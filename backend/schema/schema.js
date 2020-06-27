const graphql = require('graphql');
const _ = require('lodash')

const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLID
} = graphql;

// Dummy datas
const books = [
    {name: "Name of wind", gender: "Fantasy", id: "1", authorId: "1"},
    {name: "The Final Empire", gender: "Fantasy", id: "2", authorId: "2"},
    {name: "Le Long Earth", gender: "Sci-Fi", id: "3", authorId: "1"},
    {name: "The Hero of Age", gender: "Romantic", id: "4", authorId: "3"},
    {name: "The Color of Magic", gender: "Sci-Fi", id: "5", authorId: "2"},
    {name: "The Light fantasy", gender: "Fantasy", id: "6", authorId: "3"},
    {name: "Only thing", gender: "Romantic", id: "7+", authorId: "3"},
]

const authors = [
    { name: "Patrick Rothfuss", age: 44, id: "1"},
    { name: "Brandon Sanderson", age: 42, id: "2"},
    { name: "Terry Pratchett", age: 66, id: "3"}
]

// Definition Custom Types
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        // Get author of one book
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        // Get all books of one author
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id})
            }
        }
    })
})

// Main Query and Resolvers
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Get one Book in Books List
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parents, args) {
                // Code to get data from db or others sources
                return _.find(books, {id: args.id});
            }
        },
        // Get an Author in Authors List
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(authors, {id: args.id})
            }
        },
        // Get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        // Get author
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})