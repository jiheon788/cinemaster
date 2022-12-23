import sys

from collections import defaultdict

import pandas as pd
from surprise import Reader, Dataset, SVD, accuracy

# reader = Reader()
#
# ratings = pd.read_csv("data/ratings_small.csv")
# movies = ratings.movieId
# print(movies)

# data = Dataset.load_from_df(ratings[["userId", "movieId", "rating"]], reader)
# print(data)

# 학습/테스트 데이터 분리
# train_set = data.build_full_trainset()
# print("----------")
# print(train_set)
# print("----------")

# test_set = train_set.build_testset()
# print(test_set)
# print("----------")

# SVD(Singular Value Decomposition) : 특이값 분해
# algo = SVD()
# algo.fit(train_set)

# prediction = algo.test(test_set)
# print(prediction)
# print("END TEST")
# print(accuracy.rmse(prediction))

# 특정 유저의 영화 ID를 추출 후, 특정 영화에 대한 평점이 있는지 확인
# movie_ids = ratings[ratings["userId"] == 9]["movieId"]
# print(movie_ids)

# if movie_ids[movie_ids == 42].count() == 0:
#     print("Not Seen")


def get_not_seen_movie(ratings, movies, userId):
    # 특정 유저가 본 movieId를 리스트로 할당
    seen_movies = ratings[ratings["userId"] == userId]
    # print("----------")
    # print(seen_movies)
    # print("----------")

    # 모든 movieId를 리스트로 할당
    total_movies = movies
    # print(total_movies)

    # 모든 movieId 중 특정 유저가 본 영화를 제외한 나머지 추출
    not_seen_movies = [movie for movie in total_movies if movie not in seen_movies]
    not_seen_movies = set(not_seen_movies)
    not_seen_movies = list(not_seen_movies)
    # print(not_seen_movies)

    return not_seen_movies


def recommend(algo, userId, not_seen_movies, top_n):
    predictions = [algo.predict(str(userId), movieId) for movieId in not_seen_movies]
    # print("----------")
    # print(predictions)
    # print("----------")

    # for i, j in predictions:
    #     j.sort(key=lambda x: x[1], reverse=True)
    #     predictions[i] = j[:top_n]

    def sortkey_est(pred):
        return pred.est

    predictions.sort(key=sortkey_est, reverse=True)

    # top_pred = defaultdict(list)
    # for uid, iid, true_r, est, _ in predictions:
    #     top_pred[uid].append((iid, est))
    #
    # for uid, user_ratings in top_pred.items():
    #     user_ratings.sort(key=lambda x: x[1], reverse=True)
    #     top_pred[uid] = user_ratings[:top_n]

    # print(top_pred)

    top_predictions = predictions[:top_n]
    # print("TOP PREDICTIONS")
    # print(top_predictions)
    # print("TOP PREDICTIONS")
    # top_predictions = predictions

    top_movie_ids = [int(pred.iid) for pred in top_predictions]
    top_movie_ratings = [pred.est for pred in top_predictions]
    # top_movie_titles = movies[movies.movieId.isin(top_movie_ids)]["title"]

    # top_movie_preds = [(ids, rating, title) for ids, rating, title in zip(top_movie_ids, top_movie_ratings, top_movie_titles)]
    top_movie_preds = [(ids, round(rating, 1)) for ids, rating in zip(top_movie_ids, top_movie_ratings)]

    return top_movie_preds


# def get_top_n(predictions, top_n):
#     top_n = defaultdict(list)
#     for uid, iid, true_r, est, _ in predictions:
#         top_n[uid].append((iid, est))
#
#     # Then sort the predictions for each user and retrieve the k highest ones.
#     for uid, user_ratings in top_n.items():
#         user_ratings.sort(key=lambda x: x[1], reverse=True)
#         top_n[uid] = user_ratings[:top_n]
#
#     return top_n


# 유저
# userId = "333"
# userId = sys.argv[1]

# 상위 n개
# top_n = 30
# top_n = sys.argv[2]

# not_seen_list = get_not_seen_movie(ratings, movies, userId)
# print(not_seen_list)
# top_movies_preds = recommend(algo, userId, not_seen_list, top_n)
# print(top_movies_preds)

# predictions = recommend(algo, userId, not_seen_list)
# top_n = get_top_n(predictions, top_n)


# if __name__ == '__main__':
#     # get_not_seen_movie(ratings, movies, 9)
#     for top_movie in top_movies_preds:
#         print(top_movie[0], top_movie[1])
#
#     # for uid, user_ratings in top_n.items():
#     #     print(uid, [iid for (iid, _) in user_ratings])
