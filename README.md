# Quick IQ Test - 빠른 IQ 테스트

## 프로젝트 개요

"Quick IQ Test"는 20개의 지능 문제를 통해 사용자의 IQ를 측정하는 바이럴 심리테스트 앱입니다. 패턴 인식, 수열 논리, 논리 추론, 공간 지각, 언어 능력 5가지 카테고리를 포함하고 있습니다.

**주요 특징:**
- 20개 문제 (패턴/수열/논리/공간/언어)
- 문제당 30초 제한시간
- 상세한 결과 분석 (레이더 차트, 영역별 점수)
- IQ 점수 계산 (85~145 범위)
- 등급 및 상위 백분율 표시
- Canvas 기반 결과 이미지 생성 및 공유
- Web Share API 지원
- 12개 언어 지원 (한국어, 영어, 일본어, 중국어, 힌디어, 러시아어, 스페인어, 포르투갈어, 인도네시아어, 터키어, 독일어, 프랑스어)
- PWA 지원 (오프라인 작동)
- Dark Mode 기본 적용
- 모바일 반응형 디자인
- AdMob & AdSense 광고 수익화
- Google Analytics 4 추적
- Schema.org 마크업

## 파일 구조

```
iq-test/
├── index.html              # 메인 HTML
├── manifest.json           # PWA 설정
├── sw.js                   # Service Worker
├── icon-192.svg            # 192x192 아이콘
├── icon-512.svg            # 512x512 아이콘
├── css/
│   └── style.css          # 스타일시트 (Glassmorphism 2.0)
└── js/
    ├── app.js             # 메인 앱 로직
    ├── i18n.js            # 다국어 지원
    ├── questions.js       # 50+ 문제 데이터
    └── locales/
        ├── ko.json        # 한국어
        ├── en.json        # English
        ├── ja.json        # 日本語
        ├── zh.json        # 中文
        ├── hi.json        # हिन्दी
        ├── ru.json        # Русский
        ├── es.json        # Español
        ├── pt.json        # Português
        ├── id.json        # Bahasa Indonesia
        ├── tr.json        # Türkçe
        ├── de.json        # Deutsch
        └── fr.json        # Français
```

## 기술 스택

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **PWA:** Service Worker, Manifest.json
- **Styling:** CSS3 Glassmorphism, CSS Grid/Flexbox
- **Internationalization:** Custom i18n 모듈
- **Canvas:** 결과 이미지 생성
- **Analytics:** Google Analytics 4
- **Monetization:** Google AdMob, AdSense

## 주요 기능

### 1. 20문제 IQ 테스트
- 5가지 카테고리별 4문제씩
- 점진적 난이도 증가
- 문제당 30초 제한시간
- 진행률 바 표시

### 2. IQ 점수 계산
- 공식: `100 + ((정답률 - 50) × 0.9) + 속도보너스`
- 범위: 85 ~ 145
- 정답수 + 답변 속도 반영

### 3. 상세 결과 분석
- **IQ 점수 표시** (원형 게이지)
- **등급 및 백분율** (천재/우수/평균상/평균/노력필요)
- **레이더 차트** (5가지 카테고리별 능력)
- **점수 분석 바** (영역별 정답률)

### 4. 바이럴 기능
- **결과 이미지 생성 및 다운로드** (Canvas)
- **Web Share API 지원** (카카오톡, 트위터 등)
- **고유 URL 공유** 가능

### 5. 프리미엄 기능
- "AI 두뇌 심층 분석" (광고 시청 후)
- 등급별 AI 인사이트 제공

### 6. 다국어 지원
- 12개 언어 자동 감지 및 수동 선택
- localStorage에 언어 선택 저장
- 모든 UI 텍스트 국제화

## 설계 원칙

### 2026 UI/UX 트렌드
1. **Glassmorphism 2.0** - 반투명 카드, 블러 효과
2. **Microinteractions** - 리플 효과, 호버 애니메이션
3. **Dark Mode First** - 어두운 배경 (#0f0f23)
4. **Minimalist Flow** - 한 화면에 하나의 행동
5. **Data Visualization** - 차트로 직관적 표현
6. **Accessibility** - 44px+ 터치 타겟, WCAG 준수

### 색상 스킴
- **Primary:** #3498db (지적인 블루)
- **Background:** #0f0f23 (다크 네이비)
- **Categories:**
  - Pattern: #ff6b6b (빨강)
  - Sequence: #4ecdc4 (청록)
  - Logic: #ffe66d (노랑)
  - Spatial: #95e1d3 (민트)
  - Language: #c7b3e5 (보라)

## 콘텐츠 전략

### 저작권 자유 문제
- 일반적인 논리/패턴 인식 문제
- 공개 도메인 IQ 테스트 기반
- AI 생성 문제 미포함
- 출처 명시 및 교육 목적

### 문제 구성 (20문제)
1. **패턴 인식** (4문제) - 도형, 색상, 시각적 패턴
2. **수열 논리** (4문제) - 산술, 피보나치, 소수
3. **논리 추론** (4문제) - 삼단논법, 대소비교
4. **공간 지각** (4문제) - 회전, 3D, 반사, 방향
5. **언어 능력** (4문제) - 유추, 유의어/반의어, 문법

## 수익화 전략

### AdMob (앱)
- 상단 배너 광고
- 하단 배너 광고
- 결과 화면 전면 광고

### AdSense (웹)
- 상단/하단 디스플레이 광고
- 콘텐츠 사이 인피드 광고
- 결과 페이지 네이티브 광고

### 프리미엄 콘텐츠
- "AI 두뇌 분석" (광고 시청)
- 광고 제거 (인앱 결제)

## SEO 최적화

### Meta Tags
- `og:title`, `og:description` - SNS 공유 최적화
- `hreflang` - 다국어 SEO
- `canonical` - 중복 콘텐츠 방지

### Schema.org
- `WebApplication` 마크업
- 수구 구조화된 데이터
- 별점 및 리뷰 스키마

### Keywords
- Primary: "IQ test", "Quick IQ", "지능 테스트"
- Secondary: "패턴 인식", "논리 게임", "뇌 훈련"

## PWA 기능

### Offline Support
- Service Worker 캐싱
- 오프라인 폴백 페이지
- 제한된 기능 제공 가능

### App Install
- Add to Home Screen
- Full Screen Mode
- Custom Theme Color

### Web App Manifest
- 192x192, 512x512 아이콘
- Display: standalone
- Orientation: portrait

## 성능 최적화

### Load Time
- 리소스 사전 연결 (preconnect)
- DNS prefetch
- 임계 CSS 인라인화
- Lazy loading (필요시)

### Runtime Performance
- CSS 애니메이션 (GPU 가속)
- requestAnimationFrame 사용
- 이벤트 위임
- 메모리 효율적 DOM 조작

## 접근성 (Accessibility)

### WCAG 2.1 AA 준수
- 색상 명도 대비 ≥ 4.5:1
- 터치 타겟 ≥ 44px × 44px
- 키보드 네비게이션 지원
- 스크린 리더 호환성

### 기능
- `aria-label` 속성
- 의미있는 HTML 구조
- Focus visible 스타일
- 동작 감소 모드 지원

## 테스트 및 검증

### 브라우저 호환성
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

### 테스트 체크리스트
- [ ] HTML 유효성 검사
- [ ] CSS 문법 검사
- [ ] JavaScript 콘솔 에러 없음
- [ ] 모바일 반응형 확인 (320px~1920px)
- [ ] PWA 오프라인 동작
- [ ] 다국어 전환
- [ ] 광고 로딩
- [ ] GA4 추적
- [ ] Web Share API
- [ ] Canvas 이미지 생성

## 배포 가이드

### 1. GitHub Pages
```bash
# 저장소: github.com/username/iq-test
# URL: https://username.github.io/iq-test/
git push origin main
```

### 2. Google Play
- APK/AAB 생성 (Cordova/Flutter)
- 앱 스토어 등록
- 스크린샷/설명 번역
- 개인정보 보호정책 작성

### 3. SEO 제출
- Google Search Console 등록
- Sitemap 제출
- Robots.txt 설정
- Canonical 확인

## 향후 개선사항

### Phase 2 (추후 개발)
- [ ] 사용자 계정 및 통계
- [ ] 친구와의 스코어 비교
- [ ] 일일 IQ 챌린지
- [ ] 리더보드/랭킹
- [ ] 프리미엄 구독
- [ ] 더 많은 문제 (50+)
- [ ] 난이도 선택 옵션

### Phase 3
- [ ] AI 기반 개인화 문제
- [ ] 진보된 분석 (강점/약점)
- [ ] 학습 모드
- [ ] 게임화 (배지, 업적)
- [ ] 소셜 기능

## 문제 해결

### 일반적인 문제

**Q: 광고가 로드되지 않음**
- AdSense 승인 대기 중일 수 있음
- test ad 설정 확인
- 광고 단위 ID 확인

**Q: 다국어가 로드되지 않음**
- locale JSON 파일 경로 확인
- CORS 정책 확인 (크로스 도메인)
- 브라우저 콘솔 에러 확인

**Q: PWA 설치 안 됨**
- manifest.json MIME 타입 확인 (application/json)
- Service Worker 등록 확인
- HTTPS 필수 (localhost 제외)

## 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 문의

- 이메일: support@dopabrain.com
- 웹사이트: https://dopabrain.com/

## 버전 히스토리

- **v1.0.0** (2026.02.10) - 초기 출시
  - 20문제 IQ 테스트
  - 12개 언어 지원
  - PWA 및 오프라인 지원
  - AdMob/AdSense 통합
  - GA4 추적
