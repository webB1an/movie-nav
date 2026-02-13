import Link from "next/link";
import { CategoryTabs } from "@/components/category-tabs";
import { HeroGlassCard } from "@/components/hero-glass-card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <HeroGlassCard />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Category Navigation */}
        <div className="mb-12">
          <CategoryTabs />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            title="海量资源"
            description="收录全网最新最热的影视资源"
            icon="🎬"
          />
          <FeatureCard
            title="极速更新"
            description="每日同步更新，第一时间获取"
            icon="⚡"
          />
          <FeatureCard
            title="高清画质"
            description="支持多种清晰度，满足不同需求"
            icon="📺"
          />
          <FeatureCard
            title="免费观看"
            description="所有资源完全免费，无会员限制"
            icon="💎"
          />
        </div>

        {/* Recent Resources */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">最新资源</h2>
            <Link href="/movie" className="text-purple-400 hover:text-purple-300 transition-colors">
              查看全部 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 这里会显示资源卡片 - 实际内容由分类页提供 */}
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-white/50">
          <p>© 2024 影视资源导航 - 所有资源均来自互联网</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/60">{description}</p>
    </div>
  );
}

function EmptyCard() {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center h-64">
      <span className="text-white/30">资源加载中...</span>
    </div>
  );
}
