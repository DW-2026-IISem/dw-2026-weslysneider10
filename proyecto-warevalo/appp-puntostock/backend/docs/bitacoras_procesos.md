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

## **6.5 — config/jwt/jwt.constants.ts**

![](images/clipboard-2478850188.png)

## **6.6 — config/jwt/jwt.config.ts**

![](images/clipboard-3889194581.png)

## **6.7 — config/swagger/swagger.constants.ts**

![](images/clipboard-63753791.png)

## **6.8 — config/swagger/swagger.config.ts**

![](images/clipboard-1595061549.png)

## **6.9 — common/enums/status.enum.ts**

![](images/clipboard-3905599104.png)

## **6.10 — common/enums/http-method.enum.ts**

![](images/clipboard-1102277654.png)

## **6.11 — common/enums/sort-order.enum.ts**

![](images/clipboard-3224750637.png)

## **6.12 — common/constants/app.constants.ts**

![](images/clipboard-2465149862.png)

## **6.13 — common/constants/pagination.constants.ts**

![](images/clipboard-3369560319.png)

## **6.14 — common/exceptions/application.exception.ts**

![](images/clipboard-3138741389.png)

## **6.15 — common/exceptions/domain.exception.ts**

![](images/clipboard-689672916.png)

## **6.16 — common/exceptions/entity-not-found.exception.ts**

![](images/clipboard-1338445366.png)

## **6.17 — common/exceptions/validation.exception.ts**

![](images/clipboard-3230538818.png)

## **6.18 — common/filters/global-exception.filter.ts**

![](images/clipboard-2304758966.png)

## **6.19 — common/filters/sequelize-exception.filter.ts**

![](images/clipboard-2837475472.png)

## **6.20 — common/interceptors/response.interceptor.ts**

![](images/clipboard-2729810298.png)

## **6.21 — common/interceptors/logging.interceptor.ts**

![](images/clipboard-873165590.png)

## **6.22 — common/interceptors/timeout.interceptor.ts**

![](images/clipboard-3648499145.png)

## **6.23 — common/pipes/validation.pipe.ts**

![](images/clipboard-3490536766.png)

## **6.24 — common/pipes/parse-positive-int.pipe.ts**

![](images/clipboard-1383808069.png)

## **6.25 — common/decorators/public.decorator.ts**

![](images/clipboard-2903988954.png)

## **6.26 — common/decorators/roles.decorator.ts**

![](images/clipboard-1023481534.png)

## **6.27 — common/decorators/current-user.decorator.ts**

![](images/clipboard-2545757657.png)

## **6.28 — common/decorators/resource.decorator.ts**

![](images/clipboard-2049706851.png)

## **6.29 — common/interfaces/authenticated-user.interface.ts**

## ![](images/clipboard-1662596693.png)

## **6.30 — common/interfaces/pagination.interface.ts**

![](images/clipboard-4164455729.png)

## **6.31 — common/interfaces/api-response.interface.ts**

## ![](images/clipboard-246902102.png)

## **6.32 — common/types/nullable.type.ts**

![](images/clipboard-256535839.png)

## **6.33 — common/types/optional.type.ts**

![](images/clipboard-950457430.png)

## **6.34 — common/utils/pagination.util.ts**

![](images/clipboard-1752960516.png)

## **6.35 — common/utils/date.util.ts**

![](images/clipboard-4040226803.png)

## **6.36 — common/utils/string.util.ts**

![](images/clipboard-1080195594.png)

## **6.37 — infrastructure/security/hashing/password-hasher.interface.ts**

![](images/clipboard-3839554789.png)

## **6.38 — infrastructure/security/hashing/bcrypt-password-hasher.service.ts**

![](images/clipboard-221746197.png)

## **6.39 — infrastructure/security/tokens/token.interface.ts**

![](images/clipboard-3745588493.png)

## **6.40 — infrastructure/security/tokens/token.service.ts**

![](images/clipboard-1638592771.png)

## **6.41 — infrastructure/security/security.module.ts**

![](images/clipboard-2372015120.png)

## **6.42 — Actualizar main.ts (bootstrap completo)**

![](images/clipboard-2667202806.png)

## **6.43 — Actualizar app.module.ts (base sin features ni guards)**

![](images/clipboard-3050705204.png)

## **6.44 — Verificar bootstrap transversal**

## ![](images/clipboard-2196894267.png)

![](images/clipboard-616487120.png)

# **FASE 7 — `06_BUSINESS_CLIENTS`**

## **Business — Clients (patrón completo CA)**

## **7.1 features/business/clients/domain/entities/client.entity.ts**

![](images/clipboard-2807920690.png)

## **7.2** — Excepciones de dominio de `Client` 

![](images/clipboard-2167141650.png)

##  **7.3** — Interfaz del repositorio `Client` 

![](images/clipboard-1457217616.png)

##  **7.4** — Validadores de `Client` 

![](images/clipboard-3904679441.png)

##  **7.5** — Modelo Sequelize `ClientModel` 

![](images/clipboard-2498567780.png)

##  **7.6** — Repositorio Sequelize de `Client` 

![](images/clipboard-3007451422.png)

##  **7.7** — Migración de `clients` 

![](images/clipboard-3305990571.png)

##  **7.8** — Seeder de `clients` 

![](images/clipboard-3523350029.png)

##  **7.9** — DTO de creación de cliente 

![](images/clipboard-3830596916.png)

##  **7.10** — DTO de actualización de cliente 

![](images/clipboard-2395615305.png)

##  **7.11** — Mapper de `Client`

![](images/clipboard-2338260458.png)

##   **7.12** — Caso de uso: crear cliente 

![](images/clipboard-3872531212.png)

## **7.13** — Caso de uso: actualizar cliente 

![](images/clipboard-2038644474.png)

##  **7.14** — Caso de uso: eliminar cliente 

![](images/clipboard-325261033.png)

##  **7.15** — Caso de uso: obtener cliente 

![](images/clipboard-860005210.png)

##  **7.16** — Caso de uso: listar clientes 

![](images/clipboard-2081948762.png)

##  **7.17** — Registro de casos de uso 

![](images/clipboard-3502722345.png)

##  **7.18** — Serializador de `Client` 

##  **7.19** — Controller de `Client` 

##  **7.20** — Configuración de rutas/endpoints 

##  **7.21** — Índice del módulo de clientes 

##  **7.22** — `ClientsModule` 

##  **7.23** — Registro de dependencias 

##  **7.24** — Integración del módulo de clientes 

##  **7.25** — Registrar `ClientModel` en Sequelize 

## **7.26** — Actualizar `business.module.ts` 

##  **7.27** — Actualizar `database-seeder.service.ts` 

##  **7.28** — Actualizar `app.module.ts` 

##  **7.29** — Verificar tabla física `clients` y API

## 
