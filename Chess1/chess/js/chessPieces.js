const PIECES = {
    WHITE_KING: '♔', BLACK_KING: '♚',
    WHITE_QUEEN: '♕', BLACK_QUEEN: '♛',
    WHITE_ROOK: '♖', BLACK_ROOK: '♜',
    WHITE_BISHOP: '♗', BLACK_BISHOP: '♝',
    WHITE_KNIGHT: '♘', BLACK_KNIGHT: '♞',
    WHITE_PAWN: '♙', BLACK_PAWN: '♟'
};

class ChessPiece {
    constructor(symbol, color) {
        this.symbol = symbol;
        this.color = color;
        this.hasMoved = false;
    }

    getPossibleMoves(board, currentPosition) {
        return [];
    }

    isValidMove(board, start, end) {
        const possibleMoves = this.getPossibleMoves(board, start);
        return possibleMoves.some(move => 
            move.row === end.row && move.col === end.col
        );
    }
}