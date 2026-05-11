import { schoolMetas } from './schools';

export type Lecture = {
  videoId: string;
  title: string;
  schoolId: string;
  year: number;
};

export const lectures: Lecture[] = [
  {
    videoId: 'jsBXLSTfEtg',
    title: '25학년도 경북대학교 수리논술(모의) 해설',
    schoolId: 'knu',
    year: 2025,
  },
  {
    videoId: 'f62CsS2y2Zw',
    title: '22학년도 경북대학교 수리논술(모의) 해설',
    schoolId: 'knu',
    year: 2022,
  },
  {
    videoId: 'lREKMw0MujI',
    title: '25학년도 세종대학교 수리논술(모의) 해설',
    schoolId: 'sejong',
    year: 2025,
  },
  {
    videoId: 'v-LPtIGmtCI',
    title: '25학년도 성신여자대학교 수리논술(모의) 해설',
    schoolId: 'sungshin',
    year: 2025,
  },
  {
    videoId: '3MNlgmDO13U',
    title: '25학년도 중앙대학교 수리논술(모의) 해설',
    schoolId: 'cau',
    year: 2025,
  },
];

const schoolNameById = new Map(schoolMetas.map(m => [m.id, m.name]));

export const getSchoolName = (schoolId: string): string =>
  schoolNameById.get(schoolId) ?? schoolId;

export const getLecturesSortedByYearDesc = (): Lecture[] =>
  [...lectures].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return getSchoolName(a.schoolId).localeCompare(getSchoolName(b.schoolId), 'ko');
  });

export const getSchoolIdsWithLectures = (): string[] => {
  const ids = Array.from(new Set(lectures.map(l => l.schoolId)));
  return ids.sort((a, b) => getSchoolName(a).localeCompare(getSchoolName(b), 'ko'));
};

export const getThumbnailUrl = (videoId: string): string =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

export const getYoutubeUrl = (videoId: string): string =>
  `https://youtu.be/${videoId}`;
