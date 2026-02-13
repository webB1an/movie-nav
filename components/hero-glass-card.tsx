import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export function HeroGlassCard() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 animate-pulse" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            实时更新，免费观看
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            发现下一个
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              精彩影视
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            全网最全的影视资源导航站，收录电影、剧集、动漫、短剧等海量资源
            <br />
            支持在线播放，每天更新，完全免费
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="搜索电影、剧集、动漫..."
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <button className="absolute right-2 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30">
                搜索
              </button>
            </div>
          </div>

          {/* Quick Start Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/movie"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-xl shadow-white/20 hover:scale-105"
            >
              开始浏览
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/anime"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
            >
              动漫专区
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
