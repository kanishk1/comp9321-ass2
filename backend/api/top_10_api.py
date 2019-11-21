from flask_restplus import Resource, Namespace, fields, reqparse
from flask import Request

api = Namespace('top 10', description='gives you top 10')

top10_actors_model = api.model('top10_actors_model', {
    'top10_actors':fields.List(fields.String(description='Actor'))
})
@api.route('/actors/')
class Top10_actors_Api(Resource):
    @api.response(200, 'success', top10_actors_model)
    @api.doc(
        description='Provide you the Top 10 Actors'
    )
    def get(self):
        return {'top10_actors': ['Tom Cruise', 'Pikachu']}

top10_genre_model= api.model('top10_genre_model', {
    'top10_actors':fields.List(fields.String(description='genre'))
})
@api.route('/genres/')
class Top10_genre_Api(Resource):
    @api.response(200, 'success', top10_genre_model)
    @api.doc(
        description='Provide you the Top 10 Genres'
    )
    def get(self):
        return {'top10_genres': ['Not Scary', 'Scary']}

top_10_directors_model = api.model('top_10_directors_model ', {
    'top10_directors':fields.List(fields.String(description='director'))
})
@api.route('/directors/')
class Top10_director_Api(Resource):
    @api.response(200, 'success', top_10_directors_model )
    @api.doc(
        description='Provide you the Top 10 Directors'
    )
    def get(self):
        return {'top10_directors': ['Director 1', 'Director 2']}
