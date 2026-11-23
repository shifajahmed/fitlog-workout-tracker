"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PlanItem, Workout } from "@/types/workout";

type FitLogContextValue = {
  plan: PlanItem[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  toggleSaved: (workout: Workout) => void;
  removeFromPlan: (id: Workout["id"]) => void;
  markDone: (id: Workout["id"]) => void;
};

const FitLogContext = createContext<FitLogContextValue | null>(null);
const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      if (storedPlan) setPlan(JSON.parse(storedPlan) as PlanItem[]);
      if (storedSaved) setSaved(JSON.parse(storedSaved) as Workout[]);
    } catch {
      localStorage.removeItem(PLAN_KEY);
      localStorage.removeItem(SAVED_KEY);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    }
  }, [plan, saved, ready]);

  function addToPlan(workout: Workout) {
    if (plan.some((item) => item.id === workout.id)) return;
    if (plan.length >= 5) return;
    setPlan((current) => [...current, { ...workout, completed: false }]);
  }
  function toggleSaved(workout: Workout) {
    setSaved((current) =>
      current.some((item) => item.id === workout.id)
        ? current.filter((item) => item.id !== workout.id)
        : [...current, workout]
    );
  }
  function removeFromPlan(id: Workout["id"]) {
    setPlan((current) => current.filter((item) => item.id !== id));
  }
  function markDone(id: Workout["id"]) {
    setPlan((current) =>
      current.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  }

  const value = useMemo(() => ({
    plan, saved, addToPlan, toggleSaved, removeFromPlan, markDone
  }), [plan, saved]);

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used inside FitLogProvider");
  return context;
}