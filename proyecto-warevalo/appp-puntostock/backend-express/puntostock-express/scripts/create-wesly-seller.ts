import "dotenv/config";

import { sequelize } from "../src/database/db";
import { User } from "../src/features/auth/user/user.model";
import { Role } from "../src/features/auth/role/role.model";
import { RoleUser } from "../src/features/auth/role-user/role-user.model";

async function createWeslySeller(): Promise<void> {
  const transaction = await sequelize.transaction();

  try {
    const role = await Role.findOne({
      where: { name: "SELLER", status: "active" },
      transaction,
    });

    if (!role) {
      throw new Error(
        'No existe el rol SELLER activo. No se creó ningún usuario.'
      );
    }

    let user = await User.findOne({
      where: { username: "wesly" },
      transaction,
    });

    if (!user) {
      user = await User.create(
        {
          username: "wesly",
          email: "wesly@puntostock.local",
          password: "Wesly123!",
          avatar: null,
          status: "active",
        },
        { transaction }
      );

      console.log("✅ Usuario wesly creado.");
    } else {
      if (user.email !== "wesly@puntostock.local") {
        throw new Error(
          "El usuario wesly ya existe con otro correo. No se modificó."
        );
      }

      if (user.status !== "active") {
        await user.update({ status: "active" }, { transaction });
      }

      console.log(
        "ℹ️ El usuario wesly ya existía. Se conservó su contraseña."
      );
    }

    const [assignment, created] = await RoleUser.findOrCreate({
      where: {
        user_id: user.id,
        role_id: role.id,
      },
      defaults: {
        user_id: user.id,
        role_id: role.id,
        status: "active",
      },
      transaction,
    });

    if (!created && assignment.status !== "active") {
      await assignment.update({ status: "active" }, { transaction });
    }

    await transaction.commit();

    console.log("✅ Rol SELLER asignado correctamente.");
    console.log("Usuario: wesly");
    console.log("Correo: wesly@puntostock.local");
    console.log("Estado: active");
    console.log("Rol: SELLER");
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

createWeslySeller()
  .catch((error) => {
    console.error("❌ No se pudo crear el usuario:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
