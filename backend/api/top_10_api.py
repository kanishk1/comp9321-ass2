import pandas as pd
from flask_restplus import Resource, Namespace, fields, reqparse

api = Namespace('top_10', description='gives you top 10')

df = pd.read_csv("../../resources/final_use.csv")
df = df.dropna(axis=0)

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
    actor_group = df.sort_values(by="cast").groupby(['cast'], sort=False)
    top_actors = actor_group['revenue'].max().sort_values(ascending=False)

    director_group = df.sort_values(by="director").groupby(['director'], sort=False)
    top_directors = director_group['revenue'].max().sort_values(ascending=False)

    genre_group = df.groupby(['genres'], sort=False)
    top_genres = genre_group['revenue'].max().sort_values(ascending=False)

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

        return {
            'actors': {
                'names': list(top_actors.keys()),
                'revenue': list(top_actors.values()),
                'input': actors
            },
            'directors': {
                'names': list(top_directors.keys()),
                'revenue': list(top_directors.values()),
                'input': directors
            },
            'genres': {
                'names': list(top_genres.keys()),
                'revenue': list(top_genres.values()),
                'input': genres
            }
        }