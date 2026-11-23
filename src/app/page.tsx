import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import { getWorkouts } from "@/lib/api";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  let workouts = [];
  let error = "";
  try { workouts = await getWorkouts(); }
  catch (e) { error = e instanceof Error ? e.message : "Unable to load workouts."; }
  return <main className="container home-page">
    <Hero/>
    {error ? <div className="error-box"><h2>Could not load workouts</h2><p>{error}</p><p>Check your internet connection and refresh the page.</p></div> : <WorkoutLibrary workouts={workouts}/>}
  </main>;
}