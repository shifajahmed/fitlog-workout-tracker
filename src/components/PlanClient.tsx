"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, Clock3, Flame, X } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";
import type { Workout } from "@/types/workout";

export default function PlanClient() {
  const { plan, saved, removeFromPlan, markDone, toggleSaved } = useFitLog();
  const params = useSearchParams();
  const [tab, setTab] = useState(
    params.get("tab") === "saved" ? "saved" : "today",
  );
  const items: Workout[] = tab === "today" ? plan : saved;
  const totalMinutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = plan.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0,
  );
  const sorted = useMemo(() => [...items], [items]);
  return (
    <main className="plan-page container">
      <div className="page-heading">
        <h1>MY PLAN</h1>
        <p className="muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>
      <div className="stats">
        <div>
          <span>Exercises</span>
          <strong className="lime">{plan.length}</strong>
        </div>
        <div>
          <span>Minutes</span>
          <strong>{totalMinutes}</strong>
        </div>
        <div>
          <span>Calories</span>
          <strong>{totalCalories}</strong>
        </div>
      </div>
      <div className="plan-toolbar">
        <div className="tabs">
          <button
            className={tab === "today" ? "selected" : ""}
            onClick={() => setTab("today")}
          >
            Today&apos;s Plan
          </button>
          <button
            className={tab === "saved" ? "selected" : ""}
            onClick={() => setTab("saved")}
          >
            Saved
          </button>
        </div>
        <span className="muted small">
          {tab === "today"
            ? `${plan.filter((x) => x.completed).length} completed`
            : `${saved.length} saved`}
        </span>
      </div>
      {sorted.length === 0 ? (
        <div className="empty-state">
          <h2>NOTHING HERE YET</h2>
          <p className="muted">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="button button-primary">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="plan-list">
          {sorted.map((item) => (
            <article
              className={`plan-row ${"completed" in item && item.completed ? "is-done" : ""}`}
              key={item.id}
            >
              <img src={item.image} alt={item.name} />
              <div className="plan-info">
                <h3>{item.name}</h3>
                <p className="muted small">{item.equipment}</p>
                <div className="card-meta">
                  <span>
                    <Clock3 />
                    {item.duration} min
                  </span>
                  <span>
                    <Flame />
                    {item.caloriesBurned} kcal
                  </span>
                </div>
              </div>
              <div className="plan-actions">
                <Link
                  href={`/workout/${item.id}`}
                  className="button button-outline"
                >
                  View Details
                </Link>
                {tab === "today" && (
                  <button
                    className="button button-primary"
                    onClick={() => {
                      markDone(item.id);
                      toast.success(
                        item.completed
                          ? "Marked as not done"
                          : "Workout completed!",
                      );
                    }}
                  >
                    <Check size={15} />
                    {item.completed ? "Undo" : "Mark as Done"}
                  </button>
                )}
                <button
                  className="icon-button"
                  aria-label="Remove"
                  onClick={() => {
                    tab === "today"
                      ? removeFromPlan(item.id)
                      : toggleSaved(item);
                    toast.success("Removed.");
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
