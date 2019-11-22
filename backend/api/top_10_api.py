from flask_restplus import Resource, Namespace, fields, reqparse
from flask import Request

api = Namespace('top_10', description='gives you top 10')

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
        return {
            'actors': {
                'names': ['a', 'b', 'c', 'd', '...'],
                'revenue': [1, 2, 3, 4, '...'],
                'input': actors
            },
            'directors': {
                'names': ['a', 'b', 'c', 'd', '...'],
                'revenue': [1, 2, 3, 4, '...'],
                'input': directors 
            },
            'genres': {
                'names': ['a', 'b', 'c', 'd', '...'],
                'revenue': [1, 2, 3, 4, '...'],
                'input': genres 
            }
        }

