from flask_restplus import Namespace, Resource, fields, reqparse
from ai_model import *
from .input_model import input_parse, movie_input_model

api = Namespace('movie', description='Movie Predictions')

success_model = api.model('success_model', {
    'result':fields.String(description='Hit or Miss')    
})
@api.route('/success/')
class Movie_hit_flop_Api(Resource):
    @api.response(200, 'success', success_model)
    @api.doc(
        description='Entering required input determines\
            whether movie will be a hit or miss',
        parser=input_parse
    )
    def get(self):
        args = input_parse.parse_args()
        title = args.get('title')
        genre = args.get('genre')
        actors = args.get('actors')
        country = args.get('country')
        return {'Bad':'Movie'}

revenue_model = api.model('revenue_model', {
    'result':fields.Integer(description='Revenue Estimated')    
})
@api.route('/revenue/')
class Movie_revenue_Api(Resource):
    @api.response(200, 'success', revenue_model)
    @api.doc(
        description='Entering required input estimates\
            the amount of revenue generated', \
        parser=input_parse
    )
    def get(self):
        args = input_parse.parse_args()
        title = args.get('title')
        genre = args.get('genre')
        actors = args.get('actors')
        country = args.get('country')
        return {'No':'Money'}
