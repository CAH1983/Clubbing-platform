from flask import Blueprint, request, jsonify, g
from models.Event import Event, EventSchema
from models.EventComment import EventComment,  EventCommentSchema
from models.Photo import Photo, PhotoSchema
from lib.secure_route import secure_route

event_schema = EventSchema()
events_schema = EventSchema(many=True, exclude=('photos', 'comments', ))
photo_schema = PhotoSchema()
event_comment_schema = EventCommentSchema()
event_comment_schema = EventCommentSchema()

api = Blueprint('events', __name__)


# --------------- events index ----------------
@api.route('/events', methods=['GET'])
def index():
    events = Event.query.all()
    return events_schema.jsonify(events)


# ------------- Show page 1 event  ---------------
@api.route('/events/<int:id>', methods=['GET'])
def show(id):
    event = Event.query.get(id)

    if not event:
        return jsonify({'message': 'Not found'}), 404

    return event_schema.jsonify(event)


# ------------- Post a new event  ---------------
@api.route('/events', methods=['POST'])
@secure_route
def create():
    req_data = request.get_json()
    req_data['user_id'] = g.current_user.id
    print(req_data)
    data, errors = event_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    event = Event(data)
    event.save()

    return event_schema.jsonify(event), 201


# ------------- Update event  ---------------
@api.route('/events/<int:id>', methods=['PUT', 'PATCH'])
@secure_route
def update(id):
    event = Event.query.get(id)

    if not event:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    data, errors = event_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    event.update(data)

    print('event updated')
    return event_schema.jsonify(event)


# --------------- Delete event  ---------------
@api.route('/events/<int:id>', methods=['DELETE'])
@secure_route
def delete(id):
    event = Event.query.get(id)

    if not event:
        return jsonify({'message': 'Not found'}), 404

    event.delete()
    print('event deleted')
    return '', 204


# --------------- Create comment  -----------------
@api.route('/events/<int:id>/comments', methods=['POST'])
@secure_route
def create_comment(id):
    req_data = request.get_json()
    req_data['user_id'] = g.current_user.id
    req_data['event_id'] = id
    data, errors = event_comment_schema.load(req_data)

    if errors:
        jsonify({'errors': errors}), 422

    comment = EventComment(data)
    comment.save()

    print('comment created')
    return event_comment_schema.jsonify(comment)


# --------------- Delete comment  -----------------
@api.route('/events/<int:id>/comments/<int:comment_id>', methods=['DELETE'])
@secure_route
def delete_comment(id, comment_id):
    comment = EventComment.query.get(comment_id)

    if not comment:
        return jsonify({'message': 'Not found'}), 404

    comment.delete()
    print('event comment deleted')
    return '', 204


# ------------- Post a new photo  ---------------
@api.route('/events/<int:id>/photos', methods=['POST'])
@secure_route
def create_photo(id):
    req_data = request.get_json()
    req_data['user_id'] = g.current_user.id
    req_data['event_id'] = id
    data, errors = photo_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    photo = Photo(data)
    photo.save()

    print('photo posted!')
    return photo_schema.jsonify(photo), 201


# --------------- Delete photo  ---------------
@api.route('/events/<int:id>/photos/<int:photo_id>', methods=['DELETE'])
@secure_route
def delete_photo(id, photo_id):
    photo = Photo.query.get(photo_id)
    print('photo deleted')

    if not photo:
        return jsonify({'message': 'Not found'}), 404

    photo.delete()
    return '', 204


# --------------- Delete comment  -----------------
@api.route('/events/<int:id>/attend', methods=['POST'])
@secure_route
def attend_event(id):
    event = Event.query.get(id)

    event.attendees.append(g.current_user)
    event.save()

    return event_schema.jsonify(event)
