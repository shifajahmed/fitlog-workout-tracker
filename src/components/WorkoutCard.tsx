import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="workout-card">
      <div className="card-image">
        {/* Remote API images are displayed as regular img elements to support API-hosted URLs. */}
        <Image
          src={workout.image}
          alt={workout.name}
          width={640}
          height={360}
          unoptimized
        />
      </div>
      <div className="card-content">
        <div className="tags">
          {workout.muscleGroups?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h3>{workout.name}</h3>
        <p className="muted small">{workout.equipment}</p>
        <div className="card-meta">
          <span>
            <Clock3 />
            {workout.duration} min
          </span>
          <span>
            <Flame />
            {workout.caloriesBurned} kcal
          </span>
          <span>
            <Star />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
