#!/bin/bash

# Script para limpar e deletar a aplicação do Kubernetes

set -e

echo "🧹 Iniciando limpeza da aplicação NotasMax..."

# Cores para output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Confirmar ação
echo -e "${YELLOW}⚠️  Isso vai deletar todos os recursos da aplicação no Kubernetes${NC}"
read -p "Tem certeza? (sim/não): " confirm

if [ "$confirm" != "sim" ]; then
    echo "Operação cancelada."
    exit 0
fi

echo -e "${RED}Deletando recursos...${NC}"

# Deletar deployments
echo "Deletando deployments..."
kubectl delete deployment backend frontend mongodb --ignore-not-found=true

# Deletar services
echo "Deletando services..."
kubectl delete svc backend backend-nodeport frontend frontend-nodeport mongodb mongodb-nodeport --ignore-not-found=true

# Deletar PVCs
echo "Deletando PersistentVolumeClaims..."
kubectl delete pvc mongodb-pvc --ignore-not-found=true

# Deletar ConfigMaps
echo "Deletando ConfigMaps..."
kubectl delete cm backend-config frontend-config app-config --ignore-not-found=true

# Deletar Ingress
echo "Deletando Ingress..."
kubectl delete ingress notas-max-ingress --ignore-not-found=true

# Deletar HPAs
echo "Deletando HorizontalPodAutoscalers..."
kubectl delete hpa backend-hpa frontend-hpa --ignore-not-found=true

echo -e "${GREEN}✅ Limpeza concluída!${NC}"
echo ""
echo "Verificando status final:"
kubectl get all

echo ""
echo "Se desejar deletar o cluster Kind:"
echo "  kind delete cluster --name kind"
