# FlixFlex Mini Project

A React Native mobile application for streaming movies and TV shows, built with modern technologies and best practices.

## UI inspiration

inspiration of the design [Funflix OTT- Streaming limitless](https://ui8.net/netro-creative/products/funflix-ott--streaming-limitless?rel=timer)

the figma design [here](https://www.figma.com/design/vchdGdNEscfjom9Zr7VpPA/flixflex?node-id=0-1&t=ExR7GmiOt7B77qhm-1)

## Features

- User authentication using Firebase
- Movie and TV show browsing
- Video playback using React Native Video
- YouTube video integration
- Bottom tab navigation
- Responsive and modern UI design
- TypeScript support for better type safety

## Prerequisites

- Node.js >= 18
- React Native development environment setup
- iOS/Android development environment
- Firebase project setup

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bouakram/flixflex_mini_project
cd flixflex_mini_project
```

2. Install dependencies:
```bash
npm install
```

3. add your mevies db api key inside cosntants/api.tsx

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Start Metro Server
```bash
npm start
```

## Project Structure

- `/src` - Main application source code
  - `/navigation` - Navigation configuration
  - `/context` - React Context providers
  - `/components` - Reusable UI components
  - `/screens` - Application screens
  - `/services` - API and external service integrations
  - `/utils` - Utility functions and helpers
