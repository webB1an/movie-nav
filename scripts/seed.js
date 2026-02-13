require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Sample Data
const sampleResources = [
  {
    title: '肖申克的救赎',
    subtitle: 'The Shawshank Redemption',
    coverUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    description: '一个关于希望、友谊和救赎的故事。银行家安迪被冤枉杀害妻子及其情人，被判处终身监禁，在肖申克监狱中度过了19年。',
    category: 'MOVIE',
    tags: JSON.stringify(['剧情', '犯罪']),
    region: '美国',
    year: 1994,
    rating: 9.7,
    status: 'COMPLETED',
    resourceName: '肖申克的救赎.1080P.中英字幕',
    resourceUrl: 'https://example.com/Shawshank_Redemption',
  },
  {
    title: '星际穿越',
    subtitle: 'Interstellar',
    coverUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400',
    description: '在地球不再适合人类居住的未来，一群探险家利用新发现的虫洞，超越人类太空旅行的极限，在广袤宇宙中寻找人类的新家园。',
    category: 'MOVIE',
    tags: JSON.stringify(['科幻', '冒险', '剧情']),
    region: '美国',
    year: 2014,
    rating: 9.4,
    status: 'COMPLETED',
    resourceName: '星际穿越.4K.HDR',
    resourceUrl: 'https://example.com/Interstellar',
  },
  {
    title: '权力的游戏',
    subtitle: 'Game of Thrones',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400',
    description: '在虚构的维斯特洛大陆上，七大王国之间为了铁王座展开权力争夺，同时北方长城外的威胁正在逼近。',
    category: 'SERIES',
    tags: JSON.stringify(['奇幻', '剧情', '冒险']),
    region: '美国',
    year: 2011,
    rating: 9.3,
    status: 'COMPLETED',
    resourceName: '权力的游戏.全8季.1080P',
    resourceUrl: 'https://example.com/GOT',
  },
  {
    title: '绝命毒师',
    subtitle: 'Breaking Bad',
    description: '一位高中化学老师在得知自己身患绝症后，为了给家人留下遗产，开始制毒并逐渐走向犯罪深渊的故事。',
    category: 'SERIES',
    tags: JSON.stringify(['犯罪', '剧情', '惊悚']),
    region: '美国',
    year: 2008,
    rating: 9.6,
    status: 'COMPLETED',
    resourceName: '绝命毒师.全5季.4K',
    resourceUrl: 'https://example.com/BreakingBad',
  },
  {
    title: '进击的巨人',
    subtitle: 'Attack on Titan',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400',
    description: '人类生活在被巨人包围的世界中，墙内的少年艾伦发誓要消灭所有巨人，揭开世界的真相。',
    category: 'ANIME',
    tags: JSON.stringify(['动作', '奇幻', '悬疑']),
    region: '日本',
    year: 2013,
    rating: 9.5,
    status: 'COMPLETED',
    resourceName: '进击的巨人.全季.1080P',
    resourceUrl: 'https://example.com/AOT',
  },
  {
    title: '千与千寻',
    subtitle: 'Spirited Away',
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400',
    description: '10岁的少女千寻与父母误入灵异世界，父母变成猪，千寻为了救出父母，在汤婆婆的澡堂工作并经历成长的冒险。',
    category: 'ANIME',
    tags: JSON.stringify(['奇幻', '冒险', '动画']),
    region: '日本',
    year: 2001,
    rating: 9.4,
    status: 'COMPLETED',
    resourceName: '千与千寻.1080P.宫崎骏',
    resourceUrl: 'https://example.com/SpiritedAway',
  },
  {
    title: '疯狂动物城',
    subtitle: 'Zootopia',
    coverUrl: 'https://images.unsplash.com/photo-1560167016-022b78a0258e?w=400',
    description: '在一个所有动物和平共处的城市，兔子朱迪和狐狸尼克联手破案，揭露了一个威胁城市和平的阴谋。',
    category: 'MOVIE',
    tags: JSON.stringify(['动画', '喜剧', '冒险']),
    region: '美国',
    year: 2016,
    rating: 9.2,
    status: 'COMPLETED',
    resourceName: '疯狂动物城.4K.国英双语',
    resourceUrl: 'https://example.com/Zootopia',
  },
  {
    title: '流浪地球',
    subtitle: 'The Wandering Earth',
    coverUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400',
    description: '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。然而宇宙之路危机四伏，为了拯救地球，人类必须勇敢前行。',
    category: 'MOVIE',
    tags: JSON.stringify(['科幻', '灾难', '冒险']),
    region: '中国大陆',
    year: 2019,
    rating: 9.0,
    status: 'COMPLETED',
    resourceName: '流浪地球.4K.国英双语',
    resourceUrl: 'https://example.com/WanderingEarth',
  },
];

async function main() {
  console.log('开始导入种子数据...');
  
  // Clear existing data
  await prisma.resource.deleteMany({});
  
  // Create new resources
  for (const resource of sampleResources) {
    await prisma.resource.create({ data: resource });
    console.log('✓ 已创建:', resource.title);
  }
  
  console.log('\n✅ 种子数据导入完成！共导入', sampleResources.length, '条记录');
}

main()
  .catch((e) => {
    console.error('❌ 种子数据导入失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
