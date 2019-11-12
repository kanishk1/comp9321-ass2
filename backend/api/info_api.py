from flask_restplus import Namespace, Resource, fields

api = Namespace('api-info', description='API usage information')

@api.route('/usage/')
class Usage_api(Resource):
    def get(self):
        return {'No':'Usage'}

@api.route('/input-movie/')
class Input_movie_api(Resource):
    def post(self):
        return {'Bad':'Movie'}

