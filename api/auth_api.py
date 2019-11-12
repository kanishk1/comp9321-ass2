from flask_restplus import Resource, Namespace, fields

api = Namespace('auth', description='Authorisation')

@api.route('/login/')
class Login_Api(Resource):
    def post(self):
        return {'No':'Access for You'}

