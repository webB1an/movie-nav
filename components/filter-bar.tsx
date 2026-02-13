"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Status } from "@/lib/data";
import { getStatusLabel } from "@/lib/data";

interface FilterBarProps {
  regions: (string | null)[];
  years: (number | null)[];
  currentCategory: Category;
}

const statuses: Status[] = ['ONGOING', 'COMPLETED'];

export function FilterBar({ regions, years, currentCategory }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/${currentCategory.toLowerCase()}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(`/${currentCategory.toLowerCase()}`);
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-stone-600" />
        <span className="font-medium text-stone-900">筛选</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <Input
            placeholder="搜索标题..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                updateFilter("search", value);
              } else {
                updateFilter("search", null);
              }
            }}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={searchParams.get("status") || ""}
          onValueChange={(value) => updateFilter("status", value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部状态</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {getStatusLabel(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Region Filter */}
        <Select
          value={searchParams.get("region") || ""}
          onValueChange={(value) => updateFilter("region", value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="地区" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部地区</SelectItem>
            {regions.filter(Boolean).map((region) => (
              <SelectItem key={region} value={region!}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select
          value={searchParams.get("year") || ""}
          onValueChange={(value) => updateFilter("year", value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="年份" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部年份</SelectItem>
            {years.filter(Boolean).map((year) => (
              <SelectItem key={year} value={year!.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={clearFilters}>
            清除筛选
          </Button>
        </div>
      )}
    </div>
  );
}
