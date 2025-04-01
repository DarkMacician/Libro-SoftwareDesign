from BackEnd.DAO.ManageDAO import DAOManager

class ManagementLayer:
    def __init__(self):
        self.dao_manager = DAOManager()

    def validate_person(self, person):
        return self.dao_manager.validate_person(person)

    def add_person(self, data):
        self.dao_manager.add_person(data)

    def authenticate_user(self, data):
        return self.dao_manager.authenticate_user(data)

    def get_book_url(self, book_id):
        return self.dao_manager.get_book(book_id)['url']

    def add_book(self, data):
        self.dao_manager.add_book(data)

    def delete_book(self, book_id):
        self.dao_manager.delete_book(book_id)

    def view_detail(self, book_id):
        return self.dao_manager.get_book(book_id)

    def search_book(self, query):
        return self.dao_manager.search_book(query)

    def create_bookmark(self, data):
        self.dao_manager.create_bookmark(data)