from app import db, ma
from datetime import datetime
from marshmallow import fields


class Attendees(db.Model):
    __tablename__ = 'attendees'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), primary_key=True)


class Event(db.Model):
    # event model, nullable = not required, unique = can be only one
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    location = db.Column(db.String(60), nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False
    )
    genre = db.Column(db.String(80))
    image = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    user = db.relationship('User')
    comments = db.relationship(
        'EventComment',
        cascade='delete-orphan, delete'
    )
    attendees = db.relationship(
        'User',
        secondary='attendees'
    )
    photos = db.relationship('Photo')
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

# ---------------------------------------------------------------------

    def __init__(self, data):
        for key, item in data.items():
            setattr(self, key, item)

    def save(self):
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)

        self.updated_at = datetime.utcnow()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


# ------------------------------------------------------------------
class EventSchema(ma.Schema):
    # fields to appear + error messages

    name = fields.String(
        required=True,
        error_messages={'required': 'Please enter the name of the event'}
    )
    date = fields.Date(
        required=True,
        error_messages={'required': 'Please pick up a date'}
    )
    location = fields.String(
        required=True,
        error_messages={'required': 'Enter a location'}
    )
    image = fields.String(required=True)
    user = fields.Nested('UserSchema', exclude=('events', ))
    comments = fields.Nested(
        'EventCommentSchema',
        many=True,
        exclude=('event_id', )
    )
    photos = fields.Nested(
        'PhotoSchema',
        many=True
    )
    attendees = fields.Nested(
        'UserSchema',
        many=True
    )

    # -----these are the data that will be rendered in the browser

    class Meta:
        model = Event
        fields = (
            'id',
            'name',
            'date',
            'location',
            'genre',
            'image',
            'user_id',
            'user',
            'price',
            'comments',
            'attendees',
            'photos',
            'created_at',
            'updated_at'
        )
        load_only = ('user_id', )
        dump_only = ('comments', 'created_at', 'updated_at')  # this is the data auto populated by the system and not provided by the user
