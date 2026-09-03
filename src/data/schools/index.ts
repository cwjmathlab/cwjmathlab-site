import type { SchoolMeta, SchoolData } from './types';
import { sungkyunkwanData } from './sungkyunkwan';
import { cauData } from './cau';
import { inhaData } from './inha';

export const schoolMetas: SchoolMeta[] = [
  { id: 'sungkyunkwan', name: '성균관대', tagline: '룰의 변화와 합격의 설계도', ready: true },
  { id: 'gachon', name: '가천대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'catholic', name: '가톨릭대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'konkuk', name: '건국대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'kyunghee', name: '경희대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'korea', name: '고려대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'korea-sejong', name: '고려대(세종캠)', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'kookmin', name: '국민대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'duksung', name: '덕성여대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'dongduk', name: '동덕여대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'samyook', name: '삼육대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'sogang', name: '서강대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'seokyeong', name: '서경대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'sungshin', name: '성신여대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'yonsei', name: '연세대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'yonsei-mirae', name: '연세대(미래캠)', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'ewha', name: '이화여대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'kut', name: '한국기술교육대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'hufs', name: '한국외대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'hufs-global', name: '한국외대(글로벌캠)', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'kau', name: '한국항공대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'hanyang', name: '한양대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'gyeonggi', name: '경기대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'sangmyung', name: '상명대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'sookmyung', name: '숙명여대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'soongsil', name: '숭실대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'shinhan', name: '신한대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'hongik', name: '홍익대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'hongik-sejong', name: '홍익대(세종캠)', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'dankook', name: '단국대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'kangnam', name: '강남대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'kwangwoon', name: '광운대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'pusan', name: '부산대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'uos', name: '서울시립대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'swu', name: '서울여대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'sejong', name: '세종대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'ajou', name: '아주대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'eulji', name: '을지대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'inha', name: '인하대', tagline: '시작은 낮고, 도달은 빠릅니다', ready: true },
  { id: 'tukorea', name: '한국공학대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'hanshin', name: '한신대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'suwon', name: '수원대', tagline: '논술 75% + 교과 25%', ready: false },
  { id: 'knu', name: '경북대', tagline: '논술 70% + 교과 30%', ready: false },
  { id: 'seoultech', name: '서울과학기술대', tagline: '논술 70% + 교과 30%', ready: false },
  { id: 'dongguk', name: '동국대', tagline: '논술 70% + 교과 20% + 출결 10%', ready: false },
  { id: 'cau', name: '중앙대', tagline: '전형 신설 & 다빈치 수능최저 폐지', ready: true },
];

const schoolDataMap: Record<string, SchoolData> = {
  sungkyunkwan: sungkyunkwanData,
  cau: cauData,
  inha: inhaData,
};

export const getSchoolMeta = (id: string): SchoolMeta | undefined =>
  schoolMetas.find(m => m.id === id);

export const getSchoolMetaByName = (name: string): SchoolMeta | undefined =>
  schoolMetas.find(m => m.name === name);

export const getSchoolData = (id: string): SchoolData | undefined =>
  schoolDataMap[id];
