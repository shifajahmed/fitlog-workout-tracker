import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

function extractWorkouts(payload: unknown): Workout[] {
  if (Array.isArray(payload)) return payload as Workout[];
  if (payload && typeof payload === "object") {
    const data = payload as Record<string, unknown>;
    if (Array.isArray(data.data)) return data.data as Workout[];
    if (Array.isArray(data.workouts)) return data.workouts as Workout[];
    if (Array.isArray(data.results)) return data.results as Workout[];
  }
  throw new Error("API response format was not recognized.");
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load workouts (${response.status}).`);
  return extractWorkouts(await response.json());
}

export async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Workout not found.");
  const payload: unknown = await response.json();
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: Workout }).data;
  }
  return payload as Workout;
}