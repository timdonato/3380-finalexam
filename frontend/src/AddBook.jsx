import React, { useState } from 'react';
import './styles.css'; // Assuming you want to keep the existing styles

const AddBook = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      bookTitle,
      bookAuthor,
      description,
    };

    try {
      const response = await fetch('/api/v1/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert('Book added successfully!');
        setBookTitle('');
        setBookAuthor('');
        setDescription('');
      } else {
        alert('Failed to add book');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <a className="btn btn-info float-left" href="/">Show Book List</a>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Book</h1>
            <p className="lead text-center">Create new book</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" value="Add Book" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
