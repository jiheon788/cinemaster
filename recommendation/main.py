from typing import List, Union
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import certifi

import pandas as pd
from surprise import Reader, Dataset, SVD

from recommend import get_not_seen_movie, recommend

reader = Reader()

ratings = pd.read_csv("data/ratings_small.csv")
movies = ratings.movieId
# print(movies)

data = Dataset.load_from_df(ratings[["userId", "movieId", "rating"]], reader)
# print(data)

# 학습/테스트 데이터 분리
train_set = data.build_full_trainset()
# print("----------")
# print(train_set)
# print("----------")

test_set = train_set.build_testset()
# print(test_set)
# print("----------")

# SVD(Singular Value Decomposition) : 특이값 분해
algo = SVD()
algo.fit(train_set)

# prediction = algo.test(test_set)
# print(prediction)
# print("END TEST")
# print(accuracy.rmse(prediction))


class Movies(BaseModel):
    movieId: str
    star: float


class Item(BaseModel):
    shortId: str
    movieList: List[Movies]


app = FastAPI()

# cors 해결
origins = [
    "https://cinemaster-four.herokuapp.com",
    "https://cinemaster-four.herokuapp.com:5000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

username = "Hyyena"
password = "TxOPQ4CyleYvXi8D"
client = MongoClient(
    "mongodb+srv://%s:%s@cinemaster.edkazqq.mongodb.net/cinema?retryWrites=true&w=majority" % (username, password), tlsCAFile=certifi.where())

print(client.list_database_names())

db = client.cinema
print(db)
print(db.users)


# 유저별 추천 영화 목록 조회
@app.get(
    "/recommendation/{shortId}",
    responses={
        200: {
            "description": "추천 영화 목록 조회 성공",
            "content": {
                "application/json": {
                    "example": {
                        "recommendList": [
                            {
                                "movieId": 31,
                                "star": 3.3
                            },
                            {
                                "movieId": 1029,
                                "star": 3.7
                            },
                            {
                                "movieId": 1061,
                                "star": 3.6
                            }
                        ]
                    }
                }
            }
        }
    }
)
async def recommend_movie(shortId: str):
    recommends = db.recommends

    auth_data = db.users.find_one({"shortId": shortId}, {"_id": 0})
    print(auth_data)

    if not auth_data:
        raise HTTPException(status_code=404, detail="User not found")

    recommend_data = recommends.find_one({"userRef": auth_data})

    if not recommend_data:
        result = {"result": "추천 영화 목록 조회 실패"}
        return result
    else:
        # recommends collection에서 랜덤 데이터 추출
        pipeline = [
            {"$match": {"userRef": auth_data}},
            {"$unwind": "$recommendList"},
            {"$sample": {"size": 20}}
        ]

        random_data = recommends.aggregate(pipeline)

        result = []
        for data in random_data:
            result.append(data["recommendList"])

    return {"recommendList": result}


# 평가할 영화 랜덤 조회
@app.get(
    "/eval/{movieCount}",
    responses={
        200: {
            "description": "랜덤 평가 영화 조회 성공",
            "content": {
                "application/json": {
                    "example": {
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
                }
            }
        }
    }
)
async def random_movie(movieCount: int):
    # CSV 파일에서 movieCount 만큼 랜덤 추출
    df = ratings.sample(movieCount, replace=False)

    # DataFrame을 Numpy 배열로 변환
    col_movie_id = df["movieId"].to_numpy()
    col_rating = df["rating"].to_numpy()

    # Numpy 배열을 list로 변환
    movie_id = col_movie_id.tolist()
    rating = col_rating.tolist()

    result = []
    for movieId in movie_id:
        dict = {"movieId": movieId}
        result.append(dict)

    return {"movieNum": movieCount, "result": result}


# 평가 데이터 저장
@app.post(
    "/eval",
    responses={
        200: {
            "description": "평가 영화 제출 완료!",
            "content": {
                "application/json": {
                    "example": {
                        "shortId": "shortId",
                        "result": [
                            {
                                "movieId": "37550",
                                "star": 2
                            },
                            {
                                "movieId": "862",
                                "star": 3.5
                            },
                            {
                                "movieId": "3525",
                                "star": 0.5
                            }
                        ]
                    }
                }
            }
        }
    }
)
async def write_movie(item: Item):
    short_id = item.shortId

    auth_data = db.users.find_one({"shortId": short_id}, {"_id": 0})
    print(auth_data)

    if not auth_data:
        raise HTTPException(status_code=404, detail="User not found")

    movie_arr = []
    star_arr = []

    # 빈 배열에 요청 받은 영화 ID와 평점을 저장
    for movie in item.movieList:
        movie_arr.append(movie.movieId)
        star_arr.append(movie.star)

    # 영화 ID와 평점 배열을 DataFrame으로 변환
    df = pd.DataFrame(
        {"userId": short_id, "movieId": movie_arr, "rating": star_arr})

    # 변환한 DataFrame을 기존 DataFrame에 추가
    new_df = ratings.append(df, ignore_index=True)

    # 새로운 DataFrame을 CSV 파일로 저장
    new_df.to_csv("data/ratings_small.csv", index=False)

    result = []
    for movie_id, star in zip(movie_arr, star_arr):
        dict = {"movieId": movie_id, "star": star}
        result.append(dict)

    recommends = db.recommends

    # ---------- 추천 알고리즘 ----------
    userId = short_id
    top_n = 300

    not_seen_list = get_not_seen_movie(ratings, movies, userId)
    top_movies_preds = recommend(algo, userId, not_seen_list, top_n)

    recommend_list = []

    for top_movie in top_movies_preds:
        dict = {"movieId": top_movie[0], "star": top_movie[1]}
        recommend_list.append(dict)
    # print(recommend_list)
    # ----------------------------------------

    # document create & update
    recommends.find_one_and_update(
        {"userRef": auth_data},
        {"$set": {"userRef": auth_data, "recommendList": recommend_list}},
        upsert=True
    )

    return {"shortId": short_id, "result": result}


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app")
