import { describe, expect, it } from 'vitest';
import { filterRows } from './filter-rows';

interface TestClient {
  name: string;
  email: string;
  id: number;
}

describe('filterRows', () => {
  const clients: TestClient[] = [
    { id: 1, name: 'Ana Pérez', email: 'ana@example.com' },
    { id: 2, name: 'Carlos Díaz', email: 'carlos@example.com' },
    { id: 3, name: 'María López', email: 'maria@example.com' },
  ];

  const pick = (client: TestClient) => [
    client.name,
    client.email,
    client.id,
  ];

  it('devuelve todas las filas si la búsqueda está vacía', () => {
    expect(filterRows(clients, '', pick)).toEqual(clients);
  });

  it('ignora espacios al principio y al final', () => {
    expect(filterRows(clients, '  Ana Pérez  ', pick)).toEqual([
      clients[0],
    ]);
  });

  it('busca sin distinguir mayúsculas y minúsculas', () => {
    expect(filterRows(clients, 'CARLOS', pick)).toEqual([clients[1]]);
  });

  it('busca por correo electrónico', () => {
    expect(filterRows(clients, 'maria@example.com', pick)).toEqual([
      clients[2],
    ]);
  });

  it('permite buscar por identificador numérico', () => {
    expect(filterRows(clients, '2', pick)).toEqual([clients[1]]);
  });

  it('devuelve una lista vacía cuando no hay coincidencias', () => {
    expect(filterRows(clients, 'inexistente', pick)).toEqual([]);
  });

  it('no modifica el arreglo original', () => {
    const original = [...clients];

    filterRows(clients, 'ana', pick);

    expect(clients).toEqual(original);
  });
});
