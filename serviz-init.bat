@echo off
setlocal enabledelayedexpansion

:: Serviz SaaS Backend Setup Script
echo Starting Serviz SaaS Backend Setup...

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH. Please install Node.js and try again.
    exit /b 1
)

:: Create root directory
set ROOT_DIR=serviz-saas-backend
if exist %ROOT_DIR% (
    echo Error: Directory %ROOT_DIR% already exists. Please remove or rename it and try again.
    exit /b 1
)
mkdir %ROOT_DIR%
cd %ROOT_DIR%

:: Create folder structure
echo Creating folder structure...
mkdir src\api\routes src\api\controllers src\api\middleware src\services src\models src\data\repositories src\data\migrations src\utils src\config tests\unit tests\integration tests\e2e docs

:: Create placeholder files
echo Creating placeholder files...
type nul > server.js
type nul > src\api\routes\orderRoutes.js
type nul > src\api\routes\activityLogRoutes.js
type nul > src\api\routes\appointmentRoutes.js
type nul > src\api\routes\userRoutes.js
type nul > src\api\controllers\orderController.js
type nul > src\api\controllers\activityLogController.js
type nul > src\api\controllers\appointmentController.js
type nul > src\api\controllers\userController.js
type nul > src\api\middleware\auth.js
type nul > src\api\middleware\errorHandler.js
type nul > src\api\middleware\rateLimiter.js
type nul > src\services\orderService.js
type nul > src\services\activityLogService.js
type nul > src\services\appointmentService.js
type nul > src\services\userService.js
type nul > src\services\paymentService.js
type nul > src\models\order.js
type nul > src\models\activityLog.js
type nul > src\models\appointment.js
type nul > src\models\user.js
type nul > src\models\customer.js
type nul > src\models\car.js
type nul > src\utils\logger.js
type nul > src\utils\cache.js
type nul > src\utils\validationSchemas.js
type nul > src\config\database.js
type nul > src\config\redis.js
type nul > src\config\stripe.js
type nul > docs\api.yaml
type nul > .env
type nul > .gitignore

:: Initialize npm project
echo Initializing npm project...
call npm init -y
if %errorlevel% neq 0 (
    echo Error: Failed to initialize npm project.
    exit /b 1
)

:: Install dependencies
echo Installing dependencies...
call npm install express sequelize pg pg-hstore jsonwebtoken bcryptjs stripe dotenv winston express-validator
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies.
    exit /b 1
)

:: Install dev dependencies
echo Installing dev dependencies...
call npm install --save-dev nodemon jest supertest
if %errorlevel% neq 0 (
    echo Error: Failed to install dev dependencies.
    exit /b 1
)

:: Update package.json with start and test scripts
echo Updating package.json...
powershell -Command "(Get-Content package.json) -replace '\"test\": \"echo \\\""Error: no test specified\\\"" && exit 1\"', '\"start\": \"node server.js\",\"dev\": \"nodemon server.js\",\"test\": \"jest\"' | Set-Content package.json"

echo Setup completed successfully!
echo.
echo Next steps:
echo 1. Review and update the .env file with your configuration details.
echo 2. Set up your database and update src\config\database.js accordingly.
echo 3. Review and customize the placeholder files as needed.
echo 4. Run 'npm run dev' to start the development server.

endlocal