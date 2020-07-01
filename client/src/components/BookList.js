import React, { useState } from 'react';
import { useQuery, graphql, Query } from 'react-apollo';

// GET BOOKS
import { GET_BOOKS } from '../queries/queries'

function BookList() {
    
    return (
        <Query query={GET_BOOKS}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                // console.log(data)

                return (
                    <div className="book-list">
                        {data.books.map(book => (
                            <div key={book.id} className="book">
                                <p>Title: {book.name}, {book.gender} by <b>{book.author.name}</b></p>
                            </div>
                        ))}
                    </div>
                );
            }}
        </Query>
    )
}

export default graphql(GET_BOOKS)(BookList);
