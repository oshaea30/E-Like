# E-Like App is an app made to be the tinder for peers. It helps you to find friends with similiar hobbies and interests!

Check out [FRONTEND LIVE DEMO](https://e-like-frontend.herokuapp.com/) here!!
Check out [API LIVE DEMO](https://e-like-backend.herokuapp.com/) here!!
## Tech used
```
* Frontend : React & Redux
* Backend : Django
```
## How to Install
1. Git Clone
```
git clone https://github.com/oshaea30/E-Like-v3
```
2. Backend setting
```
cd backend
Python -m venv env
(For Mac) source env/bin/activate
(For Windows) env/Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
# Open http://127.0.0.1:8000/users/

# To have dummy data for testing run:
python manage.py fixtures/dummy-data.json

```
3. Frontend setting
```
cd frontend
npm install
npm start
# Open http://127.0.0.1:3000/
```

