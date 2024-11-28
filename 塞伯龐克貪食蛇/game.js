const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 設置畫布大小
canvas.width = 400;
canvas.height = 400;

// 遊戲變量
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;
let gameSpeed = 100;
let gameLoop;
let gameRunning = false;

// 賽博龐克配色
const colors = {
    snake: '#00ff9d',
    food: '#ff00ff',
    trail: '#005c38'
};

// 初始化遊戲
function initGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    gameSpeed = 100;
    document.getElementById('score').textContent = score;
    generateFood();
}

// 遊戲主循環
function gameMain() {
    if (!gameRunning) return;
    
    // 更新蛇的位置
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // 檢查邊界碰撞（改為碰到邊界就結束遊戲）
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // 檢查自身碰撞（只有當蛇開始移動後才檢查）
    if (dx !== 0 || dy !== 0) {
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                gameOver();
                return;
            }
        }
    }
    
    snake.unshift(head);
    
    // 檢查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        generateFood();
        // 增加遊戲速度
        if (gameSpeed > 50) {
            gameSpeed -= 2;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameMain, gameSpeed);
        }
    } else {
        snake.pop();
    }
    
    // 繪製遊戲
    draw();
}

// 繪製遊戲畫面
function draw() {
    // 清除畫布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 繪製網格
    ctx.strokeStyle = '#1a1a1a';
    for (let i = 0; i < tileCount; i++) {
        for (let j = 0; j < tileCount; j++) {
            ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);
        }
    }
    
    // 繪製食物
    ctx.fillStyle = colors.food;
    ctx.shadowBlur = 10;
    ctx.shadowColor = colors.food;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    
    // 繪製蛇
    ctx.shadowBlur = 15;
    ctx.shadowColor = colors.snake;
    snake.forEach((segment, index) => {
        const alpha = 1 - (index / snake.length) * 0.6;
        ctx.fillStyle = index === 0 ? colors.snake : colors.trail;
        ctx.globalAlpha = alpha;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

// 生成新的食物位置
function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    food = newFood;
}

// 開始遊戲
function startGame() {
    if (gameRunning) return;
    
    initGame();
    gameRunning = true;
    gameLoop = setInterval(gameMain, gameSpeed);
}

// 遊戲結束
function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    // 顯示遊戲結束效果
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '30px "Courier New"';
    ctx.fillStyle = colors.snake;
    ctx.textAlign = 'center';
    ctx.shadowBlur = 10;
    ctx.shadowColor = colors.snake;
    ctx.fillText('遊戲結束', canvas.width/2, canvas.height/2 - 30);
    ctx.fillText(`分數: ${score}`, canvas.width/2, canvas.height/2 + 30);
}

// 初始化遊戲畫面
initGame();
draw();

// 鍵盤控制
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (dy === 1) return; // 防止直接反向
            dx = 0;
            dy = -1;
            break;
        case 'ArrowDown':
            if (dy === -1) return;
            dx = 0;
            dy = 1;
            break;
        case 'ArrowLeft':
            if (dx === 1) return;
            dx = -1;
            dy = 0;
            break;
        case 'ArrowRight':
            if (dx === -1) return;
            dx = 1;
            dy = 0;
            break;
    }
});