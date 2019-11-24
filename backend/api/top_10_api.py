import os

import pandas as pd
from flask import abort
from flask_restplus import Resource, Namespace, fields, reqparse

api = Namespace('top_10', description='gives you top 10')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
actors_df = pd.read_csv(BASE_DIR + "/resources/actors.csv")
actors_df.dropna(axis=0, inplace=True)

directors_df = pd.read_csv(BASE_DIR + "/resources/directors.csv")
directors_df.dropna(axis=0, inplace=True)

genres_df = pd.read_csv(BASE_DIR + "/resources/genres.csv")
genres_df.dropna(axis=0, inplace=True)

inner_model = api.model('inner_model', {
    'names': fields.List(fields.String(description='Top 10 Name')),
    'revenue': fields.List(fields.Integer(description='Revenue corresponding to names')),
    'input': fields.List(fields.String(description='List of inputs'))
})

top10_model = api.model('top10_model', {
    'actors': fields.Nested(inner_model),
    'directors': fields.Nested(inner_model),
    'genres': fields.Nested(inner_model)
})

input_parse = reqparse.RequestParser()
input_parse.add_argument(
    'actors', 
    type=str, 
    help="input any actors",
    location='args',
    action='append'
)
input_parse.add_argument(
    'directors', 
    type=str, 
    help="input any directors",
    location='args',
    action='append'
)
input_parse.add_argument(
    'genres', 
    type=str, 
    help="input any genres",
    location='args',
    action='append'
)

def get_top():
    actor_group = actors_df.sort_values(by="actor").groupby(['actor'], sort=False)
    top_actors = actor_group['revenue'].sum().sort_values(ascending=False)

    director_group = directors_df.sort_values(by="director").groupby(['director'], sort=False)
    top_directors = director_group['revenue'].sum().sort_values(ascending=False)

    genre_group = genres_df.groupby(['genre'], sort=False)
    top_genres = genre_group['revenue'].sum().sort_values(ascending=False)

    top_actors = top_actors.head(10).to_dict()
    top_directors = top_directors.head(10).to_dict()
    top_genres = top_genres.head(10).to_dict()

    return top_actors, top_directors, top_genres


@api.route('/')
class Top10_Api(Resource):
    @api.response(200, 'success', top10_model)
    @api.doc(
        description='Provide you the Top 10',
        parser=input_parse
    )
    def get(self):
        args = input_parse.parse_args()
        actors = args.get('actors')
        directors = args.get('directors')
        genres = args.get('genres')

        top_actors, top_directors, top_genres = get_top()

        res = {}
        if actors:
            res['actors'] = {
                'names': list(top_actors.keys()),
                'revenue': list(top_actors.values()),
                'input': actors
            }
        if directors:
            res['directors'] = {
                'names': list(top_directors.keys()),
                'revenue': list(top_directors.values()),
                'input': directors
            }
        if genres:
            res['genres'] = {
                'names': list(top_genres.keys()),
                'revenue': list(top_genres.values()),
                'input': genres
            }
        if not res:
            abort(404, "Must query at least one parameter")
        return res
