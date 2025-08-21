# 4-Sided Die Roller PWA

A Progressive Web App that simulates rolling a 4-sided die (tetrahedron) with colored vertices.

## Features

- **3D Tetrahedron Die**: Visual representation of a 4-sided die with colored vertices
- **Smooth Rolling Animation**: Realistic rolling animation that slows to a stop
- **Color-Based Results**: Background changes to the color that lands on top
- **PWA Support**: Installable on mobile and desktop devices
- **Responsive Design**: Works on all screen sizes
- **Touch & Click Support**: Works with both touch and mouse interactions
- **Keyboard Accessibility**: Press Space or Enter to roll
- **Haptic Feedback**: Vibration feedback on mobile devices

## How to Use

1. **Open the app** in any modern web browser
2. **Tap or click** on the die to roll it
3. **Watch the animation** as the die rolls and comes to a stop
4. **See the result** - the background will change to the color that landed on top

## Die Configuration

The 4-sided die has 4 vertices, each with a consistent color:
- **Red vertex**: Appears on 3 faces
- **Green vertex**: Appears on 3 faces  
- **Blue vertex**: Appears on 3 faces
- **Yellow vertex**: Appears on 3 faces

When the die lands, one face is on top showing 3 colored vertices. The app randomly selects one of these colors to determine the background.

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
- **3D Graphics**: CSS transforms and animations
- **PWA Features**: Service Worker, Web App Manifest
- **Offline Support**: Cached for offline use
- **Responsive**: Mobile-first design

## Browser Support

Works on all modern browsers that support:
- CSS 3D Transforms
- Service Workers
- Web App Manifest
- ES6 Classes

## Development

To run locally:
1. Clone or download the files
2. Serve the files using a local web server
3. Open in a browser

The app requires HTTPS for PWA features to work properly.
