from flask import Flask, jsonify
from flask_cors import CORS
from config import Config

# Import Blueprints
from routes.auth import auth_bp
from routes.roadmaps import roadmaps_bp
from routes.courses import courses_bp
from routes.quizzes import quizzes_bp
from routes.projects import projects_bp
from routes.placement import placement_bp
from routes.resume import resume_bp
from routes.tech_pulse import tech_pulse_bp
from routes.ai import ai_bp
from routes.admin import admin_bp
from routes.dashboard import dashboard_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for cross-origin frontend requests
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(roadmaps_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(quizzes_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(placement_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(tech_pulse_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(dashboard_bp)

    @app.route("/", methods=["GET"])
    def root():
        return jsonify({
            "message": "Welcome to BTechPath Backend API",
            "app": "BTechPath Backend API",
            "version": "1.0.0",
            "health_check": "/api/health"
        }), 200

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "healthy",
            "app": "BTechPath Backend API",
            "version": "1.0.0"
        }), 200

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Resource or endpoint not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"error": "Internal server error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    print(f"[SERVER] Starting BTechPath Backend Server on http://localhost:{Config.PORT}")
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)
