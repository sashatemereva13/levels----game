from flask import Blueprint, jsonify, request
from .models import Story, Page, Choice
from . import db

from .security import require_api_key

api = Blueprint("api", __name__)

@api.route("/stories", methods=["GET"])
def list_stories():
    status = request.args.get("status")

    query = Story.query
    if status:
        query = query.filter_by(status=status)
    else:
        query = query.filter_by(status="published")

    stories = query.all()
    return jsonify([story.to_dict() for story in stories])


@api.route("/stories/<int:story_id>", methods=["GET"])
def get_story(story_id):
    story = Story.query.get_or_404(story_id)
    return story.to_dict()


@api.route("/stories", methods=["POST"])
@require_api_key
def create_story():
    data = request.get_json()

    if not data or "title" not in data:
        return {"error": "Title is required"}, 400

    story = Story(
        title=data["title"],
        description=data.get("description"),
        status=data.get("status", "draft"),
        illustration_url=data.get("illustration_url"),

        duration_minutes=data.get("duration_minutes", 3),
        cover_url=data.get("cover_url"),
        level=data.get("level", "neutrality"),
        genre=data.get("genre"),
    )

    db.session.add(story)
    db.session.flush()


    first_page = Page(
        story_id=story.id,
        text="Start writing your story..."
    )

    if not story.start_page_id:
        story.start_page_id = first_page.id

    #
    # db.session.add(first_page)
    # db.session.flush()
    #
    # story.start_page_id = first_page.id

    db.session.commit()

    return story.to_dict(), 201

@api.route("/stories/<int:story_id>/pages", methods=["POST"])
@require_api_key
def create_page(story_id):
    story = Story.query.get_or_404(story_id)
    data = request.get_json()

    if not data or "text" not in data:
        return {"error": "Page text is required"}, 400

    if story.status == "suspended":
        return {"error": "Story unavailable"}, 403

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

    if story.status == "suspended":
        return {"error": "Story unavailable"}, 403

    if not story.start_page_id:
        return {"error": "Story has no start page"}, 400

    page = Page.query.get_or_404(story.start_page_id)
    return page.to_dict()


@api.route("/stories/<int:story_id>/pages", methods=["GET"])
def get_story_pages(story_id):
    pages = Page.query.filter_by(story_id=story_id).all()
    return jsonify([p.to_dict() for p in pages])


@api.route("/pages/<int:page_id>", methods=["GET"])
def get_page(page_id):
    page = Page.query.get_or_404(page_id)

    story = Story.query.get(page.story_id)

    if story.status == "suspended":
        return {"error": "Story unavailable"}, 403

    return page.to_dict()


@require_api_key
@api.route("/pages/<int:page_id>/choices", methods=["POST"])
def create_choice(page_id):
    page = Page.query.get_or_404(page_id)
    data = request.get_json()
    story = Story.query.get_or_404(page.story_id)

    if not data or 'text' not in data or "next_page_id" not in data:
        return {"error": "Choice text and next_page_id required"}, 400

    if story.status == "suspended":
        return {"error": "Story unavailable"}, 403

    choice = Choice(
        page_id=page.id,
        text=data["text"],
        next_page_id=data["next_page_id"],
    )

    db.session.add(choice)
    db.session.commit()

    return choice.to_dict(), 201


@api.route("/pages/<int:page_id>", methods=["PUT"])
@require_api_key
def update_page(page_id):
    page = Page.query.get_or_404(page_id)
    data = request.get_json()

    page.text = data.get("text", page.text)
    page.is_ending = data.get("is_ending", page.is_ending)

    db.session.commit()

    return page.to_dict()


@api.route("/pages/<int:page_id>", methods=["DELETE"])
@require_api_key
def delete_page(page_id):
    page = Page.query.get_or_404(page_id)
    db.session.delete(page)
    db.session.commit()
    return "", 204

@api.route("/stories/<int:story_id>", methods=["DELETE"])
@require_api_key
def delete_story(story_id):

    story = Story.query.get_or_404(story_id)
    if story.status == "suspended":
        return {"error": "Story unavailable"}, 403

    db.session.delete(story)
    db.session.commit()

    return "", 204


@api.route("/stories/<int:story_id>", methods=["PUT"])
@require_api_key
def update_story(story_id):
    story = Story.query.get_or_404(story_id)
    data = request.get_json()

    if story.status == "suspended":
        return {"error": "Story suspended"}, 403

    story.title = data.get("title", story.title)
    story.description = data.get("description", story.description)
    story.status = data.get("status", story.status)
    story.illustration_url = data.get("illustration_url", story.illustration_url)

    db.session.commit()

    return story.to_dict()


@api.route("/stories/<int:story_id>/publish", methods=["PUT"])
@require_api_key
def publish_stories(story_id):
    story = Story.query.get_or_404(story_id)

    story.status = "published"
    db.session.commit()

    return {"status": "published"}
