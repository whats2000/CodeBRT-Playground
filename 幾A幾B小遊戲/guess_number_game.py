import random

def generate_secret_number():
    """生成一個不重複的4位數字"""
    digits = list(range(10))
    random.shuffle(digits)
    return ''.join(map(str, digits[:4]))

def check_guess(secret, guess):
    """計算猜測的結果（幾A幾B）"""
    a = 0  # 位置和數字都正確
    b = 0  # 數字正確但位置不對
    
    for i in range(4):
        if guess[i] == secret[i]:
            a += 1
        elif guess[i] in secret:
            b += 1
    
    return a, b

def play_game():
    """主遊戲邏輯"""
    secret_number = generate_secret_number()
    attempts = 0
    
    print("歡迎來到幾A幾B猜數字遊戲！")
    print("規則：猜一個4位不重複的數字")
    print("- A代表位置和數字都正確")
    print("- B代表數字正確但位置不對")
    
    while True:
        try:
            guess = input("\n請輸入您的4位數字猜測：")
            
            # 驗證輸入
            if len(guess) != 4 or not guess.isdigit() or len(set(guess)) != 4:
                print("請輸入4個不同的數字！")
                continue
            
            attempts += 1
            a, b = check_guess(secret_number, guess)
            
            print(f"{a}A{b}B")
            
            if a == 4:
                print(f"\n恭喜！您在第 {attempts} 次嘗試中猜對了！")
                print(f"答案是：{secret_number}")
                break
        
        except KeyboardInterrupt:
            print("\n遊戲已結束。")
            break

if __name__ == "__main__":
    play_game()