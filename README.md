# <img align="left" src="https://user-images.githubusercontent.com/90181028/206179126-d0784533-3d36-4e84-9355-9a1720f19dcb.png" width="100px" /> CINEMASTER(시네마스터)

> 영화추천서비스 + 영화 리뷰 커뮤니티

![제목을-입력해주세요_-013](https://user-images.githubusercontent.com/90181028/208675579-f01dfbdd-48f0-410d-a79f-7946d7e33fdd.png)


# 📑 INDEX

1. [INTRODUCTION](#1-introduction)

2. [TEAM](#2-team)

3. [KEY FUNTIONS](#3-key-functions)

4. [배경](#4-배경)

5. [설계](#5-설계)

6. [디자인](#6-디자인)

7. [DEMO](#7-demo)
---


# 1. INTRODUCTION

> 영화추천서비스 + 영화 리뷰 커뮤니티

- TMDB API를 활용한 웹 서비스 개발
- 개발 기간: 2022.08.01 ~ 2022.08.25

# 2. TEAM
| 박지헌      | 정영우          |
| ----------- | --------------- |
| @jiheon788  | @youngwoo-korea | 
| FE / Design | PM / RS         | 
<!--
| 박지헌      | 정영우          | 이지수     | 천현우  |
| ----------- | --------------- | ---------- | ------- |
| @jiheon788  | @youngwoo-korea | @jisulee42 | @Hyyena |
| FE / Design | PM / RS         | BE / 배포  | BE / RS |
-->

# 3. KEY FUNCTIONS

- [x] `유저관리(User)`: 로그인, 회원가입, 소셜로그인
- [x] `개인관리(Individual)`: 프로필관리, 작성리뷰관리, 찜 기능
- [x] `리포트(Report)`: 유저 취향 분석 레포트 기능 
- [x] `영화정보모달(Modal)`: 유튜브 트레일러, 영화정보, 영화검색
- [x] `영화리뷰(Review)`: 리뷰작성, 수정, 삭제, 조회, 별점, 리뷰추천
- [x] `추천(Recommendation)`: 평점기반, 유저기반, 장르기반 추천서비스


</br>



# 4. 배경

영화 산업은 발전하고, 영화에 대한 추천 및 리뷰를 남길 수 있는 사이트는 무수히 많지만 구독경제를 통한 OTT 플랫폼이 대다수였고, 무료로 영화에 대한 정보를 교류할 수 있는 공간은 카카오, 네이버의 댓글을 통한 부속 서비스 뿐이였다. 해당 상황을 보며 누구나 자유롭게 무료로 이용할 수 있으며, 디자인적으로도 우수한 영화 리뷰 & 추천 플랫폼을 개발하기로 하였다.


# 5. 설계
![image](https://user-images.githubusercontent.com/90181028/206125875-a396628d-ed2b-47c1-9f74-79713d356ef8.png)

# 6. 디자인


영화의 정보는 페이지 이동보다는 `모달`을 선택함으로써 SPA의 성격을 좀 더 살리며 깔끔한 느낌을 주고자 하였다. 모달은 메인화면 위에 팝업처럼 떠있는 창을 말한다. 모달은 메인 화면이 뒤에 보이기만하고 사용할 수 없는 모드를 만들기 때문에 모달에 있는 정보에 사용자를 집중시키기에 좋다.

모달윈도우는 두 가지 유형이 있다. 

- 사용자에 의해 유발: 사용자의 행동으로 발생하기에 사용자가 왜 그 윈도우가 나타났는지 알고있다.
- 시스템에 의해 유발: 사용자가 하고 있던 작업을 방해함, 오류메시지로 모달은 적합하지 않다.

시네마스터는 전자의 모달을 사용함으로써 사용자의 시선을 집중 시킬수 있게 하였다.
![image](https://user-images.githubusercontent.com/90181028/206130029-171b8cb3-d679-456e-a331-3327b024302c.png)

![010](https://user-images.githubusercontent.com/90181028/207553904-9b7aab51-1b33-4f34-830e-d75ecd3ff4e0.png)




# 7. DEMO

<div align='center'>

   
![1 홈](https://user-images.githubusercontent.com/90181028/208672510-bbe41110-297c-4b38-9e15-085ebc6df6dc.gif)
![2 로그인](https://user-images.githubusercontent.com/90181028/208672534-cd432a22-0c0c-45c5-95d1-b92443369b29.gif)
![3 프로필](https://user-images.githubusercontent.com/90181028/208672553-20872b59-24d6-4eb6-bfcb-95d7a190066f.gif)
![4 추천](https://user-images.githubusercontent.com/90181028/208672566-e51af2db-015a-4ff6-ac4d-d3fb5b93f773.gif)
![5 인포](https://user-images.githubusercontent.com/90181028/208672578-a172b1f5-551d-46ce-96ca-f51a34de0915.gif)
![6 기타](https://user-images.githubusercontent.com/90181028/208672589-70abeb09-7ab1-43a7-a3f9-09012e08eecc.gif)

<img src="https://user-images.githubusercontent.com/90181028/206181453-7b72c4cd-fcc9-494e-84a7-61583f7261d2.png" width="33%"/>
<img src="https://user-images.githubusercontent.com/90181028/206181472-2dc41582-5637-4cde-9df5-4af541999b10.png" width="33%"/>
<img src="https://user-images.githubusercontent.com/90181028/206181488-59c13da1-34e4-4514-9539-19f27bf63f1c.png" width="29%"/>

</div>
