'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "./actions";
import { WeatherData } from "@/types/weather";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

// SubmitButton Component
// This button is used to submit the form and fetch weather data
// It shows a loading spinner when the form is pending
// The button is disabled when the form is pending
function SubmitButton() {
  const { pending } = useFormStatus(); // Hook to check if the form is in a pending state

  return (
    <Button type="submit" disabled={pending}>
      {/* Show a spinning icon if the form is pending */}
      <Search className={`w-4 h-4 ${pending ? "animate-spin" : ""}`} />
    </Button>
  );
}

// Main Home Component
// This component handles the weather search functionality
// It allows users to input a city name and fetches the weather data
// It also displays the weather information in a card format
export default function Home() {
  // State variables
  const [weather, setWeather] = useState<WeatherData | null>(null); // Holds the fetched weather data
  const [error, setError] = useState<string>(""); // Holds any error messages

  // Function to handle form submission
  // Fetches weather data based on the city name entered by the user
  const handleSearch = async (formData: FormData) => {
    setError(""); // Clear any previous errors
    setWeather(null); // Reset weather data

    const city = formData.get("city") as string; // Get the city name from the form data
    const { data, error: weatherError } = await getWeatherData(city); // Fetch weather data

    if (weatherError) {
      setError(weatherError); // Set error state if there's an error
    }

    if (data) {
      setWeather(data); // Set weather state if data is successfully fetched
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        {/* Form for city input and search */}
        <form action={handleSearch} className="flex gap-2">
          <Input
            name="city"
            type="text"
            placeholder="Enter City Name"
            className="bg-white/90"
            required // Make the input field required
          />
          <SubmitButton /> {/* Submit button */}
        </form>

        {/* Error message display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-white bg-red-500 rounded-md p-2"
          >
            {error}
          </motion.div>
        )}

        {/* Weather data display */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                {/* City name and weather icon */}
                <div className="text-center mb-4">
                  <motion.h2
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold"
                  >
                    {weather.name} {/* City name */}
                  </motion.h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <motion.img
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} // Weather icon
                      alt={weather.weather[0].description} // Icon description
                      width={64}
                      height={64}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl font-bold"
                    >
                      {Math.round(weather.main.temp)}°C {/* Temperature */}
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-1 capitalize"
                  >
                    {weather.weather[0].description} {/* Weather description */}
                  </motion.div>
                </div>

                {/* Additional weather details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-3 gap-4 mt-6"
                >
                  {/* Feels like temperature */}
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                    <div className="mt-2 text-sm">Feels like</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.feels_like)}°C
                    </div>
                  </motion.div>

                  {/* Humidity */}
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <Droplets className="w-6 h-6 mx-auto text-blue-500" />
                    <div className="mt-2 text-sm">Humidity</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.humidity)}%
                    </div>
                  </motion.div>

                  {/* Wind speed */}
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <Wind className="w-6 h-6 mx-auto text-teal-500" />
                    <div className="mt-2 text-sm">Wind</div>
                    <div className="font-semibold">{weather.wind.speed}m/s</div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
