import os
import json

class Book:
    def __init__(self, book_id, title, author, is_available=True):
        self.book_id = book_id
        self.title = title
        self.author = author
        self.is_available = is_available
        self.borrowed_by = None
        self.borrow_date = None

    def __str__(self):
        status = "可借閱" if self.is_available else "已借出"
        return f"書籍 ID: {self.book_id}, 標題: {self.title}, 作者: {self.author}, 狀態: {status}"

    def to_dict(self):
        return {
            "book_id": self.book_id,
            "title": self.title,
            "author": self.author,
            "is_available": self.is_available
        }

class LibraryManagementSystem:
    def __init__(self):
        self.books = []
        self.members = []
        self.load_books()

    def add_book(self, book):
        self.books.append(book)
        self.save_books()
        print(f"已新增書籍: {book}")

    def register_member(self, name, member_id):
        member = Member(name, member_id)
        self.members.append(member)
        print(f"已註冊會員: {member}")
        return member

    def find_book_by_id(self, book_id):
        for book in self.books:
            if book.book_id == book_id:
                return book
        return None

    def find_member_by_id(self, member_id):
        for member in self.members:
            if member.member_id == member_id:
                return member
        return None

    def borrow_book(self, book_id, member_id):
        book = self.find_book_by_id(book_id)
        member = self.find_member_by_id(member_id)

        if not book:
            print(f"找不到 ID 為 {book_id} 的書籍")
            return False

        if not member:
            print(f"找不到 ID 為 {member_id} 的會員")
            return False

        if not book.is_available:
            print(f"書籍 {book.title} 目前已被借出")
            return False

        book.is_available = False
        book.borrowed_by = member
        book.borrow_date = "2023-12-20"  # 假設當前日期
        member.borrowed_books.append(book)
        
        self.save_books()

        print(f"會員 {member.name} 成功借閱書籍 {book.title}")
        return True

    def return_book(self, book_id):
        book = self.find_book_by_id(book_id)

        if not book:
            print(f"找不到 ID 為 {book_id} 的書籍")
            return False

        if book.is_available:
            print(f"書籍 {book.title} 目前未被借出")
            return False

        member = book.borrowed_by
        book.is_available = True
        book.borrowed_by = None
        book.borrow_date = None
        member.borrowed_books.remove(book)

        self.save_books()

        print(f"書籍 {book.title} 已成功歸還")
        return True

    def list_available_books(self):
        available_books = [book for book in self.books if book.is_available]
        if not available_books:
            print("目前沒有可借閱的書籍")
            return

        print("可借閱書籍:")
        for book in available_books:
            print(book)

    def list_borrowed_books(self, member_id):
        member = self.find_member_by_id(member_id)
        if not member:
            print(f"找不到 ID 為 {member_id} 的會員")
            return

        if not member.borrowed_books:
            print(f"{member.name} 目前沒有借閱任何書籍")
            return

        print(f"{member.name} 已借閱的書籍:")
        for book in member.borrowed_books:
            print(book)

    def list_members(self):
        if not self.members:
            print("目前沒有註冊會員")
            return

        print("會員列表:")
        for member in self.members:
            print(member)

    def save_books(self):
        with open("books.json", "w", encoding="utf-8") as f:
            json.dump([book.to_dict() for book in self.books], f, ensure_ascii=False, indent=4)

    def load_books(self):
        if os.path.exists("books.json"):
            with open("books.json", "r", encoding="utf-8") as f:
                books_data = json.load(f)
                for book_dict in books_data:
                    book = Book(**book_dict)
                    self.books.append(book)

class Member:
    def __init__(self, name, member_id):
        self.name = name
        self.member_id = member_id
        self.borrowed_books = []

    def __str__(self):
        return f"會員 ID: {self.member_id}, 姓名: {self.name}"