from flask_restplus import fields, reqparse

movie_input_model = {
    'title': fields.String,
    'genre': fields.String,
    'actors': fields.List(fields.String),
    'country': fields.String,
}

input_parse = reqparse.RequestParser()
input_parse.add_argument(
    'title', 
    required=True ,
    type=str, 
    help="username required",
    location='args'
)
input_parse.add_argument(
    'genre', 
    required=True,
    type=str,
    action='append',
    help="genre required",
    location='args'
)
input_parse.add_argument(
    'actors', 
    required=True,
    type=str,
    action='append',
    help="actors required",
    location='args'
)
input_parse.add_argument(
    'country', 
    required=True,
    type=str,
    help="actors required",
    location='args'
)

post_input_parse = input_parse.copy()
post_input_parse.replace_argument('title', location='form')
post_input_parse.replace_argument('genre', location='form')
post_input_parse.replace_argument('actors', location='form')
post_input_parse.replace_argument('country', location='form')
