import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">WORKOUT LIBRARY</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          TRAIN WITH INTENT. LOG
          <br />
          EVERY SET.
        </h1>
        <p>
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today's plan, and watch the week's work add up.
        </p>

        <Link className="button button-primary" href="#library">
          BROWSE WORKOUTS
        </Link>
      </div>

      {/* Workout Image */}
      <div className="hero-art">
        <Image
          src="/banner.png"
          alt="LOGO "
          width={1200}
          height={734}
          priority
          className="hero-image h-auto w-full max-w-[{width}px] object-contain"
        />
      </div>
    </section>
  );
}
