# 📍 Popup Capstone - Frontend
> **성수동 팝업 스토어 큐레이션 및 지도 서비스 프론트엔드**

이 프로젝트는 성수동 등 핫플레이스에서 열리는 팝업 스토어 정보를 지도상에서 한눈에 확인하고, 사용자 간 후기를 공유할 수 있는 **Popup Capstone** 프로젝트의 프론트엔드 애플리케이션입니다.

🔗 **백엔드 레포지토리:** [Popup Capstone Backend](https://github.com/yonguk98/popup_capstone)

---

## 🚀 핵심 기능 (Key Features)

- **인터랙티브 지도 (Interactive Map):** 백엔드에서 제공하는 팝업 스토어의 위치 좌표(위경도) 데이터를 바탕으로 지도 마커를 렌더링하고 상세 정보를 제공합니다.
- **회원가입 및 로그인:** JWT 토큰 기반의 사용자 인증을 통해 마이페이지 접근, 후기 작성 및 좋아요 기능을 사용할 수 있습니다.
- **관리자 대시보드 (Admin Dashboard):** 관리자 권한을 가진 사용자가 크롤링을 수동으로 트리거하거나 팝업 스토어 데이터를 관리할 수 있는 전용 페이지를 제공합니다.
- **반응형 UI (Responsive UI):** Tailwind CSS를 활용하여 모바일과 데스크톱 환경 모두에 최적화된 사용자 경험을 제공합니다.

## 🛠 기술 스택 (Tech Stack)

### Framework & Build Tool
- **Vue.js 3**
- **Vite** (빠른 HMR 및 최적화된 빌드)

### Routing & State Management
- **Vue Router** (SPA 라우팅)
- **Pinia / Vuex** (상태 관리 로직 구성)

### Styling
- **Tailwind CSS** & PostCSS

### Deployment
- **Vercel** (`vercel.json`을 통한 정적 배포)

## 📂 프로젝트 구조 (Project Structure)

```text
src/
 ├── assets/        # 이미지 리소스 (마커 아이콘, 로고 등)
 ├── components/    # 뷰 컴포넌트 (Map, Login, Signup, Admin 등)
 ├── router/        # Vue Router 설정 파일
 ├── stores/        # 상태 관리 스토어 (State Management)
 ├── App.vue        # 최상위 루트 컴포넌트
 └── main.js        # 애플리케이션 엔트리 포인트
```

## ⚙️ 환경 설정 및 실행 방법 (Getting Started)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 이상 권장)
- npm 혹은 yarn 패키지 매니저

### Installation & Run

1. **레포지토리 클론 및 폴더 이동**
   ```bash
   git clone [https://github.com/yonguk98/popup_front_capstone.git](https://github.com/yonguk98/popup_front_capstone.git)
   cd popup_front_capstone
   ```

2. **패키지 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정 (`.env` 파일 생성)**
   루트 디렉토리에 `.env` 파일을 생성하고, 백엔드 서버의 API URL 및 지도 API Key 등을 입력해야 합니다. (예시)
   ```env
   VITE_API_BASE_URL=https://<your-backend-api-url>
   VITE_MAP_API_KEY=<your-map-api-key>
   ```

4. **로컬 개발 서버 실행**
   ```bash
   npm run dev
   ```
   이후 브라우저에서 `http://localhost:5173`으로 접속하여 확인합니다.

### Build for Production
배포를 위한 정적 파일 빌드는 다음 명령어를 사용합니다.
```bash
npm run build
```

## 🚢 배포 (Deployment)

이 프로젝트는 Vercel을 통해 프론트엔드를 배포할 수 있도록 최적화되어 있습니다. 루트 디렉토리에 있는 설정 파일을 통해 SPA(Single Page Application) 라우팅 호환성이 적용되어 있습니다.
