from flask_restplus import Namespace, Resource, fields, reqparse
from ai_model import *
from .input_model import input_parse, movie_input_model

api = Namespace('movie', description='Movie Predictions')
model = api.model('Movie', movie_input_model)

@api.route('/success/')
class Movie_hit_flop_Api(Resource):
    @api.expect(model, validate=True)
    def get(self):
        args = input_parse.parse_args()
        title = args.get('title')
        genre = args.get('genre')
        actors = args.get('actors')
        country = args.get('country')
        return {'Bad':'Movie'}

@api.route('/revenue/')
class Movie_revenue_Api(Resource):
    def get(self):
        return {'No':'Money'}
