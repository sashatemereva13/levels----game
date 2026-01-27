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