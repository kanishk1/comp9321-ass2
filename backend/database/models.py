from run import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    hashed_password = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Status_tracker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    _200 = db.Column(db.Integer, default=0)
    _201 = db.Column(db.Integer, default=0)
    _400 = db.Column(db.Integer, default=0)
    _401 = db.Column(db.Integer, default=0)
    _403 = db.Column(db.Integer, default=0)

    def increment_status_code(self,code):
        exec('self._%d += 1'%code)
