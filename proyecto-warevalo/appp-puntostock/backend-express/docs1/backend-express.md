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

###  ![](images/clipboard-3036483219.png)

### Verificación y cierre de **ISS-01** (`npx tsc --noEmit` + `npm run dev`)

###  ![](images/clipboard-118769016.png)

### **3.1** — Drivers Sequelize y `.env` (ISS-02)

###  ![](images/clipboard-194051402.png)

### **3.2** — Configuración Sequelize (`src/database/db.ts`)

###  ![](images/clipboard-4171316086.png)

### **3.3** — Carpeta `seeders/` (reservada, sin lógica aún)

###  ![](images/clipboard-1607873606.png)

### Verificación y cierre de **ISS-02**

###  ![](images/clipboard-4097047504.png)

### **4.1** — Modelo `Client` (ISS-03-A)

###  ![](images/clipboard-700451423.png)

![](images/clipboard-932179446.png)

### **4.2** — Esqueleto `client.controller.ts` / `client.routes.ts` + carpeta `http/`

###  ![](images/clipboard-2407362602.png)

![](images/clipboard-4215056907.png)

### **4.3** — Agregador `routes/index.ts` + PARCHE en `config/index.ts` (cablear BD y rutas)

###  ![](images/clipboard-852224283.png)

### Verificación y cierre de **ISS-03-A**

###  ![](images/clipboard-3773347566.png)

### **ISS-03-B** — Controller PARCHE: `getAll` + `getOne`

###  ![](images/clipboard-1558421921.png)

### **ISS-03-B** — Rutas PARCHE: `GET /api/clientes` + `GET /api/clientes/:id`

###  ![](images/clipboard-2037016301.png)

### **ISS-03-B** — HTTP: `clients.get.http`

###  ![](images/clipboard-779863032.png)

### Verificación y cierre de **ISS-03-B**

###  ![](images/clipboard-356882949.png)

![](images/clipboard-325024997.png)

### **ISS-03-C** — Controller PARCHE: `create`

###  ![](images/clipboard-3493975759.png)

### 

### **ISS-03-C** — HTTP: `clients.create.http`

###  ![](images/clipboard-1871655311.png)

### Verificación y cierre de **ISS-03-C**

###  ![](images/clipboard-345784974.png)

### **ISS-03-D** — Controller PARCHE: `update` (PUT, reemplazo completo)

###  ![](images/clipboard-3014788234.png)

### **ISS-03-D** — Controller PARCHE: `update` (PATCH, actualización parcial)

![](images/clipboard-2238325945.png)

### **ISS-04 — Seeders con Faker** 

![](images/clipboard-3478966645.png)

###  **ISS-04 —  Seeder dentro del feature Client** 

![](images/clipboard-4032032100.png)

###  **ISS-04 —  Conteos por entidad** 

![](images/clipboard-2846585907.png)

###  **ISS-04 —  SeedersRunner** 

![](images/clipboard-2039273856.png)

###  **ISS-04 — Script `npm run db:seed` y verificación** 

![](images/clipboard-3751182726.png)

###  **ISS-05 — Swagger OpenAPI** 

![](images/clipboard-3089310577.png)

###  **ISS-05 — `client.swagger.ts`** 

![](images/clipboard-871861733.png)

###  **ISS-05 — Registro Swagger en `src/swagger/index.ts`** 

![](images/clipboard-2040772736.png)

###  

###  **ISS-05 — Verificación `/api/docs` y cierre**

### ![](images/clipboard-3941798818.png)

![](images/clipboard-87079505.png)

# Modelo ProductType

![](images/clipboard-465655136.png)

## Controller + routes

![](images/clipboard-1648352940.png)

##  HTTP 

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

##  
Controller PARCHE: update (PUT, reemplazo completo)

##  
Controller PARCHE: update (PATCH, parcial)

##  
Rutas PARCHE: PUT /api/sucursales/:id + PATCH /api/sucursales/:id

##  
HTTP: sucursales.update.http

## ![](images/clipboard-3257596151.png) 
Verificación y cierre

##  
Controller PARCHE: deletePhysical

##  
Controller PARCHE: deleteLogical

##  
Rutas PARCHE: DELETE /api/sucursales/:id + PATCH /api/sucursales/:id/deactivate

##  
HTTP: sucursales.delete.http

## ![](images/clipboard-1722801967.png) 
Verificación y cierre

##  
Seeder branch.seeder.ts (Faker)

## ![](images/clipboard-3855126683.png) 
PARCHE counts.ts

## ![](images/clipboard-2240082784.png) 
PARCHE seeders/index.ts

## ![](images/clipboard-4163974634.png) 
Verificación

##  
Swagger branch.swagger.ts

## ![](images/clipboard-1142315151.png) 
PARCHE swagger/index.ts

##  ![](images/clipboard-3494399189.png)
Verificación y cierre final

## 
