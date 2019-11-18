from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from database.sqlalchemy_config import SQLAchemy_Config

SECRET_KEY = 'THIS_IS_NOT_A_SECRET'
TOKEN_DURATION = 60 * 2

# Creates flask app
app = Flask(__name__)
app.config.from_object(SQLAchemy_Config)


db = SQLAlchemy(app)
migrate = Migrate(app, db)

from api import api
api.init_app(app)

from database import models

@app.shell_context_processor
def make_shell_context():
    return {
        'models':models,
    }

if __name__=='__main__':
    app.run(debug=True)
