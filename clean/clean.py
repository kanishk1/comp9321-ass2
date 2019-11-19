import pandas as pd
import numpy as np
import ast

coll = []


def clean_collection(val):
    val_array = ast.literal_eval(val)
    if val_array:
        return val_array[0]['name']


def get_director(val):
    val_array = ast.literal_eval(val)
    directors = []
    for i in val_array:
        if i['job'] == 'Director':
            return i['name']


def clean_imdb_id(val):
    return val[2:]


def clean_original_sets():
    df1 = pd.read_csv('credits.csv')
    df3 = pd.read_csv('movies_metadata.csv')

    arr = ['adult', 'belongs_to_collection', 'homepage', 'overview', 'runtime', 'tagline', 'original_title', 'video',
           'vote_count', 'spoken_languages', 'production_countries']

    df3 = df3.drop(arr, axis=1)
    df3 = df3[df3.original_language == 'en']
    df3 = df3[df3.status == 'Released']
    df3 = df3.rename(columns={"vote_average": "imdb_rating"})
    df3 = df3[df3.imdb_id != 0]
    df3['budget'] = pd.to_numeric(df3['budget'])
    df3 = df3[df3.budget != 0]
    df3['revenue'] = df3['revenue'].replace(0, np.nan)
    df3 = df3[pd.notnull(df3['revenue'])]

    df3['genres'] = df3['genres'].apply(clean_collection)
    df3['production_companies'] = df3['production_companies'].apply(clean_collection)
    df3['imdb_id'] = df3['imdb_id'].apply(clean_imdb_id)

    # print(df3.tail(10).to_string())

    ########################

    df1['cast'] = df1['cast'].apply(clean_collection)
    df1['crew'] = df1['crew'].apply(get_director)

    df3['id'] = pd.to_numeric(df3['id'])
    df1['id'] = pd.to_numeric(df1['id'])
    combined_df = pd.merge(df1, df3, how='left', left_on=["id"], right_on=["id"])
    combined_df = combined_df[pd.notnull(combined_df['title'])]
    combined_df = combined_df.rename(columns={"crew": "director"})
    combined_df['revenue'] = pd.to_numeric(combined_df['revenue'])
    combined_df['budget'] = pd.to_numeric(combined_df['budget'])
    combined_df['imdb_rating'] = pd.to_numeric(combined_df['imdb_rating'])

    export_csv = combined_df.to_csv(
        r'/Users/Kanishkpurohit/Documents/Uni/DataServices/ass2/comp9321-ass2/clean/final.csv', index=None, header=True)


# get individual values from array
def get_collection(val):
    val_array = ast.literal_eval(val)
    for a in val_array:
        coll.append(str(a.strip()))

    return val


if __name__ == "__main__":
    clean_original_sets()
    # df = pd.read_csv('final.csv')
    # df['director'] = df['director'].apply(get_collection)

    # sorted_coll = sorted(set(coll))
    # for a in sorted_coll:
    #     print(a)
