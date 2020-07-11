import React, { useState } from 'react';
import { graphql, Query, useMutation } from 'react-apollo';
import {flowRight as compose} from 'lodash';

// GET AUTHORS
import { GET_AUTHORS, ADD_BOOK } from '../queries/queries';

function AddBook() {

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [authorId, setAuthorId] = useState('')

    const handleSubmit = e => {
        e.preventDefault() 
        console.log(name, gender, authorId)

    }

    return (
        <Query query={GET_AUTHORS}>
            {({ loading, error, data }) => {
                if (loading) return "Loading..";
                if (error) return `Error! ${error.message}`;

                return (
                    <div>
                        <h1 id="title"><i class="fad fa-plus-circle"></i> Add Book</h1>
                        <form id="add-book" onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Book Name: </label>
                                <input type="text" name="name" onChange={e => setName(e.target.value)} />
                            </div><br />

                            <div className="field">
                                <label>Gender: </label>
                                <input type="text" name="gender" onChange={e => setGender(e.target.value)} />
                            </div><br />

                            <div className="field">
                                <label>Author: </label>
                                <select name="authorId" name="authorId" onChange={e => setAuthorId(e.target.value)}>
                                    <option>Select author</option>
                                    {data.authors.map(author => (
                                        <option key={author.id} value={author.id}>
                                            {author.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button>Ajouter</button>     
                        </form>
                    </div>
                    
                );
            }}
        </Query>
    )
}

export default compose(
    graphql(GET_AUTHORS, {name: "GET_AUTHORS"}),
    graphql(ADD_BOOK, {name: "ADD_BOOKS"})
)(AddBook);
