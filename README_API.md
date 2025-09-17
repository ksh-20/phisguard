# PhishGuard Local API (Do Not Modify Existing Files)

This folder now contains a standalone API you can run alongside your existing `main.py` and extension without changing them.

## Files Added
- `api_server.py` — FastAPI server exposing `POST /analyze`
- `feature_extractor.py` — Minimal feature extraction stub (replace with your logic)
- `requirements.txt` — Python dependencies

## Install
```bash
python -m venv .venv
. .venv/Scripts/activate  # PowerShell on Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run
```bash
# Default: loads model from model.pkl if present
python api_server.py
# or
uvicorn api_server:app --host 127.0.0.1 --port 8000 --reload
```

Environment variables (optional):
```bash
set PHISH_MODEL_PATH=model.pkl
set PHISH_API_HOST=127.0.0.1
set PHISH_API_PORT=8000
```

## Expected Request/Response
Request:
```json
{
  "url": "https://example.com/path",
  "timestamp": 1700000000
}
```
Response:
```json
{
  "isPhishing": true,
  "confidence": 0.85,
  "reasons": ["Model score indicates elevated risk"],
  "riskScore": 0.85
}
```

## Point the Extension to This API
- Use the extension popup → API Configuration:
  - Enable API Analysis
  - Endpoint: `http://127.0.0.1:8000/analyze`
  - Save and Test Connection

Or temporarily hardcode in `background.js` (not recommended for you since you asked not to modify files).

## Replace Heuristics with Your Model
- Put your `model.pkl` in the same folder
- Implement robust `extract_features_from_url` in `feature_extractor.py`
- Ensure your model has either `predict_proba` or `predict`

## Troubleshooting
- If CORS issues occur, CORS is already enabled to `*` in `api_server.py`
- Ensure the port (8000) is not blocked by firewall
- Check logs by running with `--reload` for live reload and stack traces
