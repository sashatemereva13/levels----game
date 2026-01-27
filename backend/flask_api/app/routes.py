from flask import Blueprint, jsonify, request
from .models import Story, Page
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

@api.route("/stories/<int:story_id>/pages", methods=["POST"])
def create_page(story_id):
    story = Story.query.get_or_404(story_id)
    data = request.get_json()

    if not data or "text" not in data:
        return {"error": "Page text is required"}, 400

    page = Page(
        story_id=story.id,
        text=data["text"],
        is_ending=data.get("is_ending", False),
        ending_label=data.get("ending_label"),
        illustration_url=data.get("illustration_url"),
    )

    db.session.add(page)
    db.session.commit()

    # first page becomes start page automatically
    if story.start_page_id is None:
        story.start_page_id = page.id
        db.session.commit()

    return page.to_dict(), 201


@api.route("/stories/<int:story_id>/start", methods=["GET"])
def get_start_page(story_id):
    story = Story.query.get_or_404(story_id)

    if not story.start_page_id:
        return {"error": "Story has no start page"}, 400

    page = Page.query.get_or_404(story.start_page_id)
    return page.to_dict()


@api.route("/pages/<int:page_id>", methods=["GET"])
def get_page(page_id):
    page = Page.query.get_or_404(page_id)
    return page.to_dict()