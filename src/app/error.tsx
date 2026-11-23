"use client";
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="not-found"><h1>Something went wrong</h1><p className="muted">We could not load this page.</p><button className="button button-primary" onClick={reset}>Try again</button></main>;
}