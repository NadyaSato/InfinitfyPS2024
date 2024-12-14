module.exports = (srv) => {
    const { ReservaPassagem, HorarioVoo, Passageiro, Aeronave } = cds.entities('sap.cap.schema');
  
    // Leitura de Reservas
    srv.on('READ', 'ReadReservaPassagem', async (req) => {
      try {
        const filtro = req.data;
        const dados = await SELECT.from(ReservaPassagem).where(filtro);
        return dados;
      } catch (err) {
        console.error('Erro ao ler Reservas: ' + err);
        throw err;
      }
    });
  
    // Antes de criar uma Reserva
    srv.before('CREATE', 'InsertReservaPassagem', async (req) => {
      const { id_passageiro, id_horario_voo, assento, classe, preco } = req.data;
  
      // Verifica se Passageiro existe
      const passageiro = await SELECT.one.from(Passageiro).where({ id_passageiro });
      if (!passageiro) {
        req.error(400, 'Passageiro não encontrado.');
      }
  
      // Verifica se Horário de Voo existe
      const horarioVoo = await SELECT.one.from(HorarioVoo).where({ id_horario_voo });
      if (!horarioVoo) {
        req.error(400, 'Horário de voo não encontrado.');
      }
  
      // Verifica se o assento já está reservado
      const assentoOcupado = await SELECT.one.from(ReservaPassagem).where({ id_horario_voo, assento });
      if (assentoOcupado) {
        req.error(400, `O assento ${assento} já está reservado para este voo.`);
      }
  
      // Valida preços mínimos por classe
      const precoMinimo = classe.toLowerCase() === 'economica' ? 200 : classe.toLowerCase() === 'executiva' ? 500 : null;
      if (precoMinimo === null || preco < precoMinimo) {
        req.error(400, `O preço mínimo para a classe ${classe} é R$ ${precoMinimo}.`);
      }
      // Verifica se o número total de reservas não excede a capacidade da aeronave
    const aeronave = await SELECT.one.from(Aeronave).where({ id_aeronave: horarioVoo.id_aeronave });
    if (!aeronave) {
      req.error(400, 'Aeronave não encontrada.');
    }

    // Conta o número de reservas para o voo
    const totalReservas = await SELECT.count().from(ReservaPassagem).where({ id_horario_voo });
    if (totalReservas >= aeronave.capacidade_maxima) {
      req.error(400, 'Número de reservas não pode exceder a capacidade máxima da aeronave.');
    } 
    });
  
    // Antes de deletar uma Reserva
    srv.before('DELETE', 'DeleteReservaPassagem', async (req) => {
      const { id_reserva } = req.data;
      const reserva = await SELECT.one.from(ReservaPassagem).where({ id_reserva });
  
      if (!reserva) {
        req.error(400, 'Reserva não encontrada.');
      }
  
      const horarioVoo = await SELECT.one.from(HorarioVoo).where({ id_horario_voo: reserva.id_horario_voo });
  
      if (horarioVoo.situacao_voo === 'EM CURSO' || horarioVoo.situacao_voo === 'CONCLUÍDO') {
        req.error(400, 'Reservas não podem ser canceladas após o início ou conclusão do voo.');
      }
    });
  };
  