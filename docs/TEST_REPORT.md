# Test Report

## What Was Tested

- Backend health endpoint.
- Admin login success and failure.
- Mock chatbot response endpoint.
- Frontend production build.
- Render static serving configuration.
- MongoDB lead storage flow is implemented and ready for environment-backed testing.

## Passed

- Backend tests passed: health, login success, login failure, and mock chat response.
- Frontend production build passed.
- Production smoke test passed: Express served `/` and `/api/health`.
- MongoDB smoke test passed: a QA lead was saved and retrieved from `real_estate_leads`.

## Failed

- Initial scaffold had stray diff markers in generated JSX.
- First production smoke script used PowerShell's reserved `$HOME` variable name.

## Fixed

- Removed stray diff markers from generated JSX and regenerated the project.
- Changed the smoke test variable name and reran successfully.

## Remaining Limitations

- MongoDB write/read verification passed locally with the provided runtime `MONGO_URI`.
- OpenAI mode requires OPENAI_API_KEY and falls back to mock mode if unavailable.
