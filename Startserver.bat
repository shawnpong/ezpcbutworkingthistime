@echo off
start "Frontend" cmd /k call ".\.venv\Scripts\activate.bat" ^& cmd /c "cd /d .\FRONTEND && npm start"
start "Backend" cmd /k call ".\.venv\Scripts\activate.bat" ^& cmd /c "cd /d .\BACKEND && python manage.py runserver"
exit
