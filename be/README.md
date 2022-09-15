# 영화 추천 커뮤니티 웹사이트 - 백엔드 

## :grin: 01. 중요 모듈
|모듈|버전|
|------|---|
|ExpressJs|![Generic badge](https://img.shields.io/badge/version-4.18.1-green.svg)|
|mongodb|![Generic badge](https://img.shields.io/badge/version-4.8.1-red.svg)|
|mongoose|![Generic badge](https://img.shields.io/badge/version-6.4.5-blue.svg)|

## :blush: 02. API 설계   
* Rule
    * Method tpye이 `get` 시, param 에 데이터 전송
    * `get` tpye에 data 넣고 싶을 시 param에 넣거나 post 로 변경하여 body에 넣고 전송



**a. 유저 : /user** 
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|로그인|POST|/signUp|{ </br>email: String, </br>password: String</br>}|{</br>result :“회원가입이 완료되었습니다”</br>}|
|회원가입|POST|/signUp|{</br>email: String, </br>password:String, </br>name: String</br>}|{</br>result:"회원가입이 완료되었습니다."</br>}|
|정보 조회|GET|/:shortId|-|{</br>"_id": String,</br>"email":String,</br>"name": String,</br>"type": String(local, naver, kakao),</br>"profileImg": String,</br>"shortId": String,</br>"createdAt": DateTime,</br>"updatedAt": DateTime,</br>"__v": Number</br>}|
|유저 정보 수정|POST|/update|{</br>shortId: String,</br>password: String, </br>name: String, </br>type: String(lcaol, naver, kakao)</br>}|{</br>result: "유저 정보가 수정되었습니다.”</br>}|



**b. 영화 북마크 : /cart**
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|북마크 조회|GET|/list/:shortId|-|{</br>empty: Boolean, </br>result: List(String)}|
|북마크 등록 및 삭제|POST|/toggle|{</br>ShortId: String, </br>MovieId: String</br>}|{</br>bookmark: true,</br>result: "찜 목록에 '추가' 되었습니다."</br>} {</br>bookmark: false,</br>result: "찜 목록에서 '삭제' 되었습니다"</br>}|

**c. 영화 평점 : /star**
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|별점 조회|GET|/list/:shortId|-|{</br>empty: Boolean, </br>result: List(Object(movieId:String, star:Number, genreList: List(String)))</br>}|
|별점 등록 및 수정|POST|/add|{</br>shortId: String, </br>movieId:String, </br>star: Number</br>}|{</br>data: List(Object(movieId:String, star:Number, genreList: List(String))), </br>result: "별점 목록에 추가 되었습니다."</br>}|
|영화별 평균 별점|GET|/average/:movieId|-|{</br>movieId: String, </br>result: Number</br>}|

**d. 영화 리뷰**
**d-1. 전체 리뷰 : /reviewlist**
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|리뷰 조회|GET|/:movieId|-|[</br>{</br>"title":String,</br>"content":String,</br>"author":String,</br>"createdAt":Datetime,</br>"updatedAt":Datetime</br>}</br>]|

**d-2. 유저 별 리뷰 : /review**
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|유저별 리뷰  조회|GET|/user/:shortId|-|[</br>{</br>“movieId”: String,</br>“reviewId”: String, </br>“shortId”: String, </br>“author”: String, </br>“profileImg”: String, </br>“title”: String, </br>“content”: String, </br>“star”: String, </br>“createdAt”: Datetime, </br>“updatedAt”: Datetime, </br>“likeCount”: Number</br>}</br>]|
|작성된 리뷰 조회|GET|/find/:shortId/:reviewId|-|[</br>{</br>“movieId”: String,</br>“reviewId”: String, </br>“shortId”: String, </br>“author”: String, </br>“profileImg”: String, </br>“title”: String, </br>“content”: String, </br>“star”: String, </br>“createdAt”: Datetime, </br>“updatedAt”: Datetime, </br>“likeCount”: Number</br>}</br>]|
|리뷰 작성|POST|/add|{</br>“shortId”: String,</br>“movieId”: String, </br>“title”: String, </br>“content”: String, </br>“genreList” : List(String)</br>}|{</br>result: “리뷰가 작성되었습니다.”</br>}|
|리뷰 수정|POST|/update|{</br>“shortId”: String,</br>“movieId”: String,</br>“title”: String,</br>“content”: String</br>}|{</br>result: “리뷰가 수정되었습니다.”</br>}|
|리뷰 삭제|POST|/delete|{</br>“shortId”: String,</br>“movieId”: String</br>}|{</br>result: “리뷰가 삭제되었습니다.”</br>}|

**e. 리뷰 좋아요 : /like**
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|좋아요 생성 및 삭제|POST|/|{</br>“shortId”: String, </br>“reviewId”: String</br>}|{</br>“shortId”: String,</br>“reviewId”: String,</br>“like”: Boolean,</br>“likeCount”: Number</br>}|

**f. 평가하기 : /eval**
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|평가할 데이터 랜덤 조회|GET|/:movieCount|-|{</br>movieNum : Number, </br>"result": List(Number)</br>}|
|평가한 데이터 입력|POST|/|{</br>"shortId" : String, </br>"movieId" : String, </br>”star” : Number</br>}|{</br>"data": List(Object("movieId":String, "star":Number, "_id":String), </br>”result” : "별점 목록에 없던 영화라 추가 되었습니다.”</br>}|

**g. 추천하기 : /recommendation**
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|추천 영화 목록 조회|GET|/:shortId|-|{</br>"recommendList": List(Object("movieId" : String,"star":Number))</br>}|

**h. 리포트 : /report**
|기능|Type|End point|Req|Response|
|------|---|---|---|---|
|별점 분포도 조회|GET|/dist/:shortId|-|{</br>"recommendList": List(Object("movieId" : String,"star":Number))</br>}|
|장르 선호도 조회|GET|/prefer/:shortId|-|{</br>"success": Boolean,</br>"result": Object(cnt:Number, aver:Number, sum:Number, feq:Number), </br>"msg": "별점 평균, 별점 개수, 최빈 별점 조회에 성공 했습니다."</br>}|

## :smirk: 03. DB 설계
![image](https://user-images.githubusercontent.com/11794584/187949239-955da38b-dfd7-40cc-b007-19a28fd148c5.png)

![image](https://user-images.githubusercontent.com/11794584/188101783-c57cfae6-4cb9-43d4-966b-4f77d3181f6a.png)

Cloud MongoDB 를 사용하여 동일한 데이터로 테스트하도록 세팅
