from app import db, ma
from datetime import datetime
from marshmallow import fields


class Photo(db.Model):
    # ------------------------------ Photo table ----------------------------
    __tablename__ = 'photos'
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(
        db.Integer,
        db.ForeignKey('events.id'),
        nullable=False
    )
    image = db.Column(db.String(250), nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False
    )
    caption = db.Column(db.String(200))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

# -----------------------------------------------------------
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


# ---------------------------- photo schema --------------------------------
class PhotoSchema(ma.Schema):

    image = fields.String(
        required=True,
        error_messages={'required': 'Please upload an image'}
    )

# --------------------------- requested fields -------------------------
    class Meta:
        model = Photo
        fields = (
            'id',
            'image',
            'user_id',
            'event_id',
            'caption',
            'created_at',
            'updated_at'
        )

        load_only = ('user_id', 'event_id')
        dump_only = ('created_at', 'updated_at')
