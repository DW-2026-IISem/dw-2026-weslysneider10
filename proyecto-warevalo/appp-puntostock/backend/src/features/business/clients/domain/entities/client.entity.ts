export class Client {
  constructor(
    public readonly id: number | null,
    public tipoDocumento: string,
    public numeroDocumento: string,
    public nombre: string,
    public telefono: string | null,
    public email: string | null,
    public isActive: boolean = true,
  ) {}

  static create(props: {
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    telefono?: string;
    email?: string;
  }): Client {
    if (!props.nombre || props.nombre.trim().length === 0) {
      throw new Error('El nombre del cliente es obligatorio.');
    }
    if (!props.numeroDocumento || props.numeroDocumento.trim().length === 0) {
      throw new Error('El número de documento es obligatorio.');
    }
    return new Client(
      null,
      props.tipoDocumento,
      props.numeroDocumento,
      props.nombre.trim(),
      props.telefono ?? null,
      props.email ?? null,
      true,
    );
  }

  deactivate(): void {
    this.isActive = false;
  }
}
