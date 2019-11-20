import datetime
import jwt 
from flask import request
from flask_restplus import abort
from functools import wraps
from database.models import User

class JWT:
    def __init__(self, secret_key, expire):
        self._secret_key = secret_key
        self._expire = expire

    def generate_token(self, username):
        data = {
            "user_id": User.query.filter_by(username=username).first().id,
            "username": username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=self._expire)
        }
        return jwt.encode(data, self._secret_key, algorithm='HS256').decode('utf-8')

    def validate_token(self, token):
        data = jwt.decode(token, self._secret_key, algorithm=['HS256'])
        return data['username']
        
from run import SECRET_KEY, TOKEN_DURATION
auth = JWT(SECRET_KEY, TOKEN_DURATION)

def auth_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Auth-Token')
        if (token is None):
            abort(401, 'No Authentication Token')

        try:
            user = auth.validate_token(token)
        except Exception as e:
            abort(401, e)
        return func(*args, **kwargs)
    return wrapper
