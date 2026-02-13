import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResources, getCategoryLabel, getRegions, getYears, Category } from "@/lib/data";
import { ResourceCard } from "@/components/resource-card";
import { FilterBar } from "@/components/filter-bar";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    status?: string;
    region?: string;
    year?: string;
    search?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categoryParam } = await params;
  const searchParamsData = await searchParams;
  
  const category = categoryParam.toUpperCase() as Category;
  const filters = {
    category,
    status: searchParamsData.status as any,
    region: searchParamsData.region,
    year: searchParamsData.year ? parseInt(searchParamsData.year) : undefined,
    search: searchParamsData.search,
  };

  const [resources, regions, years] = await Promise.all([
    getResources(filters),
    getRegions(),
    getYears(),
  ]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-stone-900">{getCategoryLabel(category)}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <FilterBar 
          regions={regions} 
          years={years} 
          currentCategory={category}
        />

        {/* Resource Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-stone-500">
              暂无资源
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
