from flask_restplus import Namespace, Resource, fields
from .JWTAuthentication import auth_required

api = Namespace('api-info', description='API usage information')

@api.route('/usage/')
class Usage_api(Resource):
    @api.doc(security='API-KEY')
    @auth_required
    def get(self):
        return {'No':'Usage'}

@api.route('/input-movie/')
class Input_movie_api(Resource):
    @api.doc(security='API-KEY')
    @auth_required
    def post(self):
        return {'Bad':'Movie'}

