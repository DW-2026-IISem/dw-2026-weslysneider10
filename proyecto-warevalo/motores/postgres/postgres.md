## 5. Paso 4: PostgreSQL

### 5.1 Crear docker-compose.yml

``` bash
cat > ~/ia-lab/services/motores-bd/postgres/docker-compose.yml << 'EOF'
services:
  postgres:
    image: postgres:16
    container_name: postgres-server
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "5433:5432"
    volumes:
      - ../../../data/postgres:/var/lib/postgresql/data
      - /mnt/c/academia/bd:/backups
    networks:
      - ia-lab-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s

networks:
  ia-lab-network:
    external: true
EOF
```

### 5.2 Crear .env

``` bash
cat > ~/ia-lab/services/motores-bd/postgres/.env << 'EOF'
TZ=America/Bogota
POSTGRES_DB=puntostock
POSTGRES_USER=wesly
POSTGRES_PASSWORD=123456
PGDATA=/var/lib/postgresql/data
EOF
```

### 5.3 Crear README.md

``` bash
cat > ~/ia-lab/services/motores-bd/postgres/README.md << 'EOF'
# PostgreSQL 17 - Motor de Base de Datos

> **Acceso remoto habilitado.** Puerto expuesto en `0.0.0.0:5433`.
> **Usuario por defecto:** `wesly` (acceso remoto: sin restriccion de host)
EOF
```
------------------------------------------------------------------------------

## Conectar desde WSL (local)

```bash
docker exec -it postgres-server psql -U wesly -d puntostock
# Password: 123456
```

## Conectar remotamente desde cualquier equipo

``` bash
psql -h 172.24.87.251 -p 5433 -U wesly -d puntostock
```

O con cliente grafico (pgAdmin, DBeaver): - **Host:** `172.24.87.251` - **Port:** `5433` - **User:** `wesly` - **Password:** `123456` - **Database:** `puntostock`

## Crear un usuario PROPIO con ACCESO REMOTO

``` sql
-- Crear usuario propio (por defecto puede conectarse desde cualquier host)
CREATE USER wesly_postgres WITH PASSWORD '123456';

-- Dar permisos sobre la base de datos
GRANT ALL PRIVILEGES ON DATABASE puntostock TO wesly_postgres;
ALTER DATABASE puntostock OWNER TO wesly_postgres;
```

## Backup de una base de datos

``` bash
docker exec postgres-server pg_dump -U wesly -d puntostock > /mnt/c/academia/bd/backup_postgres_puntostock_$(date +%Y%m%d).sql
```

## Variables clave del .env

| Variable            | Descripcion                              |
|---------------------|------------------------------------------|
| `POSTGRES_USER`     | Usuario administrador (wesly)          |
| `POSTGRES_PASSWORD` | Password del administrador               |
| `POSTGRES_DB`       | Base de datos inicial creada al arrancar |
      

### 5.4 Levantar PostgreSQL

```bash
cd ~/ia-lab/services/motores-bd/postgres
docker compose up -d
```

``` bash
docker ps | grep postgres-server
docker logs postgres-server --tail 20
```

<p align="center">
  <img src="imagenes/levantarpostgres.png">
</p>