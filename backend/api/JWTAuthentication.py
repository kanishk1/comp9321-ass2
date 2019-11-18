import datetime
import jwt
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
        
