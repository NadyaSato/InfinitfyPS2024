module.exports = (srv) => {
    const { HorarioVoo } = cds.entities('sap.cap.schema');
  
    // Leitura de Horários de Voo
    srv.on('READ', 'ReadHorarioVoo', async (req) => {
      try {
        const filtro = req.data;
        const dados = await SELECT.from(HorarioVoo).where(filtro);
        return dados;
      } catch (err) {
        console.error('Erro ao ler Horários de Voo: ' + err);
        throw err;
      }
    });
  
    // Antes de criar um Horário de Voo
    srv.before('CREATE', 'InsertHorarioVoo', async (req) => {
      const { situacao_voo } = req.data;
  
      if (situacao_voo && situacao_voo !== 'AGENDADO') {
        req.error(400, 'Novo voo deve começar com a situação "AGENDADO".');
      }
    });
  
   
  // Restrição de Atualização Direta
  srv.before('UPDATE', 'UpdateHorarioVoo', async (req) => {
    const permitidos = ['partida_prevista', 'chegada_prevista', 'id_aeronave'];
    const camposAlterados = Object.keys(req.data);

    const naoPermitidos = camposAlterados.filter((campo) => !permitidos.includes(campo));
    if (naoPermitidos.length > 0) {
      return req.error(400,' Os seguintes campos não podem ser alterados diretamente:  ${naoPermitidos.join(', ')}');
    }
  });

srv.on('atualizarStatus', 'UpdateStatusHorarioVoo', async (req) => {
    const { id_horario_voo, novo_status, partida_real, chegada_real, situacao_partida, situacao_chegada } = req.data;

    const voo = await SELECT.one.from(HorarioVoo).where({ id_horario_voo });
    if (!voo) {
      return req.error(404, 'Voo não encontrado.');
    }

    // Validações baseadas no status atual
    switch (voo.situacao_voo) {
      case 'AGUARDANDO':
        if (novo_status === 'EM CURSO') {
          // Validações para a transição para 'EM CURSO'
          if (!partida_real || !situacao_partida) {
            return req.error(400, 'Informe o horário real de partida e a situação real da partida para iniciar o voo.');
          }
          await UPDATE(HorarioVoo)
            .set({ situacao_voo: 'EM CURSO', partida_real, situacao_partida })
            .where({ id_horario_voo });
        } else if (novo_status === 'CANCELADO') {
          // Validações para a transição para 'CANCELADO'
          if (partida_real || chegada_real) {
            return req.error(400, 'Voos cancelados não podem ter horários reais definidos.');
          }
          await UPDATE(HorarioVoo)
            .set({ situacao_voo: 'CANCELADO' })
            .where({ id_horario_voo });
        } else {
          return req.error(400, 'Transição de status inválida a partir de "AGUARDANDO".');
        }
        break;

      case 'EM CURSO':
        if (novo_status === 'CONCLUÍDO') {
          // Validações para a transição para 'CONCLUÍDO'
          if (!chegada_real || !situacao_chegada) {
            return req.error(400, 'Informe o horário real de chegada e a situação real da chegada para concluir o voo.');
          }
          await UPDATE(HorarioVoo)
            .set({ situacao_voo: 'CONCLUÍDO', chegada_real, situacao_chegada })
            .where({ id_horario_voo });
        } else {
          return req.error(400, 'Transição de status inválida a partir de "EM CURSO".');
        }
        break;

      default:
        return req.error(400, 'Transição de status não permitida para o estado atual do voo.');
    }  });
  
    // Deleção de Horários de Voo
    srv.before('DELETE', 'DeleteHorarioVoo', async (req) => {
      const { id_horario_voo } = req.data;
  
      const horario = await SELECT.one.from(HorarioVoo).where({ id_horario_voo });
      if (!horario) {
        req.error(400, 'Horário de voo não encontrado.');
      }
  
      if (horario.situacao_voo !== 'AGENDADO') {
        req.error(400, 'Somente voos "AGENDADOS" podem ser excluídos.');
      }
    });
  };