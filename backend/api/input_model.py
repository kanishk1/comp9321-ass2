from flask_restplus import fields, reqparse

movie_input_model = {
    'title': fields.String,
    'genre': fields.List(fields.String),
    'actors': fields.List(fields.String),
    'director': fields.String,
    'release_data': fields.String,
    'budget': fields.Integer
}

input_parse = reqparse.RequestParser()
input_parse.add_argument(
    'title', 
    required=True ,
    type=str, 
    help="title required",
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
    'director', 
    required=True,
    type=str,
    help="director required",
    location='args'
)
input_parse.add_argument(
    'release_date', 
    required=True,
    type=str,
    help="release date required",
    location='args'
)
input_parse.add_argument(
    'budget', 
    required=True,
    type=int,
    help="budget required",
    location='args'
)
post_input_parse = input_parse.copy()
post_input_parse.replace_argument('title', location='form')
post_input_parse.replace_argument('genre', location='form')
post_input_parse.replace_argument('actors', location='form')
post_input_parse.replace_argument('director', location='form')
post_input_parse.replace_argument('release_date', location='form')
post_input_parse.replace_argument('budget', location='form')
