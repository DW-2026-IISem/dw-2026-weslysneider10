# ISS-03 — Gestión de clientes

## 4. Pruebas

- [ ] El filtro encuentra clientes por nombre.
- [ ] El filtro funciona sin distinguir mayúsculas y minúsculas.
- [ ] El formulario valida los campos obligatorios.
- [ ] Se puede abrir el formulario para crear un cliente.
- [ ] Se puede abrir el formulario con los datos de un cliente existente.
- [ ] Se muestran los mensajes de error cuando falla una petición.
- [ ] Las pruebas unitarias se ejecutan correctamente.
- [ ] La aplicación compila sin errores.

## 5. Criterios de aceptación (ISS-03)

- [ ] Se muestran los clientes obtenidos del backend.
- [ ] Se puede registrar un cliente.
- [ ] Se puede editar un cliente existente.
- [ ] El filtro localiza clientes sin necesitar otra petición HTTP.
- [ ] La baja lógica desactiva al cliente.
- [ ] La baja física elimina el registro cuando corresponde.
- [ ] La lista se actualiza después de una operación exitosa.
- [ ] Se muestran mensajes de confirmación o error.
- [ ] El formulario permite cancelar sin guardar cambios.

## 6. Comprobación funcional (Fase I, sin auth)

La Fase I debe permitir verificar el CRUD de clientes sin implementar
un sistema de autenticación en el frontend.

La API del proyecto utiliza la URL base:

http://localhost:3000/api

Antes de probar las operaciones, comprobar que el backend está iniciado,
que la base de datos está disponible y que las rutas aceptan solicitudes
sin autenticación en el entorno de desarrollo.

Operaciones previstas:

- GET /api/clientes
- GET /api/clientes/:id
- POST /api/clientes
- PATCH /api/clientes/:id
- PATCH /api/clientes/:id/deactivate
- DELETE /api/clientes/:id

Nota: las rutas del backend pueden exigir un token. Si responden con
401 o 403, verificar la configuración real del backend antes de atribuir
el problema al frontend. No desactivar controles de seguridad en producción.

## 7. Verificación del ISS

- [ ] La funcionalidad implementada corresponde al alcance de ISS-03.
- [ ] Los componentes usan los modelos y servicios existentes.
- [ ] Las peticiones utilizan la URL configurada en el entorno Angular.
- [ ] Los estados de carga, error y resultados vacíos son visibles.
- [ ] El formulario valida los datos antes de enviarlos.
- [ ] Las operaciones exitosas actualizan la interfaz.
- [ ] Las pruebas y la compilación finalizan correctamente.

## 8. Integración con el esqueleto

- [ ] La lista de clientes está registrada en el enrutamiento.
- [ ] El menú de navegación permite acceder a Clientes.
- [ ] La pantalla utiliza el diseño compartido de la aplicación.
- [ ] Se reutilizan los componentes visuales existentes.
- [ ] Se mantiene la configuración global de HTTP y PrimeNG.
- [ ] La URL base de la API continúa siendo http://localhost:3000/api.
- [ ] No se modifican funcionalidades ajenas al alcance de ISS-03.

## 9. Correspondencia con el código

| Requisito | Ubicación que debe verificarse |
|---|---|
| Modelo de cliente | src/app/core/models/client.model.ts |
| Modelo de estado | src/app/core/models/common.model.ts |
| Mensajes de error HTTP | src/app/core/utils/api-error.ts |
| Servicio de notificaciones | src/app/core/services/notification.service.ts |
| Formulario de cliente | src/app/features/clients/client-form/ |
| Lista de clientes | src/app/features/clients/client-list/ |
| Filtro local | src/app/core/utils/filter-rows.ts |
| Enrutamiento | src/app/app.routes.ts |
| Navegación | Componente Shell y su menú |
| URL de la API | src/environments/environment.ts |
| Pruebas unitarias | Archivos *.spec.ts asociados a cada unidad |

Las rutas anteriores deben contrastarse con los archivos reales del repositorio.
No se considera implementado un requisito únicamente por aparecer en esta tabla:
debe verificarse su comportamiento en el código y en la aplicación.
