const graphql = require('graphql');
const _ = require('lodash')

// Models
const Book = require('../models/book.model');
const Author = require('../models/author.model');

const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull
} = graphql;

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
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId)
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
                // return _.filter(books, { authorId: parent.id})
                return Book.find({ authorId: parent.id })
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
            resolve(parent, args) {
                // Code to get data from db or others sources
                // return _.find(books, {id: args.id});
                return Book.findById(args.id)
            }
        },
        // Get an Author in Authors List
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        // Get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
                return Book.find({})
            }
        },
        // Get author
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
                return Author.find({})
            }
        }
    }
})

// Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // ADD AUTHOR
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        // ADD BOOK
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                gender: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    gender: args.gender,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

// 
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
