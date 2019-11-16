import React from 'react';
import Layout from './Layout/Layout';
import Read from './components/Read';
import Home from './components/Home';
import Isbn from './components/Isbn';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
 
function App({data}) {
  const authors = Object.keys(data.authors);
  const allInfo = [];
  authors.forEach(email => {
    const author = data.authors[email];
    const { firstName, lastName } = author;
    author.isbn.books.forEach(isbn => {
      const { title } = data.books[isbn];
      allInfo.push({ firstName, lastName, isbn, title, type: 'book' });
    })  
    author.isbn.magazines.forEach(isbn => {
      const { title, description } = data.books[isbn];
      allInfo.push({ firstName, lastName, isbn, title, type: 'magazine' });
    });
  });

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/read">
            <Read />
          </Route>
          <Route path="/find">
            <Read />
          </Route>
          <Route path="/isbn/:id" children={<Isbn />} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
