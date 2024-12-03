// Individual Piece Classes
class ChessPawn extends ChessPiece {
    constructor(color) {
        super(PIECES[color === 'white' ? 'WHITE_PAWN' : 'BLACK_PAWN'], color);
    }

    getPossibleMoves(board, position) {
        const moves = [];
        const direction = this.color === 'white' ? 1 : -1;
        const {row, col} = position;

        // Standard move (1 square forward)
        if (row + direction >= 0 && row + direction < 8 && board[row + direction][col] === null) {
            moves.push({row: row + direction, col});
        }

        // Initial double move
        if (!this.hasMoved && 
            row + direction >= 0 && row + direction < 8 && board[row + direction][col] === null && 
            row + direction * 2 >= 0 && row + direction * 2 < 8 && board[row + direction * 2][col] === null) {
            moves.push({row: row + direction * 2, col});
        }

        // Capture diagonally
        const capturePositions = [
            {row: row + direction, col: col - 1},
            {row: row + direction, col: col + 1}
        ];

        capturePositions.forEach(pos => {
            if (pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8) {
                const targetPiece = board[pos.row][pos.col];
                if (targetPiece && targetPiece.color !== this.color) {
                    moves.push(pos);
                }
            }
        });

        return moves;
    }

    isValidMove(board, start, end) {
        const possibleMoves = this.getPossibleMoves(board, start);
        return possibleMoves.some(move => 
            move.row === end.row && move.col === end.col
        );
    }
}

class ChessRook extends ChessPiece {
    constructor(color) {
        super(PIECES[color === 'white' ? 'WHITE_ROOK' : 'BLACK_ROOK'], color);
    }

    getPossibleMoves(board, position) {
        const moves = [];
        const directions = [
            {dx: 1, dy: 0}, {dx: -1, dy: 0},
            {dx: 0, dy: 1}, {dx: 0, dy: -1}
        ];

        directions.forEach(({dx, dy}) => {
            let row = position.row + dy;
            let col = position.col + dx;

            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const piece = board[row][col];
                if (piece === null) {
                    moves.push({row, col});
                } else {
                    if (piece.color !== this.color) {
                        moves.push({row, col});
                    }
                    break;
                }
                row += dy;
                col += dx;
            }
        });

        return moves;
    }
}

class ChessKnight extends ChessPiece {
    constructor(color) {
        super(PIECES[color === 'white' ? 'WHITE_KNIGHT' : 'BLACK_KNIGHT'], color);
    }

    getPossibleMoves(board, position) {
        const moves = [];
        const knightMoves = [
            {dx: 2, dy: 1}, {dx: 2, dy: -1},
            {dx: -2, dy: 1}, {dx: -2, dy: -1},
            {dx: 1, dy: 2}, {dx: 1, dy: -2},
            {dx: -1, dy: 2}, {dx: -1, dy: -2}
        ];

        knightMoves.forEach(({dx, dy}) => {
            const newRow = position.row + dy;
            const newCol = position.col + dx;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetPiece = board[newRow][newCol];
                if (targetPiece === null || targetPiece.color !== this.color) {
                    moves.push({row: newRow, col: newCol});
                }
            }
        });

        return moves;
    }
}

class ChessBishop extends ChessPiece {
    constructor(color) {
        super(PIECES[color === 'white' ? 'WHITE_BISHOP' : 'BLACK_BISHOP'], color);
    }

    getPossibleMoves(board, position) {
        const moves = [];
        const directions = [
            {dx: 1, dy: 1}, {dx: 1, dy: -1},
            {dx: -1, dy: 1}, {dx: -1, dy: -1}
        ];

        directions.forEach(({dx, dy}) => {
            let row = position.row + dy;
            let col = position.col + dx;

            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const piece = board[row][col];
                if (piece === null) {
                    moves.push({row, col});
                } else {
                    if (piece.color !== this.color) {
                        moves.push({row, col});
                    }
                    break;
                }
                row += dy;
                col += dx;
            }
        });

        return moves;
    }
}

class ChessQueen extends ChessPiece {
    constructor(color) {
        super(PIECES[color === 'white' ? 'WHITE_QUEEN' : 'BLACK_QUEEN'], color);
    }

    getPossibleMoves(board, position) {
        const moves = [];
        const directions = [
            {dx: 1, dy: 0}, {dx: -1, dy: 0},
            {dx: 0, dy: 1}, {dx: 0, dy: -1},
            {dx: 1, dy: 1}, {dx: 1, dy: -1},
            {dx: -1, dy: 1}, {dx: -1, dy: -1}
        ];

        directions.forEach(({dx, dy}) => {
            let row = position.row + dy;
            let col = position.col + dx;

            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const piece = board[row][col];
                if (piece === null) {
                    moves.push({row, col});
                } else {
                    if (piece.color !== this.color) {
                        moves.push({row, col});
                    }
                    break;
                }
                row += dy;
                col += dx;
            }
        });

        return moves;
    }
}

class ChessKing extends ChessPiece {
    constructor(color) {
        super(PIECES[color === 'white' ? 'WHITE_KING' : 'BLACK_KING'], color);
    }

    getPossibleMoves(board, position) {
        const moves = [];
        const directions = [
            {dx: 1, dy: 0}, {dx: -1, dy: 0},
            {dx: 0, dy: 1}, {dx: 0, dy: -1},
            {dx: 1, dy: 1}, {dx: 1, dy: -1},
            {dx: -1, dy: 1}, {dx: -1, dy: -1}
        ];

        directions.forEach(({dx, dy}) => {
            const newRow = position.row + dy;
            const newCol = position.col + dx;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const piece = board[newRow][newCol];
                if (piece === null || piece.color !== this.color) {
                    moves.push({row: newRow, col: newCol});
                }
            }
        });

        return moves;
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    const game = new ChessBoard();
});