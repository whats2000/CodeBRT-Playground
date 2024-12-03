import tkinter as tk
from tkinter import messagebox
from library_management import LibraryManagementSystem, Book, Member

class AdminApp:
    def __init__(self, root):
        self.root = root
        self.root.title("圖書租借系統後台管理")

        self.library = LibraryManagementSystem()

        # 主框架
        self.main_frame = tk.Frame(root)
        self.main_frame.pack()

        self.label = tk.Label(self.main_frame, text="圖書租借系統後台管理", font=("Arial", 16))
        self.label.grid(row=0, column=0, columnspan=2, pady=10)

        # 修改圖書借出狀況
        self.modify_book_frame = tk.LabelFrame(self.main_frame, text="修改圖書狀況", padx=10, pady=10)
        self.modify_book_frame.grid(row=1, column=0, padx=10, pady=10)

        self.book_id_label = tk.Label(self.modify_book_frame, text="書籍ID:")
        self.book_id_label.grid(row=0, column=0)
        self.book_id_entry = tk.Entry(self.modify_book_frame)
        self.book_id_entry.grid(row=0, column=1)

        self.status_label = tk.Label(self.modify_book_frame, text="是否可借:")
        self.status_label.grid(row=1, column=0)
        self.status_var = tk.BooleanVar(value=True)
        self.status_check = tk.Checkbutton(self.modify_book_frame, variable=self.status_var)
        self.status_check.grid(row=1, column=1)

        self.modify_book_button = tk.Button(self.modify_book_frame, text="修改狀況", command=self.modify_book_status)
        self.modify_book_button.grid(row=2, column=0, columnspan=2, pady=5)

        # 更新會員資訊
        self.update_member_frame = tk.LabelFrame(self.main_frame, text="更新會員資訊", padx=10, pady=10)
        self.update_member_frame.grid(row=1, column=1, padx=10, pady=10)

        self.member_id_label = tk.Label(self.update_member_frame, text="會員ID:")
        self.member_id_label.grid(row=0, column=0)
        self.member_id_entry = tk.Entry(self.update_member_frame)
        self.member_id_entry.grid(row=0, column=1)

        self.new_name_label = tk.Label(self.update_member_frame, text="新的會員姓名:")
        self.new_name_label.grid(row=1, column=0)
        self.new_name_entry = tk.Entry(self.update_member_frame)
        self.new_name_entry.grid(row=1, column=1)

        self.update_member_button = tk.Button(self.update_member_frame, text="更新會員資訊", command=self.update_member_info)
        self.update_member_button.grid(row=2, column=0, columnspan=2, pady=5)

        # 信息顯示區域
        self.info_text = tk.Text(root, height=10, width=70)
        self.info_text.pack(pady=10)
        self.info_text.insert(tk.END, "歡迎進入後台管理界面！\n")

    def modify_book_status(self):
        book_id = self.book_id_entry.get()
        is_available = self.status_var.get()

        book = self.library.find_book_by_id(book_id)
        if book:
            book.is_available = is_available
            self.library.save_books()
            self.info_text.insert(tk.END, f"書籍ID {book_id} 狀況已更新: {'可借' if is_available else '已借出'}\n")
            self.book_id_entry.delete(0, tk.END)
        else:
            self.info_text.insert(tk.END, f"找不到書籍ID {book_id}\n")

    def update_member_info(self):
        member_id = self.member_id_entry.get()
        new_name = self.new_name_entry.get()

        member = self.library.find_member_by_id(member_id)
        if member:
            member.name = new_name
            self.info_text.insert(tk.END, f"會員ID {member_id} 的名稱已更新為 {new_name}\n")
            self.member_id_entry.delete(0, tk.END)
            self.new_name_entry.delete(0, tk.END)
        else:
            self.info_text.insert(tk.END, f"找不到會員ID {member_id}\n")

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminApp(root)
    root.mainloop()