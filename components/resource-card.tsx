"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Resource, Category, Status, getCategoryLabel, getStatusLabel } from "@/lib/data";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const categoryLabel = getCategoryLabel(resource.category as Category);
  const statusLabel = getStatusLabel(resource.status as Status);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 border-white/20 bg-white/10 backdrop-blur-lg">
      {/* Cover Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {resource.coverUrl ? (
          <img
            src={resource.coverUrl}
            alt={resource.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <span className="text-white/50 text-4xl">🎬</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        {resource.rating && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {resource.rating.toFixed(1)}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            variant={resource.status === "COMPLETED" ? "default" : "secondary"}
            className="bg-black/60 backdrop-blur-sm hover:bg-black/70"
          >
            {statusLabel}
          </Badge>
        </div>

        {/* Hover Actions */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="space-y-2">
            <Link 
              href={`/resource/${resource.id}`}
              className="block w-full text-center bg-white/90 hover:bg-white text-black py-2 rounded-md text-sm font-medium transition-colors"
            >
              查看详情
            </Link>
            {resource.resourceUrl && (
              <a
                href={resource.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                立即观看
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="p-4 pb-2">
        <h3 className="font-semibold text-white line-clamp-1">{resource.title}</h3>
        {resource.subtitle && (
          <p className="text-sm text-white/60 line-clamp-1">{resource.subtitle}</p>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
          <span>{resource.year}</span>
          {resource.region && (
            <>
              <span>•</span>
              <span>{resource.region}</span>
            </>
          )}
        </div>

        {resource.tags && (
          <div className="flex flex-wrap gap-1">
            {JSON.parse(resource.tags).slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs border-white/20 text-white/70">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full text-xs">
          <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20">
            {categoryLabel}
          </Badge>
          <span className="text-white/40 text-xs">
            {new Date(resource.createdAt).toLocaleDateString("zh-CN")}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
