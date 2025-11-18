#!/bin/bash
set -e

echo "🚀 Deploy NotasMax - Kubernetes"

# 1. Criar cluster se não existir
if ! kind get clusters 2>/dev/null | grep -q "kind"; then
    echo "📋 Criando cluster Kind..."
    kind create cluster --name kind --config kind-config.yaml
fi

echo "✅ Cluster pronto"

# 2. Build das imagens
echo "🏗️  Build Backend..."
docker build -f ../Backend/dockerfile -t notas-max-backend:latest ../Backend > /dev/null 2>&1

echo "🏗️  Build Frontend..."
docker build -f ../Frontend/dockerfile -t notas-max-frontend:latest ../Frontend > /dev/null 2>&1

# 3. Carregar imagens
echo "📦 Carregando imagens no Kind..."
kind load docker-image notas-max-backend:latest --name kind > /dev/null 2>&1
kind load docker-image notas-max-frontend:latest --name kind > /dev/null 2>&1

# 4. Deploy
echo "🔧 Aplicando configurações..."
kubectl apply -f app.yaml

# 5. Aguardar
echo "⏳ Aguardando pods ficarem prontos..."
sleep 10

# 6. Verificar status
echo ""
echo "📊 Status dos Pods:"
kubectl get pods

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "🌐 Acesse a aplicação em:"
echo "   Frontend: http://localhost:30080"
echo "   Backend:  http://localhost:30005"
echo "   MongoDB:  localhost:30017"
