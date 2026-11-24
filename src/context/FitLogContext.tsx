
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { PlanItem, Workout } from "@/types/workout";

type FitLogContextValue = {
  plan: PlanItem[];
  saved: Workout[];
  ready: boolean;
  addToPlan: (workout: Workout) => void;
  toggleSaved: (workout: Workout) => void;
  removeFromPlan: (id: Workout["id"]) => void;
  markDone: (id: Workout["id"]) => void;
};

const FitLogContext = createContext<FitLogContextValue | null>(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [ready, setReady] = useState(false);

  // Load saved data from the browser
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan) as PlanItem[]);
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved) as Workout[]);
      }
    } catch {
      try {
        localStorage.removeItem(PLAN_KEY);
        localStorage.removeItem(SAVED_KEY);
      } catch {
        // Storage may be unavailable.
      }
    } finally {
      setReady(true);
    }
  }, []);

  // Save data whenever the plan or saved list changes
  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {
      console.error("Unable to save FitLog data.");
    }
  }, [plan, saved, ready]);

  // Add a workout to today's plan
  function addToPlan(workout: Workout) {
    setPlan((current) => {
      if (current.some((item) => item.id === workout.id)) {
        return current;
      }

      if (current.length >= 5) {
        return current;
      }

      return [
        ...current,
        { ...workout, completed: false },
      ];
    });
  }

  // Save or remove a workout
  function toggleSaved(workout: Workout) {
    setSaved((current) => {
      const alreadySaved = current.some(
        (item) => item.id === workout.id
      );

      if (alreadySaved) {
        return current.filter(
          (item) => item.id !== workout.id
        );
      }

      return [...current, workout];
    });
  }

  // Remove a workout from today's plan
  function removeFromPlan(id: Workout["id"]) {
    setPlan((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  // Mark a workout as completed or undo it
  function markDone(id: Workout["id"]) {
    setPlan((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  const value = useMemo(
    () => ({
      plan,
      saved,
      ready,
      addToPlan,
      toggleSaved,
      removeFromPlan,
      markDone,
    }),
    [plan, saved, ready]
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}
