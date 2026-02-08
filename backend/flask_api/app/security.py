from flask import request, current_app, abort
from functools import wraps


def require_api_key(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        key = request.headers.get("X-API_KEY")

        if key != current_app.config["API_KEY"]:
            abort(401)

        return f(*args, **kwargs)

    return wrapper