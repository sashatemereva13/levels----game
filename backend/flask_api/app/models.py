from . import  db

class Story(db.Model):
    __tablename__ ="stories"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default="draft")
    start_page_id = db.Column(db.Integer, nullable=True)
    illustration_url = db.Column(db.String(500), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "start_page_id": self.start_page_id,
            "illustration_url": self.illustration_url,
        }


class Page(db.Model):
    __tablename__ = "pages"

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey("stories.id"), nullable=False)

    text = db.Column(db.Text, nullable=False)
    is_ending = db.Column(db.Boolean, default=False)
    ending_label = db.Column(db.String(100), nullable=True)
    illustration_url = db.Column(db.String(500), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "story_id": self.story_id,
            "text": self.text,
            "is_ending": self.is_ending,
            "ending_label": self.ending_label,
            "illustration_url": self.illustration_url,
        }