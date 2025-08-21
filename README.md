# Color Slot Machine PWA

A Progressive Web App that simulates a classic slot machine with colorful spinning reels.

## Features

- **Classic Slot Machine Design**: Authentic slot machine appearance with metallic frame and display window
- **Smooth Spinning Animation**: Realistic spinning animation that slows to a stop with easing
- **Color-Based Results**: Four vibrant colors (Red, Green, Blue, Yellow) with matching background changes
- **Pull Arm Interaction**: Authentic pull arm that responds to clicks and touch
- **PWA Support**: Installable on mobile and desktop devices
- **Responsive Design**: Works on all screen sizes
- **Touch & Click Support**: Works with both touch and mouse interactions
- **Keyboard Accessibility**: Press Space or Enter to pull the arm
- **Haptic Feedback**: Vibration feedback on mobile devices

## How to Use

1. **Open the app** in any modern web browser
2. **Pull the arm** by clicking or tapping on the red handle
3. **Watch the animation** as the colors spin and come to a stop
4. **See the result** - the background will change to match the winning color

## Color Configuration

The slot machine features four vibrant colors:
- **Red**: Bright red gradient
- **Green**: Bright green gradient  
- **Blue**: Bright blue gradient
- **Yellow**: Bright yellow gradient

Each spin randomly selects one of these colors as the winner, with the visual display always matching the announced result.

## Installation

### Desktop
1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. Follow the prompts to install

### Mobile
1. Open the app in Safari (iOS) or Chrome (Android)
2. Tap the share button
3. Select "Add to Home Screen"

## Technical Details

- **Framework**: Vanilla JavaScript, HTML5, CSS3
- **Animations**: CSS transforms and transitions with cubic-bezier easing
- **PWA Features**: Service Worker, Web App Manifest
- **Offline Support**: Cached for offline use
- **Responsive**: Mobile-first design with adaptive sizing
- **Precision Positioning**: Advanced calculation system ensures visual results always match announced results

## Browser Support

Works on all modern browsers that support:
- CSS Transforms and Transitions
- Service Workers
- Web App Manifest
- ES6 Classes

## Development

To run locally:
1. Clone or download the files
2. Serve the files using a local web server (e.g., `python3 -m http.server 8000`)
3. Open in a browser at `http://localhost:8000`

The app requires HTTPS for PWA features to work properly in production.
