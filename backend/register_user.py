import click

from run import db
from database.models import User
from passlib.hash import pbkdf2_sha256


@click.command()
@click.option('--username', prompt='Enter the username')
@click.option('--password', prompt='Enter the password',
              confirmation_prompt=True, hide_input=True)
def useradd(username, password):
    user = User(username=username, hashed_password=pbkdf2_sha256.hash(password))
    db.session.add(user)
    db.session.commit()


if __name__ == '__main__':
    useradd()
