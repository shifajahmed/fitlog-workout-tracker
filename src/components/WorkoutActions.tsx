 "use client";
import { Bookmark, CalendarPlus, Check } from "lucide-react";
import { toast } from "sonner";
import type { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, toggleSaved } = useFitLog();
  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  function add() {
    if (inPlan) return toast.info("Already in today's plan.");
    if (plan.length >= 5) return toast.error("Your plan is full. Finish a workout to add another.");
    addToPlan(workout); toast.success("Added to today's plan.");
  }
  function save() { toggleSaved(workout); toast.success(isSaved ? "Removed from saved." : "Saved for later."); }
  return <div className="action-row">
    <button className="button button-primary" onClick={add}><CalendarPlus size={17}/>{inPlan ? "Added to today's plan" : "Add to today's plan"}</button>
    <button className="button button-outline" onClick={save}>{isSaved ? <Check size={17}/> : <Bookmark size={17}/>} {isSaved ? "Saved" : "Save for later"}</button>
  </div>;
}