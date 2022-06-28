import React, { useState ,Fragment} from 'react';
import {nanoid} from 'nanoid';
import './App.css';
import data from './books.json';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditRow from './components/EditRow';
import {CSVLink} from 'react-csv';

function App() {
  const [books,setBooks] = useState(data);
  const[bookData,setBookData] = useState({
    "name" : "",
    "genre" : "",
    "author" : "",
    "publisher" : "",
    "pages" : ""
  });

  const headers = [
    {label : "Book Name" , key: 'name'},
    {label : "Genre" , key: 'genre'},
    {label : "Author" , key: 'author'},
    {label : "Publisher" , key: 'publisher'},
    {label : "Pages" , key: 'pages'},
  ];

  const csvReport = {
    filename :'Books.csv',
    headers: headers,
    data: books
  }
  
  const[editFormData,setEditFormData] = useState({
    "name" : "",
    "genre" : "",
    "author" : "",
    "publisher" : "",
    "pages" : ""
  })

  const[editBookId,setEditBookId] = useState(null);


  const handleEditChange = (e) => {
    e.preventDefault();

    const inputName = e.target.getAttribute('name');
    
    const newFormData = { ...editFormData};
    newFormData[inputName] = e.target.value;

    setEditFormData(newFormData);

  };

  const handleChange = (e) => {
    e.preventDefault();

    const inputName = e.target.getAttribute('name');
    
    const newBookData = { ...bookData};
    newBookData[inputName] = e.target.value;

    setBookData(newBookData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id : nanoid(),
      name : bookData.name,
      genre : bookData.genre,
      author : bookData.author,
      publisher : bookData.publisher,
      pages : bookData.pages
    };

    const newBooks = [...books,newBook];
    setBooks(newBooks);
  }

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedBook = {
      id : editBookId,
      name : editFormData.name,
      genre : editFormData.genre,
      author : editFormData.author,
      publisher : editFormData.publisher,
      pages : editFormData.pages
    }

    const newBooks = [...books];

    const index = books.findIndex((book) => book.id === editBookId);

    newBooks[index] = editedBook 
    setBooks(newBooks);
    setEditBookId(null);
  }

  const handleEdit = (e,book) => {
    e.preventDefault();
    setEditBookId(book.id);

    const formValues ={
      name : book.name,
      genre : book.genre,
      author : book.author,
      publisher : book.publisher,
      pages : book.pages
    }

    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
    setEditBookId(null);
  }

  const handleDelete = (bookId) => {
    const newBooks = [...books];

    const index = books.findIndex((book) => book.id === bookId);

    newBooks.splice(index, 1);

    setBooks(newBooks);

  }

  return (
    <div className="app">
      <form onSubmit={handleEditFormSubmit} >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Pages</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {books.map((book) => {
            return(
              <Fragment>
                {editBookId === book.id ? 
                <EditRow editFormData={editFormData} handleEditChange={handleEditChange} handleCancelClick={handleCancelClick}/> : 
                <ReadOnlyRow book={book} handleEdit={handleEdit} handleDelete={handleDelete}/>}
              </Fragment> 
            )
          })} 
          </tbody>
        </table>
      </form>
      
      <div className='form'>
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name='name' required="required" placeholder='Book' onChange={handleChange}/>
          <input type="text" name='genre' required="required" placeholder='Genre' onChange={handleChange}/>
          <input type="text" name='author' required="required" placeholder='Author' onChange={handleChange}/>
          <input type="text" name='publisher' required="required" placeholder='Publisher' onChange={handleChange}/>
          <input type="text" name='pages' required="required" placeholder='Number of Pages' onChange={handleChange}/>
          <button type='submit'>ADD</button>
        </form>
      </div>
      <button className='export'>
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
      </button>
      
      
    </div>
  );
}

export default App;
