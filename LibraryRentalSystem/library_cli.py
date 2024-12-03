from library_management import Book, LibraryManagementSystem

def print_menu():
    print("\n--- 圖書租借系統 ---")
    print("1. 新增書籍")
    print("2. 註冊會員")
    print("3. 借書")
    print("4. 還書")
    print("5. 查看可借閱書籍")
    print("6. 查看會員已借書籍")
    print("0. 退出")

def main():
    library = LibraryManagementSystem()

    while True:
        print_menu()
        choice = input("請輸入您的選擇: ")

        if choice == '1':
            book_id = input("請輸入書籍ID: ")
            title = input("請輸入書名: ")
            author = input("請輸入作者: ")
            book = Book(book_id, title, author)
            library.add_book(book)

        elif choice == '2':
            name = input("請輸入會員姓名: ")
            member_id = input("請輸入會員ID: ")
            library.register_member(name, member_id)

        elif choice == '3':
            book_id = input("請輸入要借的書籍ID: ")
            member_id = input("請輸入會員ID: ")
            library.borrow_book(book_id, member_id)

        elif choice == '4':
            book_id = input("請輸入要還的書籍ID: ")
            library.return_book(book_id)

        elif choice == '5':
            library.list_available_books()

        elif choice == '6':
            member_id = input("請輸入會員ID: ")
            library.list_borrowed_books(member_id)

        elif choice == '0':
            print("感謝使用圖書租借系統，再見！")
            break

        else:
            print("無效的選擇，請重新輸入。")

if __name__ == "__main__":
    main()