"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link href="/" className="brand"><Image src="/logo.png" alt="FITLOG" width={23} height={23} /><span>FITLOG</span></Link>
        <nav className="main-nav">
          <Link className={pathname === "/" ? "active" : ""} href="/">Workouts</Link>
          <Link className={pathname === "/my-plan" ? "active" : ""} href="/my-plan">My Plan</Link>
        </nav>
        <div className="nav-counts">
          <Link href="/my-plan">Plan <b>{plan.length}</b></Link>
          <Link href="/my-plan?tab=saved">Saved <i>{saved.length}</i></Link>
        </div>
      </div>
    </header>
  );
}