from flask import Flask

from app.webhook.routes import webhook
from app.frontend.routes import frontend
from dotenv import load_dotenv
from app.extensions import mongo
import os 
from flask_cors import CORS
# Creating our flask app
load_dotenv()
def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    mongo.init_app(app)
    # registering all the blueprints
    app.register_blueprint(webhook)
    app.register_blueprint(frontend)
    
    return app
