from flask_restplus import Api

# import any api modules
from .movie_api import api as movie_api
from .auth_api import api as auth_api
from .info_api import api as info_api

api = Api(
    title='Movie stuff',
    description='We do Movie stuff',
    authorizations={
        'API-KEY': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'AUTH-TOKEN'
        }
    },
    security='API-KEY'
)

# add namepsace for swagger description
api.add_namespace(movie_api)
api.add_namespace(auth_api)
api.add_namespace(info_api)
