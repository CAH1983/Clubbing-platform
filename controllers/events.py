from flask import Blueprint, request, jsonify, g
from models.Event import Event, EventSchema
from models.EventComment import EventComment,  EventCommentSchema
from lib.secure_route import secure_route

event_schema = EventSchema()
events_schema = EventSchema(many=True)
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
