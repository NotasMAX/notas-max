# 🚀 Guia Rápido - Deploy Kubernetes NotasMax

## ⚡ Início Rápido (30 segundos)

```bash
cd k8s
./deploy.sh
```

Pronto! A aplicação estará disponível em:
- 🌐 **Frontend**: http://localhost:30080
- 🔌 **API Backend**: http://localhost:30005
- 💾 **MongoDB**: localhost:30017

---

## 📁 Arquivos Kubernetes Criados

| Arquivo | Propósito |
|---------|-----------|
| `kind-config.yaml` | Configuração do cluster Kind |
| `namespace.yaml` | Namespace da aplicação |
| `configmap.yaml` | Variáveis globais |
| `mongodb-deployment.yaml` | MongoDB + Storage + Services |
| `backend-deployment.yaml` | Node.js Backend + HPA + Probes |
| `frontend-deployment.yaml` | React Frontend + HPA + Probes |
| `ingress.yaml` | Roteamento de requisições (opcional) |
| `deploy.sh` | Script de deploy automatizado |
| `cleanup.sh` | Script para limpar tudo |
| `README.md` | Documentação completa |

---

## 🔍 Verificar Status

```bash
# Ver todos os pods
kubectl get pods

# Ver todos os serviços
kubectl get svc

# Ver armazenamento
kubectl get pvc

# Ver autoscaling
kubectl get hpa

# Ver tudo
kubectl get all
```

---

## 📊 Ver Logs

```bash
# Backend
kubectl logs -f deployment/backend

# Frontend
kubectl logs -f deployment/frontend

# MongoDB
kubectl logs -f deployment/mongodb

# Pod específico
kubectl logs -f pod/<pod-name>
```

---

## 🔧 Operações Comuns

### Escalar manualmente (temporário)
```bash
kubectl scale deployment backend --replicas=5
```

### Reiniciar um deployment
```bash
kubectl rollout restart deployment/backend
```

### Acessar um pod
```bash
kubectl exec -it <pod-name> -- /bin/bash
```

### Descrever um pod
```bash
kubectl describe pod <pod-name>
```

### Ver histórico de deployments
```bash
kubectl rollout history deployment/backend
```

---

## 🧹 Limpeza

### Remover toda a aplicação
```bash
./cleanup.sh
```

Ou manualmente:
```bash
kubectl delete -f mongodb-deployment.yaml
kubectl delete -f backend-deployment.yaml
kubectl delete -f frontend-deployment.yaml
kubectl delete -f configmap.yaml
```

### Deletar cluster Kind
```bash
kind delete cluster --name kind
```

---

## 🆘 Troubleshooting

### Pod crashando?
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Imagem não encontrada?
```bash
# Reconstruir e carregar
docker build -f ../Backend/dockerfile -t notas-max-backend:latest ../Backend
kind load docker-image notas-max-backend:latest --name kind
```

### Port já em uso?
Modifique o arquivo YAML e altere o `nodePort`:
```yaml
ports:
  - port: 5173
    targetPort: 5173
    nodePort: 30080  # Altere este número
```

### MongoDB não conecta?
```bash
# Verificar se o pod está rodando
kubectl get pods -l app=mongodb

# Ver logs
kubectl logs -f deployment/mongodb

# Verificar service
kubectl get svc mongodb
```

---

## 📈 Recursos Configurados

### MongoDB
- Replicas: 1
- Storage: 5Gi
- CPU: 250m request / 500m limit
- RAM: 256Mi request / 512Mi limit

### Backend
- Replicas: 2-5 (autoscala com HPA)
- CPU: 200m request / 500m limit
- RAM: 256Mi request / 512Mi limit
- CPU Target HPA: 70%
- RAM Target HPA: 80%

### Frontend
- Replicas: 2-4 (autoscala com HPA)
- CPU: 100m request / 300m limit
- RAM: 128Mi request / 256Mi limit
- CPU Target HPA: 75%

---

## 🌐 URLs e Portas

| Serviço | URL/Host | Porta |
|---------|----------|-------|
| Frontend | http://localhost | 30080 |
| Backend API | http://localhost | 30005 |
| MongoDB | localhost | 30017 |
| Ingress HTTP | localhost | 80 |
| Ingress HTTPS | localhost | 443 |

---

## 📚 Próximos Passos

1. ✅ Deploy básico com `./deploy.sh`
2. 📊 Monitorar com `kubectl get all`
3. 📝 Ver logs com `kubectl logs -f deployment/backend`
4. 🔄 Atualizar imagens com `docker build` e `kubectl rollout restart`
5. 📈 Monitorar HPA com `kubectl get hpa -w`

---

## 💡 Dicas Úteis

```bash
# Watch contínuo do status
watch kubectl get pods

# Port forward local
kubectl port-forward svc/backend 5000:5000

# Executar comando em um pod
kubectl exec <pod> -- npm ls

# Ver eventos
kubectl get events --sort-by='.lastTimestamp'

# Limpeza de recursos antigos
kubectl delete pods --field-selector=status.phase=Failed
```

---

## 🔗 Referências

- [Kubernetes Docs](https://kubernetes.io/)
- [Kind Docs](https://kind.sigs.k8s.io/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

**Sucesso no deploy! 🎉**
