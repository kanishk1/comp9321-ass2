from flask_restplus import Resource, Namespace, fields, reqparse
from flask import request
from passlib.hash import pbkdf2_sha256
from database.models import User
from .JWTAuthentication import auth

api = Namespace('auth', description='Authorization')

login_model = api.model('Login', {
    'username': fields.String,
    'password': fields.String
})

token_model = api.model('token_model', {
    'token': fields.String(description='xxx.yyy.zzz')
})

credentials_parse = reqparse.RequestParser()
credentials_parse.add_argument(
    'username', 
    required=True ,
    type=str, 
    help="username required"
)
credentials_parse.add_argument(
    'password', 
    required=True,
    type=str,
    help="password required"
)
@api.route('/login/')
class Login_Api(Resource):
    @api.response(200,'success', token_model)
    @api.doc(description="Authenticated user will receive a token")
    @api.expect(login_model, validate=True)
    def post(self):
        args = credentials_parse.parse_args()
        username = args.get('username')
        password = args.get('password')
        isAuthenticated = authenticate(username, password)
        if (isAuthenticated):
            return {"token": auth.generate_token(username)}
        return {"message": "Incorrect credentials"}, 401

def authenticate(username, password):
    user = User.query.filter_by(username=username).first()
    if user and pbkdf2_sha256.verify(password, user.hashed_password):
        return True
    return False
