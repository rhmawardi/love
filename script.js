// script.js
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
        
        // Special final quote with italicized text
        this.finalQuote = "To: F.D.U \n💖 *My Forever Love* 💖\n\nYou are my everything,\nMy today and all my tomorrows.\n\n~ *I Love You Endlessly* ❤️ ~\nby: R.H.M";
        
        this.currentQuoteIndex = 0;
        this.textElement = document.getElementById('romantic-text');
        this.isMobile = window.innerWidth <= 768;
        
        this.initializeHearts();
        this.initializeAudio();
        this.initializeResizeListener();
    }

    createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.classList.add('heart');
        
        heart.style.left = `${Math.random() * 100}vw`;
        
        const baseSize = this.isMobile ? 20 : 40;
        const sizeVariation = Math.random() * (this.isMobile ? 10 : 20) + baseSize;
        heart.style.fontSize = `${sizeVariation}px`;
        
        const duration = this.isMobile ? 
            (Math.random() * 2 + 3) : 
            (Math.random() * 4 + 4);
        heart.style.animationDuration = `${duration}s`;
        
        heart.style.opacity = Math.random() * 0.4 + (this.isMobile ? 0.4 : 0.3);
        
        const hue = Math.random() * 60 + 320;
        const lightness = Math.random() * 30 + 60;
        heart.style.color = `hsl(${hue}, 100%, ${lightness}%)`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    initializeHearts() {
        const initialHearts = this.isMobile ? 8 : 15;
        
        for(let i = 0; i < initialHearts; i++) {
            setTimeout(() => this.createHeart(), Math.random() * 3000);
        }
        
        const interval = this.isMobile ? 600 : 400;
        setInterval(() => this.createHeart(), interval);
    }

    initializeResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
            }, 250);
        });
    }

    async showFinalQuote() {
        // Fade out current text
        this.textElement.classList.remove('visible');
        
        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set and show final quote, replacing both newlines and markdown italic syntax
        this.textElement.innerHTML = this.finalQuote
            .replace(/\n/g, '<br>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
        this.textElement.classList.add('final-quote');
        this.textElement.classList.add('visible');
    }

    async changeText() {
        // Don't change text if final quote is showing
        if (this.textElement.classList.contains('final-quote')) {
            return;
        }
        
        this.textElement.classList.remove('visible');
        this.textElement.classList.remove('final-quote');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.textElement.innerHTML = this.romanticQuotes[this.currentQuoteIndex].replace('\n', '<br>');
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.romanticQuotes.length;
        
        this.textElement.classList.add('visible');
    }

    initializeAudio() {
        const audio = document.getElementById('bgMusic');
        const playButton = document.getElementById('playButton');
        let isPlaying = false;
        let textInterval;

        playButton.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playButton.textContent = '❤ Play Music ❤';
                playButton.classList.remove('playing');
                clearInterval(textInterval);
                this.textElement.classList.remove('visible');
                
                // Don't remove final-quote class when pausing
                if (!this.textElement.classList.contains('final-quote')) {
                    this.textElement.classList.remove('visible');
                }
            } else {
                if (audio.ended) {
                    audio.currentTime = 0;
                }
                audio.play();
                playButton.textContent = '❤ Pause Music ❤';
                playButton.classList.add('playing');
                
                // Only start changing text if final quote isn't showing
                if (!this.textElement.classList.contains('final-quote')) {
                    this.changeText();
                    textInterval = setInterval(() => this.changeText(), 5000);
                }
            }
            isPlaying = !isPlaying;
        });

        // Handle audio ending
        audio.addEventListener('ended', () => {
            playButton.textContent = '❤ Play Music ❤';
            playButton.classList.remove('playing');
            isPlaying = false;
            clearInterval(textInterval);
            
            // Show final quote after music ends
            setTimeout(() => {
                this.showFinalQuote();
            }, 500);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new HeartAnimation();
});
