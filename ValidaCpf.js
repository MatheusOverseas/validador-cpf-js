function validaCpf(cpfEnviado) {
  Object.defineProperty(this, "cpfLimpo", {
    get: function () {
      return cpfEnviado.replace(/\D+/g, "");
    },
  });
}

validaCpf.prototype.valida = function () {
  if (typeof this.cpfLimpo === "undefined") return false;
  if (this.cpfLimpo.length !== 11) return false;
  if (this.isSequencia()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const criaDigito1 = this.criaDigito(cpfParcial);
  const criaDigito2 = this.criaDigito(cpfParcial + criaDigito1);

  const cpfNovo = cpfParcial + criaDigito1 + criaDigito2;
  console.log(cpfNovo);

  return cpfNovo === this.cpfLimpo;
};
validaCpf.prototype.isSequencia = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
};
validaCpf.prototype.criaDigito = function (cpfParcial) {
  const Cpfarray = Array.from(cpfParcial);

  let regressivo = Cpfarray.length + 1;
  let total = Cpfarray.reduce((acumulador, valor) => {
    acumulador += regressivo * Number(valor);
    regressivo--;
    return acumulador;
  }, 0);
  const digito = 11 - (total % 11);
  return digito > 9 ? "0" : String(digito);
};
const cpf = new validaCpf("404.882.778-25");

console.log(cpf.valida());
