# 시네마스터(Cinemaster)

> 다양한 사용자 맞춤 서비스를 가진 영화 플랫폼

<div align='center'>

<img src="https://user-images.githubusercontent.com/90181028/206181453-7b72c4cd-fcc9-494e-84a7-61583f7261d2.png" width="33%"/>
<img src="https://user-images.githubusercontent.com/90181028/206181472-2dc41582-5637-4cde-9df5-4af541999b10.png" width="33%"/>
<img src="https://user-images.githubusercontent.com/90181028/206181488-59c13da1-34e4-4514-9539-19f27bf63f1c.png" width="29%"/>

</div>

## 👨🏻‍💻 Team

|   박지헌    |     정영우      |
| :---------: | :-------------: |
| @jiheon788  | @youngwoo-korea |
| FE / Design |     PM / RS     |

<!--
| 박지헌      | 정영우          | 이지수     | 천현우  |
| ----------- | --------------- | ---------- | ------- |
| @jiheon788  | @youngwoo-korea | @jisulee42 | @Hyyena |
| FE / Design | PM / RS         | BE / 배포  | BE / RS |
-->

## 🤔 Background

- Problem: 영화 산업은 발전하고, 영화에 대한 추천 및 리뷰를 남길 수 있는 사이트는 무수히 많지만 구독경제를 통한 OTT 플랫폼이 대다수였고, 무료로 영화에 대한 정보를 교류할 수 있는 공간은 대형플랫폼의 댓글을 통한 부속 서비스 뿐

- Solution: 누구나 자유롭게 무료로 이용할 수 있는 영화 리뷰 & 추천 플랫폼

## ✨ Features & Pages

### 1. Home

<img src="https://user-images.githubusercontent.com/90181028/208672510-bbe41110-297c-4b38-9e15-085ebc6df6dc.gif" width="98%" />

- 랭킹 영화 중 랜덤으로 배너 출력
- 랭킹, 평점랭킹, 개봉예정작, 사용자 추천 영화
- 영화 검색 기능

### 2. 로그인 및 회원가입

<img src="https://user-images.githubusercontent.com/90181028/208672534-cd432a22-0c0c-45c5-95d1-b92443369b29.gif" width="98%" />

- 로그인, 회원가입
- 소셜로그인 (카카오, 네이버)

### 3. 추천시스템

<img src="https://user-images.githubusercontent.com/90181028/208672566-e51af2db-015a-4ff6-ac4d-d3fb5b93f773.gif" width="98%" />

- 평가페이지에서 내가 본 영화에 별점을 매긴 후, 서버에 제출하면 영화 추천을 해준다. (평점기반 추천시스템)
- 평가페이지는 랜덤한 영화 20개를 보여줌
- 1회만 평가하면 계속해서 적용되어있다. 새롭게 추천받고 싶은 경우 다시 평가하기 하면된다.

### 4. Info

<img src="https://user-images.githubusercontent.com/90181028/208672578-a172b1f5-551d-46ce-96ca-f51a34de0915.gif" width="98%" />

- 유튜브 트레일러, 영화 정보들을 확인 가능
- 북마크 기능
- 유저기반, 장르기반 추천서비스
- 리뷰작성, 수정, 삭제, 조회, 별점, 리뷰 추천

### 5. 사용자 맞춤 서비스

<img src="https://user-images.githubusercontent.com/90181028/208672589-70abeb09-7ab1-43a7-a3f9-09012e08eecc.gif" width="98%" />

- 프로필 관리, 작성 리뷰 관리, 북마크 목록
- 유저 취향 분석 레포트 (별점분포도, 장르선호도, 리뷰 워드클라우드)

## 🛠 Tech Stack

`React`, `Redux`, `Jquery`, `ChartJs` / `Node.js`, `Express`, `MongoDB`, `FastAPI`, `heroku`

## ⚙️ System Architecture

![image](https://user-images.githubusercontent.com/90181028/206125875-a396628d-ed2b-47c1-9f74-79713d356ef8.png)

---

## Getting Started

### Install

```bash
$ npm i
```

### Build

```bash
$ npm run build
```

### Start

```bash
$ npm start
```

### env

- Fill out `.env` for your api key & server url

```
REACT_APP_API_KEY=${your TMDB API key}
REACT_APP_KAKAO_API_KEY=${your kakao rest api key}
REACT_APP_KAKAO_REDIRECT_URL=${your kakao redirect url}
REACT_APP_NAVER_CLIENT_ID=${your naver client ID}
REACT_APP_NAVER_CLIENT_SECRET=${your naver client secret key}
REACT_APP_NAVER_REDIRECT_URL=${your naver redirect url}
REACT_APP_SERVER_URL=${your server url}
REACT_APP_PYTHON_SERVER_URL=${your recommendation server url}
```
