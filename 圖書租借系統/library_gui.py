import tkinter as tk
from tkinter import messagebox
from library_management import LibraryManagementSystem, Book

class LibraryApp:
    def __init__(self, root):
        self.root = root
        self.root.title("圖書租借系統")

        self.library = LibraryManagementSystem()

        # 建立主框架
        self.main_frame = tk.Frame(root)
        self.main_frame.pack()

        self.label = tk.Label(self.main_frame, text="圖書租借系統", font=("Arial", 16))
        self.label.grid(row=0, column=0, columnspan=4, pady=10)

        # 新增書籍介面
        self.add_book_frame = tk.LabelFrame(self.main_frame, text="新增書籍", padx=10, pady=10)
        self.add_book_frame.grid(row=1, column=0, padx=10, pady=10)

        self.book_id_label = tk.Label(self.add_book_frame, text="書籍ID:")
        self.book_id_label.grid(row=0, column=0)
        self.book_id_entry = tk.Entry(self.add_book_frame)
        self.book_id_entry.grid(row=0, column=1)

        self.title_label = tk.Label(self.add_book_frame, text="書名:")
        self.title_label.grid(row=1, column=0)
        self.title_entry = tk.Entry(self.add_book_frame)
        self.title_entry.grid(row=1, column=1)

        self.author_label = tk.Label(self.add_book_frame, text="作者:")
        self.author_label.grid(row=2, column=0)
        self.author_entry = tk.Entry(self.add_book_frame)
        self.author_entry.grid(row=2, column=1)

        self.add_book_button = tk.Button(self.add_book_frame, text="新增書籍", command=self.add_book)
        self.add_book_button.grid(row=3, column=0, columnspan=2, pady=5)

        # 借書介面
        self.borrow_book_frame = tk.LabelFrame(self.main_frame, text="借書", padx=10, pady=10)
        self.borrow_book_frame.grid(row=1, column=1, padx=10, pady=10)

        self.borrow_book_id_label = tk.Label(self.borrow_book_frame, text="書籍ID:")
        self.borrow_book_id_label.grid(row=0, column=0)
        self.borrow_book_id_entry = tk.Entry(self.borrow_book_frame)
        self.borrow_book_id_entry.grid(row=0, column=1)

        self.member_id_label = tk.Label(self.borrow_book_frame, text="會員ID:")
        self.member_id_label.grid(row=1, column=0)
        self.member_id_entry = tk.Entry(self.borrow_book_frame)
        self.member_id_entry.grid(row=1, column=1)

        self.borrow_book_button = tk.Button(self.borrow_book_frame, text="借書", command=self.borrow_book)
        self.borrow_book_button.grid(row=2, column=0, columnspan=2, pady=5)

        # 還書介面
        self.return_book_frame = tk.LabelFrame(self.main_frame, text="還書", padx=10, pady=10)
        self.return_book_frame.grid(row=1, column=2, padx=10, pady=10)

        self.return_book_id_label = tk.Label(self.return_book_frame, text="書籍ID:")
        self.return_book_id_label.grid(row=0, column=0)
        self.return_book_id_entry = tk.Entry(self.return_book_frame)
        self.return_book_id_entry.grid(row=0, column=1)

        self.return_book_button = tk.Button(self.return_book_frame, text="還書", command=self.return_book)
        self.return_book_button.grid(row=1, column=0, columnspan=2, pady=5)

        # 新增會員介面
        self.add_member_frame = tk.LabelFrame(self.main_frame, text="新增會員", padx=10, pady=10)
        self.add_member_frame.grid(row=1, column=3, padx=10, pady=10)

        self.member_name_label = tk.Label(self.add_member_frame, text="會員姓名:")
        self.member_name_label.grid(row=0, column=0)
        self.member_name_entry = tk.Entry(self.add_member_frame)
        self.member_name_entry.grid(row=0, column=1)

        self.new_member_id_label = tk.Label(self.add_member_frame, text="會員ID:")
        self.new_member_id_label.grid(row=1, column=0)
        self.new_member_id_entry = tk.Entry(self.add_member_frame)
        self.new_member_id_entry.grid(row=1, column=1)

        self.add_member_button = tk.Button(self.add_member_frame, text="新增會員", command=self.add_member)
        self.add_member_button.grid(row=2, column=0, columnspan=2, pady=5)

        # 顯示會員列表
        self.list_members_button = tk.Button(self.main_frame, text="顯示會員列表", command=self.list_members)
        self.list_members_button.grid(row=2, column=0, pady=5)

        # 顯示書籍列表
        self.list_books_button = tk.Button(self.main_frame, text="顯示書籍列表", command=self.list_books)
        self.list_books_button.grid(row=2, column=1, pady=5)

        # 信息顯示區域
        self.info_text = tk.Text(root, height=15, width=100)
        self.info_text.pack(pady=10)
        self.info_text.insert(tk.END, "歡迎使用圖書租借系統！\n")

    def add_book(self):
        book_id = self.book_id_entry.get()
        title = self.title_entry.get()
        author = self.author_entry.get()

        if book_id and title and author:
            book = Book(book_id, title, author)
            self.library.add_book(book)
            self.info_text.insert(tk.END, f"已新增書籍: {title} (ID: {book_id})\n")
            self.book_id_entry.delete(0, tk.END)
            self.title_entry.delete(0, tk.END)
            self.author_entry.delete(0, tk.END)
        else:
            messagebox.showerror("輸入錯誤", "請填寫所有書籍資訊")

    def borrow_book(self):
        book_id = self.borrow_book_id_entry.get()
        member_id = self.member_id_entry.get()

        if book_id and member_id:
            success = self.library.borrow_book(book_id, member_id)
            if success:
                self.info_text.insert(tk.END, f"借書成功: 書籍ID {book_id}\n")
            else:
                self.info_text.insert(tk.END, f"借書失敗: 書籍ID {book_id}\n")
            self.borrow_book_id_entry.delete(0, tk.END)
            self.member_id_entry.delete(0, tk.END)
        else:
            messagebox.showerror("輸入錯誤", "請填寫書籍ID和會員ID")

    def return_book(self):
        book_id = self.return_book_id_entry.get()

        if book_id:
            success = self.library.return_book(book_id)
            if success:
                self.info_text.insert(tk.END, f"還書成功: 書籍ID {book_id}\n")
            else:
                self.info_text.insert(tk.END, f"還書失敗: 書籍ID {book_id}\n")
            self.return_book_id_entry.delete(0, tk.END)
        else:
            messagebox.showerror("輸入錯誤", "請填寫書籍ID")

    def add_member(self):
        name = self.member_name_entry.get()
        member_id = self.new_member_id_entry.get()

        if name and member_id:
            self.library.register_member(name, member_id)
            self.info_text.insert(tk.END, f"已新增會員: {name} (ID: {member_id})\n")
            self.member_name_entry.delete(0, tk.END)
            self.new_member_id_entry.delete(0, tk.END)
        else:
            messagebox.showerror("輸入錯誤", "請填寫會員姓名和會員ID")

    def list_members(self):
        self.info_text.insert(tk.END, "會員列表:\n")
        for member in self.library.members:
            self.info_text.insert(tk.END, f"  {member}\n")

    def list_books(self):
        self.info_text.insert(tk.END, "書籍列表:\n")
        for book in self.library.books:
            self.info_text.insert(tk.END, f"  {book}\n")

if __name__ == "__main__":
    root = tk.Tk()
    app = LibraryApp(root)
    root.mainloop()