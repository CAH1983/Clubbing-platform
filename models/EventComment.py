from datetime import datetime
from app import db, ma
from marshmallow import fields


class EventComment(db.Model):
    # ------------------ EventComment model -------------------

    __tablename__ = 'event_comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User')
    event_id = db.Column(
        db.Integer,
        db.ForeignKey('events.id'),
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


# ------------------------- event comment schema -----------------------------
class EventCommentSchema(ma.Schema):

    content = fields.String(required=True)
    user_id = fields.Integer(required=True)
    event_id = fields.Integer(required=True)
    user = fields.Nested('UserSchema', only=('id', 'username', 'image'))

# --------------------------------------------
    class Meta:
        model = EventComment
        fields = (
            'id',
            'content',
            'user_id',
            'user',
            'event_id',
            'created_at',
            'updated_at'
        )
        dump_only = ('created_at', 'updated_at')
        load_only = ('user_id', )
