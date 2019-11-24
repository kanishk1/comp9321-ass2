from flask_restplus import Namespace, Resource, fields, reqparse
from .input_model import input_parse, movie_input_model
import pandas as pd
from sklearn.externals import joblib
from sklearn.preprocessing import LabelEncoder
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

revenue_ml_model_1 = joblib.load(BASE_DIR + "/models/revenue.pkl")
success_ml_model_1 = joblib.load(BASE_DIR + "/models/success.pkl")
revenue_ml_model_2 = joblib.load(BASE_DIR + "/models/revenue2.pkl")
success_ml_model_2 = joblib.load(BASE_DIR + "/models/success2.pkl")

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
        result_1 = success_ml_model_1.predict(test)
        result_2 = success_ml_model_2.predict(test)

        print(new_df.to_string())
        print(result_1[0])
        print(result_2[0])
        rating = round(result_1[0],2)

        return {'result':rating}


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
        result_1 = revenue_ml_model_1.predict(test)
        result_2 = revenue_ml_model_2.predict(test)

        print(new_df.to_string())
        print(result_1[0])
        print(result_2[0])
        revenue = round(result_1[0],2)

        return {
            'revenue': revenue,
        }
