import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="brand">
        <Image src="/logo.png" alt="FITLOG Logo" width={23} height={23} />

        <span>FITLOG</span>
      </div>

      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}
