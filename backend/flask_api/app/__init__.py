from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///stories.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["API_KEY"] = "super-secret-key-123"

    db.init_app(app)
    migrate.init_app(app, db)

    from .routes import api
    app.register_blueprint(api)

    return app