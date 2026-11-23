 "use client";
import { useMemo, useState } from "react";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary({ workouts }: { workouts: Workout[] }) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => [...workouts].sort((a,b) => {
    if (sort === "duration") return a.duration - b.duration;
    if (sort === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  }), [workouts, sort]);
  return (
    <section id="library" className="library-section">
      <div className="section-heading">
        <div><h2>THE LIBRARY</h2><p className="muted">Twelve lifts. A stronger you, one session at a time.</p></div>
        <label className="sort-control">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Featured</option><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option>
        </select></label>
      </div>
      {workouts.length ? <div className="workout-grid">{sorted.map((workout) => <WorkoutCard key={workout.id} workout={workout}/>)}</div> : <p className="empty">No workouts found.</p>}
    </section>
  );
}