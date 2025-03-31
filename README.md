
# WeatherApp

![WeatherApp image](public/appimage.png)

## Overview

WeatherApp is a weather forecasting web application built with Next.js, TypeScript, Tailwind CSS, Shadcn, Zod, and the OpenWeatherAPI. This app provides real-time weather updates and a basic forecast for the user. It offers a sleek, modern UI and allows users to input a location to see its current weather conditions.

## Getting Started

To get started with the app, follow these steps:

### 1. Install dependencies
Install all necessary packages by running:

```bash
npm install
```

### 2. Run the development server
Start the development server using:

```bash
npm run dev
```

Once the server is running, open your browser and go to [http://localhost:3000](http://localhost:3000) to see the app in action.

## Architecture

The application is built using the following technologies:

- **Next.js**: Provides a fast and scalable React framework.
- **TypeScript**: Ensures type safety for better development experience and fewer runtime errors.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Shadcn**: Used to build custom components like Buttons, Cards, and Input fields for better consistency and customization.
- **Zod**: A TypeScript-first schema declaration and validation library to handle the weather data from OpenWeatherAPI.
- **OpenWeatherAPI**: The weather data source for fetching current weather information and forecasts.

## Features

- **Current Weather**: Displays the current weather for any given location.
- **Weather Forecast**: Shows the daily forecast for the next few days.
  
## Future Improvements

The app is designed to be simple and functional, but there are several areas for improvement:

1. **Extended Forecast**: Currently, the app shows the weather for the day. In the future, it will be enhanced to display a weekly forecast, allowing users to get a better understanding of upcoming weather patterns.
   
2. **Unit Testing**: The app currently lacks unit tests. As the app grows in complexity, adding unit tests will ensure the app remains reliable and that future changes don’t introduce bugs.

3. **UI Enhancements**: While the app provides basic functionality, there is room for improvement in the user interface. In the future, we aim to provide a more detailed weather overview, improve responsiveness, and enhance the overall user experience with animations and transitions.

4. **Error Handling**: Improve handling for scenarios where the user inputs invalid locations or when the OpenWeatherAPI doesn't return data.

## Why This Stack?

The chosen stack for this app ensures an optimal balance between performance and ease of development:

- **Next.js** provides a fast, SEO-friendly solution with minimal setup.
- **TypeScript** improves code reliability with strict typing.
- **Tailwind CSS** allows rapid styling with utility classes, avoiding the complexity of writing custom CSS from scratch.
- **Shadcn** simplifies UI component creation and reusability.
- **Zod** offers a clean, TypeScript-first approach for validating the incoming weather data, ensuring it matches the expected format.
- **OpenWeatherAPI** offers a reliable and easy-to-use service for fetching weather data.
