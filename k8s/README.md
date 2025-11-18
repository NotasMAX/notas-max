# Configuração Kubernetes - NotasMax

Este diretório contém todos os arquivos de configuração Kubernetes para fazer deploy da aplicação NotasMax.

## 📋 Estrutura de Arquivos

- **kind-config.yaml**: Configuração do cluster Kind local
- **namespace.yaml**: Namespace da aplicação
- **configmap.yaml**: Configurações globais
- **mongodb-deployment.yaml**: Deployment do MongoDB com PVC e Services
- **backend-deployment.yaml**: Deployment do Node.js backend com HPA
- **frontend-deployment.yaml**: Deployment do React frontend com HPA
- **deploy.sh**: Script automatizado para fazer o deploy completo

## 🚀 Como Fazer Deploy

### Opção 1: Usar o script automatizado (RECOMENDADO)

```bash
./deploy.sh
```

Este script irá:
1. Criar o cluster Kind se não existir
2. Construir as imagens Docker
3. Carregar as imagens no cluster
4. Aplicar todos os recursos Kubernetes
5. Aguardar que os deployments fiquem prontos
6. Mostrar status final

### Opção 2: Deploy manual passo a passo

```bash
# 1. Criar cluster
kind create cluster --name kind --config ./kind-config.yaml

# 2. Construir imagens
docker build -f ../Backend/dockerfile -t notas-max-backend:latest ../Backend
docker build -f ../Frontend/dockerfile -t notas-max-frontend:latest ../Frontend

# 3. Carregar imagens no Kind
kind load docker-image notas-max-backend:latest --name kind
kind load docker-image notas-max-frontend:latest --name kind

# 4. Aplicar configurações
kubectl apply -f configmap.yaml
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml

# 5. Verificar status
kubectl get pods
kubectl get svc
```

## 🌐 Acessando a Aplicação

Após o deploy bem-sucedido, a aplicação estará acessível em:

- **Frontend**: http://localhost:30080
- **Backend API**: http://localhost:30005
- **MongoDB**: localhost:30017

## 📊 Monitoramento

### Ver status dos pods
```bash
kubectl get pods
kubectl get pods -o wide
```

### Ver logs de um deployment
```bash
# Backend
kubectl logs -f deployment/backend

# Frontend
kubectl logs -f deployment/frontend

# MongoDB
kubectl logs -f deployment/mongodb
```

### Acessar um pod interativamente
```bash
kubectl exec -it <pod-name> -- /bin/bash
```

### Ver recursos
```bash
kubectl get all
kubectl get svc
kubectl get pvc
kubectl get hpa
```

## 🔧 Configurações Aplicadas

### MongoDB
- **Replicas**: 1
- **Storage**: 5Gi (PersistentVolumeClaim)
- **Service**: ClusterIP (interno) + NodePort (30017)
- **Liveness Probe**: Verifica conexão a cada 10 segundos

### Backend (Node.js)
- **Replicas**: 2-5 (com HPA)
- **CPU Target**: 70%
- **Memory Target**: 80%
- **Service**: ClusterIP (interno) + NodePort (30005)
- **Health Checks**: Liveness e Readiness probes

### Frontend (React)
- **Replicas**: 2-4 (com HPA)
- **CPU Target**: 75%
- **Service**: ClusterIP (interno) + NodePort (30080)
- **Health Checks**: Liveness e Readiness probes

## 🛠️ Operações Comuns

### Deletar toda a aplicação
```bash
kubectl delete -f mongodb-deployment.yaml
kubectl delete -f backend-deployment.yaml
kubectl delete -f frontend-deployment.yaml
kubectl delete -f configmap.yaml
```

### Reiniciar um deployment
```bash
kubectl rollout restart deployment/backend
```

### Ver histórico de rollout
```bash
kubectl rollout history deployment/backend
```

### Escalar manualmente (temporário)
```bash
kubectl scale deployment backend --replicas=3
```

### Deletar cluster Kind
```bash
kind delete cluster --name kind
```

## 📝 Variáveis de Ambiente

As seguintes variáveis são configuradas via ConfigMap:

**Backend**:
- `MONGODB_URL`: `mongodb://mongodb:27017/NotasMax`
- `NODE_ENV`: `production`

**Frontend**:
- `VITE_API_URL`: `http://localhost:30005`

## ⚠️ Troubleshooting

### Pod não inicia
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Imagem não encontrada
Certifique-se de que as imagens foram carregadas no Kind:
```bash
docker images | grep notas-max
kind load docker-image notas-max-backend:latest --name kind
kind load docker-image notas-max-frontend:latest --name kind
```

### MongoDB não conecta
Verifique se o service está rodando:
```bash
kubectl get svc mongodb
kubectl get pods -l app=mongodb
```

### Port já em uso
Se as portas 30017, 30005 ou 30080 já estão em uso, modifique os arquivos YAML:
- `mongodb-deployment.yaml`: linha `nodePort: 30017`
- `backend-deployment.yaml`: linha `nodePort: 30005`
- `frontend-deployment.yaml`: linha `nodePort: 30080`

## 📚 Referências

- [Kind Documentation](https://kind.sigs.k8s.io/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

## 🆘 Suporte

Para mais informações sobre como configurar ou troubleshoot, execute:
```bash
kubectl cluster-info
kubectl version
kind version
```
