# <img align="left" src="https://user-images.githubusercontent.com/90181028/206179126-d0784533-3d36-4e84-9355-9a1720f19dcb.png" width="100px" /> CINEMASTER(시네마스터)

> 시네마스터 - client




# 🎞 CINEMASTER 소개

> 영화추천서비스 + 영화 리뷰 커뮤니티

- TMDB API를 활용한 웹 서비스 개발
- 개발 기간: 2022.08.01 ~ 2022.08.25

# 👩🏻‍💻 TEAM

| 박지헌      | 정영우          | 이지수     | 천현우  |
| ----------- | --------------- | ---------- | ------- |
| @jiheon788  | @youngwoo-korea | @jisulee42 | @Hyyena |
| FE / Design | PM / RS         | BE / 배포  | BE / RS |

# ✨ KEY FUNTIONS

- [x] 회원가입 / 로그인 / 카카오톡, 네이버 SNS 로그인
- [x] 회원 프로필관리/ 작성리뷰 관리 / 찜기능
- [x] 유저 작성 리뷰 기반 유저 취향 분석 레포트 기능 (별점분포도, 장르선호도 분석, 리뷰워드클라우드)
- [x] 평가하기 - 평점기반 추천서비스
- [x] 영화정보모달 (유튜브 트레일러, 영화정보, 장르기반추천 서비스, 유저기반추천 서비스)
- [x] 리뷰 CRUD (별점 및 리뷰 추천기능)
- [x] 영화검색

</br>

# 📑 INDEX

1. [배경](#1-배경)

2. [설계](#2-설계)

3. [디자인](#3-디자인)

4. [DEMO](#4-demo)
---

# 1. 배경

영화 산업은 발전하고, 영화에 대한 추천 및 리뷰를 남길 수 있는 사이트는 무수히 많지만 구독경제를 통한 OTT 플랫폼이 대다수였고, 무료로 영화에 대한 정보를 교류할 수 있는 공간은 카카오, 네이버의 댓글을 통한 부속 서비스 뿐이였다. 해당 상황을 보며 누구나 자유롭게 무료로 이용할 수 있으며, 디자인적으로도 우수한 영화 리뷰 & 추천 플랫폼을 개발하기로 하였다.

# 2. 설계
![image](https://user-images.githubusercontent.com/90181028/206125875-a396628d-ed2b-47c1-9f74-79713d356ef8.png)

# 3. 디자인

![image](https://user-images.githubusercontent.com/90181028/206130029-171b8cb3-d679-456e-a331-3327b024302c.png)

영화의 정보는 페이지 이동보다는 `모달`을 선택함으로써 SPA의 성격을 좀 더 살리며 깔끔한 느낌을 주고자 하였다. 모달은 메인화면 위에 팝업처럼 떠있는 창을 말한다. 모달은 메인 화면이 뒤에 보이기만하고 사용할 수 없는 모드를 만들기 때문에 모달에 있는 정보에 사용자를 집중시키기에 좋다.

모달윈도우는 두 가지 유형이 있다. 

- 사용자에 의해 유발: 사용자의 행동으로 발생하기에 사용자가 왜 그 윈도우가 나타났는지 알고있다.
- 시스템에 의해 유발: 사용자가 하고 있던 작업을 방해함, 오류메시지로 모달은 적합하지 않다.

시네마스터는 전자의 모달을 사용함으로써 사용자의 시선을 집중 시킬수 있게 하였다.  

![image](https://user-images.githubusercontent.com/90181028/206133259-b6198326-a950-44e3-8e7a-584d3187d0a5.png)

# 4. DEMO

<div align='left'>
<img src="https://user-images.githubusercontent.com/90181028/206181453-7b72c4cd-fcc9-494e-84a7-61583f7261d2.png" width="33%"/>
<img src="https://user-images.githubusercontent.com/90181028/206181472-2dc41582-5637-4cde-9df5-4af541999b10.png" width="33%"/>
<img src="https://user-images.githubusercontent.com/90181028/206181488-59c13da1-34e4-4514-9539-19f27bf63f1c.png" width="30%"/>
   
<img src="https://user-images.githubusercontent.com/90181028/206187763-482c4e51-5530-485f-b7c2-a89ffffc606c.gif" width="48%"/>
<img src="https://user-images.githubusercontent.com/90181028/206188963-b96c2950-8322-4b1f-bf5e-87332f299c6d.gif" width="48%"/>
   
</div>
