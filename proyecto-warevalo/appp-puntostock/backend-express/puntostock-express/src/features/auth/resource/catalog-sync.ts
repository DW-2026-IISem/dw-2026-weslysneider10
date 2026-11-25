import { Resource } from "./resource.model";
import { RESOURCE_CATALOG } from "./resource-catalog";
import { Role } from "../role/role.model";
import { ResourceRole } from "../resource-role/resource-role.model";

/**
 * Sincronización del catálogo al arrancar el servidor (solo añade, nunca quita).
 *
 * Cuando el código incorpora rutas nuevas al catálogo, la base de datos
 * existente no las conoce hasta ejecutar el seeder; mientras tanto el ADMIN
 * recibe 403 en esas rutas. Esto lo evita:
 *  1. crea en `resources` las operaciones del catálogo que aún no existen
 *     (no reactiva las que un administrador desactivó a propósito);
 *  2. concede al rol ADMIN las operaciones del catálogo que no tenga
 *     (ADMIN = administración total por definición).
 *
 * No toca ningún otro rol ni retira permisos: eso sigue siendo decisión
 * del administrador desde el panel (o del seeder).
 */
export async function syncCatalog(): Promise<void> {
  let createdResources = 0;
  for (const item of RESOURCE_CATALOG) {
    const [, created] = await Resource.findOrCreate({
      where: { method: item.method, path: item.path },
      defaults: {
        method: item.method,
        path: item.path,
        description: item.description,
        status: "active",
      },
    });
    if (created) createdResources++;
  }

  const admin = await Role.findOne({ where: { name: "ADMIN" } });
  if (!admin) {
    console.log(`🔐 Catálogo: ${createdResources} recurso(s) nuevo(s); no existe el rol ADMIN (ejecuta el seeder)`);
    return;
  }

  const catalogKeys = new Set(RESOURCE_CATALOG.map((r) => `${r.method} ${r.path}`));
  const resources = (await Resource.findAll({ where: { status: "active" } })).filter((r) =>
    catalogKeys.has(`${r.method} ${r.path}`)
  );
  const grants = await ResourceRole.findAll({ where: { role_id: admin.id } });
  const byResource = new Map(grants.map((g) => [g.resource_id, g]));

  let granted = 0;
  for (const resource of resources) {
    const grant = byResource.get(resource.id);
    if (!grant) {
      await ResourceRole.create({ role_id: admin.id, resource_id: resource.id, status: "active" });
      granted++;
    } else if (grant.status !== "active") {
      await grant.update({ status: "active" });
      granted++;
    }
  }

  console.log(
    `🔐 Catálogo sincronizado: ${createdResources} recurso(s) nuevo(s), ${granted} concesión(es) nueva(s) para ADMIN`
  );
}
