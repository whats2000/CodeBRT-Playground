import os
import sys
import time
from enum import Enum
import msvcrt
import colorama
from colorama import Fore, Back, Style

# 初始化colorama
colorama.init()

# 遊戲模式枚舉
class GameMode(Enum):
    SELECT = 1  # 選擇棋子模式
    MOVE = 2    # 移動棋子模式

# 棋子的Unicode字符
CHESS_PIECES = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',  # 白棋
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'   # 黑棋
}

class ChessGame:
    def __init__(self):
        self.board = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ]
        self.cursor_x = 0
        self.cursor_y = 0
        self.mode = GameMode.SELECT
        self.selected_piece = None
        self.selected_pos = None
        self.blink_state = True
        self.error_blink = False
        self.last_draw = None
        self.need_redraw = True

    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')

    def get_current_board_state(self):
        """獲取當前棋盤的完整狀態字符串"""
        state = []
        state.append("   a b c d e f g h")
        state.append("  ─────────────────")
        
        for y in range(8):
            row = f"{8-y} │"
            for x in range(8):
                piece = self.board[y][x]
                # 基本背景顏色（紅黑相間）
                bg_color = Back.RED if (x + y) % 2 == 0 else Back.BLACK
                
                # 當前位置是光標位置
                if x == self.cursor_x and y == self.cursor_y:
                    if self.error_blink:
                        bg_color = Back.LIGHTRED_EX if self.blink_state else bg_color
                    elif self.mode == GameMode.SELECT:
                        bg_color = Back.BLUE if self.blink_state else bg_color
                    elif self.mode == GameMode.MOVE:
                        bg_color = Back.GREEN if self.blink_state else bg_color
                elif self.selected_pos and x == self.selected_pos[0] and y == self.selected_pos[1]:
                    bg_color = Back.YELLOW
                
                # 加上背景色並添加棋子或空格
                row += bg_color + (CHESS_PIECES.get(piece, ' ') if piece != '.' else ' ') + Style.RESET_ALL + " "
            
            row += f"│ {8-y}"
            state.append(row)
            
        state.append("  ─────────────────")
        state.append("   a b c d e f g h")
        state.append(f"\n當前模式: {'選擇棋子' if self.mode == GameMode.SELECT else '移動棋子'}")
        state.append("使用方向鍵移動光標，Enter選擇/移動，ESC退出")
        
        return "\n".join(state)

    def draw_board(self):
        """只在需要時重繪棋盤"""
        current_state = self.get_current_board_state()
        if current_state != self.last_draw or self.need_redraw:
            self.clear_screen()
            print(current_state)
            self.last_draw = current_state
            self.need_redraw = False

    def get_piece_color(self, piece):
        return 'white' if piece.isupper() else 'black' if piece.islower() else None

    def is_valid_move(self, from_pos, to_pos):
        from_x, from_y = from_pos
        to_x, to_y = to_pos
        
        if not (0 <= to_x < 8 and 0 <= to_y < 8):
            return False
            
        from_piece = self.board[from_y][from_x]
        to_piece = self.board[to_y][to_x]
        
        if to_piece != '.':
            if self.get_piece_color(from_piece) == self.get_piece_color(to_piece):
                return False
                
        return True

    def handle_input(self, key):
        if key == b'\x1b':  # ESC
            return False
            
        if self.error_blink:
            self.error_blink = False
            self.need_redraw = True
            return True

        needs_redraw = False
        
        if key == b'H':  # Up arrow
            if self.cursor_y > 0:
                self.cursor_y -= 1
                needs_redraw = True
        elif key == b'P':  # Down arrow
            if self.cursor_y < 7:
                self.cursor_y += 1
                needs_redraw = True
        elif key == b'K':  # Left arrow
            if self.cursor_x > 0:
                self.cursor_x -= 1
                needs_redraw = True
        elif key == b'M':  # Right arrow
            if self.cursor_x < 7:
                self.cursor_x += 1
                needs_redraw = True
        elif key == b'\r':  # Enter
            if self.mode == GameMode.SELECT:
                piece = self.board[self.cursor_y][self.cursor_x]
                if piece != '.':
                    self.selected_piece = piece
                    self.selected_pos = (self.cursor_x, self.cursor_y)
                    self.mode = GameMode.MOVE
                else:
                    self.error_blink = True
                needs_redraw = True
            else:  # MOVE mode
                if self.is_valid_move(self.selected_pos, (self.cursor_x, self.cursor_y)):
                    old_x, old_y = self.selected_pos
                    self.board[self.cursor_y][self.cursor_x] = self.board[old_y][old_x]
                    self.board[old_y][old_x] = '.'
                    self.selected_piece = None
                    self.selected_pos = None
                    self.mode = GameMode.SELECT
                else:
                    self.error_blink = True
                    self.mode = GameMode.SELECT
                    self.selected_piece = None
                    self.selected_pos = None
                needs_redraw = True

        if needs_redraw:
            self.need_redraw = True
            
        return True

    def run(self):
        last_blink_time = time.time()
        blink_interval = 0.5  # 閃爍間隔（秒）

        self.draw_board()  # 初始繪製

        while True:
            # 更新閃爍狀態
            current_time = time.time()
            if current_time - last_blink_time >= blink_interval:
                self.blink_state = not self.blink_state
                last_blink_time = current_time
                self.need_redraw = True

            # 只在需要時重繪
            if self.need_redraw:
                self.draw_board()

            # 檢查輸入
            if msvcrt.kbhit():
                key = msvcrt.getch()
                if key == b'\xe0':  # 特殊鍵的前綴
                    key = msvcrt.getch()
                if not self.handle_input(key):
                    break

            # 短暫休眠以減少CPU使用率
            time.sleep(0.05)

if __name__ == '__main__':
    game = ChessGame()
    game.run()