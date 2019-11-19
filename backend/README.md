# Using Pipenv
1. Install python3.7.3 on machine
2. Install pipenv
`$ python -m pip install pipenv`
3. Enter environment
`$ pipenv shell`
4. Install dependencies
`$ pipenv sync`
5. Run this command to use flask comands/options
`$ export FLASK_APP=run.py`
`$ flask`

6. To access/use models through shell no need to run python and import the lib, <br />
flask's shell is setup with models context
`$ flask shell`
type: `models`
type: `models.User.query.all()`
Search Up SQLAlchemy for more commands with models
<br/>
Instal newman with npm and you can run the tests
`$ newman run ./comp9321Test.json`


