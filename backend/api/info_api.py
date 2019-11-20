from flask_restplus import Namespace, Resource, fields, reqparse
from .JWTAuthentication import auth_required
from .input_model import post_input_parse, movie_input_model

api = Namespace('api-info', description='API usage information')

usage_model = api.model('Usage', {
    '200': fields.Integer(description='0'),
    '201': fields.Integer(description='0'),
    '400': fields.Integer(description='0'),
    '401': fields.Integer(description='0'),
    '403': fields.Integer(description='0')
})
@api.route('/usage/')
class Usage_api(Resource):
    @api.response(200, 'success', usage_model)
    @api.doc(
        security='API-KEY',
        description='Gets usage information of the API'
    )
    @auth_required
    def get(self):
        return {'No':'Usage'}

model = api.model('input', movie_input_model)
@api.route('/input-movie/')
class Input_movie_api(Resource):
    @api.response(200, 'success')
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
        actors = args.get('actors')
        country = args.get('country')
        return {'Bad':'Movie'}

