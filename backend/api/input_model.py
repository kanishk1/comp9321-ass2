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
    help="username required"
)

input_parse.add_argument(
    'genre', 
    required=True,
    type=str,
    help="genre required"
)

input_parse.add_argument(
    'actors', 
    required=True,
    type=list,
    help="actors required"
)

input_parse.add_argument(
    'country', 
    required=True,
    type=list,
    help="actors required"
)
