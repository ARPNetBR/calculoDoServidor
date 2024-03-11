export const LOGINMESSAGES ={
    nome: [
        {
          type: 'required',
          message: 'O campo Nome é obrigatório!'
        },
      ],
      city:[
        {
          type: 'required',
          message: 'O campo Cidade é obrigatório!'
        },
      ],
      uf:[
        {
          type: 'required',
          message: 'O campo Estado é obrigatório!'
        },
      ],
      email: [
        {
          type: 'required',
          message: 'O campo Email é obrigatório!'
        },
        {
          type: 'pattern',
          message: 'O Email informado é inválido!'
        }
      ],
      fone: [
        {
          type: 'required',
          message: 'O campo Telefone é obrigatório!'
        },
        {
          type: 'pattern',
          message: 'O Telefone informado é inválido!'
        }
      ],
      password: [
        {
          type: 'required',
          message: 'O campo Senha é obrigatório!'
        },
        {
          type: 'minlength',
          message: 'O comprimento da senha deve ser de no minímo 6 caracteres!'
        }
      ],
      repeatPassword: [
        {
          type: 'required',
          message: 'O campo Repetir Senha é obrigatório!'
        },
        {
          type: 'minlength',
          message: 'O comprimento da senha deve ser de no minímo 6 caracteres!'
        },
        {
          type: 'mismatch',
          message: 'O campo Senha e Repetir Senha, não são iguais!'
        }
      ],
     
    };
