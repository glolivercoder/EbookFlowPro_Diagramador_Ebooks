@echo off
echo ========================================
echo  📚 EbookFlow Pro - Inicialização
echo ========================================
echo.

echo [1/3] Iniciando serviços backend com Docker Compose...
cd ebookflow-backend
echo Iniciando em: %CD%
docker-compose up -d
if %errorlevel% neq 0 (
  echo Erro ao iniciar Docker Compose. Certifique-se de que Docker está instalado e funcionando.
  pause
  exit /b %errorlevel%
)
echo Serviços backend iniciados com sucesso.
echo.

echo [2/3] Aguardando serviços ficarem prontos...
timeout /t 10 /nobreak > nul
echo.

echo [3/3] Iniciando Frontend (ebookflow-frontend)...
cd ..\ebookflow-frontend
set PORT=3001
echo Iniciando em: %CD% na porta 3001
start /B cmd /c "npm start >> ..\EBOOKFLOW.log 2>&1"
if %errorlevel% neq 0 (
  echo Erro no frontend. Verifique EBOOKFLOW.log
  pause
  exit /b %errorlevel%
)
echo Frontend iniciado em background.
echo.

echo ========================================
echo  🚀 EbookFlow Pro pronto!
echo  Backend: http://localhost:3000 (Docker)
echo  Frontend: http://localhost:3001
echo ========================================
echo Logs de inicialização salvos em EBOOKFLOW.log
echo Para parar os serviços, execute: docker-compose down (no diretório backend)
pause