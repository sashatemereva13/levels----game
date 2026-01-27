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