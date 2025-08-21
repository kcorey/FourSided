class SlotMachine {
    constructor() {
        this.colorStrip = document.getElementById('colorStrip');
        this.numberStrip = document.getElementById('numberStrip');
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
        
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        this.feedbackItems = {
            1: 'Missed Deadlines: They regularly miss deadlines, affecting team output and reliability.',
            2: 'Negative Attitude: Their ongoing negativity is bringing down morale across the team.',
            3: 'Promotion Frustration: They feel overlooked for a promotion and are becoming frustrated or disengaged.',
            4: 'Team Conflict: Tension with a colleague is impacting collaboration and team cohesion.',
            5: 'Lacks Confidence: They struggle to speak up or present their ideas clearly in meetings.',
            6: 'Burnout Warning Signs: They\'re taking on too much, working late, and showing signs of burnout.',
            7: 'Repeated Errors: They\'re not taking enough care, and repeated errors are affecting others and overall quality.',
            8: 'Interrupts Others: They dominate conversations, interrupt, or dismiss colleagues\' ideas.',
            9: 'Inconsistent Performer: Delivers well some days, underperforms others, lacking overall consistency.',
            10: 'Improved Performance: After receiving feedback, they\'ve made real improvements in their work or behaviour.'
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
        
        // Set initial position to show the first number (1)
        this.numberStrip.style.transition = 'none';
        this.numberStrip.style.transform = 'translateY(0)';
    }
    
    pull() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        
        // Remove any existing background color classes
        document.body.className = '';
        
        // Reset strip positions to start
        this.colorStrip.style.transition = 'none';
        this.colorStrip.style.transform = 'translateY(0)';
        this.numberStrip.style.transition = 'none';
        this.numberStrip.style.transform = 'translateY(0)';
        
        // Force a reflow to ensure the reset takes effect
        this.colorStrip.offsetHeight;
        this.numberStrip.offsetHeight;
        
        // Start the spinning animation
        this.result.innerHTML = '<p>Spinning...</p>';
        
        // Determine which color and number will land (random)
        const landedColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        const landedNumber = this.numbers[Math.floor(Math.random() * this.numbers.length)];
        
        // Animate both strips
        this.spinColors(landedColor, landedNumber);
    }
    
    spinColors(targetColor, targetNumber) {
        // Get the actual height of a color swatch from the DOM
        const firstColorSwatch = this.colorStrip.querySelector('.color-swatch');
        const colorStripHeight = firstColorSwatch ? firstColorSwatch.offsetHeight : 200;
        const totalColors = this.colors.length;
        const totalColorHeight = colorStripHeight * totalColors;
        
        // Get the actual height of a number swatch from the DOM
        const firstNumberSwatch = this.numberStrip.querySelector('.number-swatch');
        const numberStripHeight = firstNumberSwatch ? firstNumberSwatch.offsetHeight : 200;
        const totalNumbers = this.numbers.length;
        const totalNumberHeight = numberStripHeight * totalNumbers;
        
        // Calculate how many full rotations plus the target position for colors
        const colorRotations = 3 + Math.random() * 2; // 3-5 full rotations
        const colorTargetIndex = this.colors.indexOf(targetColor);
        
        // Calculate how many full rotations plus the target position for numbers (different rate)
        const numberRotations = 4 + Math.random() * 3; // 4-7 full rotations (faster)
        const numberTargetIndex = this.numbers.indexOf(targetNumber);
        
        // Calculate the exact position to show the target color perfectly in the viewport
        const colorFinalPosition = -(colorRotations * totalColorHeight + (colorTargetIndex * colorStripHeight));
        const colorAlignedPosition = Math.round(colorFinalPosition / colorStripHeight) * colorStripHeight;
        
        // Calculate the exact position to show the target number perfectly in the viewport
        const numberFinalPosition = -(numberRotations * totalNumberHeight + (numberTargetIndex * numberStripHeight));
        const numberAlignedPosition = Math.round(numberFinalPosition / numberStripHeight) * numberStripHeight;
        
        // Verify the color calculation
        const colorAbsolutePosition = Math.abs(colorAlignedPosition);
        const colorCycle = Math.floor(colorAbsolutePosition / totalColorHeight);
        const colorPositionInCycle = colorAbsolutePosition % totalColorHeight;
        const visibleColorIndex = Math.floor(colorPositionInCycle / colorStripHeight);
        const visibleColor = this.colors[visibleColorIndex];
        
        // Verify the number calculation
        const numberAbsolutePosition = Math.abs(numberAlignedPosition);
        const numberCycle = Math.floor(numberAbsolutePosition / totalNumberHeight);
        const numberPositionInCycle = numberAbsolutePosition % totalNumberHeight;
        const visibleNumberIndex = Math.floor(numberPositionInCycle / numberStripHeight);
        const visibleNumber = this.numbers[visibleNumberIndex];
        
        // If there's a mismatch for colors, calculate the correct position
        let colorCorrectPosition = colorAlignedPosition;
        if (visibleColor !== targetColor) {
            for (let i = 0; i < totalColors; i++) {
                const testPosition = colorAlignedPosition + (i * colorStripHeight);
                const testAbsolutePosition = Math.abs(testPosition);
                const testColorCycle = Math.floor(testAbsolutePosition / totalColorHeight);
                const testPositionInCycle = testAbsolutePosition % totalColorHeight;
                const testVisibleColorIndex = Math.floor(testPositionInCycle / colorStripHeight);
                const testVisibleColor = this.colors[testVisibleColorIndex];
                
                if (testVisibleColor === targetColor) {
                    colorCorrectPosition = testPosition;
                    break;
                }
            }
        }
        
        // If there's a mismatch for numbers, calculate the correct position
        let numberCorrectPosition = numberAlignedPosition;
        if (visibleNumber !== targetNumber) {
            for (let i = 0; i < totalNumbers; i++) {
                const testPosition = numberAlignedPosition + (i * numberStripHeight);
                const testAbsolutePosition = Math.abs(testPosition);
                const testNumberCycle = Math.floor(testAbsolutePosition / totalNumberHeight);
                const testPositionInCycle = testAbsolutePosition % totalNumberHeight;
                const testVisibleNumberIndex = Math.floor(testPositionInCycle / numberStripHeight);
                const testVisibleNumber = this.numbers[testVisibleNumberIndex];
                
                if (testVisibleNumber === targetNumber) {
                    numberCorrectPosition = testPosition;
                    break;
                }
            }
        }
        
        // Animate both strips with different timing
        this.colorStrip.style.transition = 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.colorStrip.style.transform = `translateY(${colorCorrectPosition}px)`;
        
        this.numberStrip.style.transition = 'transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.numberStrip.style.transform = `translateY(${numberCorrectPosition}px)`;
        
        // Show result after animation completes
        setTimeout(() => {
            this.showResult(targetColor, targetNumber);
            this.isSpinning = false;
        }, 3000);
    }
    
    showResult(color, number) {
        const colorName = this.colorNames[color];
        const feedbackItem = this.feedbackItems[number];
        
        // DISC personality descriptions
        const personalityMessages = {
            red: '🔴 Red (Dominance): Driven, direct, and focused on results - they make quick decisions and love a challenge. They prefer feedback to be brief, to the point, and focused on performance outcomes and improvements.',
            yellow: '🟡 Yellow (Influence): Enthusiastic, sociable, and persuasive - they bring energy and optimism to every room. They respond best to feedback that is positive, encouraging, and delivered in a friendly, conversational tone.',
            green: '🟢 Green (Steadiness): Calm, supportive, and dependable - they value harmony and are loyal team players. They appreciate feedback that is gentle, thoughtful, and delivered privately with care and patience.',
            blue: '🔵 Blue (Conscientiousness): Precise, analytical, and detail-oriented - they thrive on structure, accuracy, and logic. They prefer feedback that is clear, fact-based, and supported by data or examples, with time to reflect.'
        };
        
        // Change background color
        document.body.className = `bg-${color}`;
        
        // Update result text with both personality description and feedback item
        this.result.innerHTML = `
            <div style="margin-bottom: 20px;">
                <p style="font-size: 1.1rem; line-height: 1.5; margin-bottom: 15px;"><strong>DISC Personality:</strong></p>
                <p style="font-size: 1.1rem; line-height: 1.5;">${personalityMessages[color]}</p>
            </div>
            <div>
                <p style="font-size: 1.1rem; line-height: 1.5; margin-bottom: 15px;"><strong>Feedback Example (#${number}):</strong></p>
                <p style="font-size: 1rem; line-height: 1.6; font-style: italic;">${feedbackItem}</p>
            </div>
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
