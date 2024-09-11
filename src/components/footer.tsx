import Link from "next/link";
import React from "react";

const routes = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms and Conditions", path: "/terms-conditions" },
];

export default function Footer() {
  return (
    <footer className="mt-auto flex justify-between text-xs items-center px-3 sm:px-9 text-white/50 border-t border-white/10 h-16">
      <small className="text-xs">&copy; 2024 LTmedia. All rights reserved </small>
      <ul className="flex gap-x-3 sm:gap-x-8">
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
