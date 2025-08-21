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
            1: 'Missed Deadlines: "Sarah, I\'ve noticed your last two project deliverables were submitted late. Let\'s talk about what\'s getting in the way and how we can adjust timelines or support to help you meet deadlines consistently."',
            2: 'Excellent Presentation: "Mark, your client presentation yesterday was clear, confident, and addressed every question with data - really impressive. Keep leaning into that style; it\'s building strong client trust."',
            3: 'Lack of Collaboration: "Jade, during team meetings, it seems you tend to push ahead without checking in with others. I\'d like to see you pause for input more often to foster better collaboration."',
            4: 'Improved Confidence: "Ali, I\'ve seen a real shift in your confidence when speaking up in meetings over the past month. Keep it up - your ideas are valuable, and your voice is being heard."',
            5: 'Micromanagement Tendencies: "Tom, I\'ve noticed you\'re closely overseeing every step your team takes. Let\'s work on trusting their process a bit more so they have room to grow."',
            6: 'Great Crisis Handling: "Priya, the way you calmly managed the system outage yesterday was outstanding. Your clear communication and quick thinking kept things under control."',
            7: 'Disrespectful Tone: "James, in this morning\'s meeting, your tone came across as dismissive when challenging Jane\'s idea. It\'s important to raise concerns respectfully so we maintain a supportive team culture."',
            8: 'Innovation and Initiative: "Elena, suggesting that new automation workflow saved the team hours of manual work. That kind of proactive thinking is exactly what we need more of."',
            9: 'Resistance to Feedback: "Luke, I noticed in our 1:1 that you became defensive when I raised concerns about the last report. Feedback is here to help you succeed, not criticize you."',
            10: 'Unclear Communication: "Dana, a few team members have been confused by your handover notes. Let\'s work together on structuring them so they\'re easier to follow next time."'
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
            red: '🔴 Red (Dominance): Driven, direct, and focused on results - they make quick decisions and love a challenge.',
            yellow: '🟡 Yellow (Influence): Enthusiastic, sociable, and persuasive - they bring energy and optimism to every room.',
            green: '🟢 Green (Steadiness): Calm, supportive, and dependable - they value harmony and are loyal team players.',
            blue: '🔵 Blue (Conscientiousness): Precise, analytical, and detail-oriented - they thrive on structure, accuracy, and logic.'
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
