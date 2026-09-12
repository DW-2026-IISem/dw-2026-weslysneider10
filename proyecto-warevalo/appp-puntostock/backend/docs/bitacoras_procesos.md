# 

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

![](images/clipboard-3854751201.png)

##  **7.19** — Controller de `Client` 

![](images/clipboard-3082914929.png)

##  **7.20** — Configuración de rutas/endpoints 

![](images/clipboard-4224422010.png)

##  **7.21** — Índice del módulo de clientes 

![](images/clipboard-3108740569.png)

##  **7.22** — `ClientsModule` 

![](images/clipboard-40263503.png)

##  **7.23** — Registro de dependencias 

![](images/clipboard-2353628631.png)

##  **7.24** — Integración del módulo de clientes 

![](images/clipboard-798451804.png)

##  **7.25** — Registrar `ClientModel` en Sequelize 

![](images/clipboard-257490081.png)

## **7.26** — Actualizar `business.module.ts` 

![](images/clipboard-933045601.png)

##  **7.27** — Actualizar `database-seeder.service.ts` 

![](images/clipboard-2316602066.png)

##  **7.28** — Actualizar `app.module.ts` 

![](images/clipboard-3516012332.png)

##  **7.29** — Verificar tabla física `clients` y API

## ![](images/clipboard-2209075704.png)

# FASE 8 — `07_BUSINESS_PRODUCT_TYPES`

## Business — ProductTypes

### 8.1 — features/business/product-types/domain/entities/product-type.entity.ts

![](images/clipboard-1560724258.png)

### **8.2 — `features/business/product-types/domain/exceptions/product-type-not-found.exception.ts`**

### ![](images/clipboard-941299263.png) 
**8.3 — `features/business/product-types/domain/interfaces/product-type-repository.interface.ts`**

### ![](images/clipboard-3651410975.png) 
**8.4 — `features/business/product-types/infrastructure/persistence/models/product-type.model.ts`**

### ![](images/clipboard-3364340952.png) 
**8.5 — `features/business/product-types/infrastructure/persistence/repositories/product-type.repository.ts`**

### ![](images/clipboard-3364376724.png) 
**8.6 — `features/business/product-types/infrastructure/persistence/migrations/create-product-types-table.migration.ts`**

### ![](images/clipboard-3621563248.png) 
**8.7 — `features/business/product-types/infrastructure/persistence/seeders/product-types.seeder.ts`**

### ![](images/clipboard-1347775943.png) 
**8.8 — `features/business/product-types/application/dto/create-product-type.dto.ts`**

### ![](images/clipboard-2299628074.png) 
**8.9 — `features/business/product-types/application/dto/product-type-filter.dto.ts`**

### ![](images/clipboard-1346521944.png) 
**8.10 — `features/business/product-types/application/dto/product-type-response.dto.ts`**

### ![](images/clipboard-3527047192.png) 
**8.11 — `features/business/product-types/application/dto/update-product-type.dto.ts`**

### ![](images/clipboard-3423457852.png) 
**8.12 — `features/business/product-types/application/mappers/product-type.mapper.ts`**

### ![](images/clipboard-2948288562.png) 
**8.13 — `features/business/product-types/application/use-cases/create-product-type.use-case.ts`**

### ![](images/clipboard-1337878941.png) 
**8.14 — `features/business/product-types/application/use-cases/delete-product-type.use-case.ts`**

### ![](images/clipboard-3094402002.png) 
**8.15 — `features/business/product-types/application/use-cases/get-product-type.use-case.ts`**

### ![](images/clipboard-2891675703.png) 
**8.16 — `features/business/product-types/application/use-cases/list-product-types.use-case.ts`**

### ![](images/clipboard-2161797516.png) 
**8.17 — `features/business/product-types/application/use-cases/update-product-type.use-case.ts`**

### ![](images/clipboard-4007180333.png) 
**8.18 — `features/business/product-types/presentation/http/serializers/product-type.serializer.ts`**

### ![](images/clipboard-1621948112.png) 
**8.19 — `features/business/product-types/presentation/http/controllers/product-types.controller.ts`**

### ![](images/clipboard-1594762314.png) 
**8.20 — `features/business/product-types/index.ts`**

### ![](images/clipboard-143693970.png) 
**8.21 — `features/business/product-types/product-types.module.ts`**

### ![](images/clipboard-2139885569.png) 
**8.22 — `src/infrastructure/database/sequelize/sequelize.factory.ts`**

### ![](images/clipboard-1641303517.png) 
**8.23 — `src/features/business/business.module.ts`**

### ![](images/clipboard-2898480883.png) 
**8.24 — `src/infrastructure/database/seeders/database-seeder.service.ts`**

### ![](images/clipboard-3665547974.png) 
**8.25 — `src/app.module.ts`**

### ![](images/clipboard-505144632.png) 
**8.26 — Verificar tabla `product_types` y endpoints `/api/product-types`**

![![](images/clipboard-178510747.png)](images/clipboard-473087644.png)

# FASE 9 — `08_BUSINESS_PRODUCTS`

## Business — Products

### 9.1 — features/business/products/domain/entities/product.entity.ts

### ![](images/clipboard-1248439049.png)

### 9.2 — features/business/products/domain/exceptions/invalid-product-price.exception.ts

### ![](images/clipboard-1054211119.png)

### 9.3 — features/business/products/domain/exceptions/invalid-product-stock.exception.ts

### ![](images/clipboard-467364751.png)

### 9.4 — features/business/products/domain/exceptions/product-not-found.exception.ts

### ![](images/clipboard-336937830.png)

### 9.5 — features/business/products/domain/interfaces/product-repository.interface.ts

### ![](images/clipboard-315143547.png)

### 9.6 — features/business/products/domain/validators/product-price.validator.ts

### ![](images/clipboard-2947244856.png)

### 9.7 — features/business/products/domain/validators/product-stock.validator.ts

### ![](images/clipboard-187791855.png)

### 9.8 — features/business/products/infrastructure/persistence/models/product.model.ts

### ![](images/clipboard-2482554623.png)

### 9.9 — features/business/products/infrastructure/persistence/repositories/product.repository.ts

### ![](images/clipboard-2722696288.png)

### 9.10 — features/business/products/infrastructure/persistence/migrations/create-products-table.migration.ts

### ![](images/clipboard-2800204256.png)

### 9.11 — features/business/products/infrastructure/persistence/seeders/products.seeder.ts

### ![](images/clipboard-1092974154.png)

### 9.12 — features/business/products/application/dto/create-product.dto.ts

### ![](images/clipboard-268361433.png)

### 9.13 — features/business/products/application/dto/product-filter.dto.ts

### ![](images/clipboard-895913974.png)

### 9.14 — features/business/products/application/dto/product-response.dto.ts

### ![](images/clipboard-1464382774.png)

### 9.15 — features/business/products/application/dto/update-product.dto.ts

### ![](images/clipboard-63727997.png)

### 9.16 — features/business/products/application/mappers/product.mapper.ts

### ![](images/clipboard-1466115151.png)

### 9.17 — features/business/products/application/use-cases/create-product.use-case.ts

### ![](images/clipboard-2535355839.png)

### 9.18 — features/business/products/application/use-cases/delete-product.use-case.ts

### ![](images/clipboard-3404293289.png)

### 9.19 — features/business/products/application/use-cases/get-product.use-case.ts

### ![](images/clipboard-2835650087.png)

### 9.20 — features/business/products/application/use-cases/list-products.use-case.ts

### ![](images/clipboard-947147847.png)

### 9.21 — features/business/products/application/use-cases/update-product.use-case.ts

### ![](images/clipboard-548146865.png)

### 9.22 — features/business/products/presentation/http/serializers/product.serializer.ts

### ![](images/clipboard-3069524451.png)

### 9.23 — features/business/products/presentation/http/controllers/products.controller.ts

### ![](images/clipboard-1591961728.png)

### 9.24 — features/business/products/index.ts

### ![](images/clipboard-2137003277.png)

### 9.25 — features/business/products/products.module.ts

### ![](images/clipboard-4032673810.png)

### 9.26 — Actualizar sequelize.factory.ts (registrar modelos)

### ![](images/clipboard-2255201900.png)

### 9.27 — Actualizar business.module.ts

### ![](images/clipboard-4083000579.png)

### 9.28 — Actualizar database-seeder.service.ts

### ![](images/clipboard-1546214280.png)

### 9.29 — Actualizar app.module.ts

### ![](images/clipboard-2131376702.png)

### 9.30 — Verificar tabla \`products

### ![](images/clipboard-1670696053.png)

![](images/clipboard-2255704933.png)

# FASE 10 — `09_BUSINESS_SALES`

## Business — Sales (+ ProductSale)

### **10.1** — `features/business/sales/domain/entities/sale.entity.ts` 

![](images/clipboard-3167533683.png)

###  **10.2** — `features/business/sales/domain/exceptions/insufficient-stock.exception.ts` 

![](images/clipboard-2414158537.png)

###  **10.3** — `features/business/sales/domain/exceptions/sale-not-found.exception.ts` 

![](images/clipboard-2414158537.png)

###  **10.4** — `features/business/sales/domain/interfaces/sale-repository.interface.ts` 

![](images/clipboard-2633217176.png)

###  **10.5** — `features/business/sales/domain/services/sale-calculator.domain-service.ts` 

![](images/clipboard-3262802284.png)

###  **10.6** — `features/business/sales/infrastructure/persistence/models/product-sale.model.ts` 

![](images/clipboard-2396025016.png)

###  **10.7** — `features/business/sales/infrastructure/persistence/models/sale.model.ts` 

![](images/clipboard-3212920505.png)

###  **10.8** — `features/business/sales/infrastructure/persistence/repositories/sale.repository.ts` 

![](images/clipboard-1288295562.png)

###  **10.9** — `features/business/sales/infrastructure/persistence/migrations/create-sales-table.migration.ts` 

![](images/clipboard-2373221631.png)

###  **10.10** — `features/business/sales/infrastructure/persistence/seeders/sales.seeder.ts` 

![](images/clipboard-3917553635.png)

###  **10.11** — `features/business/sales/application/dto/create-sale.dto.ts` 

![](images/clipboard-3817566816.png)

###  **10.12** — `features/business/sales/application/dto/sale-filter.dto.ts` 

![](images/clipboard-3600961020.png)

###  **10.13** — `features/business/sales/application/dto/sale-response.dto.ts` 

![](images/clipboard-3600961020.png)

###  **10.14** — `features/business/sales/application/mappers/sale.mapper.ts` 

![](images/clipboard-872239156.png)

###  **10.15** — `features/business/sales/application/use-cases/cancel-sale.use-case.ts` 

![](images/clipboard-3689785146.png)

###  **10.16** — `features/business/sales/application/use-cases/create-sale.use-case.ts` 

![](images/clipboard-192113696.png)

###  **10.17** — `features/business/sales/application/use-cases/get-sale.use-case.ts` 

![](images/clipboard-3107927911.png)

###  **10.18** — `features/business/sales/application/use-cases/list-sales.use-case.ts` 

![](images/clipboard-3107927911.png)

###  **10.19** — `features/business/sales/presentation/http/serializers/sale.serializer.ts` 

![](images/clipboard-2470893563.png)

###  **10.20** — `features/business/sales/presentation/http/controllers/sales.controller.ts` 

![](images/clipboard-2470893563.png)

###  **10.21** — `features/business/sales/index.ts` 

![](images/clipboard-4001341595.png)

###  **10.22** — `features/business/sales/sales.module.ts` 

![](images/clipboard-2214228902.png)

###  **10.23** — Barrel `business/index.ts` 

![](images/clipboard-3036374478.png)

###  **10.24** — Actualizar `sequelize.factory.ts` (registrar modelos) 

![](images/clipboard-4223149760.png)

###  **10.25** — Actualizar `business.module.ts` 

![](images/clipboard-2932397780.png)

###  **10.26** — Actualizar `database-seeder.service.ts` 

![](images/clipboard-1469343284.png)

###  **10.27** — Actualizar `app.module.ts` 

![](images/clipboard-1332433235.png)

###  **10.28** — Verificar tablas `sales` / `product_sales`

### ![](images/clipboard-669784757.png)

# Entidad Sucursal (Branch) — PuntoStock

# FASE 11 — `10_BUSINESS_BRANCHES`

### **11.1** — domain/entities/branch.entity.ts

![](images/clipboard-2623278231.png)

### **11.2** — domain/exceptions/branch-not-found.exception.ts

![](images/clipboard-2414415100.png)

### **11.3** — domain/interfaces/branch-repository.interface.ts

![](images/clipboard-2326740287.png)

### **11.4** — infrastructure/persistence/models/branch.model.ts

![](images/clipboard-1126621114.png)

### **11.5** — infrastructure/persistence/repositories/branch.repository.ts

![](images/clipboard-1744793481.png)

### **11.6** — infrastructure/persistence/migrations/create-branches-table.migration.ts

![](images/clipboard-2243729708.png)

### **11.7** — infrastructure/persistence/seeders/branches.seeder.ts

![](images/clipboard-2928989183.png)

### **11.8** — application/dto/create-branch.dto.ts

![](images/clipboard-3846634404.png)

### **11.9** — application/dto/branch-filter.dto.ts

![](images/clipboard-229025573.png)

### **11.10** — application/dto/branch-response.dto.ts

![](images/clipboard-3352271813.png)

### **11.11** — application/dto/update-branch.dto.ts

![](images/clipboard-2893611636.png)

### **11.12** — application/mappers/branch.mapper.ts

![](images/clipboard-248768437.png)

### **11.13** — application/use-cases/create-branch.use-case.ts

![](images/clipboard-1888321972.png)

### **11.14** — application/use-cases/delete-branch.use-case.ts

![](images/clipboard-2588705794.png)

### **11.15** — application/use-cases/get-branch.use-case.ts

![](images/clipboard-1626497272.png)

### **11.16** — application/use-cases/list-branches.use-case.ts

![](images/clipboard-1177643011.png)

### **11.17** — application/use-cases/update-branch.use-case.ts

![](images/clipboard-3967367934.png)

### **11.18** — presentation/http/serializers/branch.serializer.ts

![](images/clipboard-432535519.png)

### **11.19** — presentation/http/controllers/branches.controller.ts

![](images/clipboard-2561621044.png)

### **11.20** — index.ts (barrel export)

![](images/clipboard-881862681.png)

### **11.21** — branches.module.ts

![](images/clipboard-3769739706.png)

### **11.22** — Actualizar sequelize.factory.ts (registrar BranchModel)

![](images/clipboard-4176199150.png)

### **11.23** — Actualizar business.module.ts (agregar BranchesModule)

![](images/clipboard-3830902114.png)

### **11.24** — Actualizar database-seeder.service.ts (correr seedBranches)

![](images/clipboard-665396658.png)

### **11.25** — Actualizar app.module.ts (confirmar cableado)

![](images/clipboard-3723880920.png)

### **11.26** — Verificar tabla `branches` y API

![![](images/clipboard-3237278975.png)](images/clipboard-3766663094.png)

#  Fase 12 `11_BUSINESS_SUPPLIERS`

### **12.1** — domain/entities/supplier.entity.ts

###  ![](images/clipboard-304246543.png)

### **12.2** — domain/exceptions/supplier-nit-already-exists.exception.ts

###  ![](images/clipboard-2339478133.png)

### **12.3** — domain/exceptions/supplier-not-found.exception.ts

###  ![](images/clipboard-2303647169.png)

### **12.4** — domain/interfaces/supplier-repository.interface.ts

###  ![](images/clipboard-1528627010.png)

### **12.5** — domain/validators/supplier-nit.validator.ts

###  ![](images/clipboard-1011729366.png)

### **12.6** — domain/validators/supplier-email.validator.ts

###  ![](images/clipboard-1194889468.png)

### **12.7** — domain/validators/supplier-phone.validator.ts

###  

### **12.8** — infrastructure/persistence/models/supplier.model.ts

###  

### **12.9** — infrastructure/persistence/repositories/supplier.repository.ts

###  

### **12.10** — infrastructure/persistence/migrations/create-suppliers-table.migration.ts

###  

### **12.11** — infrastructure/persistence/seeders/suppliers.seeder.ts

###  

### **12.12** — application/dto/create-supplier.dto.ts

###  

### **12.13** — application/dto/supplier-filter.dto.ts

###  

### **12.14** — application/dto/supplier-response.dto.ts

###  

### **12.15** — application/dto/update-supplier.dto.ts

###  

### **12.16** — application/mappers/supplier.mapper.ts

###  

### **12.17** — application/use-cases/create-supplier.use-case.ts

###  

### **12.18** — application/use-cases/delete-supplier.use-case.ts

###  

### **12.19** — application/use-cases/get-supplier.use-case.ts

###  

### **12.20** — application/use-cases/list-suppliers.use-case.ts

###  

### **12.21** — application/use-cases/update-supplier.use-case.ts

###  

### **12.22** — presentation/http/serializers/supplier.serializer.ts

###  

### **12.23** — presentation/http/controllers/suppliers.controller.ts

###  

### **12.24** — index.ts (barrel export)

###  

### **12.25** — suppliers.module.ts

###  

### **12.26** — Actualizar sequelize.factory.ts (registrar SupplierModel)

###  

### **12.27** — Actualizar business.module.ts (agregar SuppliersModule)

###  

### **12.28** — Actualizar database-seeder.service.ts (correr seedSuppliers)

###  

### **12.29** — Actualizar app.module.ts (confirmar cableado)

###  

### **12.30** — Verificar tabla `suppliers` y API

### 
