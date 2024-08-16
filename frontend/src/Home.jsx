import React, { useEffect, useState } from 'react';
import './styles.css';

const Home = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Use the absolute URL to test directly against the backend
        const response = await fetch('http://localhost:5000/api/v1/book'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched books:', data);
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
  
    fetchBooks();
  }, []);
  

  // Log the books state to ensure it is being updated
  useEffect(() => {
    console.log('Books state updated:', books);
  }, [books]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/book/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setBooks(books.filter(book => book._id !== id));
                alert('Book deleted successfully!');
            } else {
                const errorData = await response.json();
                alert(`Failed to delete book: ${errorData.message}`);
            }
        } catch (err) {
            console.error('Error deleting book:', err);
        }
    }
};


  return (
    <div className="BookList">
      <div className="col-md-12">
        <br />
        <h2 className="display-4 text-center">Books List</h2>
      </div>
      <div className="col-md-11">
        <a className="btn btn-info float-right" href="/add">+ Add New Book</a>
        <br /><br />
        <hr />
      </div>
      <div className="list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="card-container">
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
                alt="Books"
                height="200"
              />
              <div className="desc">
                <h2><a href={`/show-book/${book._id}`}>{book.bookTitle}</a></h2>
                <h3>{book.bookAuthor}</h3>
                <p>{book.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books available. Please add some books.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
