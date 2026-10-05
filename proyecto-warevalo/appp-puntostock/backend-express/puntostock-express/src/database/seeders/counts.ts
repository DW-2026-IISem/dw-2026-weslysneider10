/**
 * Cantidad de registros por feature/entidad.
 *
 * Prioridad:
 * CLI (--clients=N) > env (SEED_CLIENTS) > default de este archivo.
 *
 * Los catálogos de seguridad (roles, resources, role_users, resource_roles)
 * son deterministas: su contenido vive en el código de cada seeder, no en
 * un número aquí. refresh_tokens no tiene seeder: lo puebla el login.
 */

export type SeedCounts = {
  users: number;
  clients: number;
  product_types: number;
  products: number;
  branches: number;
  suppliers: number;
  inventories: number;
  payments: number;
  purchases: number;
  sales: number;
  returns: number;
};

export const DEFAULT_SEED_COUNTS: SeedCounts = {
  // 2 usuarios canónicos (admin/seller) + extras aleatorios si pides más.
  users: 2,
  clients: 10,
  product_types: 25,
  products: 40,
  branches: 5,
  suppliers: 8,
  inventories: 30,
  payments: 15,
  purchases: 12,
  sales: 20,
  returns: 6,
};

export function resolveSeedCounts(
  argv: string[] = process.argv.slice(2)
): SeedCounts {

  const counts: SeedCounts = { ...DEFAULT_SEED_COUNTS };

  const envMap: Array<[keyof SeedCounts, string | undefined]> = [
    ["users", process.env.SEED_USERS],
    ["clients", process.env.SEED_CLIENTS],
    ["product_types", process.env.SEED_PRODUCT_TYPES],
    ["products", process.env.SEED_PRODUCTS],
    ["branches", process.env.SEED_BRANCHES],
    ["suppliers", process.env.SEED_SUPPLIERS],
    ["inventories", process.env.SEED_INVENTORIES],
    ["payments", process.env.SEED_PAYMENTS],
    ["purchases", process.env.SEED_PURCHASES],
    ["sales", process.env.SEED_SALES],
    ["returns", process.env.SEED_RETURNS],
  ];

  for (const [key, value] of envMap) {
    if (value !== undefined && value !== "") {
      counts[key] = Number(value);
    }
  }

  for (const arg of argv) {
    const m = arg.match(/^--([a-zA-Z_]+)=(\d+)$/);
    if (!m) continue;
    const key = m[1] as keyof SeedCounts;
    const value = Number(m[2]);
    if (key in counts) {
      counts[key] = value;
    }
  }

  return counts;
}
