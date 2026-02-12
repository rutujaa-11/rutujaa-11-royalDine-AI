# run_project.ps1 - One-step runner for your project

# Start Flask backend
Start-Process powershell -ArgumentList "cd `"$PWD\backend`"; python -m app"

# Wait a few seconds to let backend start
Start-Sleep -Seconds 3

# Open reservation.html in default browser
Start-Process "$PWD\frontend\reservation.html"
