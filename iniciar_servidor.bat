@echo off
title Dragonwilds Companion PT-BR
cd /d "%~dp0"

echo ======================================================================
echo    DRAGONWILDS COMPANION (PT-BR) - SEGUNDA TELA PS5 ^& MOBILE
echo ======================================================================
echo.
echo  Iniciando o servidor local e abrindo o navegador...
echo.
echo  * No seu PC:       http://localhost:5173/
echo  * No Celular/PS5:  Conecte ao mesmo Wi-Fi e use o endereco Network
echo.
echo  Para encerrar o servidor, feche esta janela ou aperte Ctrl+C.
echo ======================================================================
echo.
call npm run dev -- --host --open

pause