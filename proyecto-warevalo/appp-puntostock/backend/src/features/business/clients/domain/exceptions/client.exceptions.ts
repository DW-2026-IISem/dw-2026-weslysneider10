export class ClientDuplicateDocumentException extends Error {
  constructor(numeroDocumento: string) {
    super(`Ya existe un cliente con el documento ${numeroDocumento}.`);
    this.name = 'ClientDuplicateDocumentException';
  }
}

export class ClientNotFoundException extends Error {
  constructor(id: number) {
    super(`No se encontró el cliente con id ${id}.`);
    this.name = 'ClientNotFoundException';
  }
}
