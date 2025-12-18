pause

)
    exit /b 1
    echo ==================================
    echo ERROR: Failed to load data
    echo ==================================
    echo.
) ELSE (
    echo.
    echo   User: user1@gmail.com / password123
    echo   Librarian: librarian1@gmail.com / password123
    echo   Admin: admin@gmail.com / admin
    echo Login credentials:
    echo.
    echo ==================================
    echo Data loaded successfully!
    echo ==================================
    echo.
IF %ERRORLEVEL% EQU 0 (

sqlcmd -S "%SERVER%,%PORT%" -d "%DATABASE%" -U "%USERNAME%" -P "%PASSWORD%" -i "src\main\resources\data-init.sql"
REM Thực thi SQL script

echo.
echo Database: %DATABASE%
echo Server: %SERVER%:%PORT%
echo Connecting to SQL Server...

SET PASSWORD=anhan123!
SET USERNAME=sa
SET DATABASE=FINAL_PROJECT
SET PORT=1433
SET SERVER=localhost

echo ==================================
echo Loading data into FINAL_PROJECT database
echo ==================================

REM ==========================================
REM Database: FINAL_PROJECT
REM Script nạp dữ liệu vào SQL Server
REM ==========================================

