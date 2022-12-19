<div align="center">

# 시네마스터 - 추천시스템

```
uvicorn main:app --reload
```

</div>

<div align="right">
Author: @Hyyena  
</div>  
<br>

<img src="https://img.shields.io/badge/Python-3.8-3776AB?style=flat&logo=Python&logoColor=white"/> <img src="https://img.shields.io/badge/FastAPI-0.81.0-009688?style=flat&logo=FastAPI&logoColor=white"/> <img src="https://img.shields.io/badge/NumPy-1.23.2-013243?style=flat&logo=NumPy&logoColor=white"/> <img src="https://img.shields.io/badge/pandas-1.4.3-150458?style=flat&logo=pandas&logoColor=white"/> <img src="https://img.shields.io/badge/scikit--surprise-1.1.2-a4bdd0"/>

# 📬 API

<details>
<summary>

### _1. 추천 영화 조회_

</summary>

## 유저별 추천 영화 목록 조회

> 추천 알고리즘을 이용한 유저별 맞춤 영화 목록을 조회합니다.

</br>

- **URL**

  **/recommendation/:shortId**

- **Method**

  `GET`

- **URL Params**

  Required:

  `shortId=[String]`

- **Data Params**

  None

- **Success Response**

  - Code: 200

  - Content:

    ```json
    {
      "recommendList": [
        {
          "movieId": 9909,
          "star": 4.7
        },
        {
          "movieId": 11360,
          "star": 4.3
        },
        {
          "movieId": 819,
          "star": 4.1
        }
      ]
    }
    ```

- **Error Response**

  - Code: 404 NOT FOUND

  - Content:

    ```json
    {
      "fail": "추천 영화 목록 조회에 실패했습니다."
    }
    ```

</details>

<details>
<summary>

### _2. 추천 영화 평가_

</summary>

## 평가할 영화 조회

> 평가할 영화 정보를 랜덤으로 조회합니다.

</br>

- **URL**

  **/eval/:movieCount**

- **Method**

  `GET`

- **URL Params**

  Required:

  `movieCount=[Integer]`

- **Data Params**

  None

- **Success Response**

  - Code: 200

  - Content:

    ```json
    {
      "movieNum": 3,
      "result": [
        {
          "movieId": 5418
        },
        {
          "movieId": 1307
        },
        {
          "movieId": 1221
        }
      ]
    }
    ```

- **Error Response**

  - Code: 404 NOT FOUND

  - Content:

    ```json
    {
      "fail": "평가 영화 정보 조회에 실패했습니다."
    }
    ```

</br>

## 평가한 영화 등록

> 평가한 영화 정보를 등록합니다.

</br>

- **URL**

  **/eval**

- **Method**

  `POST`

- **URL Params**

  None

- **Data Params**

  Required:

  `shortId=[String]`

  `movieId=[Integer]`

  `star=[Double]`

- **Success Response**

  - Code: 200

  - Content:

    ```json
    {
      "shortId": "123abc",
      "result": [
        {
          "movieId": 37550,
          "star": 2
        },
        {
          "movieId": 862,
          "star": 3.5
        },
        {
          "movieId": 3525,
          "star": 0.5
        }
      ]
    }
    ```

- **Error Response**

  - Code: 401 UNAUTHORIZED

  - Content:

    ```json
    {
      "fail": "유저 정보를 찾을 수 없습니다."
    }
    ```

</details>

</br>

# ✨ 추천 시스템

<details open>
<summary>

### 1. [데이터 수집 및 전처리](https://github.com/AIHub-Cinemaster/movie-csv-preprocess#%EC%B6%94%EC%B2%9C-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EC%B2%98%EB%A6%AC)

</summary>

- [MovieLens Datasets](https://grouplens.org/datasets/movielens/)

  270,000명의 사용자가 45,000개의 영화에 남긴 26,000,000개의 평가와 750,000개의 태그로 구성

  행렬 분해를 손쉽게 하기 위해 `유저 - 아이템` 평점 데이터를 `유저`, `영화`, `평점` 컬럼별로 정리하였으며, [TMDB API](https://developers.themoviedb.org/3/getting-started) 서비스를 사용하기 쉽게 모든 영화 데이터를 TMDB `영화 ID`에 맞게 변환하였습니다.

</details>

</br>

<details>
<summary>

### 2. 모델 구현

</summary>

![7](https://user-images.githubusercontent.com/70932170/191605417-fd995f49-98f3-4dbf-bcce-b8350dd5715b.png)

추천 알고리즘은 크게 두 가지로 볼 수 있습니다.

콘텐츠 기반 필터링(Content Based Filtering)과 협업 필터링(Collaborative Filtering)입니다.

콘텐츠 기반 필터링은 특정 컨텐츠를 기준으로 비슷한 컨텐츠를 추천해줍니다.

예를 들어, `유저`가 특정 `영화`를 좋아한다면 그것과 비슷한 `영화`를 추천해주는 방식입니다.

이 방식은 몇 가지 단점이 존재하는데, `유저`가 좋아하는 특정 `영화`와 유사한 `영화`만 추천해줄 수 있습니다.

즉, `유저`의 취향을 고려하지 않은, `영화` 장르 전반에 걸친 추천이 아닌 획일화된 추천을 할 우려가 있습니다.

따라서, 우리 팀은 `유저`의 취향을 고려하여 추천해줄 수 있는 협업 필터링 방식을 사용하기로 했으며 그 중 잠재 요인 협업 필터링을 채택했습니다.

협업 필터링 방식은 다른 `유저`의 데이터를 기반으로 추천을 해주는 방식입니다.

![8](https://user-images.githubusercontent.com/70932170/191605679-96dfb984-e200-498b-bc9f-0898ae5a19ef.png)
[출처](https://medium.com/@cfpinela/recommender-systems-user-based-and-item-based-collaborative-filtering-5d5f375a127f)

협업 필터링 방식은 최근접 이웃과 잠재요인으로 나뉘는데, 최근접 이웃 방식은 `유저`를 기준으로 `유저`간 선호도를 바탕으로 추천해주는 방식과 `아이템`을 기준으로 `아이템`간의 연관성을 측정하여 추천해주는 방식이 있습니다.

![9](https://user-images.githubusercontent.com/70932170/191606342-d701f065-5476-44ea-98b0-a968ead150fa.png)
[출처](https://www.kaggle.com/code/ibtesama/getting-started-with-a-movie-recommendation-system/notebook)

잠재요인 방식은 `유저`와 `아이템`에 대한 `평점` 행렬에 숨겨져 있는 잠재적 요인을 추출하여 추천해주는 방식입니다.

우리는 `유저`와 `아이템 평점`이라는 대규모 다차원 행렬을 SVD라는 차원 축소 기법으로 행렬 분해하여 잠재 요인을 추출했습니다.

![10](https://user-images.githubusercontent.com/70932170/191607013-914b397f-4400-416f-b767-22f878d3ea4f.png)
[출처](https://www.sallys.space/blog/2018/05/16/intro-to-resys/)

잠재 요인 방법은 하나의 최적화 문제라고 볼 수도 있습니다.

`유저`에 대해서 특정 `아이템`에 대한 `평점`을 얼마나 잘 예측하는지를 봐야하기 때문입니다.

이 때문에, RMSE(Root Mean Square Error)를 통해 정확도를 측정하였습니다.

RMSE가 낮을수록 좋은 성능을 보여주는데, 위 수식에서 $\hat{X}$에 대한 RMSE를 낮추는 것이 핵심입니다.

$\hat{X}$는 Utility Matrix, ${U}$는 Left Singular Matrix로 `유저`와 잠재 요인간의 관계를 나타내고, ${S}$는 Diagonal Matrix로 각 잠재 요인의 중요도를 나타내고, $V^T$는 Right Singular Matrix로 `아이템`과 잠재 행렬 간의 유사도를 나타냅니다.

이러한 행렬 분해로 추출되는 잠재 요인은 영화가 가지는 장르별 특성 선호드 등이 될 수 있습니다.

SVD는 Utility Matrix에서 잠재 요인을 추출하면서 행렬의 차원을 축소시키고, `유저`와 `아이템` 각각을 ${r}$차원을 가진 잠재 공간으로 옮깁니다.

이렇게 `유저`와 `아이템`을 직접적으로 비교하여 둘의 관계를 예측합니다.

</details>
