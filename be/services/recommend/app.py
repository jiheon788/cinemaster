import sys
import pandas as pd
from surprise import Reader, Dataset, SVD, accuracy


def get_rating(user_id, movie_id):
    # surprise 라이브러리의 Reader
    reader = Reader()

    # TMDB 평점 파일 로드
    ratings = pd.read_csv("data/ratings_small.csv")

    # "userId", "moviId", "rating" 변수들이 포함된 데이터프레임형태로 데이터셋 로드
    data = Dataset.load_from_df(ratings[["userId", "movieId", "rating"]], reader)

    # 학습/테스트 데이터 분리
    train_set = data.build_full_trainset()
    test_set = train_set.build_testset()

    # SVD(Singular Value Decomposition) : 특이값 분해
    svd = SVD()
    svd.fit(train_set)

    # 예측
    predictions = svd.test(test_set)

    # 평가 : Root Mean Square
    accuracy.rmse(predictions)

    # node.js에서 string값으로 인자를 전달받기 때문에 int형으로 변환
    user_id = int(user_id)
    movie_id = int(movie_id)

    # 유저 인덱스
    user = (svd.predict(user_id, movie_id))[0]

    # 평점 인덱스
    rating = round((svd.predict(user_id, movie_id))[3], 1)

    print(user)
    print(rating)


if __name__ == '__main__':
    get_rating(sys.argv[1], sys.argv[2])
