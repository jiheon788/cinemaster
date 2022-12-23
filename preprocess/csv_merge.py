import pandas as pd
# from IPython.display import display

links_df = pd.read_csv("./preprocess/links.csv")
links_df = links_df.dropna(axis=0)
links_df['tmdbId'] = links_df['tmdbId'].astype(int)

ratings_df = pd.read_csv("./preprocess/ratings_small.csv")
ratings_df = ratings_df.drop(['timestamp'], axis=1)

null = links_df.isnull().sum()
print(null)
null = ratings_df.isnull().sum()
print(null)
# print("links len : ", len(links_df))
# print("ratings len : ", len(links_df))

merge_df = pd.merge(links_df, ratings_df, on="movieId", )
merge_df = merge_df[["userId", "tmdbId", "rating"]]

merge_df.to_csv("./preprocess/merge.csv")
