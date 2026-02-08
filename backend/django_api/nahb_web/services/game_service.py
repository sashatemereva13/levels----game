from gameplay.models import Play, PlaySession
from services.story_api import StoryAPIClient

class GameService:
    def __init__(self):
        self.api = StoryAPIClient()

    #  start story
    def start_story(self, story_id: int, session_key: str):
        page = self.api.get_start_page(story_id)

        PlaySession.objects.update_or_create(
            session_key=session_key,
            story_id=story_id,
            defaults={"current_page_id": page["id"]},
            )

        return page

    #  load current progress
    def get_current_page(self, story_id: int, session_key: str):
        session = PlaySession.objects.filter(
            session_key=session_key,
            story_id=story_id
        ).first()

        if not session:
            return self.start_story(story_id, session_key)

        return self.api.get_page(session.current_page_id)


    # make a choice
    def choose(self, story_id: int, next_page_id: int, session_key:str, user=None):
        page = self.api.get_page(next_page_id)

        PlaySession.objects.update_or_create(
            session_key=session_key,
            story_id=story_id,
            defaults={"current_page_id": next_page_id},
        )

        # if ending then save Play record
        if page.get("is_ending"):
            Play.objects.create(
                user=user,
                story_id=story_id,
                ending_page_id=next_page_id
            )

        return page