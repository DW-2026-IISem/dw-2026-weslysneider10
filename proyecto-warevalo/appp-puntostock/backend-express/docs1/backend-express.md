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
