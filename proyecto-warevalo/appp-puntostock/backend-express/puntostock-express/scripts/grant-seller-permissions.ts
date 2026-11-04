import "dotenv/config";
import { sequelize } from "../src/database/db";
import { Resource } from "../src/features/auth/resource/resource.model";
import { Role } from "../src/features/auth/role/role.model";
import { ResourceRole } from "../src/features/auth/resource-role/resource-role.model";
import { SELLER_RESOURCES } from "../src/features/auth/resource/resource-catalog";

async function grantSellerPermissions(): Promise<void> {
  const transaction = await sequelize.transaction();

  try {
    const seller = await Role.findOne({
      where: { name: "SELLER", status: "active" },
      transaction,
    });

    if (!seller) {
      throw new Error("No se encontró el rol SELLER activo.");
    }

    let resourcesCreated = 0;
    let permissionsCreated = 0;
    let permissionsReactivated = 0;

    for (const item of SELLER_RESOURCES) {
      const [resource, created] = await Resource.findOrCreate({
        where: {
          method: item.method,
          path: item.path,
        },
        defaults: {
          method: item.method,
          path: item.path,
          description: item.description,
          status: "active",
        },
        transaction,
      });

      if (created) {
        resourcesCreated++;
      } else if (
        resource.status !== "active" ||
        resource.description !== item.description
      ) {
        await resource.update(
          {
            status: "active",
            description: item.description,
          },
          { transaction }
        );
      }

      const [permission, permissionCreated] =
        await ResourceRole.findOrCreate({
          where: {
            role_id: seller.id,
            resource_id: resource.id,
          },
          defaults: {
            role_id: seller.id,
            resource_id: resource.id,
            status: "active",
          },
          transaction,
        });

      if (permissionCreated) {
        permissionsCreated++;
      } else if (permission.status !== "active") {
        await permission.update({ status: "active" }, { transaction });
        permissionsReactivated++;
      }
    }

    await transaction.commit();

    console.log("======================================");
    console.log("ACTUALIZACIÓN DEL ROL SELLER");
    console.log("======================================");
    console.log(`Recursos del catálogo: ${SELLER_RESOURCES.length}`);
    console.log(`Recursos nuevos: ${resourcesCreated}`);
    console.log(`Permisos nuevos: ${permissionsCreated}`);
    console.log(`Permisos reactivados: ${permissionsReactivated}`);
    console.log("Rol ADMIN: sin modificaciones");
    console.log("Resultado: operación completada.");
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

grantSellerPermissions()
  .catch((error) => {
    console.error("Error actualizando permisos SELLER:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
