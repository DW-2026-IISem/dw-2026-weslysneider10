# 

# FASE 1 — \`00_BASE_INIT_NESTJS\`

#  

## 1.1 — Crear carpetas padre y permisos

![](images/clipboard-4250650444.png)

## 1.2 — Instalar Nest CLI

![](images/clipboard-2488214258.png)

## 1.3 — Crear proyecto NestJS

![](images/clipboard-1716755966.png)

## 1.4 — Crear \`.env\` mínimo (puerto)

```         
```

![](images/clipboard-902227579.png)

# FASE 2 — \`01_BASE_DEPS_Y_PUERTO\` 

## 2.1 — Dependencias de producción

![](images/clipboard-2427515783.png)

## 2.2 — Dependencias de desarrollo

![](images/clipboard-2854262658.png)

## 2.3 — Script para liberar puerto (evita EADDRINUSE)

```         
```

![](images/clipboard-4050448449.png)

## 2.4 — Actualizar scripts npm en package.json

![](images/clipboard-2945939292.png)

## 2.5 — Verificar arranque base

![](images/clipboard-2476737382.png)

# FASE 3 — \`02_BASE_ESTRUCTURA_CA\`

## 3.1 — Crear árbol base de carpetas

![](images/clipboard-3690804181.png)

## 3.2 — Recordatorio de responsabilidades

```         
| Carpeta | Responsabilidad |
|---------|------------------|
| `config/` | Cómo se configura la app (env, jwt, swagger) |
| `common/` | Piezas transversales reutilizables |
| `infrastructure/` | Detalles técnicos (Sequelize, bcrypt, JWT) |
| `features/*` | Dominios (business/auth) con CA interna |
```

# FASE 4 — \`03_BASE_ENTORNO_ENV\`

## Configuración del entorno tipado (multi-base)

## 4.1 — Crear \`.env.example\` y actualizar \`.env\` completo

![![](images/clipboard-806226465.png)](images/clipboard-2104553557.png)

##  4.2 — Interface de entorno

![](images/clipboard-773604933.png)

## Validación de entorno con class-validator

![](images/clipboard-3085980191.png)

## 4.4 — Resolver de credenciales por motor

![](images/clipboard-3123422385.png)

## 4.5 — Factory registerAs de entorno

![](images/clipboard-109689038.png)

# FASE 5 — \`04_BASE_DATABASE_SEQUELIZE\`

## 5.1 — Constante SEQUELIZE_TOKEN

![](images/clipboard-2579148028.png)
