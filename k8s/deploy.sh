#!/bin/bash

# Script para fazer deploy da aplicação no Kubernetes

set -e

echo "🚀 Iniciando deploy da aplicação NotasMax no Kubernetes..."

# 1. Criar o cluster se não existir
echo "📋 Verificando cluster Kind..."
if ! kind get clusters | grep -q "kind"; then
    echo "❌ Cluster 'kind' não encontrado. Criando..."
    kind create cluster --name kind --config /home/evelyn/notas-max/k8s/kind-config.yaml
else
    echo "✅ Cluster 'kind' encontrado"
fi

# 2. Configurar contexto
echo "📝 Configurando contexto do kubectl..."
kubectl config use-context kind-kind

# 3. Construir imagens Docker
echo "🏗️  Construindo imagens Docker..."
cd /home/evelyn/notas-max

# Build Backend
echo "Building backend image..."
docker build -f Backend/dockerfile -t notas-max-backend:latest ./Backend

# Build Frontend
echo "Building frontend image..."
docker build -f Frontend/dockerfile -t notas-max-frontend:latest ./Frontend

# 4. Carregar imagens no Kind
echo "📦 Carregando imagens no cluster Kind..."
kind load docker-image notas-max-backend:latest --name kind
kind load docker-image notas-max-frontend:latest --name kind

# 5. Aplicar recursos Kubernetes
echo "🔧 Aplicando recursos Kubernetes..."
kubectl apply -f /home/evelyn/notas-max/k8s/configmap.yaml
kubectl apply -f /home/evelyn/notas-max/k8s/mongodb-deployment.yaml
kubectl apply -f /home/evelyn/notas-max/k8s/backend-deployment.yaml
kubectl apply -f /home/evelyn/notas-max/k8s/frontend-deployment.yaml

# 6. Aguardar deployments ficarem prontos
echo "⏳ Aguardando deployments ficarem prontos..."
kubectl rollout status deployment/mongodb --timeout=5m
kubectl rollout status deployment/backend --timeout=5m
kubectl rollout status deployment/frontend --timeout=5m

# 7. Mostrar status
echo ""
echo "✅ Deploy concluído com sucesso!"
echo ""
echo "📊 Status dos recursos:"
kubectl get pods -o wide
echo ""
echo "🔗 Serviços disponíveis:"
kubectl get svc
echo ""
echo "🌐 Acessos:"
echo "   Frontend: http://localhost:30080"
echo "   Backend:  http://localhost:30005"
echo "   MongoDB:  localhost:30017"
echo ""
echo "💡 Dicas úteis:"
echo "   Ver logs: kubectl logs -f deployment/backend"
echo "   Acessar pod: kubectl exec -it <pod-name> -- /bin/bash"
echo "   Deletar tudo: kubectl delete -f /home/evelyn/notas-max/k8s/"
