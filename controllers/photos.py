from flask import Blueprint, request, jsonify, g
from models.Photo import Photo, PhotoSchema
from models.PhotoComments import PhotoComment, PhotoCommentSchema
from lib.secure_route import secure_route

photo_schema = PhotoSchema()
photos_schema = PhotoSchema(many=True)
photo_comment_schema = PhotoCommentSchema()

api = Blueprint('photos', __name__)


# --------------- photo index ----------------
@api.route('/photos', methods=['GET'])
def index():
    photos = Photo.query.all()
    return photos_schema.jsonify(photos)


# ------------- Show page 1 photo  ---------------
@api.route('/photos/<int:id>', methods=['GET'])
def show(id):
    photo = Photo.query.get(id)

    if not photo:
        return jsonify({'message': 'Not found'}), 404

    return photo_schema.jsonify(photo)


# ------------- Post a new photo  ---------------
@api.route('/photos', methods=['POST'])
@secure_route
def create():
    req_data = request.get_json()
    req_data['user_id'] = g.current_user.id
    print(req_data)
    data, errors = photo_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    photo = Photo(data)
    photo.save()

    print('photo posted!')
    return photo_schema.jsonify(photo), 201


# ------------- Update photo  ---------------
@api.route('/photos/<int:id>', methods=['PUT', 'PATCH'])
@secure_route
def update(id):
    photo = Photo.query.get(id)

    if not photo:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    data, errors = photo_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    photo.update(data)

    print('photo updated!')
    return photo_schema.jsonify(photo)


# --------------- Delete photo  ---------------
@api.route('/photos/<int:id>', methods=['DELETE'])
@secure_route
def delete(id):
    photo = Photo.query.get(id)
    print('photo deleted')

    if not photo:
        return jsonify({'message': 'Not found'}), 404

    photo.delete()
    return '', 204


# --------------- Create comment  -----------------
@api.route('/photos/<int:id>/comments', methods=['POST'])
@secure_route
def create_comment(id):
    req_data = request.get_json()
    req_data['user_id'] = g.current_user.id
    req_data['photo_id'] = id
    data, errors = photo_comment_schema.load(req_data)

    if errors:
        jsonify({'errors': errors}), 422

    comment = PhotoComment(data)
    comment.save()

    print('comment created!')
    return photo_comment_schema.jsonify(comment)


# --------------- Delete comment  -----------------
@api.route('/photos/<int:id>/comments/<int:comment_id>', methods=['DELETE'])
@secure_route
def delete_comment(id, comment_id):
    comment = PhotoComment.query.get(comment_id)

    if not comment:
        return jsonify({'message': 'Not found'}), 404

    comment.delete()

    print('comment deleted!')
    return '', 204
