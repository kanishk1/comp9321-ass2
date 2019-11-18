from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from database.sqlalchemy_config import SQLAchemy_Config
from api import api


# Creates flask app
app = Flask(__name__)
app.config.from_object(SQLAchemy_Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from database import models

api.init_app(app)

@app.shell_context_processor
def make_shell_context():
    return {
        'models':models,
    }


if __name__=='__main__':
    app.run(debug=True)
