import datetime
from app import db, ma, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import fields, validates_schema, ValidationError


class User(db.Model):

    # Users table
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    image = db.Column(db.String(150))
    email = db.Column(db.String(128), nullable=False, unique=True)
    _password = db.Column(db.String(128))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    events = db.relationship('Event')
    admin = db.Column(db.Boolean)

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self._password = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def __init__(self, data):
        for key, item in data.items():
            setattr(self, key, item)

        self.created_at = datetime.datetime.utcnow()
        self.updated_at = datetime.datetime.utcnow()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        self.updated_at = datetime.datetime.utcnow()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self._password, plaintext)


class UserSchema(ma.Schema):
    # User schema

    username = fields.String(required=True)
    image = fields.String(
        error_messages={'required': 'Please upload an image'}
    )
    email = fields.Email(required=True)
    password = fields.String(required=True)
    password_confirmation = fields.String(required=True)
    events = fields.Nested('EventSchema', many=True, only=('id', 'name', 'date', 'location', 'image'))

    @validates_schema
    def validate_password(self, data):
        if(data.get('password') != data.get('password_confirmation')):
            raise ValidationError(
                'Password do not match',
                'password_confirmation'
            )

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'image',
            'email',
            'password',
            'password_confirmation',
            'events',
            'admin',
            'created_at',
            'updated_at'
        )
        dump_only = ('created_at', 'updated_at', 'events')  # only write created & updated fields
