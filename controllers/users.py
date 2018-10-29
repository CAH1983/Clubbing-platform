from flask import Blueprint, jsonify
from models.User import User, UserSchema


user_schema = UserSchema()

api = Blueprint('users', __name__)


# ------------- Show user's page  ---------------
@api.route('/users/<int:id>', methods=['GET'])
def show(id):
    print(id)
    user = User.query.get(id)

    if not user:
        return jsonify({'message': 'Not found'}), 404

    return user_schema.jsonify(user)
