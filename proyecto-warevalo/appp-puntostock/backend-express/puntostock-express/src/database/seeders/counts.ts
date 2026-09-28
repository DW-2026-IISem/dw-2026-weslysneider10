/**
 * Cantidad de registros por feature/entidad.
 *
 * Prioridad:
 * CLI (--clients=N) > env (SEED_CLIENTS) > default de este archivo.
 *
 * Cuando agregues features, suma aquí la clave y léela en el runner.
 */

export type SeedCounts = {
  clients: number;
  product_types: number;
  products: number;
};

export const DEFAULT_SEED_COUNTS: SeedCounts = {
  clients: 10,
  product_types: 25,
  products: 40,
};

export function resolveSeedCounts(
  argv: string[] = process.argv.slice(2)
): SeedCounts {

  const counts: SeedCounts = { ...DEFAULT_SEED_COUNTS };

  const envClients = process.env.SEED_CLIENTS;
  const envProductTypes = process.env.SEED_PRODUCT_TYPES;
  const envProducts = process.env.SEED_PRODUCTS;

  if (envClients !== undefined && envClients !== "") {
    counts.clients = Number(envClients);
  }

  if (envProductTypes !== undefined && envProductTypes !== "") {
    counts.product_types = Number(envProductTypes);
  }

  if (envProducts !== undefined && envProducts !== "") {
    counts.products = Number(envProducts);
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
