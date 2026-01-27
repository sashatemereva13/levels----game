from flask import Blueprint, jsonify, request
from .models import Story
from . import db

api = Blueprint("api", __name__)

@api.route("/stories", methods=["GET"])
def list_stories():
    status = request.args.get("status")

    query = Story.query
    if status:
        query = query.filter_by(status=status)

    stories = query.all()
    return jsonify([story.to_dict() for story in stories])

@api.route("/stories", methods=["POST"])
def create_story():
    data = request.get_json()

    if not data or "title" not in data:
        return {"error": "Title is required"}, 400

    story = Story(
        title=data["title"],
        description=data.get("description"),
        status=data.get("status", "draft"),
        illustration_url=data.get("illustration_url"),
    )

    db.session.add(story)
    db.session.commit()

    return story.to_dict(), 201