import type { SchoolMeta, SchoolData } from './types';
import { sungkyunkwanData } from './sungkyunkwan';
import { cauData } from './cau';
import { hanyangData } from './hanyang';
import { inhaData } from './inha';
import { kyungheeData } from './kyunghee';
import { koreaData } from './korea';
import { konkukData } from './konkuk';
import { donggukData } from './dongguk';
import { uosData } from './uos';
import { kauData } from './kau';
import { sejongData } from './sejong';
import { soongsilData } from './soongsil';
import { dankookData } from './dankook';

export const schoolMetas: SchoolMeta[] = [
  { id: 'sungkyunkwan', name: '성균관대', tagline: '룰의 변화와 합격의 설계도', ready: true },
  { id: 'gachon', name: '가천대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'catholic', name: '가톨릭대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'konkuk', name: '건국대', tagline: '157명의 좁은 문, 최저가 열쇠', ready: true },
  { id: 'kyunghee', name: '경희대', tagline: '수학 vs 수학+과학, 두 가지 시험의 경희대', ready: true },
  { id: 'korea', name: '고려대', tagline: '4합 8의 철문, 뚫으면 절반이 사라진다', ready: true },
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
  { id: 'kau', name: '한국항공대', tagline: '합격 최저점까지 공개하는 학교', ready: true },
  { id: 'hanyang', name: '한양대', tagline: '90분 2문항의 논리, 수능 최저의 1차 관문', ready: true },
  { id: 'gyeonggi', name: '경기대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'sangmyung', name: '상명대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'sookmyung', name: '숙명여대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'soongsil', name: '숭실대', tagline: '명목 38:1, 실질은 그 3분의 1', ready: true },
  { id: 'shinhan', name: '신한대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'hongik', name: '홍익대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'hongik-sejong', name: '홍익대(세종캠)', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'dankook', name: '단국대', tagline: '수능최저 없음, 광역 모집의 큰 충원 폭', ready: true },
  { id: 'kangnam', name: '강남대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'kwangwoon', name: '광운대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'pusan', name: '부산대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'uos', name: '서울시립대', tagline: '수능 최저 없음, 논술 실력만으로 승부', ready: true },
  { id: 'swu', name: '서울여대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'sejong', name: '세종대', tagline: '결시가 절반, 실질경쟁률 8:1의 학교', ready: true },
  { id: 'ajou', name: '아주대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'eulji', name: '을지대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'inha', name: '인하대', tagline: '논술 80% 시대, 학생부의 벽이 사라진다', ready: true },
  { id: 'tukorea', name: '한국공학대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'hanshin', name: '한신대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'suwon', name: '수원대', tagline: '논술 75% + 교과 25%', ready: false },
  { id: 'knu', name: '경북대', tagline: '논술 70% + 교과 30%', ready: false },
  { id: 'seoultech', name: '서울과학기술대', tagline: '논술 70% + 교과 30%', ready: false },
  { id: 'dongguk', name: '동국대', tagline: '논술이 전부인 시험', ready: true },
  { id: 'cau', name: '중앙대', tagline: '전형 신설 & 다빈치 수능최저 폐지', ready: true },
];

const schoolDataMap: Record<string, SchoolData> = {
  sungkyunkwan: sungkyunkwanData,
  cau: cauData,
  hanyang: hanyangData,
  inha: inhaData,
  kyunghee: kyungheeData,
  korea: koreaData,
  konkuk: konkukData,
  dongguk: donggukData,
  uos: uosData,
  kau: kauData,
  sejong: sejongData,
  soongsil: soongsilData,
  dankook: dankookData,
};

export const getSchoolMeta = (id: string): SchoolMeta | undefined =>
  schoolMetas.find(m => m.id === id);

export const getSchoolMetaByName = (name: string): SchoolMeta | undefined =>
  schoolMetas.find(m => m.name === name);

export const getSchoolData = (id: string): SchoolData | undefined =>
  schoolDataMap[id];
