# Portfolio

Portfolio personnel – site statique servi avec **nginx** dans un conteneur **Docker**.

## Structure du projet

```
Portfolio/
├── frontend/          # Site statique (HTML, CSS, JS)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── nginx/
│   └── default.conf   # Configuration nginx
├── Dockerfile         # Image Docker (nginx + assets)
├── docker-compose.yml # Orchestration
└── README.md
```

## Lancer le projet

### Prérequis

- [Docker](https://docs.docker.com/get-docker/) ≥ 20
- [Docker Compose](https://docs.docker.com/compose/) ≥ v2

### Démarrage

```bash
# Construire et lancer le conteneur
docker compose up --build -d

# Le site est disponible sur :
# http://localhost:8080
```

### Arrêter le conteneur

```bash
docker compose down
```

## Feuille de route

- [x] Phase 1 – Site statique avec Docker (nginx)
- [ ] Phase 2 – Backend dynamique avec Django + PostgreSQL
- [ ] Phase 3 – CI/CD (GitHub Actions)
