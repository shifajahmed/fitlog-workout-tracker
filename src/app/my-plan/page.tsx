import { Suspense } from "react";
import PlanClient from "@/components/PlanClient";
export default function MyPlanPage() {
  return <Suspense fallback={<main className="container loading-state">Loading your plan...</main>}><PlanClient/></Suspense>;
}