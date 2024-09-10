@echo off

REM Create directories
mkdir src\api\controllers
mkdir src\api\middleware
mkdir src\api\routes
mkdir src\api\services
mkdir src\config
mkdir src\models
mkdir src\utils

REM Create files
type nul > src\api\controllers\authController.js
type nul > src\api\middleware\authMiddleware.js
type nul > src\api\routes\authRoutes.js
type nul > src\api\services\authService.js
type nul > src\config\jwtConfig.js
type nul > src\models\User.js
type nul > src\utils\jwtUtils.js

echo File structure created successfully!
