from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from database.sqlalchemy_config import SQLAchemy_Config

SECRET_KEY = 'THIS_IS_NOT_A_SECRET'
TOKEN_DURATION = 60 * 2

# Creates flask app
app = Flask(__name__)
CORS(app)

app.config.from_object(SQLAchemy_Config)
app.config['ERROR_404_HELP'] = False

# Setup database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#initialize api directory
from api import api
api.init_app(app)


# make life easier with flask shell
from database import models
@app.shell_context_processor
def make_shell_context():
    return {
        'models':models,
    }

from database.models import Status_tracker
# create tracker if doesn't exist
if not Status_tracker.query.all():
    status_tracker = Status_tracker()
    db.session.add(status_tracker)
    db.session.commit()

# record status code
@app.after_request
def increment_status_code(response):
    tracker = Status_tracker.query.all()[0]
    tracker.increment_status_code(response.status_code)
    db.session.commit()
    return response

if __name__=='__main__':
    app.run(debug=True)
