class ValidaFormulario {
   constructor() {
      this.form = document.querySelector(".form");
      this.eventos();
   }

   eventos() {
      this.form.addEventListener("submit", (e) => {
         this.HandleSubmit(e);
      });
   }

   HandleSubmit(e) {
      e.preventDefault();
      const camposValido = this.IsValid();
      const SenhasValidas = this.IspassValid();

      if (camposValido && SenhasValidas) {
         alert("Formulario enviado");
         this.form.submit();
      }
   }

   IspassValid() {
      let valid = true;

      const senha = this.form.querySelector(".Senha");
      const Currentsenha = this.form.querySelector(".currentSenha");

      if (senha.value !== Currentsenha.value) {
         valid = false;
         this.CriaErro(
            senha,
            "Campos senha e repetir senha precisam ser iguais"
         );
         this.CriaErro(
            Currentsenha,
            "Campos senha e repetir senha precisam ser iguais"
         );
      }

      if (senha.value.length < 6 || senha.value.length > 12) {
         valid = false;
         this.CriaErro(senha, "Senha precisa ter entre 6 e 12 caracteres.");
      }

      return valid;
   }

   IsValid() {
      let valid = true;

      for (let erro of this.form.querySelectorAll(".erro")) {
         erro.remove();
      }

      for (let campo of this.form.querySelectorAll(".form--control input")) {
         const label = campo.previousElementSibling.innerText;
         if (!campo.value) {
            this.CriaErro(campo, `campo "${label}" não pode estar em branco`);
            valid = false;
         }

         if (campo.classList.contains("CPF")) {
            if (!this.ValidaCPF(campo)) valid = false;
         }

         if (campo.classList.contains("Usuario")) {
            if (!this.ValidaUsuario(campo)) valid = false;
         }
      }

      return valid;
   }

   ValidaUsuario(campo) {
      const usuario = campo.value;
      let valid = true;

      if (usuario.length < 3 || usuario.length > 12) {
         this.CriaErro(campo, "Usuario precisa ter entre 3 e 12 caracteres.");
         valid = false;
      }

      if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
         this.CriaErro(
            campo,
            "Usuarioa precisa conter apenas letras e/ou numeros"
         );
         valid = false;
      }

      return valid;
   }

   ValidaCPF(campo) {
      const cpf = new ValidaCpf(campo.value);

      if (!cpf.Valida()) {
         this.CriaErro(campo, "CPF invalido");
         return false;
      }

      return true;
   }

   CriaErro(campo, msg) {
      const text = document.createElement("p");
      text.innerHTML = msg;
      text.classList.add("erro");
      campo.insertAdjacentElement("afterend", text);
   }
}

const valida = new ValidaFormulario();
