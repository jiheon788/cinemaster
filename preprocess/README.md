# 추천 시스템 데이터 전처리

<!-- 추천 시스템을 이용하기 위하여 유저별 여러 영화에 대한 별점(rating)이 필요한데 해당 데이터가 MovieLens 데이터 밖에 없었다.
우리 프로젝트는 기본적으로 TMDB api를 사용하기 때문에 MovieLens 데이터의 영화 ID와 TMDB api 데이터의 영화 아이디를 매칭하는 csv를 새로 만들어 준다.

##  ratings_small.csv

movieLens 데이터로써 유저별 여러 영화의 별점을 매긴 데이터

![image](https://user-images.githubusercontent.com/11794584/188097338-96b47be2-4c02-41e6-bed7-6616016e1f30.png)

## links.csv
movieLens 데이터의 imdbid와 TMDB 데이터의 tmdbID를 연결하는 데이터
![image](https://user-images.githubusercontent.com/11794584/188097500-3c2d48ab-1b35-4c5a-86fe-a15ee4ce6402.png)


## rating_tmdb_link.csv

pd.merge(links_df, ratings_df, on="movieId", ) 를 통해 위의 두 데이터를 movieId기준으로 merge를 진행한다
이 데이터가 최종 데이터고 추천 시스템에 사용한다

![image](https://user-images.githubusercontent.com/11794584/188098667-3df744c3-6541-4f37-904d-e1111cfda6f6.png) -->
