// Weather Data Types

// Represents the structure of weather data returned by an API
export interface WeatherData {
    // Name of the location (e.g., city name)
    name: string;

    // Main weather details
    main: {
        // Current temperature in the location
        temp: number;

        // Feels-like temperature (perceived temperature)
        feels_like: number;

        // Humidity percentage in the location
        humidity: number;
    };

    // Array of weather conditions
    weather: Array<{
        // Main weather condition (e.g., Rain, Clear)
        main: string;

        // Detailed description of the weather condition
        description: string;

        // Icon identifier for the weather condition
        icon: string;
    }>;

    // Wind details
    wind: {
        // Wind speed in the location
        speed: number;
    };
}