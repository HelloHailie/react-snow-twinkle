# React Snow Twinkle

A beautiful React component that makes it easy to implement falling snow effects with twinkling animation.

![React Snow Twinkle Demo](./examples/demo.gif)

## Installation

Using npm:

```bash
npm install react-snow-twinkle
```

Or using yarn:

```bash
yarn add react-snow-twinkle
```

## Project Overview

React Snow Twinkle is a lightweight and customizable React component that adds a mesmerizing snow effect to your web applications. Perfect for creating winter-themed websites or adding a magical touch to your user interface.

## Key Features

- 🎨 Full Customization
  - Change snowflake shape (emoji, text etc.)
  - Adjust snowflake size (up to 100px)
  - Control falling speed (1-20)
  - Set opacity (0-1)
  - Change snowflake shape ("❄️" by default)
- ⚡ High Performance
  - Optimized animation rendering
  - Supports up to 700 snowflakes
  - Smooth movement
- 💻 Developer Friendly
  - Written in TypeScript for type safety
  - Easy component integration
  - Intuitive Props interface
- 🌐 Browser Compatibility
  - Supports modern browsers
  - Responsive design
  - Mobile-optimized

## Usage

### Basic Usage

```tsx
import { SnowTwinkle } from 'react-snow-twinkle';

function App() {
  return (
    <div>
      <SnowTwinkle />
      {/* Your content */}
    </div>
  );
}
```

### Custom Usage

```tsx
import { SnowTwinkle } from 'react-snow-twinkle';

function App() {
  return (
    <div>
      <SnowTwinkle
        snowflakeCount={100}
        fallSpeed={8}
        flakeSize={15}
        opacity={0.8}
        flakeShape="*"
      />
      {/* Your content */}
    </div>
  );
}
```

## Props Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| snowflakeCount | number | 500 | Number of snowflakes on screen (max 700) |
| fallSpeed | number | 5 | Snowflake falling speed (1-20) |
| flakeSize | number | 10 | Snowflake size (in px, max 100px) |
| opacity | number | 1 | Snowflake opacity (0-1) |
| flakeShape | string | "❄️" | Snowflake shape (emoji, text, etc.) |

## Contributing

We welcome contributions! If you'd like to contribute:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any issues or suggestions, please let us know through GitHub Issues.
