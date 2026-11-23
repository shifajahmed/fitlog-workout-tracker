import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";
export default async function WorkoutDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let workout;
  try { workout = await getWorkout(id); } catch { notFound(); }
  if (!workout!) notFound();
  return <main className="container detail-page">
    <Link href="/" className="back-link"><ArrowLeft size={16}/> Back to workouts</Link>
    <div className="detail-layout">
      <div className="detail-image"><img src={workout.image} alt={workout.name}/></div>
      <div className="detail-content">
        <h1>{workout.name}</h1><p className="detail-description">{workout.description}</p>
        <div className="tags detail-tags">{workout.muscleGroups?.map((tag)=><span key={tag}>{tag}</span>)}</div>
        <div className="spec-table">
          {[
            ["EQUIPMENT", workout.equipment], ["DIFFICULTY", workout.difficulty],
            ["SETS", String(workout.sets)], ["REPS", workout.reps],
            ["DURATION", `${workout.duration} min`], ["CALORIES", `${workout.caloriesBurned} kcal`],
            ["RATING", String(workout.rating)]
          ].map(([label,value])=><div className="spec-row" key={label}><b>{label}</b><span>{value}</span></div>)}
        </div>
        <h2 className="instructions-title">INSTRUCTIONS</h2>
        <ol className="instructions">{workout.instructions?.map((line,i)=><li key={i}>{line}</li>)}</ol>
        <WorkoutActions workout={workout}/>
      </div>
    </div>
  </main>;
}