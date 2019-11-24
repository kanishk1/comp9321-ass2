import os

import pandas as pd
from flask_restplus import Namespace, Resource, fields
from sklearn.externals import joblib
from sklearn.preprocessing import LabelEncoder

from .input_model import input_parse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

revenue_ml_model = joblib.load(BASE_DIR + "/models/revenue.pkl")
success_ml_model = joblib.load(BASE_DIR + "/models/success.pkl")

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
        actors = args.get('actors')
        director = args.get('director')
        budget = args.get('budget')
        genre = args.get('genre')
        title = args.get('title')
        release_date = args.get('release_date')

        new_df = pd.DataFrame({
            "cast": actors,
            "director": director,
            "budget": budget,
            "genres": genre,
            "release_date": release_date,
            "title": title,
        }, index=[1])

        test = new_df.apply(LabelEncoder().fit_transform).values
        result = success_ml_model.predict(test)
        rating = round(result[0], 2)

        if rating > 0.7:
            return {'result':'HIT'}

        return {'result': 'MISS'}


revenue_model = api.model('revenue_model', {
    'revenue':fields.Integer(description='Revenue Estimated'),
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
        director = args.get('director')
        release_date = args.get('release_date')
        budget = args.get('budget')

        new_df = pd.DataFrame({
            "cast": actors,
            "director": director,
            "budget": budget,
            "genres": genre,
            "release_date": release_date,
            "title": title,
        }, index=[1])

        test = new_df.apply(LabelEncoder().fit_transform).values
        result = revenue_ml_model.predict(test)
        revenue = round(result[0], 2)

        return {
            'revenue': revenue,
        }
