// DOM Elements
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionContainer = document.getElementById('questionContainer');
const celebrationContainer = document.getElementById('celebrationContainer');
const bgHearts = document.getElementById('bgHearts');
const floatingHearts = document.getElementById('floatingHearts');
const fireworks = document.getElementById('fireworks');
const heartBurst = document.getElementById('heartBurst');

// Create background floating hearts
function createBackgroundHearts() {
    const hearts = ['💕', '💗', '💖', '💝', '❤️', '💘'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (10 + Math.random() * 10) + 's';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        bgHearts.appendChild(heart);
    }
}

createBackgroundHearts();

// Escaping No Button Logic - only moves on tap/click, not on hover
const buttonPadding = 20; // Padding from screen edges

// Yes button click handler
yesBtn.addEventListener('click', () => {
    startCelebration();
});

function startCelebration() {
    // Hide question, show celebration
    questionContainer.style.display = 'none';
    celebrationContainer.classList.remove('hidden');

    // Create heart burst
    createHeartBurst();

    // Create floating hearts
    createFloatingHearts();

    // Create fireworks
    createFireworks();

    // Create sparkles periodically
    setInterval(createSparkles, 300);

    // Continuous fireworks
    setInterval(createFireworks, 2000);
}

function createHeartBurst() {
    const hearts = ['💕', '💗', '💖', '💝', '❤️', '💘', '💓', '💞'];
    const numHearts = 20;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const angle = (i / numHearts) * Math.PI * 2;
        const distance = 200 + Math.random() * 100;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        heart.style.setProperty('--end-x', endX + 'px');
        heart.style.setProperty('--end-y', endY + 'px');
        heart.style.animation = `burstOut 2s ease-out forwards`;
        heart.style.fontSize = (30 + Math.random() * 30) + 'px';

        // Custom animation with specific end position
        heart.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${endX}px, ${endY}px) scale(1)`, opacity: 0.8, offset: 0.5 },
            { transform: `translate(${endX * 1.5}px, ${endY * 1.5}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'ease-out',
            fill: 'forwards'
        });

        heartBurst.appendChild(heart);

        // Remove after animation
        setTimeout(() => heart.remove(), 2000);
    }
}

function createFloatingHearts() {
    const hearts = ['💕', '💗', '💖', '💝', '❤️', '💘', '💓', '💞', '🌹', '✨'];

    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (20 + Math.random() * 40) + 'px';
        heart.style.animationDuration = (3 + Math.random() * 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        floatingHearts.appendChild(heart);

        // Remove and replace after some time
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    // Create initial hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => addHeart(), i * 100);
    }

    // Keep adding hearts
    setInterval(addHeart, 500);
}

function createFireworks() {
    const colors = ['#ff6b8a', '#ffb3c1', '#c23a5e', '#ffd700', '#ff85a2', '#ff4d6d'];

    for (let fw = 0; fw < 3; fw++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * window.innerHeight * 0.5 + 50;
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Create particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.backgroundColor = color;
                particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

                const angle = (i / 20) * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;

                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1500,
                    easing: 'ease-out',
                    fill: 'forwards'
                });

                fireworks.appendChild(particle);

                setTimeout(() => particle.remove(), 1500);
            }
        }, fw * 500);
    }
}

function createSparkles() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

// Prevent right-click context menu on No button (anti-cheat 😄)
noBtn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    teleportNoButton();
});

// Teleport button to random safe position
function teleportNoButton() {
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width || 120;
    const btnHeight = btnRect.height || 50;
    const padding = 20;

    // Calculate safe boundaries - ensure button stays fully visible
    const minX = padding;
    const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
    const minY = padding;
    const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);

    // Generate random position within safe bounds
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.round(newX) + 'px';
    noBtn.style.top = Math.round(newY) + 'px';

    // Add a little bounce animation
    noBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 100);
}

// Make No button escape on touch (for mobile) - teleport on tap!
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    teleportNoButton();
});

// Also escape on click (works for both mobile and desktop)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    teleportNoButton();
});

// Prevent any way of clicking the No button
noBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    teleportNoButton();
});
