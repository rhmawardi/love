class HeartAnimation {
    constructor() {
        this.romanticQuotes = [
            "the longer I'm with you\nthe more I love you",
            "every moment with you\nis a moment treasured forever",
            "you're the missing piece\nto my heart's puzzle",
            "in your eyes\nI found my home",
            "your love makes\nmy world complete",
            "with you, every day\nis a beautiful adventure",
            "my heart beats\nin rhythm with yours",
            "you're the reason\nI believe in love",
            "forever isn't long enough\nwhen I'm with you",
            "you make my heart smile\nevery single day",
            "every second without you\nfeels like forever",
            "your love is the anchor\nthat keeps me grounded",
            "in a thousand lifetimes\nI'd still choose you",
            "my favorite place\nis next to you",
            "your touch makes my heart\ndance with joy",
            "you're the missing chapter\nin my life's story",
            "like rivers flow to seas\nmy thoughts flow to you",
            "your love is the magic\nthat makes life beautiful",
            "in your embrace\nI found paradise",
            "each moment with you\nis a gift I cherish",
            "you're the harmony\nto my melody",
            "like stars need night\nI need you in my life",
            "my heart skips a beat\nwhen you're near",
            "you paint my world\nwith colors of love",
            "in your eyes I see\nall my tomorrows",
            "our love story\nwrites itself daily",
            "your smile brightens\nmy darkest days",
            "like honey to bees\nI'm drawn to you",
            "every love song\nreminds me of us",
            "in your heart\nI built my home",
            "your love gives wings\nto my dreams",
            "each breath I take\nwhispers your name",
            "like spring brings flowers\nyou bring joy to my life",
            "my world became perfect\nwhen you entered it",
            "your love fills spaces\nI never knew were empty",
            "in the book of life\nyou're my favorite chapter",
            "like puzzle pieces\nwe fit perfectly",
            "every moment apart\nmakes our love stronger",
            "your presence makes\nmy world complete",
            "in the symphony of life\nyou're my favorite song",
            "like sun lights the earth\nyour love lights my way",
            "my heart found its purpose\nwhen it found you",
            "you're the answer\nto my heart's prayers",
            "each sunset with you\nis a promise of tomorrow",
            "like compass points north\nmy heart points to you",
            "in the garden of love\nyou're my rarest flower",
            "your love is the shelter\nfrom life's storms",
            "every step I take\nleads me to you",
            "like waves need shore\nI need your embrace",
            "my dreams come alive\nwhen you're near",
            "your love is pure\nlike morning dew",
            "together we create\nour perfect story",
            "every heartbeat whispers\nyour precious name",
            "in your smile I found\nmy eternal happiness",
            "our love blooms forever\nlike spring flowers"
        ];

        this.finalQuote = "💖 To My Forever Love 💖\n\nYou are my everything,\nMy today and all my tomorrows.\n\n~ I Love You Endlessly ❤️ ~";

        this.currentQuoteIndex = 0;
        this.textElement = document.getElementById('romantic-text');
        this.heartEmojis = ['❤', '💕', '💖', '💗', '💘', '💝', '🩷', '❤️‍🔥'];

        this.detectDevice();
        this.setupOrientation();

        this.textElement.innerHTML = '💖\nKlik tombol di bawah\nuntuk memulai 💖';
        this.textElement.classList.add('visible');

        this.initCanvas();
        this.initHearts();
        this.initAudio();
        this.initVisualizer();
        this.initResponsive();
    }

    detectDevice() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.isMobile = w <= 768;
        this.isSmallMobile = w <= 380;
        this.isLandscape = h < w && h <= 500;
        this.isTablet = w > 768 && w <= 1024;
        this.isLargeScreen = w >= 1400;
    }

    setupOrientation() {
        if (screen.orientation) {
            screen.orientation.addEventListener('change', () => {
                setTimeout(() => this.handleResize(), 300);
            });
        }
    }

    getHeartConfig() {
        if (this.isLandscape) {
            return { initial: 4, interval: 900, baseSize: 14, variation: 8 };
        }
        if (this.isSmallMobile) {
            return { initial: 4, interval: 800, baseSize: 14, variation: 8 };
        }
        if (this.isMobile) {
            return { initial: 6, interval: 700, baseSize: 18, variation: 10 };
        }
        if (this.isTablet) {
            return { initial: 10, interval: 550, baseSize: 24, variation: 16 };
        }
        return { initial: 14, interval: 400, baseSize: 28, variation: 20 };
    }

    getCanvasParticleCount() {
        const area = window.innerWidth * window.innerHeight;
        if (area < 200000) return 25;
        if (area < 500000) return 45;
        if (area < 1000000) return 65;
        return 80;
    }

    initCanvas() {
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        class Sparkle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3 - 0.15;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.hue = Math.random() * 40 + 320;
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.life = Math.random() * 300 + 200;
                this.maxLife = this.life;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += this.pulseSpeed;
                this.life--;
                if (this.life <= 0) this.reset();
            }
            draw(ctx) {
                const pulseOpacity = Math.sin(this.pulse) * 0.3 + 0.7;
                const ratio = this.life / this.maxLife;
                const alpha = ratio * this.opacity * pulseOpacity;
                const glowSize = this.size * 2.5;

                ctx.globalAlpha = alpha * 0.15;
                ctx.beginPath();
                ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, 1)`;
                ctx.fill();

                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, 85%, 1)`;
                ctx.fill();

                ctx.globalAlpha = 1;
            }
        }

        const initParticles = () => {
            particles = [];
            const count = this.getCanvasParticleCount();
            for (let i = 0; i < count; i++) {
                particles.push(new Sparkle());
            }
        };
        initParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.update();
                p.draw(ctx);
            }
            animId = requestAnimationFrame(animate);
        };
        animate();

        this.canvasData = { particles, initParticles };
        this.canvasCleanup = () => cancelAnimationFrame(animId);
    }

    getRandomHeart() {
        return this.heartEmojis[Math.floor(Math.random() * this.heartEmojis.length)];
    }

    createHeart() {
        const heart = document.createElement('div');
        heart.textContent = this.getRandomHeart();
        heart.classList.add('heart');

        const emoji = heart.textContent;
        const fontSize = emoji.length > 1 ? '24px' : '';

        heart.style.left = `${Math.random() * 94}vw`;

        const cfg = this.getHeartConfig();
        const size = Math.random() * cfg.variation + cfg.baseSize;
        heart.style.fontSize = fontSize || `${size}px`;

        const duration = Math.random() * 4 + 5;
        heart.style.animationDuration = `${duration}s`;

        const hue = Math.random() * 40 + 320;
        const sat = 80 + Math.random() * 20;
        const lit = 55 + Math.random() * 30;
        heart.style.color = `hsl(${hue}, ${sat}%, ${lit}%)`;

        document.body.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, duration * 1000);
    }

    initHearts() {
        const cfg = this.getHeartConfig();
        for (let i = 0; i < cfg.initial; i++) {
            setTimeout(() => this.createHeart(), Math.random() * 3000);
        }
        this.heartInterval = setInterval(() => this.createHeart(), cfg.interval);
    }

    restartHearts() {
        if (this.heartInterval) {
            clearInterval(this.heartInterval);
        }
        const cfg = this.getHeartConfig();
        this.heartInterval = setInterval(() => this.createHeart(), cfg.interval);
    }

    initResponsive() {
        let resizeTimer;
        const handleResize = () => {
            this.detectDevice();

            if (this.canvasData) {
                this.canvasData.initParticles();
            }

            this.restartHearts();
        };

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 300);
        });

        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 400);
        });
    }

    initVisualizer() {
        const container = document.getElementById('visualizer');
        const barCount = 10;
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'vis-bar';
            container.appendChild(bar);
        }
    }

    async showFinalQuote() {
        this.textElement.classList.remove('visible');
        await new Promise(r => setTimeout(r, 1000));

        this.textElement.innerHTML = this.finalQuote.replace(/\n/g, '<br>');
        this.textElement.classList.add('final-quote');
        this.textElement.classList.add('visible');
    }

    async changeText() {
        if (this.textElement.classList.contains('final-quote')) return;

        this.textElement.classList.remove('visible');

        await new Promise(r => setTimeout(r, 1000));

        this.textElement.innerHTML = this.romanticQuotes[this.currentQuoteIndex].replace('\n', '<br>');
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.romanticQuotes.length;

        this.textElement.classList.add('visible');
    }

    initAudio() {
        const audio = document.getElementById('bgMusic');
        const playButton = document.getElementById('playButton');
        const btnIcon = playButton.querySelector('.btn-icon');
        const btnText = playButton.querySelector('.btn-text');
        const visualizer = document.getElementById('visualizer');
        let isPlaying = false;
        let textInterval;

        playButton.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                btnIcon.textContent = '▶';
                btnText.textContent = 'Mulai Musik';
                playButton.classList.remove('playing');
                visualizer.classList.remove('active');
                clearInterval(textInterval);
                if (!this.textElement.classList.contains('final-quote')) {
                    this.textElement.classList.remove('visible');
                }
            } else {
                audio.currentTime = 0;
                audio.play().catch(() => {});
                btnIcon.textContent = '⏸';
                btnText.textContent = 'Jeda Musik';
                playButton.classList.add('playing');
                visualizer.classList.add('active');

                if (!this.textElement.classList.contains('final-quote')) {
                    this.changeText();
                    textInterval = setInterval(() => this.changeText(), 5000);
                }
            }
            isPlaying = !isPlaying;
        });

        audio.addEventListener('ended', () => {
            btnIcon.textContent = '▶';
            btnText.textContent = 'Mulai Musik';
            playButton.classList.remove('playing');
            visualizer.classList.remove('active');
            isPlaying = false;
            clearInterval(textInterval);

            setTimeout(() => this.showFinalQuote(), 500);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new HeartAnimation();
});
