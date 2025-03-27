from BackEnd.DAO.ManageDAO import LibraryManager

def test_library():
    manager = LibraryManager()

    # Create a user
    user_data = {
        "name": "Alice",
        "email": "alice@example.com",
        "person_id": 1,
        "password": "securepassword",
        "role": "user"
    }
    manager.createUser(user_data)

    # Create a book
    book_data = {
        "title": "Sample Book",
        "author": "Author X",
        "book_id": 101,
        "genre": ["Fiction"],
        "pages": 200
    }
    manager.createBook(book_data)

    # Retrieve and print all persons and books
    print("User Retrieved:", manager.getUser("1"))
    print("Book Retrieved:", manager.findBook("101"))

    # Update book information
    updated_book_data = {
        "title": "Updated Book Title",
        "author": "Author X",
        "book_id": 101,
        "genre": ["Fiction", "Adventure"],
        "pages": 250
    }
    manager.updateBook(updated_book_data)
    print("Updated Book:", manager.findBook("101"))

    # Remove a book
    manager.removeBook("101")
    print("Book after removal:", manager.findBook("101"))

    # Get user role
    print("User Role:", manager.getrole("1"))

    # Test updating and retrieving a bookmark
    bookmark_data = {"person_id": 1, "book_id": 101, "last_read_page": 50}
    manager.updateMark(bookmark_data)
    print("Bookmark Retrieved:", manager.getMark({"person_id": 1, "book_id": 101}))

    # Test recommendations (Placeholder)
    print("Recommended Books:", manager.recommend("1"))

    # Test logs retrieval
    print("User Logs:", manager.getlogs("1"))

    manager.close()

if __name__ == "__main__":
    test_library()