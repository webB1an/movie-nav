import { prisma } from './prisma';

export type Category = 'MOVIE' | 'SERIES' | 'ANIME' | 'SHORT';
export type Status = 'ONGOING' | 'COMPLETED';

export type ResourceFilters = {
  category?: Category;
  status?: Status;
  region?: string;
  year?: number;
  search?: string;
};

export async function getResources(filters?: ResourceFilters) {
  const where: any = {};
  
  if (filters?.category) {
    where.category = filters.category;
  }
  if (filters?.status) {
    where.status = filters.status;
  }
  if (filters?.region) {
    where.region = filters.region;
  }
  if (filters?.year) {
    where.year = filters.year;
  }
  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { subtitle: { contains: filters.search } },
      { description: { contains: filters.search } },
    ];
  }

  return prisma.resource.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getResourceById(id: string) {
  return prisma.resource.findUnique({
    where: { id },
  });
}

export async function getCategories(): Promise<Category[]> {
  return ['MOVIE', 'SERIES', 'ANIME', 'SHORT'];
}

export async function getRegions() {
  const resources = await prisma.resource.findMany({
    select: { region: true },
    distinct: ['region'],
  });
  return resources.map(r => r.region).filter(Boolean);
}

export async function getYears() {
  const resources = await prisma.resource.findMany({
    select: { year: true },
    distinct: ['year'],
    orderBy: { year: 'desc' },
  });
  return resources.map(r => r.year).filter(Boolean);
}

export function getCategoryLabel(category: Category) {
  const labels: Record<Category, string> = {
    MOVIE: '电影',
    SERIES: '剧集',
    ANIME: '动漫',
    SHORT: '短片',
  };
  return labels[category];
}

export function getStatusLabel(status: Status) {
  const labels: Record<Status, string> = {
    ONGOING: '连载中',
    COMPLETED: '已完结',
  };
  return labels[status];
}
