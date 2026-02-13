"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Tv, Sparkles, Clapperboard } from "lucide-react";

const categories = [
  { label: "电影", icon: Film, href: "/movie", color: "from-red-500 to-orange-500" },
  { label: "剧集", icon: Tv, href: "/series", color: "from-blue-500 to-cyan-500" },
  { label: "动漫", icon: Sparkles, href: "/anime", color: "from-purple-500 to-pink-500" },
  { label: "短剧", icon: Clapperboard, href: "/short", color: "from-green-500 to-emerald-500" },
];

export function CategoryTabs() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = pathname === category.href || (pathname === "/" && category.href === "/movie");
        
        return (
          <Link
            key={category.href}
            href={category.href}
            className={`
              group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
              ${isActive 
                ? "bg-gradient-to-r " + category.color + " text-white shadow-lg shadow-purple-500/30 scale-105" 
                : "bg-white/5 backdrop-blur-sm text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span>{category.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
