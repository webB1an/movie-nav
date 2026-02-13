import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Globe, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { getResourceById, getCategoryLabel, getStatusLabel } from "@/lib/data";

interface ResourceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ResourceDetailPageProps) {
  const { id } = await params;
  const resource = await getResourceById(id);

  if (!resource) {
    return { title: "资源未找到" };
  }

  return {
    title: `${resource.title} - 影视资源导航`,
    description: resource.description || `查看 ${resource.title} 的详细信息`,
  };
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { id } = await params;
  const resource = await getResourceById(id);

  if (!resource) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(resource.category as any);
  const statusLabel = getStatusLabel(resource.status as any);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="text-white/70 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cover & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Cover Image */}
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                {resource.coverUrl ? (
                  <img
                    src={resource.coverUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                    <span className="text-6xl">🎬</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {resource.resourceUrl && (
                  <a href={resource.resourceUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      立即观看
                    </Button>
                  </a>
                )}
                <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  收藏资源
                </Button>
              </div>

              {/* Meta Info */}
              <div className="space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="space-y-3">
                  {resource.rating && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold text-white">{resource.rating.toFixed(1)}</span>
                      <span className="text-white/50">/ 10</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar className="w-4 h-4" />
                    <span>{resource.year || "未知年份"}</span>
                  </div>

                  {resource.region && (
                    <div className="flex items-center gap-2 text-white/70">
                      <Globe className="w-4 h-4" />
                      <span>{resource.region}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                      {categoryLabel}
                    </Badge>
                    <Badge variant="outline" className="border-green-500/50 text-green-300">
                      {statusLabel}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Section */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {resource.title}
              </h1>
              {resource.subtitle && (
                <p className="text-xl text-white/60 mb-4">{resource.subtitle}</p>
              )}

              {/* Tags */}
              {resource.tags && (
                <div className="flex flex-wrap gap-2">
                  {JSON.parse(resource.tags).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="border-white/20 text-white/80">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {resource.description && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">剧情简介</h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  {resource.description}
                </p>
              </div>
            )}

            {/* Additional Info */}
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">详细信息</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-white/50 text-sm mb-2">资源名称</dt>
                  <dd className="text-white font-medium">{resource.resourceName || "未提供"}</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-sm mb-2">创建时间</dt>
                  <dd className="text-white font-medium">
                    {new Date(resource.createdAt).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50 text-sm mb-2">更新时间</dt>
                  <dd className="text-white font-medium">
                    {new Date(resource.updatedAt).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50 text-sm mb-2">分类</dt>
                  <dd className="text-white font-medium">{categoryLabel}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
