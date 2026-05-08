@echo off
setlocal

set "APP_DIR=C:\FoodTrack"
set "APP_URL=http://127.0.0.1:5173/"
set "API_URL=http://127.0.0.1:5174/api/health"
set "NPM_CMD=C:\Program Files\nodejs\npm.cmd"

pushd "%APP_DIR%"
if errorlevel 1 (
  echo Could not open %APP_DIR%
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -UseBasicParsing '%APP_URL%' -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } } catch { exit 1 }"
set "APP_RUNNING=%ERRORLEVEL%"

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -UseBasicParsing '%API_URL%' -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } } catch { exit 1 }"
set "API_RUNNING=%ERRORLEVEL%"

if not "%APP_RUNNING%"=="0" (
  start "FoodTrack app" /D "%APP_DIR%" /min "%NPM_CMD%" run app
)

if not "%API_RUNNING%"=="0" (
  start "FoodTrack API" /D "%APP_DIR%" /min "%NPM_CMD%" run server
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$appUrl = '%APP_URL%'; $apiUrl = '%API_URL%'; for ($i = 0; $i -lt 30; $i++) { $appOk = $false; $apiOk = $false; try { $app = Invoke-WebRequest -UseBasicParsing $appUrl -TimeoutSec 2; $appOk = $app.StatusCode -eq 200 } catch {}; try { $api = Invoke-WebRequest -UseBasicParsing $apiUrl -TimeoutSec 2; $apiOk = $api.StatusCode -eq 200 } catch {}; if ($appOk -and $apiOk) { exit 0 }; Start-Sleep -Seconds 1 }; exit 1"

start "" "%APP_URL%"

popd
