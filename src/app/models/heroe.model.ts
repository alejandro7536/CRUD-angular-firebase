export class HeroeModel {
  constructor(
    public id: string,
    public nombre: string,
    public poder: string,
    public vivo: boolean = true
  ) {}
}
