@echo off
chcp 65001 >nul
title Gerador de IPA Nativo iOS (AltStore) - Dragonwilds PT-BR
cd /d "%~dp0"

echo ======================================================================
echo   GERADOR DE APP NATIVO iOS (.IPA) PARA ALTSTORE
echo   RuneScape: Dragonwilds Companion PT-BR
echo ======================================================================
echo.
echo 1. Sincronizando build de producao com o projeto iOS...
call npm run ios:sync
echo.

git rev-parse --verify HEAD >nul 2>&1
if errorlevel 1 (
    git config user.name "Dragonwilds Companion"
    git config user.email "companion@dragonwilds.local"
    git add .
    git commit -m "Build nativo iOS Capacitor + GitHub Actions AltStore IPA"
) else (
    git add .
    git commit -m "Atualizacao do app e sincronizacao iOS" >nul 2>&1
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Crie um repositorio vazio no GitHub ^(https://github.com/new^)
    echo Exemplo de URL: https://github.com/SEU_USUARIO/dragonwilds-ios.git
    echo.
    set /p REPO_URL="Cole a URL do seu repositorio do GitHub e aperte ENTER: "
    git remote add origin "%REPO_URL%"
)

echo.
echo 2. Enviando codigo para o GitHub para compilar no macOS da nuvem...
git branch -M main
git push -u origin main

echo.
echo ======================================================================
echo   PRONTO! Agora abra a aba "Actions" do seu repositorio no GitHub,
echo   aguarde ~3 minutos e baixe o arquivo "Dragonwilds-Companion-PTBR-IPA"
echo   direto no seu iPhone para abrir no AltStore!
echo ======================================================================
pause
