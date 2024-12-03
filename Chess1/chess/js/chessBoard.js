class ChessBoard {
    constructor() {
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.board = this.initializeBoard();
        this.currentTurn = 'white';
        this.selectedPiece = null;
        this.gameOver = false;
        this.renderBoard();
        this.renderCoordinates();
        document.getElementById('turn-display').classList.remove('game-over');
        document.getElementById('turn-display').textContent = "White's Turn";
    }

    setupEventListeners() {
        document.getElementById('restart-button').addEventListener('click', () => {
            this.initializeGame();
        });
    }

    initializeBoard() {
        const board = Array(8).fill().map(() => Array(8).fill(null));
        
        // Set up pawns
        for (let i = 0; i < 8; i++) {
            board[1][i] = new ChessPawn('white');
            board[6][i] = new ChessPawn('black');
        }

        // Set up back row pieces
        const setupBackRow = (row, color) => {
            board[row][0] = new ChessRook(color);
            board[row][1] = new ChessKnight(color);
            board[row][2] = new ChessBishop(color);
            board[row][3] = new ChessQueen(color);
            board[row][4] = new ChessKing(color);
            board[row][5] = new ChessBishop(color);
            board[row][6] = new ChessKnight(color);
            board[row][7] = new ChessRook(color);
        };

        setupBackRow(0, 'white');
        setupBackRow(7, 'black');

        return board;
    }

    findKing(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece instanceof ChessKing && piece.color === color) {
                    return { row, col };
                }
            }
        }
        return null;
    }

    isKingInCheck(kingColor) {
        const kingPosition = this.findKing(kingColor);
        if (!kingPosition) return false;

        // Check if any opponent piece can attack the king
        const opponentColor = kingColor === 'white' ? 'black' : 'white';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === opponentColor) {
                    const moves = piece.getPossibleMoves(this.board, {row, col});
                    if (moves.some(move => 
                        move.row === kingPosition.row && 
                        move.col === kingPosition.col
                    )) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    renderCoordinates() {
        const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

        // Top coordinates (files)
        const topCoords = document.querySelector('.top-coordinates');
        topCoords.innerHTML = files.map(file => `<div>${file}</div>`).join('');

        // Bottom coordinates (files)
        const bottomCoords = document.querySelector('.bottom-coordinates');
        bottomCoords.innerHTML = files.map(file => `<div>${file}</div>`).join('');

        // Left coordinates (ranks)
        const leftCoords = document.querySelector('.left-coordinates');
        leftCoords.innerHTML = ranks.map(rank => `<div>${rank}</div>`).join('');

        // Right coordinates (ranks)
        const rightCoords = document.querySelector('.right-coordinates');
        rightCoords.innerHTML = ranks.map(rank => `<div>${rank}</div>`).join('');
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        // Check if either king is in check
        const whiteKingInCheck = this.isKingInCheck('white');
        const blackKingInCheck = this.isKingInCheck('black');

        for (let row = 7; row >= 0; row--) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                square.dataset.row = row;
                square.dataset.col = col;

                const piece = this.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.classList.add('piece');
                    pieceElement.textContent = piece.symbol;
                    pieceElement.dataset.color = piece.color;
                    square.appendChild(pieceElement);

                    // Highlight king in check
                    if (piece instanceof ChessKing) {
                        if (piece.color === 'white' && whiteKingInCheck ||
                            piece.color === 'black' && blackKingInCheck) {
                            square.classList.add('check-highlight');
                        }
                    }
                }

                square.addEventListener('click', () => this.handleSquareClick(row, col));
                boardElement.appendChild(square);
            }
        }
    }

    handleSquareClick(row, col) {
        if (this.gameOver) return;
        
        const piece = this.board[row][col];
        
        // Clear previous highlights
        this.clearHighlights();

        // If clicking the same piece that was selected, deselect it
        if (this.selectedPiece && 
            this.selectedPiece.row === row && 
            this.selectedPiece.col === col) {
            this.selectedPiece = null;
            this.renderBoard(); // Re-render to show check highlight if applicable
            return;
        }

        if (this.selectedPiece) {
            // Try to move the selected piece
            if (this.isValidMove({row, col})) {
                this.movePiece({row, col});
                this.selectedPiece = null;
                
                // Check for win condition after move
                if (this.checkWinCondition()) {
                    this.gameOver = true;
                    const winner = this.currentTurn === 'white' ? 'Black' : 'White';
                    const display = document.getElementById('turn-display');
                    display.textContent = `${winner} Wins!`;
                    display.classList.add('game-over');
                } else {
                    this.toggleTurn();
                }
            } else {
                // If clicking on same color piece, select that piece instead
                if (piece && piece.color === this.currentTurn) {
                    this.selectedPiece = {piece, row, col};
                    this.highlightPossibleMoves(row, col);
                } else {
                    this.selectedPiece = null;
                }
            }
            this.renderBoard();
            return;
        }

        // Select a piece
        if (piece && piece.color === this.currentTurn) {
            this.selectedPiece = {piece, row, col};
            this.highlightPossibleMoves(row, col);
        }
    }

    clearHighlights() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('highlight', 'possible-move');
        });
    }

    highlightPossibleMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return;

        // Highlight selected piece
        const selectedSquare = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        selectedSquare.classList.add('highlight');

        // Get and highlight possible moves
        const possibleMoves = piece.getPossibleMoves(this.board, {row, col});
        possibleMoves.forEach(move => {
            const square = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
            if (square) {
                square.classList.add('possible-move');
            }
        });
    }

    isValidMove(targetPosition) {
        if (!this.selectedPiece) return false;

        const {piece, row: fromRow, col: fromCol} = this.selectedPiece;
        const {row: toRow, col: toCol} = targetPosition;

        // Can't move to a square occupied by same color piece
        const targetPiece = this.board[toRow][toCol];
        if (targetPiece && targetPiece.color === piece.color) {
            return false;
        }

        return piece.isValidMove(this.board, 
            {row: fromRow, col: fromCol}, 
            {row: toRow, col: toCol}
        );
    }

    movePiece(targetPosition) {
        const {piece, row: fromRow, col: fromCol} = this.selectedPiece;
        const {row: toRow, col: toCol} = targetPosition;

        // Store the captured piece (if any) for win condition checking
        const capturedPiece = this.board[toRow][toCol];

        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        piece.hasMoved = true;

        // Handle pawn promotion
        if (piece instanceof ChessPawn) {
            if ((piece.color === 'white' && toRow === 7) || 
                (piece.color === 'black' && toRow === 0)) {
                this.board[toRow][toCol] = new ChessQueen(piece.color);
            }
        }
    }

    checkWinCondition() {
        let whiteKing = false;
        let blackKing = false;

        // Check if both kings are still on the board
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece instanceof ChessKing) {
                    if (piece.color === 'white') whiteKing = true;
                    if (piece.color === 'black') blackKing = true;
                }
            }
        }

        // If either king is missing, the game is over
        return !whiteKing || !blackKing;
    }

    toggleTurn() {
        this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
        document.getElementById('turn-display').textContent = 
            `${this.currentTurn.charAt(0).toUpperCase() + this.currentTurn.slice(1)}'s Turn`;
    }
}