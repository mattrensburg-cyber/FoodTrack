@echo off
setlocal

set "APP_DIR=C:\FoodTrack"
set "APP_URL=http://127.0.0.1:5173/"
set "NPM_CMD=C:\Program Files\nodejs\npm.cmd"

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -UseBasicParsing '%APP_URL%' -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } } catch { exit 1 }"

if errorlevel 1 (
  start "FoodTrack server" /min "%NPM_CMD%" run dev -- --host 127.0.0.1 --port 5173
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$url = '%APP_URL%'; for ($i = 0; $i -lt 30; $i++) { try { $response = Invoke-WebRequest -UseBasicParsing $url -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } } catch { Start-Sleep -Seconds 1 } }; exit 1"
)

start "" "%APP_URL%"
