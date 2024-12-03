import random
import tkinter as tk
from tkinter import messagebox, simpledialog

class GuessNumberGame:
    def __init__(self, master):
        self.master = master
        master.title("幾A幾B猜數字遊戲")
        master.geometry("400x500")
        master.configure(bg='#f0f0f0')

        # 遊戲狀態變數
        self.secret_number = self.generate_secret_number()
        self.attempts = 0
        
        # 創建介面元件
        self.create_widgets()

    def generate_secret_number(self):
        """生成一個不重複的4位數字"""
        digits = list(range(10))
        random.shuffle(digits)
        return ''.join(map(str, digits[:4]))

    def check_guess(self, secret, guess):
        """計算猜測的結果（幾A幾B）"""
        a = 0  # 位置和數字都正確
        b = 0  # 數字正確但位置不對
        
        for i in range(4):
            if guess[i] == secret[i]:
                a += 1
            elif guess[i] in secret:
                b += 1
        
        return a, b

    def create_widgets(self):
        # 標題
        title_label = tk.Label(
            self.master, 
            text="幾A幾B 猜數字遊戲", 
            font=("微軟正黑體", 18, "bold"), 
            bg='#f0f0f0',
            fg='#333333'
        )
        title_label.pack(pady=20)

        # 說明文字
        rules_label = tk.Label(
            self.master, 
            text="猜一個4位不重複的數字\nA: 位置和數字都正確\nB: 數字正確但位置不對", 
            font=("微軟正黑體", 10), 
            bg='#f0f0f0',
            fg='#666666'
        )
        rules_label.pack(pady=10)

        # 輸入框
        self.guess_entry = tk.Entry(
            self.master, 
            font=("微軟正黑體", 16), 
            width=10, 
            justify='center'
        )
        self.guess_entry.pack(pady=10)
        self.guess_entry.bind('<Return>', self.submit_guess)

        # 猜測按鈕
        submit_button = tk.Button(
            self.master, 
            text="確認猜測", 
            command=self.submit_guess,
            font=("微軟正黑體", 12),
            bg='#4CAF50',
            fg='white'
        )
        submit_button.pack(pady=10)

        # 結果顯示區域
        self.result_listbox = tk.Listbox(
            self.master, 
            width=40, 
            height=10,
            font=("微軟正黑體", 10)
        )
        self.result_listbox.pack(pady=10)

        # 重新開始按鈕
        restart_button = tk.Button(
            self.master, 
            text="重新開始", 
            command=self.restart_game,
            font=("微軟正黑體", 12),
            bg='#2196F3',
            fg='white'
        )
        restart_button.pack(pady=10)

    def submit_guess(self, event=None):
        guess = self.guess_entry.get()
        
        # 驗證輸入
        if len(guess) != 4 or not guess.isdigit() or len(set(guess)) != 4:
            messagebox.showerror("錯誤", "請輸入4個不同的數字！")
            self.guess_entry.delete(0, tk.END)
            return
        
        self.attempts += 1
        a, b = self.check_guess(self.secret_number, guess)
        
        # 更新結果列表
        result_text = f"第 {self.attempts} 次：{guess} -> {a}A{b}B"
        self.result_listbox.insert(tk.END, result_text)
        self.result_listbox.see(tk.END)
        
        # 清空輸入框
        self.guess_entry.delete(0, tk.END)
        
        # 檢查是否猜對
        if a == 4:
            messagebox.showinfo("恭喜!", f"您在 {self.attempts} 次嘗試中猜對了！\n答案是：{self.secret_number}")
            self.restart_game()

    def restart_game(self):
        # 重置遊戲狀態
        self.secret_number = self.generate_secret_number()
        self.attempts = 0
        self.result_listbox.delete(0, tk.END)
        self.guess_entry.delete(0, tk.END)
        messagebox.showinfo("遊戲重啟", "已重新開始新的遊戲！")

def main():
    root = tk.Tk()
    game = GuessNumberGame(root)
    root.mainloop()

if __name__ == "__main__":
    main()