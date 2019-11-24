from run import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    hashed_password = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Status_tracker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    _200 = db.Column(db.Integer, default=300)
    _201 = db.Column(db.Integer, default=50)
    _400 = db.Column(db.Integer, default=100)
    _401 = db.Column(db.Integer, default=20)
    _403 = db.Column(db.Integer, default=12)

    def increment_status_code(self,code):
        try:
            exec('self._%d += 1'%code)
        except:
            print("Code: " + str(code) + " is not logged")

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    genre = db.Column(db.String)
    actors = db.Column(db.String)
    director = db.Column(db.String)
    release_date = db.Column(db.String)
    budget = db.Column(db.Integer)

