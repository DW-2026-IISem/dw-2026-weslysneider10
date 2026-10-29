# ISS-00 — Requisitos previos

## 0.1 Node, npm y Angular CLI

![](images/clipboard-2033769683.png)

## 0.2 Backend en marcha (preparación para integrar HTTP)

![](images/clipboard-1727596754.png)

## 0.3 Login y permisos

![](images/clipboard-436036092.png)

![](images/clipboard-3451585714.png)

![](images/clipboard-4148269830.png)

# ISS-01

## 1.1 Crear el proyecto en la carpeta actual

![](images/clipboard-4216359117.png)

## 1.2 Instalar PrimeNG compatible con Angular

![](images/clipboard-1980280105.png)

![](images/clipboard-4145436120.png)

## 1.3 Estilos globales

![](images/clipboard-913991462.png)

## 1.4 Configurar PrimeNG en `app.config.ts`

![](images/clipboard-2337732929.png)

### 1.4.1 Licencia de PrimeNG 22 (obligatoria para la entrega limpia)

![](images/clipboard-4147653435.png)

## 1.5 Pantalla de arranque: `App` compone el componente `demo/ejemplo`

![](images/clipboard-1798007385.png)

### 2. Crear `ejemplo.html`

![](images/clipboard-3005620849.png)

### 3. `ejemplo.css`

![](images/clipboard-3492134970.png)

### 4. Prueba de `Ejemplo`

![](images/clipboard-3194089235.png)

### 5. Reemplazar `app.ts`

![](images/clipboard-3051802509.png)

### 6. Reemplazar `app.html`

![](images/clipboard-2362620584.png)

### 7. Dejar `app.css` vacío

![](images/clipboard-767491537.png)

### 8. Mantener las rutas vacías

![](images/clipboard-3222349872.png)

### 9. Actualizar `app.spec.ts`

![](images/clipboard-1263025159.png)

![](images/clipboard-829920678.png)

![](images/clipboard-3003033422.png)

## 1.6 Personalizar `index.html`

![](images/clipboard-3828900672.png)

## 1.7 Anatomía del componente `demo/ejemplo` y signals

![](images/clipboard-1129597843.png)

## 1.8 Primera ejecución

![](images/clipboard-899943819.png)

## 1.9 Anatomía del componente `demo/ejemplo` y signals

![](images/clipboard-1533075567.png)

# Fase I: Frontend — ISS-01A — Esqueleto Header / Aside / contenido / Footer

## 1.2 Generar las tres piezas de `layout/`

![](images/clipboard-3979829784.png)

## 1.3 Contenido de cada componente

![](images/clipboard-4066541560.png)

![![](images/clipboard-4104951934.png)](images/clipboard-3839896519.png)

![![](images/clipboard-1842865411.png)](images/clipboard-3131448828.png)

![](images/clipboard-1004106979.png)

## 1.4 Componer las cuatro regiones en `App`

![](images/clipboard-3788160108.png)

![](images/clipboard-1846251649.png)

## 1.5 Comprobar antes de avanzar

![](images/clipboard-2262990227.png)

![](images/clipboard-636626955.png)

# Fase I: Frontend — ISS-01B — Menú PrimeNG y primera interacción

## 1.1 Los conceptos que se agregan, uno por vez

| Concepto | Para qué sirve en PuntoStock |
|------------------------------------|------------------------------------|
| `input()` | El componente padre le entrega al Aside las opciones del menú. |
| `output()` | El Header o el Aside avisan al componente padre cuando ocurre una acción. |
| `signal()` | Guarda el estado local, por ejemplo, el título de la pantalla o si el menú móvil está abierto. |
| `MenuItem[]` | Define las opciones que mostrará el menú de PrimeNG. |
| `[(visible)]` | Mantiene sincronizado el estado de apertura y cierre del Drawer móvil. |

La regla de esta fase es que Header y Aside presentan información y emiten avisos; el componente `Construir` controla el estado. Así evitamos duplicar la lógica del menú.

## 1.2 El Aside recibe el menú con `input()`

Vamos a reemplazar el menú escrito manualmente en `aside.html` por un `p-panelmenu`. El Aside recibirá sus opciones desde el componente padre y no será responsable de construirlas.

### Paso 1. Reemplazar `aside.ts`

![](images/clipboard-2914084161.png)

### Paso 2. Reemplazar `aside.html`

### ![](images/clipboard-3081584547.png)

### Paso 3. Verificar que el CSS siga vacío de regla

### ![](images/clipboard-1151135258.png)

### Paso 4. Comprobar la estructura y compilar

### ![](images/clipboard-2372163574.png)

### 1.3 El Header avisa al padre con `output()`

Ahora vamos a preparar el Header para que el botón de menú emita el evento `menuRequested`. El Header no decide si se abre el menú lateral o el Drawer; esa decisión la tomará `Construir`.

### Paso 1. Reemplazar `header.ts`

![](images/clipboard-1434897618.png)

### Paso 2. Reemplazar `header.html`

![](images/clipboard-2892253684.png)

### Comprobar el paso 1.3

![](images/clipboard-1391569385.png)

## 1.4: crear

### 1. Crear el helper para detectar el tamaño de pantalla

![](images/clipboard-2828170888.png)

### 2. Crear el componente `Construir`

![](images/clipboard-4009128285.png)

### Archivo `construir.html`

### ![](images/clipboard-238143129.png)

![![](images/clipboard-2889699069.png)](images/clipboard-3846672514.png)

## 1.5 `App` pasa a ser punto de entrada con `router-outlet`

### 1. Configurar las rutas

### ![](images/clipboard-957970893.png)

### 2. Convertir `App` en punto de entrada del router

### ![](images/clipboard-1697263472.png)

### reemplaza `src/app/app.html`:

### ![](images/clipboard-3346996551.png)

### 3. Verificar la configuración

### ![](images/clipboard-942917557.png)

![](images/clipboard-3673032045.png)

![](images/clipboard-38031851.png)

# Fase I: Frontend — ISS-02 — Núcleo: environment, modelos, servicios y layout

### 2.1 — Environment: 

![](images/clipboard-1869951758.png)

### 2.2 — Modelos: 

### ![](images/clipboard-2315865145.png)

### 2.3 — Servicios HTTP: siguiente paso; cada servicio debe devolver la entidad desenvuelta de la respuesta de Express.

![](images/clipboard-1248304750.png)

![](images/clipboard-3614549825.png)

![](images/clipboard-665385611.png)

### 2.4 — Utilidades: `toApiMessage` y `NotificationService`.

### ![](images/clipboard-1005964098.png)

### 2.5 — Componentes compartidos: `PageHeader`, `EmptyState` y `StatusTag`.

### ![](images/clipboard-575521473.png)

### 2.6 — Shell: integrar el layout

### ![](images/clipboard-1504703881.png)

### 2.7 — HttpClient: comprobar su registro, sin añadir interceptores de sesión en esta fase.

### ![](images/clipboard-1357841277.png)

### 2.8 — Verificación: compilación y comprobaciones finales del ISS.

![](images/clipboard-3053412573.png)

![](images/clipboard-3485480036.png)
