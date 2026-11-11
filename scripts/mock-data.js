const MOCK_VIDEOS = [
  {
    id: 1,
    city: 'это что чизбургер с беконом',
    description: 'ого еще и картошка фри',
    time_of_day: 'morning',
    thumbnail: { url: 'assets/images/1.png' },
    poster: { url: 'assets/images/1.png' },
    video: { url: 'assets/videos/1.mp4' },
  },
  {
    id: 2,
    city: 'Легенда с чесноком',
    description: 'еще и сырный соус',
    time_of_day: 'afternoon',
    thumbnail: { url: 'assets/images/2.png' },
    poster: { url: 'assets/images/2.png' },
    video: { url: 'assets/videos/2.mp4' },
  },
  {
    id: 3,
    city: 'АХАХХАХАХАХАХАХАХ',
    description: 'ААХАХХАХА',
    time_of_day: 'night',
    thumbnail: { url: 'assets/images/3.png' },
    poster: { url: 'assets/images/3.png' },
    video: { url: 'assets/videos/3.mp4' },
  },
  {
    id: 4,
    city: 'Шашлык без мангала',
    description: 'че то тут не сходится',
    time_of_day: 'morning',
    thumbnail: { url: 'assets/images/4.png' },
    poster: { url: 'assets/images/4.png' },
    video: { url: 'assets/videos/4.mp4' },
  },
  {
    id: 5,
    city: 'Семга до зарплаты',
    description: 'шикуем',
    time_of_day: 'afternoon',
    thumbnail: { url: 'assets/images/5.png' },
    poster: { url: 'assets/images/5.png' },
    video: { url: 'assets/videos/5.mp4' },
  },
];

function getMockData(requestUrl) {
  const url = new URL(requestUrl, location.href);
  const city = url.searchParams.get('filters[city][$containsi]') || '';
  const timeArray = url.searchParams.getAll('filters[time_of_day][$eqi]');
  const pageSize = Number(url.searchParams.get('pagination[pageSize]')) || 5;
  const page = Number(url.searchParams.get('pagination[page]')) || 1;

  const filtered = MOCK_VIDEOS.filter((item) => {
    const cityOk = !city || item.city.toLowerCase().includes(city.toLowerCase());
    const timeOk = !timeArray.length || timeArray.includes(item.time_of_day);
    return cityOk && timeOk;
  });

  return {
    results: filtered.slice((page - 1) * pageSize, page * pageSize),
    pagination: {
      page,
      pageCount: Math.max(1, Math.ceil(filtered.length / pageSize)),
      pageSize,
      total: filtered.length,
    },
  };
}
