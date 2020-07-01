import React from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// Appolo Client Setting
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1 id="title">Ninja's Reading <i class="fad fa-book-open"></i> Books Playlist</h1>
        <div>
          <p>Je suis du texte, rien que du texte</p>
          <BookList />
          <AddBook />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
