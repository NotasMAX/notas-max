# NotasMax - Kubernetes com Kind

Deploy minimalista da aplicação NotasMax no Kubernetes usando Kind.

## 🚀 Quick Start

```bash
cd k8s
./deploy.sh
```

A aplicação estará disponível em:
- **Frontend**: http://localhost:30080
- **Backend**: http://localhost:30005
- **MongoDB**: localhost:30017

## 📁 Arquivos

- `kind-config.yaml` - Configuração do cluster Kind
- `app.yaml` - Deployments e Services (MongoDB, Backend, Frontend)
- `deploy.sh` - Script de deploy automatizado

## 🔍 Verificar Status

```bash
kubectl get pods
kubectl get svc
kubectl logs -f deployment/frontend
kubectl logs -f deployment/backend
```

## 🧹 Limpar

```bash
kubectl delete -f app.yaml
kind delete cluster --name kind
```

## 📊 Recursos Usados

- MongoDB: 100-200Mi RAM, 50-200m CPU
- Backend: 100-256Mi RAM, 50-200m CPU  
- Frontend: 50-128Mi RAM, 50-200m CPU

**Total: ~350-580Mi RAM estimado**
