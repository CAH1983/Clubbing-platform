from datetime import datetime
from app import db, ma
from marshmallow import fields


# ------------------ PhotoComment model -------------------
class PhotoComment(db.Model):

    __tablename__ = 'photo_comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User')
    photo_id = db.Column(
        db.Integer,
        db.ForeignKey('photos.id'),
        nullable=False
    )
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

# -------------------------------------------------------
    def __init__(self, data):
        for key, item in data.items():
            setattr(self, key, item)

        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def save(self):
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

# ------------------------- photo comment schema -----------------------------


class PhotoCommentSchema(ma.Schema):

    content = fields.String(required=True)
    user_id = fields.Integer(required=True)
    photo_id = fields.Integer(required=True)
    user = fields.Nested('UserSchema', only=('id', 'username'))

# ------------------------- sanitizing data ----------------------
    class Meta:
        model = PhotoComment
        fields = (
            'id',
            'content',
            'user_id',
            'user',
            'photo_id',
            'created_at',
            'updated_at'
        )
        dump_only = ('created_at', 'updated_at')
        load_only = ('user_id', )
