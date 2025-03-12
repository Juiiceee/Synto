import { tool } from "ai";
import { z } from "zod";

export const getLocation = tool({
	description:
		"Get a random city. Make sure to ask for confirmation before using this tool.",
	parameters: z.object({}),
	execute: async () => {

    // wait 5 second
    await new Promise((resolve) => setTimeout(resolve, 5000));
		const cities = [
			//"Paris",
			"Los Angeles",
      "New York",
      "Tokyo",
      "London",
      "Moscow",
			"Berlin",
      "Kuala Lumpur",
			"Berne",
		];
		const randomCity =
			cities[Math.floor(Math.random() * cities.length)];
		return `La ville générée est : ${randomCity}`;
	},
});