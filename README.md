# 🧩 B2B 통계 대시보드 생성기

> 사내 운영 모니터링 개선을 위해 개발했던 통계 대시보드를 기반으로, 아키텍처·성능·UI를 전면 재설계한 프로젝트

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 프로젝트 정보

| 항목 | 내용 |
|------|------|
| **프로젝트명** | B2B 통계 대시보드 생성기 |
| **진행 기간** | 2025.06 ~ 2025.08 |
| **개발 인원** | 2명 (프론트엔드 1, 백엔드 1) |
| **배포 주소** | [https://rag-dashboard-console.vercel.app/](https://rag-dashboard-console.vercel.app/) |

### 🔗 Repository
- **Frontend**: [https://github.com/ParkYongHo1/Rag-Dashboard-Console](https://github.com/ParkYongHo1/Rag-Dashboard-Console)
- **Backend**: [https://github.com/qldmq/dashboardTemplate](https://github.com/qldmq/dashboardTemplate)

---

## 👥 팀원

| 이름 | 역할 | GitHub |
|------|------|--------|
| 박용호 | 프론트엔드 개발 | [GitHub](https://github.com/ParkYongHo1) |
| 김서현 | 백엔드 개발 | [GitHub](https://github.com/qldmq) |

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| Language | TypeScript |
| Framework | React |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| HTTP Client | Axios |
| Styling | TailwindCSS |
| Charts | Chart.js |
| Routing | React Router |
| Build Tool | Vite |
| Deploy | Vercel |

---

## ✨ 핵심 기능

### 📊 대시보드 생성
- 기업별 데이터베이스 테이블 동적 로드
- 사용자 정의 그룹 항목 및 집계 항목 커스터마이징
- 조건 기반 통계 쿼리 자동 생성

### 📈 데이터 시각화
- 그룹항목 × 집계항목 **교차 분석표** 구현
- useQueries 기반 병렬 데이터 페칭으로 다중 API 호출 최적화
- 빈 데이터·로딩 상태에 대한 일관된 폴백 UI 설계

### 🔐 인증 시스템
- JWT 기반 Access Token / Refresh Token 인증
- 토큰 만료 30초 전 사전 갱신 시스템
- Axios 인터셉터를 통한 401 에러 자동 처리 및 요청 재시도

### 🛡️ 에러 처리
- Error Boundary를 통한 React 컴포넌트 에러 캐치 및 복구
- 전역 에러 처리로 일관된 사용자 피드백 제공

---

## 🏗️ 아키텍처

### Feature-Sliced Design (FSD)

기능 추가·수정 시 코드 탐색 효율을 높이기 위해 FSD 아키텍처 적용
```
src/
├── app/          # 앱 초기화, 프로바이더, 라우팅
├── pages/        # 페이지 컴포넌트
├── widgets/      # 독립적인 UI 블록 조합
├── features/     # 비즈니스 기능 단위
├── entities/     # 도메인 엔티티 (타입, API, 상수)
└── shared/       # 공통 UI, 유틸, 훅
```

- 계층 분리로 관심사 명확화 및 모듈 간 의존성 단방향 흐름 확립
- TanStack Query로 서버 상태 캐싱 및 동기화
- Zustand로 클라이언트 상태 경량화하여 상태 관리 책임 분리

---

## 🔧 트러블슈팅

### 1. 토큰 갱신 경쟁 상태로 인한 무한 루프

**문제**
- Access Token 만료 시 사전 갱신(만료 30초 전 타이머)과 401 인터셉터 갱신이 동시에 실행
- Refresh Token Rotation 정책으로 토큰이 중복 사용되면서 한쪽 요청 실패 → 재시도 → 무한 루프 발생

**원인**
- 두 갱신 로직이 각각 독립된 상태(`isRefreshing`, `interceptorRefreshPromise`)로 관리되어 서로의 진행 상태를 인식하지 못함

**해결**
- 싱글톤 Promise 패턴 도입하여 토큰 갱신 요청을 단일 진입점으로 통합
- 동시 요청 시에도 기존 Promise를 공유하여 단일 API 호출 보장

---

### 2. Resize 이벤트 중첩으로 인한 렌더링 병목

**문제**
- 반응형 전환 시 프레임 드랍 및 버벅거림 발생

**원인**
- Performance Profiling 결과, Resize 이벤트가 중첩 호출되어 과도한 렌더링 발생

**해결**
- Debounce 적용으로 렌더링 횟수 **73% 감소**
- 반응형 전환 시 부드러운 UX 확보

---

## 📱 주요 화면

### 🔐 로그인 페이지
- JWT 토큰 기반 인증
- 기업별 로그인 지원
- 자동 로그인 유지

### 📊 대시보드 생성 페이지
- 테이블 선택 인터페이스
- 그룹/집계 항목 설정
- 실시간 프리뷰

### 📈 통계 분석 페이지
- 도넛 차트 시각화
- 1차원 상세 데이터 테이블
- 2차원 교차 분석표 (그룹 × 집계 매트릭스)
- 날짜 범위 필터링

---

## 🎯 주요 성과

### 기술적 성과
- ✅ **아키텍처 개선**: FSD 적용으로 코드 탐색 및 유지보수 효율 향상
- ✅ **인증 안정성**: 싱글톤 Promise 패턴으로 토큰 갱신 경쟁 상태 해결
- ✅ **성능 최적화**: Debounce 적용으로 렌더링 횟수 73% 감소
- ✅ **타입 안정성**: TypeScript로 런타임 에러 사전 방지

### 사용자 경험
- ✅ **무중단 인증**: 토큰 갱신 시 사용자 경험 중단 없음
- ✅ **실시간 피드백**: 설정 변경 시 즉시 차트 업데이트
- ✅ **에러 복구**: 네트워크 오류 시 자동 재시도

---

## 🔗 관련 링크

- 🌐 **Live Demo**: [https://rag-dashboard-console.vercel.app/](https://rag-dashboard-console.vercel.app/)
- 💻 **Frontend Repository**: [https://github.com/ParkYongHo1/Rag-Dashboard-Console](https://github.com/ParkYongHo1/Rag-Dashboard-Console)
- ⚙️ **Backend Repository**: [https://github.com/qldmq/dashboardTemplate](https://github.com/qldmq/dashboardTemplate)
