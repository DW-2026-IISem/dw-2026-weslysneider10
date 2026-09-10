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

## 4.2 — Interface de entorno

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

## 5.2 — Tipos auxiliares de database config

```         
```

![](images/clipboard-3363341827.png)

## 5.3 — database.config.ts

![](images/clipboard-2104557887.png)

## 5.4 — database.module.ts / providers

```         
```

![](images/clipboard-4142884365.png)

## 5.5 — database.providers.ts

![](images/clipboard-3272649390.png)

## 5.6 — Opciones Sequelize por dialecto

![](images/clipboard-2886276164.png)

## 5.7 — Factory Sequelize (sin modelos aún)

![](images/clipboard-2647965166.png)

## 5.8 — DatabaseSeederService (sin seeders aún)

![](images/clipboard-237743082.png)

## 5.9 — Módulo global Sequelize

![](images/clipboard-1668120965.png)

## 5.10 — Verificar conexión a BD

![](images/clipboard-293159620.png)

# FASE 6 — `05_BASE_APP_COMMON_SECURITY`

## 6.1 — config/app/app.constants.ts

![](images/clipboard-581120151.png)

## 6.2 — config/app/app.config.ts

![](images/clipboard-1253619954.png)

#### **6.3 — config/logger/logger.config.ts**

![](images/clipboard-2116405960.png)

## **6.4 — config/logger/logger.module.ts**

![](images/clipboard-1343252277.png)

##  **6.5 — config/jwt/jwt.constants.ts** 

![](images/clipboard-2478850188.png)

##  **6.6 — config/jwt/jwt.config.ts** 

![](images/clipboard-3889194581.png)

##  **6.7 — config/swagger/swagger.constants.ts** 

![](images/clipboard-63753791.png)

##  **6.8 — config/swagger/swagger.config.ts** 

![](images/clipboard-1595061549.png)

##  **6.9 — common/enums/status.enum.ts** 

![](images/clipboard-3905599104.png)

##  **6.10 — common/enums/http-method.enum.ts** 

![](images/clipboard-1102277654.png)

##  **6.11 — common/enums/sort-order.enum.ts** 

![](images/clipboard-3224750637.png)

##  **6.12 — common/constants/app.constants.ts** 

![](images/clipboard-2465149862.png)

##  **6.13 — common/constants/pagination.constants.ts** 

![](images/clipboard-3369560319.png)

##  **6.14 — common/exceptions/application.exception.ts** 

![](images/clipboard-3138741389.png)

##  **6.15 — common/exceptions/domain.exception.ts** 

![](images/clipboard-689672916.png)

##  **6.16 — common/exceptions/entity-not-found.exception.ts** 

![](images/clipboard-1338445366.png)

##  **6.17 — common/exceptions/validation.exception.ts** 

![](images/clipboard-3230538818.png)

##  **6.18 — common/filters/global-exception.filter.ts** 

![](images/clipboard-2304758966.png)

##  **6.19 — common/filters/sequelize-exception.filter.ts** 

![](images/clipboard-2837475472.png)

##  **6.20 — common/interceptors/response.interceptor.ts** 

![](images/clipboard-2729810298.png)

##  **6.21 — common/interceptors/logging.interceptor.ts** 

![](images/clipboard-873165590.png)

##  **6.22 — common/interceptors/timeout.interceptor.ts** 

##  **6.23 — common/pipes/validation.pipe.ts** 

##  **6.24 — common/pipes/parse-positive-int.pipe.ts** 

##  **6.25 — common/decorators/public.decorator.ts** 

##  **6.26 — common/decorators/roles.decorator.ts** 

##  **6.27 — common/decorators/current-user.decorator.ts** 

##  **6.28 — common/decorators/resource.decorator.ts** 

##  **6.29 — common/interfaces/authenticated-user.interface.ts**

##  

##  **6.30 — common/interfaces/pagination.interface.ts** 

##  **6.31 — common/interfaces/api-response.interface.ts**

##  

##  **6.32 — common/types/nullable.type.ts** 

##  **6.33 — common/types/optional.type.ts** 

##  **6.34 — common/utils/pagination.util.ts** 

##  **6.35 — common/utils/date.util.ts** 

##  **6.36 — common/utils/string.util.ts** 

##  **6.37 — infrastructure/security/hashing/password-hasher.interface.ts** 

##  **6.38 — infrastructure/security/hashing/bcrypt-password-hasher.service.ts** 

##  **6.39 — infrastructure/security/tokens/token.interface.ts** 

##  **6.40 — infrastructure/security/tokens/token.service.ts** 

##  **6.41 — infrastructure/security/security.module.ts** 

##  **6.42 — Actualizar main.ts (bootstrap completo)** 

##  **6.43 — Actualizar app.module.ts (base sin features ni guards)** 

##  **6.44 — Verificar bootstrap transversal**

## 
