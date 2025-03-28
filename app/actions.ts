'use server';

import { WeatherData } from "@/types/weather";
import { z } from "zod";


// This schema defines the structure of the weather data we expect to receive from the OpenWeather API.
const weatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        humidity: z.number(),
    }),
    weather: z.array(
        z.object({
            main: z.string(),
            description: z.string(),
            icon: z.string(),
        })
    ),
    wind: z.object({
        speed: z.number(),
    }),
});

// This function fetches weather data from the OpenWeather API based on the provided city name.
export async function getWeatherData(city: string): Promise<{ data?: WeatherData; error?: string }> {
    try {
        if (!city.trim()) {
            return { error: "City name is required" };
        }
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        if (!res.ok) {
            throw new Error("City not found");
        }
        const rawData = await res.json();
        const data = weatherSchema.parse(rawData);
        return { data };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: "Invalid weather data was received" };
        }
        return {
            error: error instanceof Error ? error.message : "Failed to fetch weather data",
        };
    }
}