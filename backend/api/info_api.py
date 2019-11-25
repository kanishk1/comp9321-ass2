from flask_restplus import Namespace, Resource, fields, reqparse
from .JWTAuthentication import auth_required
from .input_model import post_input_parse, movie_input_model
from database.models import Status_tracker
from flask import Response

api = Namespace('private', description='API usage information')

usage_model = api.model('Usage', {
    '200': fields.Integer(description='0'),
    '201': fields.Integer(description='0'),
    '400': fields.Integer(description='0'),
    '401': fields.Integer(description='0'),
    '403': fields.Integer(description='0')
})
@api.route('/api-usage/')
class Usage_api(Resource):
    @api.response(200, 'success', usage_model)
    @api.doc(
        security='API-KEY',
        description='Gets usage information of the API'
    )
    @auth_required
    def get(self):
        tracker = Status_tracker.query.all()[0]
        status_results = {
            "200": tracker._200,
            "201": tracker._201,
            "400": tracker._400,
            "401": tracker._401,
            "403": tracker._403
        }
        return status_results

model = api.model('input', movie_input_model)
@api.route('/input-movie/')
class Input_movie_api(Resource):
    @api.response(201, 'created')
    @api.doc(
        security='API-KEY',
        description='Allows admin to input data into database'
    )
    @api.expect(model, validate=True)
    @auth_required
    def post(self):
        args = post_input_parse.parse_args()
        title = args.get('title')
        genre = args.get('genre')
        genre = genre.strip('[]')
        actors = args.get('actors')
        actors = actors.strip('[]')
        director = args.get('director')
        release_date = args.get('release_date')
        budget = args.get('budget')

        from run import db
        from database.models import Movie
        m = Movie(
            title=title,
            genre=genre,
            actors=actors,
            director=director,
            release_date=release_date,
            budget=budget
        )
        db.session.add(m)
        db.session.commit()

        return "Uploaded data to database, success", 201

