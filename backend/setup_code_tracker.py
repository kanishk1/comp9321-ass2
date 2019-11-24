# this code is to only be ran if you delete all database and migrations
# create tracker if doesn't exist
from run import db
from database.models import Status_tracker
if not Status_tracker.query.all():
    status_tracker = Status_tracker()
    db.session.add(status_tracker)
    db.session.commit()
