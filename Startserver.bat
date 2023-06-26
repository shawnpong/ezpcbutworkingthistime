@echo off
start "Backend" cmd /k call ".\.venv\Scripts\activate.bat" ^& cmd /c "cd /d .\BACKEND && python manage.py runserver 0.0.0.0:8000"
start "Frontend" cmd /k call ".\.venv\Scripts\activate.bat" ^& cmd /c "cd /d .\FRONTEND && npm start"
exit
