from flask_restplus import Namespace, Resource, fields
from ai_model import *

api = Namespace('movie', description='Movie Predictions')

@api.route('/success/')
class Movie_hit_flop_Api(Resource):
    def get(self):
        return {'Bad':'Movie'}

@api.route('/revenue/')
class Movie_revenue_Api(Resource):
    def get(self):
        return {'No':'Money'}
