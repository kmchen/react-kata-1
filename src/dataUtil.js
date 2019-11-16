const Papa = require('papaparse');

let database = {authors:{}, books:{}, magazines:{}};

Papa.parse('http://localhost:3000/authors.csv', {download: true, delimiter: ';', complete: (results, file) => { parseAuthors(results.data);}});

Papa.parse('http://localhost:3000/books.csv', {download: true, delimiter: ';', complete: (results, file) => { parseBooks(results.data);}});

Papa.parse('http://localhost:3000/magazines.csv', {download: true, delimiter: ';', complete: (results, file) => { parseMagazines(results.data);}});

const parseAuthors = (authors) => {
  authors.forEach((author, idx) => {
    if(idx > 0) {
      const [ email, firstName, lastName ] = author;
      if(email !== '') {
        database.authors[author[0]] = {firstName, lastName, isbn: {books: [], magazines:[]} }
      }
    }
  })
}

const parseBooks = (books) => {
  books.forEach((book, idx) => {
    if(idx > 0) {
      const [ title, isbn, authors, description ] = book;
      if(title !== '') {
        database.books[isbn] = {title, description }
        authors.split(',').forEach(author => {
          database.authors[author].isbn.books.push(isbn) 
        })
      }
    }
  })
}

const parseMagazines = (magazines) => {
  magazines.forEach((magazine, idx) => {
    if(idx > 0) {
      const [ title, isbn, authors, publishedAt ] = magazine;
      if(title !== '') {
        database.magazines[isbn] = {title, publishedAt }
        authors.split(',').forEach(author => {
          database.authors[author].isbn.magazines.push(isbn) 
        })
      }
    }
  })
}

export default database;
