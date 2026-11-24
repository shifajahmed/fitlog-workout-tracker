
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, Clock3, Flame, X } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import { useFitLog } from "@/context/FitLogContext";
import type { Workout } from "@/types/workout";

type PlanTab = "today" | "saved";

export default function PlanClient() {
  const {
    plan,
    saved,
    removeFromPlan,
    markDone,
    toggleSaved,
  } = useFitLog();

  const params = useSearchParams();

  const [tab, setTab] = useState<PlanTab>(
    params.get("tab") === "saved" ? "saved" : "today"
  );

  const items: Workout[] = tab === "today" ? plan : saved;

  const totalMinutes = plan.reduce(
    (sum, item) => sum + item.duration,
    0
  );

  const totalCalories = plan.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0
  );

  const completedCount = plan.filter(
    (item) => item.completed
  ).length;

  const sorted = useMemo(
    () => [...items],
    [items]
  );

  return (
    <main className="plan-page container">

      {/* Page Heading */}
      <div className="page-heading">
        <h1>MY PLAN</h1>

        <p className="muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Statistics */}
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

      {/* Tabs */}
      <div className="plan-toolbar">

        <div className="tabs">

          <button
            type="button"
            className={tab === "today" ? "selected" : ""}
            onClick={() => setTab("today")}
          >
            Today's Plan
          </button>

          <button
            type="button"
            className={tab === "saved" ? "selected" : ""}
            onClick={() => setTab("saved")}
          >
            Saved
          </button>

        </div>

        <span className="muted small">
          {tab === "today"
            ? `${completedCount} completed`
            : `${saved.length} saved`}
        </span>

      </div>

      {/* Empty State */}
      {sorted.length === 0 ? (

        <div className="empty-state">

          <h2>NOTHING HERE YET</h2>

          <p className="muted">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="button button-primary"
          >
            Go to workouts
          </Link>

        </div>

      ) : (

        /* Workout List */
        <div className="plan-list">

          {sorted.map((item) => {

            const isCompleted =
              "completed" in item && item.completed;

            return (
              <article
                className={`plan-row ${isCompleted ? "is-done" : ""}`}
                key={item.id}
              >

                {/* Workout Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="plan-image"
                />

                {/* Workout Information */}
                <div className="plan-info">

                  <h3>{item.name}</h3>

                  <p className="muted small">
                    {item.equipment}
                  </p>

                  <div className="card-meta">

                    <span>
                      <Clock3 size={15} />
                      {item.duration} min
                    </span>

                    <span>
                      <Flame size={15} />
                      {item.caloriesBurned} kcal
                    </span>

                  </div>

                </div>

                {/* Actions */}
                <div className="plan-actions">

                  <Link
                    href={`/workout/${item.id}`}
                    className="button button-outline"
                  >
                    View Details
                  </Link>

                  {tab === "today" && (

                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => {
                        markDone(item.id);

                        toast.success(
                          isCompleted
                            ? "Marked as not done"
                            : "Workout completed!"
                        );
                      }}
                    >
                      <Check size={15} />

                      {isCompleted ? "Undo" : "Mark as Done"}

                    </button>

                  )}

                  <button
                    type="button"
                    className="icon-button"
                    aria-label="Remove workout"
                    onClick={() => {

                      if (tab === "today") {
                        removeFromPlan(item.id);
                      } else {
                        toggleSaved(item);
                      }

                      toast.success("Removed.");
                    }}
                  >
                    <X size={18} />
                  </button>

                </div>

              </article>
            );
          })}

        </div>

      )}

    </main>
  );
}
