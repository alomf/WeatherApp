'use server';

import { WeatherData } from "@/types/weather";
import { z } from "zod";

// This schema defines the structure of the weather data we expect to receive from the OpenWeather API.
// It ensures that the data conforms to the expected format.
const weatherSchema = z.object({
    name: z.string(), // The name of the city.
    main: z.object({
        temp: z.number(), // Current temperature in Celsius.
        feels_like: z.number(), // Feels-like temperature in Celsius.
        humidity: z.number(), // Humidity percentage.
    }),
    weather: z.array(
        z.object({
            main: z.string(), // Main weather condition (e.g., Rain, Clear).
            description: z.string(), // Detailed weather description.
            icon: z.string(), // Icon code for the weather condition.
        })
    ),
    wind: z.object({
        speed: z.number(), // Wind speed in meters per second.
    }),
});

// This function fetches weather data from the OpenWeather API based on the provided city name.
// It validates the response data against the `weatherSchema` to ensure correctness.
export async function getWeatherData(city: string): Promise<{ data?: WeatherData; error?: string }> {
    try {
        // Ensure the city name is not empty or just whitespace.
        if (!city.trim()) {
            return { error: "City name is required" };
        }

        // Make a request to the OpenWeather API with the provided city name and API key.
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );

        // If the response is not OK (e.g., city not found), throw an error.
        if (!res.ok) {
            throw new Error("City not found");
        }

        // Parse the raw JSON response from the API.
        const rawData = await res.json();

        // Validate the response data against the `weatherSchema`.
        const data = weatherSchema.parse(rawData);

        // Return the validated weather data.
        return { data };
    } catch (error) {
        // Handle validation errors from Zod.
        if (error instanceof z.ZodError) {
            return { error: "Invalid weather data was received" };
        }

        // Handle other errors (e.g., network issues, invalid city name).
        return {
            error: error instanceof Error ? error.message : "Failed to fetch weather data",
        };
    }
}