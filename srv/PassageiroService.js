module.exports = (srv) => {
    const { Passageiro } = cds.entities('sap.cap.schema');
  
    // Leitura de Passageiros
    srv.on('READ', 'GetPassageiro', async (req) => {
      try {
        const filtro = req.data;
        const dados = await SELECT.from(Passageiro).where(filtro);
        return dados;
      } catch (err) {
        console.error('Erro ao ler dados de Passageiro: ' + err);
        throw err;
      }
    });
  
    // Validação de CPF
    const validarCPF = (cpf) => {
      if (!cpf || cpf.length !== 11 || !/\d{11}/.test(cpf)) return false;
      const calcDV = (base, weights) => {
        const sum = base.split('').reduce((acc, digit, idx) => acc + digit * weights[idx], 0);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
      };
      const base = cpf.slice(0, 9);
      const dv1 = calcDV(base, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
      const dv2 = calcDV(base + dv1, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
      return cpf === base + dv1 + dv2;
    };
  
    // Criação de Passageiros
    srv.before('CREATE', 'InsertPassageiro', async (req) => {
      const { cpf, email, telefone, data_de_nascimento } = req.data;
  
      if (!validarCPF(cpf)) {
        req.error(400, 'CPF inválido.');
      }
  
      const idade = new Date().getFullYear() - new Date(data_de_nascimento).getFullYear();
      if (idade < 3) {
        req.error(400, 'Passageiro deve ter no mínimo 3 anos de idade.');
      }
  
      const duplicado = await SELECT.one.from(Passageiro).where({ cpf }).or({ email }).or({ telefone });
      if (duplicado) {
        req.error(400, 'CPF, e-mail ou telefone já cadastrado.');
      }
    });
  
    // Atualização de Passageiros
    srv.before('UPDATE', 'UpdatePassageiro', async (req) => {
      const { cpf, email, telefone } = req.data;
  
      if (cpf && !validarCPF(cpf)) {
        req.error(400, 'CPF inválido.');
      }
  
      const duplicado = await SELECT.one.from(Passageiro).where({ cpf }).or({ email }).or({ telefone });
      if (duplicado && duplicado.id_passageiro !== req.data.id_passageiro) {
        req.error(400, 'CPF, e-mail ou telefone já cadastrado.');
      }
    });
  
    // Deleção de Passageiros
    srv.on('DELETE', 'DeletePassageiro', async (req) => {
      try {
        const { id_passageiro } = req.data;
        await DELETE.from(Passageiro).where({ id_passageiro });
      } catch (err) {
        console.error('Erro ao deletar Passageiro: ' + err);
        throw err;
      }
    });
  };