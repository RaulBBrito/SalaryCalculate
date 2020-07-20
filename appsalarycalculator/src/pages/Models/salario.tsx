export default class SalarioModel {

  salarioBruto: string = '';
  numeroDependentes: string = '';
  outrosDescontos: string = '';

  constructor(salarioBruto: string, numeroDependentes: string, outrosDescontos: string )  {
    this.salarioBruto = salarioBruto;
    this.numeroDependentes = numeroDependentes;
    this.outrosDescontos = outrosDescontos;
  }

  setSalarioBruto(salarioBruto: string) {
      this.salarioBruto = salarioBruto;
  }
  getSalarioBruto() {
    return this.salarioBruto;
}
  setNumeroDependentes(numeroDependentes: string) {
      this.numeroDependentes = numeroDependentes;
  }
  getNumeroDependentes() {
    return this.numeroDependentes;
}

  setOutrosDescontos(outrosDescontos: string) {
      this.outrosDescontos = outrosDescontos;
  }
  getOutrosDescontos() {
    return this.outrosDescontos;
}
}