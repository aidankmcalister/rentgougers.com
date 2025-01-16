import { json } from "@remix-run/node"; // or "@remix-run/react" depending on your setup
import { fetchSubmissionsData } from "../api/index"; // Adjust the path as necessary

export const loader = async () => {
  try {
    const data = await fetchSubmissionsData();
    return json(data);
  } catch (error) {
    console.error("Error loading submissions data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
};
