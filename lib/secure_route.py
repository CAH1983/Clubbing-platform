import jwt
from functools import wraps
from flask import request, jsonify, g
from models.User import User
from config.environment import secret


def secure_route(func):
    # secure route decorator

    @wraps(func)
    def decorated_secure_route(*args, **kwargs):
        if 'Authorization' not in request.headers:
            return jsonify({'message': 'Unauthorized'}), 401  #error message will be displayed

        token = request.headers.get('Authorization').replace('Bearer ', '')
        data = jwt.decode(token, secret)   # gets payload
        user = User.query.get(data.get('sub')) # gets the subject from the db

        if not user:
            return jsonify({'message': 'Unauthorized'}), 401

        g.current_user = user  # sets the user to global

        return func(*args, **kwargs)  # calls the original function

    return decorated_secure_route
