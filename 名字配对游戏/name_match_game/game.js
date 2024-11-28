// 名字配对游戏 - 升级版

// 添加音效
const matchSound = new Audio('match.mp3');
const wrongSound = new Audio('wrong.mp3');

// 名字数据库
const nameDatabase = [
    { firstName: "小明", lastName: "王", color: "#FF6B6B" },
    { firstName: "小红", lastName: "李", color: "#4ECDC4" },
    { firstName: "阿强", lastName: "张", color: "#45B7D1" },
    { firstName: "小芳", lastName: "陈", color: "#FF9A9E" },
    { firstName: "小华", lastName: "林", color: "#FAD390" },
    { firstName: "小英", lastName: "吴", color: "#6A5ACD" },
    { firstName: "小军", lastName: "赵", color: "#2ECC71" },
    { firstName: "小玲", lastName: "刘", color: "#9B59B6" }
];

class NameMatchGame {
    constructor() {
        this.namesContainer = document.getElementById('names-container');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.resultContainer = document.getElementById('result-container');
        this.finalScoreElement = document.getElementById('final-score');
        this.restartButton = document.getElementById('restart-btn');

        this.score = 0;
        this.timeLeft = 60;
        this.selectedCards = [];
        this.matchedPairs = [];
        this.timer = null;

        this.initGame();
        this.startTimer();
        this.addParticleBackground();
    }

    addParticleBackground() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '-1';
        particlesContainer.style.overflow = 'hidden';
        document.body.appendChild(particlesContainer);

        // 创建粒子效果
        for(let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = this.getRandomColor();
            particle.style.opacity = '0.5';
            
            // 随机位置
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // 随机动画
            particle.style.animation = `float ${5 + Math.random() * 5}s infinite alternate`;
            
            particlesContainer.appendChild(particle);
        }

        // 添加浮动动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                from { transform: translateY(0px); }
                to { transform: translateY(20px); }
            }
        `;
        document.head.appendChild(style);
    }

    getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FF9A9E', '#FAD390', '#6A5ACD', '#2ECC71', '#9B59B6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    initGame() {
        const shuffledNames = this.shuffleNames();
        this.namesContainer.innerHTML = '';
        
        shuffledNames.forEach((name, index) => {
            const card = document.createElement('div');
            card.classList.add('name-card');
            card.textContent = name.text;
            card.dataset.type = name.type;
            card.dataset.id = index;
            
            // 随机背景色
            const matchingPair = nameDatabase.find(pair => 
                pair.firstName === name.text || pair.lastName === name.text
            );
            if (matchingPair) {
                card.style.background = `linear-gradient(135deg, ${matchingPair.color} 0%, ${this.getLighterColor(matchingPair.color)} 100%)`;
            }

            card.addEventListener('click', () => this.selectCard(card));
            
            // 延迟添加翻转效果
            setTimeout(() => {
                card.classList.add('show');
            }, index * 100);

            this.namesContainer.appendChild(card);
        });
    }

    getLighterColor(color) {
        // 将颜色变亮
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        const amt = 30;
        const R = (num >> 16) + amt;
        const B = ((num >> 8) & 0x00FF) + amt;
        const G = (num & 0x0000FF) + amt;
        
        return `#${(0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
            (B<255?B<1?0:B:255)*0x100 +
            (G<255?G<1?0:G:255)).toString(16).slice(1)}`;
    }

    shuffleNames() {
        const names = [];
        nameDatabase.forEach(pair => {
            names.push({ text: pair.firstName, type: 'firstName' });
            names.push({ text: pair.lastName, type: 'lastName' });
        });

        for (let i = names.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [names[i], names[j]] = [names[j], names[i]];
        }

        return names;
    }

    selectCard(card) {
        if (
            this.selectedCards.length >= 2 || 
            this.matchedPairs.includes(card.dataset.id) ||
            this.selectedCards.includes(card)
        ) return;

        card.classList.add('selected');
        this.selectedCards.push(card);

        if (this.selectedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.selectedCards;
        const matchFound = nameDatabase.some(pair => 
            (pair.firstName === card1.textContent && pair.lastName === card2.textContent) ||
            (pair.lastName === card1.textContent && pair.firstName === card2.textContent)
        );

        if (matchFound) {
            this.score += 10;
            this.scoreElement.textContent = this.score;
            
            // 添加匹配效果
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            // 播放匹配音效
            matchSound.play();
            
            this.matchedPairs.push(card1.dataset.id, card2.dataset.id);

            // 额外的庆祝效果
            this.createConfetti(card1);
        } else {
            // 播放错误音效
            wrongSound.play();

            setTimeout(() => {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
            }, 500);
        }

        this.selectedCards = [];

        if (this.matchedPairs.length === nameDatabase.length * 2) {
            this.endGame();
        }
    }

    createConfetti(card) {
        for(let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = this.getRandomColor();
            confetti.style.borderRadius = '50%';
            
            const rect = card.getBoundingClientRect();
            confetti.style.left = `${rect.left + Math.random() * rect.width}px`;
            confetti.style.top = `${rect.top + Math.random() * rect.height}px`;
            
            confetti.style.animation = `fly ${1 + Math.random()}s ease-out forwards`;
            document.body.appendChild(confetti);

            // 动画结束后移除元素
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 1000);
        }

        // 添加飞行动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fly {
                to {
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;

            // 时间不足时添加紧张效果
            if (this.timeLeft <= 10) {
                this.timerElement.style.color = 'red';
                this.timerElement.style.animation = 'blink 0.5s infinite';
            }

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    endGame() {
        clearInterval(this.timer);
        this.namesContainer.innerHTML = '';
        this.resultContainer.classList.remove('hidden');
        this.finalScoreElement.textContent = this.score;
        
        // 添加最终得分动画
        this.finalScoreElement.style.animation = 'bounce 1s';
    }

    restartGame() {
        this.score = 0;
        this.timeLeft = 60;
        this.selectedCards = [];
        this.matchedPairs = [];
        
        this.scoreElement.textContent = this.score;
        this.timerElement.textContent = this.timeLeft;
        this.timerElement.style.color = 'inherit';
        this.timerElement.style.animation = 'none';
        this.resultContainer.classList.add('hidden');
        
        this.initGame();
        this.startTimer();
    }
}

// 初始化游戏
const game = new NameMatchGame();

// 重新开始按钮事件
document.getElementById('restart-btn').addEventListener('click', () => {
    game.restartGame();
});

// 添加额外的全局动画
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);