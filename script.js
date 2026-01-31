// State Management
const STATE = {
    view: 'home', // home, quiz, troll, success, sad, fail
    quizIndex: 0,
    rejectionCount: 0,
    failMessage: ''
};

// Data
const QUIZ_DATA = [
    {
        question: "What's my current / favourite nickname?",
        options: ["Cyber", "Cashie", "Izudon"],
        correct: 0 // Cyber
    },
    {
        question: "What's my favourite food?",
        options: ["Egusi Soup", "Beans", "Plantains"],
        correct: 1 // Beans
    },
    {
        question: "What's my favorite hobby?",
        options: ["Sleeping", "Watching a movie", "Gaming"],
        correct: 2 // Gaming
    }
];

const TROLL_MESSAGES = [
    "My love, you know you can't turn me down 😢",
    "Are you sure? Look at my puppy eyes! 🥺",
    "Don't do this to me... my heart is breaking 💔",
    "I'll cook your favorite meal every day! 🍝",
    "Okay, I'll stop playing games... please? 🎮",
    "Refusing me is illegal in 50 states! 👮‍♂️",
    "I promise to give you the aux cord in the car 🎵",
    "Pretty please with a cherry on top? 🍒",
    "I'm not crying, you are! 😭",
    "Last chance to make the best decision of your life! 💍"
];

const FAIL_MESSAGES = [
    "Do you even know me?? 🤨",
    "Wow... just wow. 🚩",
    "I'm rethinking our whole relationship... 😒",
    "Are you an imposter? 🕵️‍♀️",
    "That hurt my feelings... 💔",
    "Strike one! (Just kidding, you're out) ⚾",
    "We need to have a serious talk... 🗣️",
    "Did you hit your head? 🤕",
    "Access Denied. Heart locked. 🔒",
    "Try again, but with more love this time! 💖"
];

// DOM Elements
const app = document.getElementById('app');

// Utility Functions
function render() {
    // Clear current content with a fade effect
    app.style.opacity = '0';
    app.style.transform = 'translateY(10px)';

    setTimeout(() => {
        app.innerHTML = '';

        switch (STATE.view) {
            case 'home':
                app.innerHTML = `
                    <h1>Hi Love, will you be my Valentine? 💖</h1>
                    <div class="actions">
                        <button class="btn btn-primary pulse" onclick="handleYes()">YES! 😍</button>
                        <button class="btn btn-secondary" onclick="handleNo()">No 😢</button>
                    </div>
                `;
                break;

            case 'troll':
                const message = TROLL_MESSAGES[STATE.rejectionCount - 1] || TROLL_MESSAGES[TROLL_MESSAGES.length - 1];
                app.innerHTML = `
                    <h1>${message}</h1>
                    <div class="actions">
                        <button class="btn btn-primary" onclick="handleYes()">Okay Yes! 🥰</button>
                        <button class="btn btn-secondary" onclick="handleNo()">Still No 😤</button>
                    </div>
                `;
                break;

            case 'sad':
                app.innerHTML = `
                    <h1>It's fine... sorry for bugging you... 🌧️</h1>
                    <p>(Refresh the page if you change your mind)</p>
                `;
                break;

            case 'quiz':
                const currentQ = QUIZ_DATA[STATE.quizIndex];
                app.innerHTML = `
                    <h1>Question ${STATE.quizIndex + 1}/${QUIZ_DATA.length}</h1>
                    <p>${currentQ.question}</p>
                    <div class="quiz-options">
                        ${currentQ.options.map((opt, i) => `
                            <button class="option-btn" onclick="handleAnswer(${i})">
                                ${i + 1}. ${opt}
                            </button>
                        `).join('')}
                    </div>
                `;
                break;

            case 'fail':
                app.innerHTML = `
                    <h1>Oh no! That's wrong! 😱</h1>
                    <p>${STATE.failMessage}<br>I'm converting you back to a stranger...</p>
                    <p style="font-size: 3rem;">🤡</p>
                    <button class="btn btn-primary" onclick="handleTryAgain()">Let me try again 🥺</button>
                `;
                break;

            case 'success':
                app.innerHTML = `
                    <h1>YAY! You're officially my Valentine! 🎉❤️</h1>
                    <p class="success-message">
                        You've made me the happiest person in the world! 🌎<br>
                        I promise to buy you food, give you massages,<br>
                        and love you forever and ever! 💍
                    </p>
                    <div style="font-size: 5rem; animation: float 3s infinite;">🧸</div>
                    <div class="confetti-container"></div>
                `;
                // Simple emoji confetti
                createConfetti();
                break;
        }

        // Fade in new content
        app.style.opacity = '1';
        app.style.transform = 'translateY(0)';
    }, 300);
}

// Event Handlers
window.handleYes = function () {
    if (STATE.view === 'home' || STATE.view === 'troll') {
        STATE.view = 'quiz';
        STATE.quizIndex = 0; // Reset quiz just in case
        render();
    }
};

window.handleNo = function () {
    STATE.rejectionCount++;
    if (STATE.rejectionCount >= 10) {
        STATE.view = 'sad';
    } else {
        STATE.view = 'troll';
        // Add a random shake effect to the container
        document.querySelector('.container').classList.add('shake');
        setTimeout(() => document.querySelector('.container').classList.remove('shake'), 400);
    }
    render();
};

window.handleAnswer = function (selectedIndex) {
    const currentQ = QUIZ_DATA[STATE.quizIndex];
    if (selectedIndex === currentQ.correct) {
        // Correct
        if (STATE.quizIndex < QUIZ_DATA.length - 1) {
            STATE.quizIndex++;
            render();
        } else {
            STATE.view = 'success';
            render();
        }
    } else {
        // Wrong
        // Pick random failure message
        const randomIndex = Math.floor(Math.random() * FAIL_MESSAGES.length);
        STATE.failMessage = FAIL_MESSAGES[randomIndex];
        STATE.view = 'fail';
        render();
    }
};

window.handleTryAgain = function () {
    STATE.view = 'home';
    STATE.quizIndex = 0;
    STATE.rejectionCount = 0;
    render();
};

// Initial Render
render();

// Helper for Confetti
function createConfetti() {
    const colors = ['#ff4d6d', '#ff758c', '#ffb3c1', '#ffd6e0', '#ffffff'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.innerText = '❤';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10vh';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fall {
    to { transform: translateY(110vh) rotate(720deg); }
}
`;
document.head.appendChild(styleSheet);
