### Manual — backend-express

### ISS-00 — Requisitos previos

### Verifica que tengas Node y npm:

### 

### ISS-01 — Esqueleto del proyecto

### 2.1 Inicializar npm y scripts

### 

### 

### 

### 

### TypeScript (`tsconfig.json`)

### 

### Servidor y App (esqueleto HTTP)

### 

### ![](images/clipboard-523436435.png)

### 

### **2.5.2** — `src/config/index.ts` (esqueleto de App)

### ![](images/clipboard-3036483219.png)

### Verificación y cierre de **ISS-01** (`npx tsc --noEmit` + `npm run dev`)

### ![](images/clipboard-118769016.png)

### **3.1** — Drivers Sequelize y `.env` (ISS-02)

### ![](images/clipboard-194051402.png)

### **3.2** — Configuración Sequelize (`src/database/db.ts`)

### ![](images/clipboard-4171316086.png)

### **3.3** — Carpeta `seeders/` (reservada, sin lógica aún)

### ![](images/clipboard-1607873606.png)

### Verificación y cierre de **ISS-02**

### ![](images/clipboard-4097047504.png)

### **4.1** — Modelo `Client` (ISS-03-A)

### ![](images/clipboard-700451423.png)

![](images/clipboard-932179446.png)

### **4.2** — Esqueleto `client.controller.ts` / `client.routes.ts` + carpeta `http/`

### ![](images/clipboard-2407362602.png)

![](images/clipboard-4215056907.png)

### **4.3** — Agregador `routes/index.ts` + PARCHE en `config/index.ts` (cablear BD y rutas)

### ![](images/clipboard-852224283.png)

### Verificación y cierre de **ISS-03-A**

### ![](images/clipboard-3773347566.png)

### **ISS-03-B** — Controller PARCHE: `getAll` + `getOne`

### ![](images/clipboard-1558421921.png)

### **ISS-03-B** — Rutas PARCHE: `GET /api/clientes` + `GET /api/clientes/:id`

### ![](images/clipboard-2037016301.png)

### **ISS-03-B** — HTTP: `clients.get.http`

### ![](images/clipboard-779863032.png)

### Verificación y cierre de **ISS-03-B**

### ![](images/clipboard-356882949.png)

![](images/clipboard-325024997.png)

### **ISS-03-C** — Controller PARCHE: `create`

### ![](images/clipboard-3493975759.png)

### 

### **ISS-03-C** — HTTP: `clients.create.http`

### ![](images/clipboard-1871655311.png)

### Verificación y cierre de **ISS-03-C**

### ![](images/clipboard-345784974.png)

### **ISS-03-D** — Controller PARCHE: `update` (PUT, reemplazo completo)

### ![](images/clipboard-3014788234.png)

### **ISS-03-D** — Controller PARCHE: `update` (PATCH, actualización parcial)

![](images/clipboard-2238325945.png)

### **ISS-04 — Seeders con Faker**

![](images/clipboard-3478966645.png)

### **ISS-04 — Seeder dentro del feature Client**

![](images/clipboard-4032032100.png)

### **ISS-04 — Conteos por entidad**

![](images/clipboard-2846585907.png)

### **ISS-04 — SeedersRunner**

![](images/clipboard-2039273856.png)

### **ISS-04 — Script `npm run db:seed` y verificación**

![](images/clipboard-3751182726.png)

### **ISS-05 — Swagger OpenAPI**

![](images/clipboard-3089310577.png)

### **ISS-05 — `client.swagger.ts`**

![](images/clipboard-871861733.png)

### **ISS-05 — Registro Swagger en `src/swagger/index.ts`**

![](images/clipboard-2040772736.png)

### 

### **ISS-05 — Verificación `/api/docs` y cierre**

### ![](images/clipboard-3941798818.png)

![](images/clipboard-87079505.png)

# Modelo ProductType

![](images/clipboard-465655136.png)

## Controller + routes

![](images/clipboard-1648352940.png)

## HTTP

![](images/clipboard-774408778.png)

## Seeder ProductType

![](images/clipboard-42128476.png)

## Swagger ProductType

![](images/clipboard-1063589043.png)

# Modelo Product

![](images/clipboard-2254418553.png)

## Controller + routes

![](images/clipboard-3048285626.png)

## HTTP (REST Client)

![](images/clipboard-1608795415.png)

## Relación ProductType ↔ Product

![](images/clipboard-3037371649.png)

## Seeder + Swagger

![](images/clipboard-3393697415.png)

## src/routes/index.ts

![](images/clipboard-1299600753.png)

## src/config/index.ts

## ![](images/clipboard-2796878514.png)

## src/database/seeders/counts.ts

## ![](images/clipboard-3255893492.png)

## src/database/seeders/index.ts

![](images/clipboard-4168322076.png)

# Modelo Sucursal

## ![](images/clipboard-1545995194.png)

Esqueleto controller/routes + carpeta HTTP

## ![](images/clipboard-596249441.png)

Agregador Routes + cableado en Config

## ![](images/clipboard-605041912.png)

Verificación y cierre

## ![](images/clipboard-3799294656.png)

Controller PARCHE: getAll + getOne

## ![](images/clipboard-796225220.png)

Rutas PARCHE: GET /api/sucursales + GET /api/sucursales/:id

## ![](images/clipboard-583740893.png)

HTTP: sucursales.get.http

## ![](images/clipboard-1542418856.png)

Verificación y cierre

## ![](images/clipboard-1438260343.png)

Controller PARCHE: create

## ![](images/clipboard-2592716259.png)

Rutas PARCHE: POST /api/sucursales

## ![](images/clipboard-2596321150.png)

HTTP: sucursales.create.http

## ![](images/clipboard-2639348490.png)

Verificación y cierre

## ![](images/clipboard-869479670.png)

Controller PARCHE: update (PUT, reemplazo completo)

## ![](images/clipboard-1699215752.png)

Controller PARCHE: update (PATCH, parcial)

## ![](images/clipboard-3765879777.png)

Rutas PARCHE: PUT /api/sucursales/:id + PATCH /api/sucursales/:id

## ![](images/clipboard-4152349037.png)

HTTP: sucursales.update.http

## ![](images/clipboard-3257596151.png)

Verificación y cierre

## ![](images/clipboard-3877263025.png)

Controller PARCHE: deletePhysical

## ![](images/clipboard-2704079148.png)

Controller PARCHE: deleteLogical

## ![](images/clipboard-2255061050.png)

Rutas PARCHE: DELETE /api/sucursales/:id + PATCH /api/sucursales/:id/deactivate

## ![](images/clipboard-724101169.png)

HTTP: sucursales.delete.http

## ![](images/clipboard-1722801967.png)

Verificación y cierre

## ![](images/clipboard-1588082825.png)

Seeder branch.seeder.ts (Faker)

## ![](images/clipboard-3855126683.png)

PARCHE counts.ts

## ![](images/clipboard-2240082784.png)

PARCHE seeders/index.ts

## ![](images/clipboard-4163974634.png)

Verificación

## ![](images/clipboard-1588082825.png)

Swagger branch.swagger.ts

## ![](images/clipboard-1142315151.png)

PARCHE swagger/index.ts

## ![](images/clipboard-3494399189.png)

Verificación y cierre final

## 

![](images/clipboard-875675195.png)

# Modelo Proveedor (Supplier)

## ![](images/clipboard-1751511618.png)

Esqueleto controller/routes + carpeta HTTP

## ![](images/clipboard-3859594945.png)

Agregador Routes + cableado en Config

## ![](images/clipboard-289377542.png)

Verificación y cierre de la fundación

## ![](images/clipboard-1940938597.png)

Controller PARCHE: getAll + getOne

## ![](images/clipboard-3311934756.png)

Rutas PARCHE: GET /api/proveedores + GET /api/proveedores/:id

## ![](images/clipboard-2500794587.png)

HTTP: proveedores.get.http

## ![](images/clipboard-1254331117.png)

Verificación y cierre

## ![](images/clipboard-3317221906.png)

Controller PARCHE: create

## ![](images/clipboard-364599544.png)

Rutas PARCHE: POST /api/proveedores

## ![](images/clipboard-3937811356.png)

HTTP: proveedores.create.http

## ![](images/clipboard-2937365626.png)

Verificación y cierre

## ![](images/clipboard-3502054290.png)

Controller PARCHE: update (PUT, reemplazo completo)

## ![](images/clipboard-1664338555.png)

Controller PARCHE: update (PATCH, parcial)

## ![](images/clipboard-1278250203.png)

Rutas PARCHE: PUT /api/proveedores/:id + PATCH /api/proveedores/:id

## ![](images/clipboard-2984824091.png)

HTTP: proveedores.update.http

## ![](images/clipboard-404874686.png)

Verificación y cierre

## ![](images/clipboard-2085172221.png)

Controller PARCHE: deletePhysical

## ![](images/clipboard-990577569.png)

Controller PARCHE: deleteLogical

## ![](images/clipboard-728701335.png)

Rutas PARCHE: DELETE /api/proveedores/:id + PATCH /api/proveedores/:id/deactivate

## ![](images/clipboard-1393217430.png)

HTTP: proveedores.delete.http

## ![](images/clipboard-1443841128.png)

Verificación y cierre

## ![](images/clipboard-2637822949.png)

Seeder supplier.seeder.ts (Faker)

## ![](images/clipboard-1374134284.png)

PARCHE counts.ts

## ![](images/clipboard-3380019788.png)

PARCHE seeders/index.ts

## ![](images/clipboard-2662606928.png)

Verificación

## ![](images/clipboard-4013723674.png)

Swagger supplier.swagger.ts

## ![](images/clipboard-2016977615.png)

PARCHE swagger/index.ts

## ![](images/clipboard-1549998285.png)

Verificación y cierre final

## ![](images/clipboard-2408180386.png)

## Modelo Inventario

## ![](images/clipboard-1169738917.png)

Esqueleto controller/routes + carpeta HTTP

## ![](images/clipboard-1883597832.png)

Agregador Routes + cableado en Config

## ![](images/clipboard-3804732431.png)

Verificación y cierre

## ![](images/clipboard-1840528117.png)

## Controller PARCHE: getAll + getOne

## ![](images/clipboard-3031403784.png)

Rutas PARCHE: GET /api/inventarios + GET /api/inventarios/:id

## ![](images/clipboard-2123362741.png)

HTTP: inventarios.get.http

## ![](images/clipboard-143534143.png)

Verificación y cierre

## ![](images/clipboard-3793279739.png)

## Controller PARCHE: create (valida que Sucursal y Producto existan, evita duplicado branchId+productId)

## ![](images/clipboard-3593403335.png)

Rutas PARCHE: POST /api/inventarios

## ![](images/clipboard-512208708.png)

HTTP: inventarios.create.http

## ![](images/clipboard-3197047250.png)

Verificación y cierre

## ![](images/clipboard-3995252682.png)

## Controller PARCHE: update

## ![](images/clipboard-4111599192.png)

Controller PARCHE: update (PATCH, parcial)

## ![](images/clipboard-1624620381.png)

Rutas PARCHE: PUT /api/inventarios/:id + PATCH /api/inventarios/:id

## ![](images/clipboard-3117633160.png)

HTTP: inventarios.update.http

## ![](images/clipboard-2209025597.png)

Verificación y cierre

## ![](images/clipboard-2463111495.png)

## Controller PARCHE: getLowStock (cantidad \<= stock_minimo)

## ![](images/clipboard-1059904594.png)

Rutas PARCHE: GET /api/inventarios/low-stock

## ![](images/clipboard-2947483445.png)

HTTP: inventarios.low-stock.http

## ![](images/clipboard-2719802693.png)

Verificación y cierre

## ![](images/clipboard-4164182505.png)

## Controller PARCHE: deletePhysical

## ![](images/clipboard-1361997058.png)

Rutas PARCHE: DELETE /api/inventarios/:id

## ![](images/clipboard-3207296833.png)

HTTP: inventarios.delete.http

## ![](images/clipboard-3614815228.png)

Verificación y cierre

![](images/clipboard-3209980403.png)

## Seeder inventory.seeder.ts

## ![](images/clipboard-532332729.png)

PARCHE counts.ts

## ![](images/clipboard-2963690676.png)

PARCHE seeders/index.ts

## ![](images/clipboard-1448163010.png)

Verificación

![](images/clipboard-697166292.png)

## Swagger inventory.swagger.ts

## ![](images/clipboard-3037275229.png)

PARCHE swagger/index.ts

## ![](images/clipboard-2442016653.png)

Verificación y cierre final

![](images/clipboard-1474453521.png)

# Compra + CompraDetalle

## Modelo Compra + CompraDetalle

![](images/clipboard-2163981616.png)

## Esqueleto controller/routes + carpeta HTTP

![](images/clipboard-1574926992.png)

## Agregador Routes + cableado en Config

![](images/clipboard-535318786.png)

![](images/clipboard-1047838256.png)

## Verificación y cierre de la fundación

![](images/clipboard-171272618.png)

## Controller PARCHE: getAll + getOne

![](images/clipboard-1540646797.png)

## Rutas PARCHE: GET /api/compras + GET /api/compras/:id

![](images/clipboard-60147295.png)

## HTTP: compras.get.http

![](images/clipboard-1886847391.png)

## Verificación y cierre

![](images/clipboard-2867125027.png)

## Controller PARCHE: create

![](images/clipboard-2014370195.png)

## Rutas PARCHE: POST /api/compras

![](images/clipboard-812293964.png)

## HTTP: compras.create.http

![](images/clipboard-529828646.png)

## Verificación y cierre

![](images/clipboard-1990410300.png)

## Controller PARCHE: update (PUT, reemplazo completo)

![](images/clipboard-2065567019.png)

## Controller PARCHE: update (PATCH, parcial)

![](images/clipboard-2736223975.png)

## Rutas PARCHE: PUT /api/compras/:id + PATCH /api/compras/:id

![](images/clipboard-1362260657.png)

## HTTP: compras.update.http

![](images/clipboard-739266436.png)

## Verificación y cierre

![](images/clipboard-3914222013.png)

## Controller PARCHE: deletePhysical

![](images/clipboard-102993505.png)

## Controller PARCHE: deleteLogical

![](images/clipboard-2227633496.png)

## Rutas PARCHE: DELETE /api/compras/:id + PATCH /api/compras/:id/deactivate

![](images/clipboard-1648090808.png)

## HTTP: compras.delete.http

![](images/clipboard-2231065392.png)

## Verificación y cierre

![](images/clipboard-1757242935.png)

## Controller PARCHE: getDetails

![](images/clipboard-898681269.png)

## Rutas PARCHE: GET /api/compras/:id/detalles

![](images/clipboard-993260226.png)

## HTTP: compras.details.http

![](images/clipboard-2143969087.png)

## Verificación y cierre

![](images/clipboard-1567120004.png)

## Controller PARCHE: receive

![](images/clipboard-3169808253.png)

## Rutas PARCHE: PATCH /api/compras/:id/receive

![](images/clipboard-304777495.png)

## HTTP: compras.receive.http

![](images/clipboard-656052802.png)

## Verificación y cierre

![](images/clipboard-3752844945.png)

## Seeder purchase.seeder.ts (Faker)

![](images/clipboard-1765171862.png)

## PARCHE counts.ts

![](images/clipboard-716426678.png)

## PARCHE seeders/index.ts

![](images/clipboard-1820475973.png)

## Verificación

![](images/clipboard-2944036168.png)

## Swagger purchase.swagger.ts

![](images/clipboard-3339045463.png)

## PARCHE swagger/index.ts

![](images/clipboard-1228016592.png)

## Verificación y cierre final

![![](images/clipboard-4158789185.png)](images/clipboard-2261893493.png)

**Modelos Venta + VentaDetalle**

**Esqueleto de Controllers + Routes + carpetas HTTP**

**Agregador Routes + cableado en Config**

**Verificación y cierre de la fundación**

**Controllers: getAll + getOne**

**Rutas GET + HTTP de consulta**

**Verificación y cierre de GET**

**Controllers: create + Rutas POST + HTTP**

**Verificación y cierre de POST**

**Controllers: update PUT + PATCH + Rutas + HTTP**

**Verificación y cierre de PUT/PATCH**

**Controllers: deletePhysical + deleteLogical + Rutas + HTTP**

**Verificación y cierre de DELETE**

**Seeder Venta + VentaDetalle + counts.ts + seeders/index.ts**

**Swagger Venta + VentaDetalle + Verificación y cierre final**

### Modelo Inventario

### ![](images/clipboard-2482910764.png)

### Esqueleto controller/routes + carpeta

### ![](images/clipboard-801011694.png)

### HTTP Agregador Routes + cableado

### ![](images/clipboard-3439974512.png)

### Verificación y cierre

### ![](images/clipboard-3362699023.png)

### Controller PARCHE: getAll + getOne

### ![](images/clipboard-2504216260.png)

### Rutas PARCHE: GET /api/inventarios + GET /api/inventarios/:id

### ![](images/clipboard-2293661421.png)

### HTTP: inventarios.get.http

### ![](images/clipboard-4241438053.png)

### Verificación y cierre

### ![](images/clipboard-2197769379.png)

### Controller PARCHE: create (valida que Sucursal y Producto existan, evita duplicado branchId+productId)

### ![](images/clipboard-1637138732.png)

### Rutas PARCHE: POST /api/inventarios

### ![](images/clipboard-1494308187.png)

### HTTP: inventarios.create.http

### ![](images/clipboard-892164523.png)

### Verificación y cierre

### ![](images/clipboard-1709278274.png)

### Controller PARCHE: update

### ![](images/clipboard-3111951517.png)

### Controller PARCHE: update (PATCH, parcial) Rutas PARCHE: PUT /api/inventarios/:id + PATCH /api/inventarios/:id

### ![](images/clipboard-1656811446.png)

### HTTP: inventarios.update.http

### ![](images/clipboard-1000477917.png)

### Verificación y cierre

### ![](images/clipboard-3896468607.png)

### Controller PARCHE: getLowStock (cantidad \<= stock_minimo)

### ![](images/clipboard-3383908905.png)

### Rutas PARCHE: GET /api/inventarios/low-stock HTTP: inventarios.low-stock.http

### ![](images/clipboard-1495550112.png)

### Verificación y cierre

### ![](images/clipboard-3716362385.png)

### Seeder inventory.seeder.ts (Faker, usando Sucursales y Productos ya sembrados) PARCHE

### ![](images/clipboard-4122792533.png)

### counts.ts PARCHE

### ![](images/clipboard-1587223004.png)

### seeders/index.ts

### ![](images/clipboard-4134688580.png)

### Verificación

### ![](images/clipboard-512989977.png)

### Swagger inventory.swagger.ts

### ![](images/clipboard-1761243930.png)

### PARCHE swagger/index.ts

### ![](images/clipboard-2654608383.png)

### Verificación y cierre final

### 

### ![](images/clipboard-2488075441.png)

# Venta + VentaDetalle

### Modelo Sale (venta) + modelo SaleDetail (ventaDetalle) + asociaciones

![](images/clipboard-734607481.png)

###  Esqueleto controller/routes + carpeta 

![](images/clipboard-4152512336.png)

### HTTP Agregador Routes + cableado en Config 

![](images/clipboard-831601541.png)

### Verificación y cierre de la fundación

![](images/clipboard-286683237.png)

### Controller PARCHE: getAll + getOne (incluye detalle)

![](images/clipboard-830218298.png)

###  Rutas PARCHE: GET /api/ventas + GET /api/ventas/:id

![](images/clipboard-3883136593.png)

###  HTTP: ventas.get.http 

![](images/clipboard-1972274942.png)

### Verificación y cierre

![](images/clipboard-3811825463.png)

### Controller PARCHE: create (valida cliente/sucursal/productos, valida stock disponible en Inventario, descuenta stock, calcula subtotal/impuestos/total, transacción) 

![](images/clipboard-3430096463.png)

### Rutas PARCHE: POST /api/ventas

![](images/clipboard-2500015639.png)

###  HTTP: ventas.create.http 

![](images/clipboard-3278757905.png)

### Verificación y cierre

![](images/clipboard-2752472007.png)

### Controller PARCHE: cancel (no permite cancelar si ya está cancelled, restaura cantidades a Inventario) 

![](images/clipboard-737532767.png)

### Rutas PARCHE: PATCH /api/ventas/:id/cancel 

![](images/clipboard-581301422.png)

### HTTP: ventas.cancel.http

![](images/clipboard-807361327.png)

###  Verificación y cierre

![](images/clipboard-178187800.png)

### Controller PARCHE: deletePhysical (borra detalle y cabecera en transacción)

![](images/clipboard-2087569685.png)

###  Rutas PARCHE: DELETE /api/ventas/:id 

![](images/clipboard-91818371.png)

### HTTP: ventas.delete.http 

![](images/clipboard-1825018262.png)

### Verificación y cierre

![](images/clipboard-126641694.png)

### Controller PARCHE payment.controller.ts: validar referenciaId contra Sale cuando referenciaTipo='venta' (cierra el TODO que dejamos en la fase de Pago) 

![](images/clipboard-666366297.png)

### Verificación

![](images/clipboard-2555982330.png)

### Swagger sale.swagger.ts PARCHE

![](images/clipboard-2435323098.png)

###  swagger/index.ts 

![](images/clipboard-2338314559.png)

### Verificación y cierre final

![![](images/clipboard-702264951.png)](images/clipboard-290551897.png)

# Modelo Return (devolución, referencia a SaleDetail: "cada devolución referencia líneas vendidas")

### ![](images/clipboard-3719174092.png)  Esqueleto controller/routes + carpeta HTTP

### ![](images/clipboard-594337611.png)  Agregador Routes + cableado en Config

### ![](images/clipboard-3295510225.png)  Verificación y cierre de la fundación

### ![](images/clipboard-4024166317.png)  Controller PARCHE: getAll + getOne

### ![](images/clipboard-3068259233.png)  Rutas PARCHE: GET /api/devoluciones + GET /api/devoluciones/:id

### ![](images/clipboard-1584425308.png)  HTTP: devoluciones.get.http

### ![](images/clipboard-985864298.png)  Verificación y cierre

### ![](images/clipboard-2882373607.png)  Controller PARCHE: create

### ![](images/clipboard-2720763784.png)  Rutas PARCHE: POST /api/devoluciones

### ![](images/clipboard-3231293426.png)  HTTP: devoluciones.create.http

### ![](images/clipboard-199374936.png)  Verificación y cierre

### ![](images/clipboard-2200408901.png)  Controller PARCHE: approve +reject

### ![](images/clipboard-1299471938.png) 

###   Rutas PARCHE: PATCH /api/devoluciones/:id/approve + PATCH /api/devoluciones/:id/reject

### ![](images/clipboard-3368007692.png)  HTTP: devoluciones.approve.http + devoluciones.reject.http

### ![](images/clipboard-2140263139.png)  Verificación y cierre

### ![](images/clipboard-980208635.png)  Controller PARCHE: deletePhysical

### ![](images/clipboard-4105427396.png)  Rutas PARCHE: DELETE /api/devoluciones/:id

### ![](images/clipboard-1600367597.png)  HTTP: devoluciones.delete.http

### ![](images/clipboard-1114922162.png)  Verificación y cierre

### ![](images/clipboard-3877478462.png)  Seeder return.seeder.ts (Faker)

### ![](images/clipboard-3146711986.png)  PARCHE counts.ts

### ![](images/clipboard-194042508.png)  PARCHE seeders/index.ts

### ![](images/clipboard-1708351397.png) 

###   Swagger return.swagger.ts

### ![](images/clipboard-1293833112.png)  PARCHE swagger/index.ts

### ![](images/clipboard-3710884176.png)  Verificación y cierre final

### ![](images/clipboard-1682792228.png)

## AGREGAR CAPAS FALTANTES

### src/shared/errors/app-error.ts

### ![](images/clipboard-658750167.png) 
src/shared/http/base-controller.ts

###  ![](images/clipboard-40285931.png)
dto/create-client.dto.ts

### ![](images/clipboard-3315842648.png) 
dto/update-client.dto.ts

### ![](images/clipboard-3733199501.png) 
dto/patch-client.dto.ts

### ![](images/clipboard-2741462563.png) 
dto/client-response.dto.ts

### ![](images/clipboard-892889661.png) 
dto/index.ts

### ![](images/clipboard-196510941.png) 
client.repository.ts (nuevo)

### ![](images/clipboard-1632405026.png) 
client.service.ts (nuevo)

### ![](images/clipboard-4012721992.png) 
client.controller.ts (reescrito, delgado)

### ![](images/clipboard-808806422.png) 
Verificación y cierre

### ![](images/clipboard-111835318.png)

### src/shared/database/with-transaction.ts

### ![](images/clipboard-1049591963.png) 
dto/create-branch.dto.ts

### ![](images/clipboard-3021801338.png) 
dto/update-branch.dto.ts

### ![](images/clipboard-1552942080.png) 
dto/patch-branch.dto.ts

### ![](images/clipboard-2372781112.png) 
dto/branch-response.dto.ts

### ![](images/clipboard-3418852405.png) 
dto/index.ts

### ![](images/clipboard-139862973.png) 
branch.repository.ts (nuevo)

### ![](images/clipboard-1304953027.png) 
branch.service.ts (nuevo)

### ![](images/clipboard-2922822449.png) 
branch.controller.ts (reescrito, delgado)

### ![](images/clipboard-3728392111.png) 
Verificación y cierre

![](images/clipboard-4072830561.png)

# PRODUCT

### dto/create-product.dto.ts

### ![](images/clipboard-1825449804.png)  dto/update-product.dto.ts

### ![](images/clipboard-1526869592.png)  dto/patch-product.dto.ts

### ![](images/clipboard-1481316180.png)  dto/product-response.dto.ts

### ![](images/clipboard-3242809603.png)  dto/index.ts

### ![](images/clipboard-3660976162.png)  product.repository.ts (nuevo)

### ![](images/clipboard-106593948.png)  product.service.ts (nuevo — aquí se mueve la validación de productTypeId activo)

### ![](images/clipboard-115982543.png)  product.controller.ts (reescrito, delgado)

### ![](images/clipboard-1573128910.png)  Verificación y cierre

![](images/clipboard-1420077000.png)

# PRODUCT TYPE

### `dto/create-product-type.dto.ts`

###  ![](images/clipboard-1019261262.png)

### `dto/update-product-type.dto.ts`

###  ![](images/clipboard-2683388907.png)

### `dto/patch-product-type.dto.ts`

###  ![](images/clipboard-3144840308.png)

### `dto/product-type-response.dto.ts`

###  ![](images/clipboard-2840900310.png)

### `dto/index.ts`

###  ![](images/clipboard-2248542905.png)

### `product-type.repository.ts`

###  ![](images/clipboard-3783219900.png)

### `product-type.service.ts`

###  ![](images/clipboard-1467862402.png)

### `product-type.controller.ts`

###  ![](images/clipboard-3337687377.png)

### `product-type.routes.ts` 

###  ![](images/clipboard-1098067796.png)

### Verificación y cierre

# ![](images/clipboard-3129163323.png)

# PROVEEDOR

### `dto/create-supplier.dto.ts`

###  ![](images/clipboard-3595742150.png)

### `dto/update-supplier.dto.ts`

###  ![](images/clipboard-596459870.png)

### `dto/patch-supplier.dto.ts`

###  ![](images/clipboard-2687160196.png)

### `dto/supplier-response.dto.ts`

###  ![](images/clipboard-3488333169.png)

### `dto/index.ts`

###  ![](images/clipboard-243970534.png)

### `supplier.repository.ts`

###  ![](images/clipboard-2681853804.png)

### `supplier.service.ts`

###  ![](images/clipboard-3167543047.png)

### `supplier.controller.ts`

###  ![](images/clipboard-2346751811.png)

### `supplier.routes.ts` (

###  ![](images/clipboard-2031140368.png)

### Verificación y cierre

![](images/clipboard-2422357879.png)

# INVENTARIO

### `dto/create-inventory.dto.ts`

###  ![](images/clipboard-2212998682.png)

### `dto/update-inventory.dto.ts`

###  ![](images/clipboard-1849284752.png)

### `dto/patch-inventory.dto.ts`

###  ![](images/clipboard-2854895861.png)

### `dto/inventory-response.dto.ts`

###  ![](images/clipboard-4138599589.png)

### `dto/index.ts`

###  ![](images/clipboard-3247867039.png)

### `inventory.repository.ts` 

###  ![](images/clipboard-333157678.png)

### `inventory.service.ts` 

###  ![](images/clipboard-1840733232.png)

### `inventory.controller.ts` (reescrito, delgado)

###  ![](images/clipboard-3270540932.png)

### 

### 

# COMPRA

### `dto/create-purchase-item.dto.ts` 

![](images/clipboard-1231516441.png)

### `dto/create-purchase.dto.ts`

![](images/clipboard-2172805935.png)

### `dto/receive-purchase-item.dto.ts` 

###  ![](images/clipboard-1058166665.png)

### `dto/receive-purchase.dto.ts`

###  ![](images/clipboard-1866222869.png)

### `dto/purchase-response.dto.ts`

###  ![](images/clipboard-2106549399.png)

### `dto/index.ts`

###  ![](images/clipboard-402315821.png)

### `purchase.repository.ts` 

###  ![](images/clipboard-2915651296.png)

### `purchase.service.ts`

![](images/clipboard-2314390988.png)

### `purchase.controller.ts`

###  ![](images/clipboard-873339386.png)

### 

### Verificación y cierre

### ![](images/clipboard-3363781309.png)

# VENTA

### `dto/create-sale-item.dto.ts`

###  ![](images/clipboard-2942732630.png)

### `dto/create-sale.dto.ts`

###  ![](images/clipboard-2657745841.png)

### `dto/sale-response.dto.ts`

###  ![](images/clipboard-2921241792.png)

### `dto/index.ts`

###  ![](images/clipboard-2990924565.png)

### `sale.repository.ts`

###  ![](images/clipboard-3314916732.png)

### `sale.service.ts`

### ![](images/clipboard-1963113291.png)

### `sale.controller.ts`

###  ![](images/clipboard-3098692330.png)

### 

###  

### Verificación y cierre

### ![](images/clipboard-2591981114.png)

# PAGO

### `dto/create-payment.dto.ts`

![](images/clipboard-2878856797.png)

### `dto/update-payment.dto.ts`

###  ![](images/clipboard-4079972761.png)

### `dto/patch-payment.dto.ts`

###  ![](images/clipboard-741955748.png)

### `dto/payment-response.dto.ts`

###  ![](images/clipboard-1669584620.png)

### `dto/index.ts`

###  ![](images/clipboard-3736285257.png)

### `payment.repository.ts`

###  ![](images/clipboard-1740688043.png)

### `payment.service.ts`

###  ![](images/clipboard-4238475968.png)

### `payment.controller.ts`

###  ![](images/clipboard-3013780158.png)

### `payment.routes.ts` 

###  ![](images/clipboard-1277475295.png)

### Verificación y cierre

### ![](images/clipboard-3275401923.png)

# DEVOLUCIÓN

### `dto/create-return.dto.ts`

###  ![](images/clipboard-773166474.png)

### `dto/return-response.dto.ts`

###  ![](images/clipboard-3634101342.png)

### `dto/index.ts`

###  ![](images/clipboard-2043656329.png)

### `return.repository.ts`

###  ![](images/clipboard-516989730.png)

### `return.service.ts` 

### ![](images/clipboard-1066443189.png)

### `return.controller.ts`

###  ![](images/clipboard-1839132090.png)

### 

### Verificación y cierre

![](images/clipboard-2482182755.png)

# ISS-09 (Base de seguridad compartida y modelos Auth)

### Instalar dependencias (bcryptjs si falta, jsonwebtoken + \@types/jsonwebtoken)

### ![](images/clipboard-1483168473.png)
PARCHE .env (JWT_SECRET, JWT_ACCESS_TTL, JWT_REFRESH_TTL_DAYS)

### ![](images/clipboard-2057715526.png)
src/shared/auth/password.ts

### ![](images/clipboard-1675896771.png)
src/shared/auth/jwt.ts

### ![](images/clipboard-1196977898.png)
src/shared/auth/resource-match.ts

### ![](images/clipboard-1137226243.png)
src/shared/auth/auth-user.ts

### ![](images/clipboard-1280493806.png)
src/shared/http/error-response.ts

### ![](images/clipboard-4071777050.png)
PARCHE src/shared/http/base-controller.ts (handleError delega en sendError)

### ![](images/clipboard-3882242207.png)
src/shared/http/swagger-security.ts

### ![](images/clipboard-2735819044.png)
src/features/auth/user/user.model.ts

### ![](images/clipboard-2466488644.png)
src/features/auth/role/role.model.ts

### ![](images/clipboard-2172139224.png)
src/features/auth/resource/resource.model.ts

### ![](images/clipboard-2298675182.png)
src/features/auth/role-user/role-user.model.ts

### ![](images/clipboard-766672424.png)
src/features/auth/resource-role/resource-role.model.ts

### ![](images/clipboard-2176635222.png)
src/features/auth/refresh-token/refresh-token.model.ts

### ![](images/clipboard-3548772214.png)
src/features/auth/rbac.associations.ts

### ![](images/clipboard-1751611073.png)
PARCHE src/config/index.ts 

### ![](images/clipboard-2219764662.png)
PARCHE src/database/seeders/index.ts 

### ![](images/clipboard-1607105391.png)
Verificación y cierre

### ![](images/clipboard-37887270.png)

![](images/clipboard-1323380225.png)

# ISS-10 (Feature Users: identidad y contraseña)

### dto/create-user.dto.ts

### ![](images/clipboard-47431707.png)
dto/update-user.dto.ts

### ![](images/clipboard-4133548338.png)
dto/patch-user.dto.ts

### ![](images/clipboard-5565.png)
dto/change-password.dto.ts

### ![](images/clipboard-544202782.png)
dto/user-response.dto.ts

### ![](images/clipboard-856497532.png)
dto/index.ts

### ![](images/clipboard-574186134.png)
user.repository.ts

### ![](images/clipboard-1046575689.png)
user.service.ts 

### ![](images/clipboard-4121510552.png)
user.controller.ts

### ![](images/clipboard-1340746597.png)
user.routes.ts 

### ![](images/clipboard-2552402510.png)
user.seeder.ts 

### ![](images/clipboard-1720041736.png)
PARCHE counts.ts (agregar users)

### ![](images/clipboard-3560921344.png)
PARCHE seeders/index.ts (agregar seedUsers)

### ![](images/clipboard-3482307869.png)
user.swagger.ts

### ![](images/clipboard-3562113976.png)

### 
HTTP: users.get.http

### ![](images/clipboard-4068717488.png)
HTTP: users.create.http

### ![](images/clipboard-2847671279.png)
Verificación y cierre

![](images/clipboard-1817079356.png)

# ISS-11: Roles y Resources 

### `dto/create-role.dto.ts`

###  ![](images/clipboard-3062874698.png)

### `dto/update-role.dto.ts`

###  ![](images/clipboard-2289640286.png)

### `dto/patch-role.dto.ts`

###  ![](images/clipboard-4290404892.png)

### `dto/role-response.dto.ts`

###  ![](images/clipboard-1184637335.png)

### `dto/index.ts`

###  ![](images/clipboard-1942206871.png)

### `role.repository.ts` 

### ![](images/clipboard-4200455794.png)

### `role.service.ts`

###  ![](images/clipboard-374603467.png)

### `role.controller.ts`

###  ![](images/clipboard-2861808196.png)

### `role.routes.ts` (con `authenticate` + `authorize`)

###  ![](images/clipboard-1718825167.png)

### `role.seeder.ts` (ADMIN, SELLER)

###  ![](images/clipboard-1738341336.png)

### `role.swagger.ts`

### ![](images/clipboard-738307947.png)

### `dto/create-resource.dto.ts`

### ![](images/clipboard-196408420.png) 
 `dto/update-resource.dto.ts`

### ![](images/clipboard-63472325.png) 
 `dto/patch-resource.dto.ts`

### ![](images/clipboard-2643657153.png) 
 `dto/resource-response.dto.ts`

### ![](images/clipboard-4084449481.png) 
 `dto/index.ts`

### ![](images/clipboard-4206357310.png) 
 `resource-catalog.ts`

### ![](images/clipboard-218138418.png) 
 `resource.repository.ts`

### ![](images/clipboard-1254131808.png) 
 `resource.service.ts`

### ![](images/clipboard-2109148038.png) 
 `resource.controller.ts`

### ![](images/clipboard-96807022.png) 
 `resource.routes.ts`

### ![](images/clipboard-4203491096.png) 
 `resource.seeder.ts`

### ![](images/clipboard-2601350141.png) 
 `resource.swagger.ts`

![](images/clipboard-2482946531.png)

# Feature RoleUser

### **dto/create-role-user.dto.ts**

![](images/clipboard-3302219237.png)

### dto/role-user-response.dto.ts

![](images/clipboard-2892001944.png)

### dto/index.ts

![](images/clipboard-1332873048.png)

###  role-user.repository.ts

![](images/clipboard-515273592.png)

### role-user.service.ts

![](images/clipboard-235777323.png)

###  role-user.controller.ts

![](images/clipboard-119624647.png)

###  role-user.routes.ts

![](images/clipboard-1045160973.png)

### role-user.seeder.ts

![](images/clipboard-2177545043.png)

### role-user.swagger.ts

![](images/clipboard-2494346900.png)

### dto/create-resource-role.dto.ts

![](images/clipboard-126598886.png)

### dto/list-resource-roles.dto.ts

![](images/clipboard-500884058.png)

### dto/resource-role-response.dto.ts

![](images/clipboard-1664058047.png)

### dto/index.ts

![](images/clipboard-1550546168.png)

###  resource-role.repository.ts

![](images/clipboard-3284444097.png)

###  resource-role.service.ts

![](images/clipboard-485603264.png)

### resource-role.controller.ts

![](images/clipboard-534741127.png)

###  resource-role.routes.ts

![](images/clipboard-467350337.png)

###  **resource-role.seeder.ts** 

![](images/clipboard-1986330583.png)

### resource-role.swagger.ts

### ![](images/clipboard-1298171544.png)

### 

#  ISS-13: Middlewares de acceso

### `shared/auth/jwt.ts` 

### ![](images/clipboard-1443901016.png)

### `shared/http/error-response.ts` 

###  ![](images/clipboard-1971994930.png)

### `access/authenticate.middleware.ts`

###  ![](images/clipboard-3092048190.png)

### `access/authorize.middleware.ts`

###  ![](images/clipboard-3458871876.png)

### `access/index.ts` (barrel)

###  

### **PARCHE** de las **10** rutas de negocio (no 5 como en la guía original, porque tu proyecto tiene 10features): `client.routes.ts`, `branch.routes.ts`, `product-type.routes.ts`, `product.routes.ts`, `supplier.routes.ts`, `inventory.routes.ts`, `purchase.routes.ts`, `sale.routes.ts`, `payment.routes.ts`, `return.routes.ts`

###  ![](images/clipboard-3458871876.png)

![](images/clipboard-2940941248.png)

![](images/clipboard-1277181950.png)

![](images/clipboard-3216079118.png)

![](images/clipboard-1057631512.png)

![](images/clipboard-1315526726.png)

![](images/clipboard-4154557362.png)

![](images/clipboard-2560864453.png)

![](images/clipboard-2925078381.png)

![](images/clipboard-4245483918.png)

### Verificación: `npx tsc --noEmit`, `npm run dev`, pruebas de 401/403

### ![](images/clipboard-2784622495.png)

# ISS-14: Feature RefreshToken 

###  **dto/refresh-token-response.dto.ts**

### ![](images/clipboard-3429508411.png)

### `dto/index.ts`

###  ![](images/clipboard-2110692891.png)

### `refresh-token.repository.ts` (findByHash con lock pesimista, revokeFamily, revokeAllByUser,purgeInactiveByUser)

### ![](images/clipboard-11023280.png)

### `refresh-token.service.ts` (issue, rotate con reuse detection, revokeByToken, gestión de sesiones propias)

###  ![](images/clipboard-1019162464.png)

### `refresh-token.controller.ts`

###  ![](images/clipboard-763330885.png)

### `refresh-token.routes.ts` (modalidad JWT, sin authorize)

###  ![](images/clipboard-2943538027.png)

### `refresh-token.swagger.ts`

###  ![](images/clipboard-1833948580.png)

### Cableado en `routes/index.ts` y `config/index.ts`

###  ![](images/clipboard-1837532668.png)

### 

# **ISS-15: Feature Session (login, refresh, logout, perfil, permisos)**

### `dto/login.dto.ts`

###  ![](images/clipboard-3337982463.png)

### `dto/refresh-session.dto.ts`

###  ![](images/clipboard-1251734493.png)

### `dto/logout-session.dto.ts`

###  ![](images/clipboard-4176730945.png)

### `dto/session-response.dto.ts` (`SessionTokensDto` + `ProfileDto`)

###  ![](images/clipboard-2783785216.png)

### `dto/index.ts`

###  ![](images/clipboard-2892864614.png)

### `session.service.ts` (login, refresh, logout, profile, myPermissions — orquesta UserRepository,RefreshTokenService, ResourceRoleService)

### ![](images/clipboard-1131422849.png)

### `session.controller.ts`

###  ![](images/clipboard-921465377.png)

### `session.routes.ts` (login/refresh/logout OPEN; perfil/permisos JWT)

###  ![](images/clipboard-1847814904.png)

### `session.swagger.ts`

###  ![](images/clipboard-1026108606.png)

### Cableado en `routes/index.ts` y `config/index.ts`

###  ![](images/clipboard-2465903802.png)

### 

# ISS-15 (Feature Session: login, refresh, logout, perfil, permisos)

### dto/login.dto.ts

### ![](images/clipboard-1060158222.png)
dto/refresh-session.dto.ts

### ![](images/clipboard-3548578584.png)
dto/logout-session.dto.ts

### ![](images/clipboard-1456929514.png)
dto/session-response.dto.ts

### ![](images/clipboard-3940703491.png)
dto/index.ts

### ![](images/clipboard-2770847771.png)
session.service.ts (orquesta UserRepository, RefreshTokenService, ResourceRoleService)

### ![](images/clipboard-4099280200.png)
session.controller.ts

### ![](images/clipboard-1066005353.png)
session.routes.ts (login/refresh/logout = OPEN; perfil/permisos = JWT, sin authorize)

### ![](images/clipboard-3262805355.png)

### 
session.swagger.ts

### ![](images/clipboard-2695700987.png)

HTTP: session.login.http

### ![](images/clipboard-278592944.png)
HTTP: session.refresh.http

### ![](images/clipboard-792409274.png)
HTTP: session.profile.http

### ![](images/clipboard-2512352876.png)
Verificación end-to-end de las tres modalidades (OPEN → JWT → JWT+RBAC)

### ![](images/clipboard-953558607.png)

### 

# ![](images/clipboard-1401641870.png)

# CIERRE FASE BACKEND COMPLETO

### PARCHE client.routes.ts (SIN AUTH -\> JWT + RBAC)

### ![](images/clipboard-3791031054.png)
PARCHE product-type.routes.ts

### ![](images/clipboard-2647146868.png)
PARCHE product.routes.ts

### ![](images/clipboard-3239534333.png)
PARCHE branch.routes.ts

### ![](images/clipboard-3775034859.png)
PARCHE supplier.routes.ts

### ![](images/clipboard-1727893910.png)
PARCHE inventory.routes.ts

### ![](images/clipboard-1325935285.png)
PARCHE payment.routes.ts

### ![](images/clipboard-487595102.png)
PARCHE purchase.routes.ts

### ![](images/clipboard-743724630.png)
PARCHE sale.routes.ts

### ![](images/clipboard-1972766262.png)
PARCHE return.routes.ts

### ![](images/clipboard-3864787154.png)
PARCHE config/index.ts (manejo de JSON malformado, orden de arranque BD-\>puerto, DB_SYNC_FORCE)

### ![](images/clipboard-2882971659.png)

PARCHE database/seeders/counts.ts (agregar users)

### ![](images/clipboard-2171883434.png)

Verificación final

![![](images/clipboard-2453931621.png)](images/clipboard-4016195284.png)
