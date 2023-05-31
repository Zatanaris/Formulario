//070.987.720-03
class ValidaCpf {
   constructor(cpf) {
      Object.defineProperty(this, "cpfLimpo", {
         enumerable: true,
         writable: false,
         configurable: false,
         value: cpf.replace(/\D+/g, ""),
      });
   }

   isSequencia() {
      return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
   }

   geraNovoCpf() {
      const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
      const digito1 = ValidaCpf.geraDigito(cpfSemDigitos);
      const digito2 = ValidaCpf.geraDigito(cpfSemDigitos + digito1);
      this.novoCpf = cpfSemDigitos + digito1 + digito2;
   }

   static geraDigito(cpfSemDigitos) {
      let total = 0;
      let reverso = cpfSemDigitos.length + 1;

      for (let stringNumerica of cpfSemDigitos) {
         total += reverso * Number(stringNumerica);
         reverso--;
      }

      const digito = 11 - (total % 11);
      return digito <= 9 ? String(digito) : "0";
   }

   Valida() {
      if (!this.cpfLimpo) return false;
      if (typeof this.cpfLimpo !== "string") return false;
      if (this.cpfLimpo.length !== 11) return false;
      if (this.isSequencia()) return false;
      this.geraNovoCpf();

      return this.novoCpf === this.cpfLimpo;
   }
}

/* const validaCpf = new ValidaCpf("070.987.720-03");

if (validaCpf.Valida()) {
   console.log("CPF valido.");
} else {
   console.log("CPF invalido, Digite um cpf valido.");
} */
