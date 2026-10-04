import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "backend"))

from backend.app import create_app
from backend.config import Config

app = create_app()

if __name__ == "__main__":
    print(f"[SERVER] Starting BTechPath Backend Server on http://localhost:{Config.PORT}")
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)
