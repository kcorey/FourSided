class SlotMachine {
    constructor() {
        this.colorStrip = document.getElementById('colorStrip');
        this.pullArm = document.getElementById('pullArm');
        this.result = document.getElementById('result');
        this.isSpinning = false;
        
        this.colors = ['red', 'green', 'blue', 'yellow'];
        this.colorNames = {
            red: 'Red',
            green: 'Green', 
            blue: 'Blue',
            yellow: 'Yellow'
        };
        
        this.init();
    }
    
    init() {
        // Add event listeners for the pull arm
        this.pullArm.addEventListener('click', () => this.pull());
        this.pullArm.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.pull();
        });
        
        // Add keyboard support for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                this.pull();
            }
        });
        
        // Add haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            this.pullArm.addEventListener('touchstart', () => {
                navigator.vibrate(50);
            });
        }
        
        // Set initial position to show the first color (red)
        this.colorStrip.style.transition = 'none';
        this.colorStrip.style.transform = 'translateY(0)';
    }
    
    pull() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        
        // Remove any existing background color classes
        document.body.className = '';
        
        // Reset strip position to start
        this.colorStrip.style.transition = 'none';
        this.colorStrip.style.transform = 'translateY(0)';
        
        // Force a reflow to ensure the reset takes effect
        this.colorStrip.offsetHeight;
        
        // Start the spinning animation
        this.result.innerHTML = '<p>Spinning...</p>';
        
        // Determine which color will land (random)
        const landedColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        // Animate the color strip
        this.spinColors(landedColor);
    }
    
    spinColors(targetColor) {
        // Get the actual height of a color swatch from the DOM
        const firstSwatch = this.colorStrip.querySelector('.color-swatch');
        const stripHeight = firstSwatch ? firstSwatch.offsetHeight : 200;
        const totalColors = this.colors.length;
        const totalHeight = stripHeight * totalColors;
        
        // Calculate how many full rotations plus the target position
        const rotations = 3 + Math.random() * 2; // 3-5 full rotations
        const targetIndex = this.colors.indexOf(targetColor);
        
        // Calculate the exact position to show the target color perfectly in the viewport
        // We want the target color to fill the entire display window
        const finalPosition = -(rotations * totalHeight + (targetIndex * stripHeight));
        
        // Ensure the final position is exactly aligned with a color swatch
        const alignedPosition = Math.round(finalPosition / stripHeight) * stripHeight;
        
        // Verify the calculation by checking which color should be visible
        const absolutePosition = Math.abs(alignedPosition);
        const colorCycle = Math.floor(absolutePosition / totalHeight);
        const positionInCycle = absolutePosition % totalHeight;
        const visibleColorIndex = Math.floor(positionInCycle / stripHeight);
        const visibleColor = this.colors[visibleColorIndex];
        
        // If there's a mismatch, calculate the correct position
        if (visibleColor !== targetColor) {
            // Find the correct position by working backwards
            // We need to find a position where the target color is visible
            let correctPosition = alignedPosition;
            
            // Try adjusting by one swatch at a time until we find the right position
            for (let i = 0; i < totalColors; i++) {
                const testPosition = alignedPosition + (i * stripHeight);
                const testAbsolutePosition = Math.abs(testPosition);
                const testColorCycle = Math.floor(testAbsolutePosition / totalHeight);
                const testPositionInCycle = testAbsolutePosition % totalHeight;
                const testVisibleColorIndex = Math.floor(testPositionInCycle / stripHeight);
                const testVisibleColor = this.colors[testVisibleColorIndex];
                
                if (testVisibleColor === targetColor) {
                    correctPosition = testPosition;
                    break;
                }
            }
            
            // Animate the strip to the correct position
            this.colorStrip.style.transition = 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.colorStrip.style.transform = `translateY(${correctPosition}px)`;
        } else {
            // Animate the strip
            this.colorStrip.style.transition = 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.colorStrip.style.transform = `translateY(${alignedPosition}px)`;
        }
        
        // Show result after animation completes
        setTimeout(() => {
            this.showResult(targetColor);
            this.isSpinning = false;
        }, 3000);
    }
    
    showResult(color) {
        const colorName = this.colorNames[color];
        
        // Change background color
        document.body.className = `bg-${color}`;
        
        // Update result text
        this.result.innerHTML = `
            <p>🎰 ${colorName} wins!</p>
        `;
        
        // Add a subtle animation to the result
        this.result.style.animation = 'none';
        setTimeout(() => {
            this.result.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    }
}

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SlotMachine();
});

// Add CSS animation for result pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
