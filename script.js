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
"my dreams come alive\nwhen you're near"
			
			
        ];
        
        this.currentQuoteIndex = 0;
        this.textElement = document.getElementById('romantic-text');
        
        this.initializeHearts();
        this.initializeAudio();
    }

    createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.classList.add('heart');
        
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        const hue = Math.random() * 60 + 320;
        const lightness = Math.random() * 30 + 60;
        heart.style.color = `hsl(${hue}, 100%, ${lightness}%)`;
        
        const baseSize = 40;
        const sizeVariation = Math.random() * 20 + baseSize;
        heart.style.fontSize = `${sizeVariation}px`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    initializeHearts() {
        for(let i = 0; i < 15; i++) {
            setTimeout(() => this.createHeart(), Math.random() * 3000);
        }
        
        setInterval(() => this.createHeart(), 400);
    }

    async changeText() {
        // Fade out current text
        this.textElement.classList.remove('visible');
        
        // Wait for fade out animation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Change text
        this.textElement.innerHTML = this.romanticQuotes[this.currentQuoteIndex].replace('\n', '<br>');
        
        // Increment index and loop back if needed
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.romanticQuotes.length;
        
        // Fade in new text
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
                // Reset text
                this.currentQuoteIndex = 0;
                this.textElement.classList.remove('visible');
            } else {
                audio.play();
                playButton.textContent = '❤ Pause Music ❤';
                playButton.classList.add('playing');
                // Start text animation
                this.changeText();
                textInterval = setInterval(() => this.changeText(), 5000); // Change text every 5 seconds
            }
            isPlaying = !isPlaying;
        });

        // Handle audio ending
        audio.addEventListener('ended', () => {
            playButton.textContent = '❤ Play Music ❤';
            playButton.classList.remove('playing');
            isPlaying = false;
            clearInterval(textInterval);
            this.currentQuoteIndex = 0;
            this.textElement.classList.remove('visible');
        });
    }
}

// Initialize animation when page loads
window.addEventListener('DOMContentLoaded', () => {
    new HeartAnimation();
});
