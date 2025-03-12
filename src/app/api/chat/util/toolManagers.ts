// utils/toolManager.ts
import { tool } from "ai";
import { z } from "zod";

// Static implementation of tools that would normally come from localStorage
// This solves the server-side access issue without any fetch requests

export const loadDynamicTools = () => {
  
  return {
    // Weather tool implementation
    getWeather: tool({
      description: "Show the weather in a given city to the user",
      parameters: z.object({
        city: z.string().describe("The city to get weather for"),
      }),
      //execute: async ({ city }: { city: string }) => {
      //  // Simulate API delay
      //  await new Promise((resolve) => setTimeout(resolve, 2000));
        
      //  const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
      //  const weather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      //  const temperature = Math.floor(Math.random() * 35) + 5; // Random temp between 5-40°C
        
      //  return `Weather in ${city}: ${weather}, ${temperature}°C`;
      //},
    }),
    
    // Location tool implementation
    getCity: tool({
      description: "Get a random city location",
      parameters: z.object({}),
      //execute: async () => {
      //  // Simulate API delay
      //  await new Promise((resolve) => setTimeout(resolve, 3000));
        
      //  const cities = [
      //    "Los Angeles",
      //    "New York",
      //    "Tokyo",
      //    "London",
      //    "Moscow",
      //    "Berlin",
      //    "Kuala Lumpur",
      //    "Berne",
      //  ];
        
      //  return `Location: ${cities[Math.floor(Math.random() * cities.length)]}`;
      //},
    }),
    
    //// Send crypto tool implementation
    //sendCrypto: tool({
    //  description: "Send cryptocurrency to an address",
    //  parameters: z.object({
    //    to: z.string().describe("Recipient AVAX address"),
    //    amount: z.number().positive().describe("Amount of AVAX to send")
    //  }),
    //  execute: async ({ to, amount }: { to: string; amount: number }) => {
    //    // Simulate API delay
    //    await new Promise((resolve) => setTimeout(resolve, 4000));
        
    //    // Generate a fake transaction hash
    //    const txHash = "0x" + Array.from({length: 64}, () => 
    //      Math.floor(Math.random() * 16).toString(16)).join('');
        
    //    return `Successfully sent ${amount} AVAX to ${to}. Transaction hash: ${txHash}`;
    //  },
    //}),
    
    // Add more tools as needed
  };
};