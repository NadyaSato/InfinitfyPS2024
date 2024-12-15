-Mostrar os passageiros(Get)
http://localhost:4004/odata/v4/export-passageiro/GetPassageiro

-Cadastrar passageiros(Post)
http://localhost:4004/odata/v4/export-passageiro/InsertPassageiro
body: {
     "cpf": "1234565512",
            "nome": "João do Santos",
            "email": "demo@demo",
            "telefone": "14996666510",
            "data_de_nascimento": null,
            "endereco": "av morumbi"
}
-Atualizar dados de passageiros(Patch)
http://localhost:4004/odata/v4/export-passageiro/UpdatePassageiro(id_passageiro='8a0f2e69-8cf1-466a-89f2-58679822ebd2')
body: {
     "cpf": "1234565512",
            "nome": "Novo João Moreira",
            "email": "Novo demo@demo",
            "telefone": "14996666510",
            "data_de_nascimento": null,
            "endereco": "av morumbi"
}
-Deletar passageiros (Delete)
http://localhost:4004/odata/v4/export-passageiro/DeletePassageiro(id_passageiro='8a0f2e69-8cf1-466a-89f2-58679822ebd2')

-Mostrar as Reservas(Get)
http://localhost:4004/odata/v4/export-passageiro/ReadReservaPassagem
-Cadastrar Reserva(Post)
http://localhost:4004/odata/v4/export-passageiro/InsertReservaPassagem
body: {
   "id_passageiro": "30e1cf98-9197-4a61-afeb-7b6a89e8aa15",
    "id_horario_voo": "1c7041ea-01e6-4c0b-ad2f-dd776dfc73cd", 
    "assento": "07",              
    "classe": "economica",                
    "status": "AGUARDANDO",                
    "data_reserva": "2024-11-09",                  
    "preco": 300          
}
-Atualizar dados de Reserva(Patch)
http://localhost:4004/odata/v4/export-passageiro/UpdateReservaPassagem(id_reserva='30e1cf98-9197-4a61-afeb-7b6a70e8aa15')
body:{
   "id_passageiro": "30e1cf98-9197-4a61-afeb-7b6a89e8aa15",
    "id_horario_voo": "1c7041ea-01e6-4c0b-ad2f-dd776dfc73cd", 
    "assento": "05",              
    "classe": "executiva",                
    "status": "AGUARDANDO",                
    "data_reserva": "2024-11-09",                  
    "preco": 600         
}
-Deletar Reserva (Delete)
http://localhost:4004/odata/v4/export-passageiro/DeleteReservaPassagem(id_reserva='30e1cf98-9197-4a61-afeb-7b6a70e8aa15')

-Mostrar os horarios de voo(Get)
http://localhost:4004/odata/v4/export-passageiro/ReadHorarioVoo
-Cadastrar voo (Post)
http://localhost:4004/odata/v4/export-passageiro/InsertHorarioVoo
body:{
    "id_companhia" : "ce426038-3585-408e-ac04-b844922479ef";
    "id_conexao" : "cd7ff42b-f67e-4e81-abe3-22a426f85693";
    "id_aeronave" : "1af4b9a5-10c7-4989-93bb-66e9cb07439b";
    "nr_assentos_executivo" : 10;
    "nr_assentos_economico" : 20;
    "capacidade_total" 30: ;
    "data" : "2025-07-01";
    "partida_prevista" : "2025-07-05";
    "chegada_prevista" : "2025-07-06";
    "partida_real" : "";
    "chegada_real" : "";
    "situacao_voo" : AGUARDANDO;
    "situacao_partida" : null ;
    "situacao_chegada" : null ;
}

-Atualizar dados de voo(Patch)
http://localhost:4004/odata/v4/export-passageiro/UpdateHorarioVoo(id_horario_voo='84300f5a-392c-4f66-a5f9-ba11ea054567')
body: {
    "id_companhia" : "ce426038-3585-408e-ac04-b844922479ef";
    "id_conexao" : "cd7ff42b-f67e-4e81-abe3-22a426f85693";
    "id_aeronave" : "f13498fc-c3d3-481e-acf6-58a85e5968c5";
    "nr_assentos_executivo" : 10;
    "nr_assentos_economico" : 20;
    "capacidade_total" 30: ;
    "data" : "2025-07-01";
    "partida_prevista" : "2025-07-05";
    "chegada_prevista" : "2025-07-06";
    "partida_real" : "";
    "chegada_real" : "";
    "situacao_voo" : AGUARDANDO;
    "situacao_partida" : null ;
    "situacao_chegada" : null ;
}

-Atualizar status de voo(Patch)
http://localhost:4004/odata/v4/export-passageiro/UpdateStatusHorarioVoo(id_horario_voo='84300f5a-392c-4f66-a5f9-ba11ea054567')
body:{
    "id_companhia" : "ce426038-3585-408e-ac04-b844922479ef";
    "id_conexao" : "cd7ff42b-f67e-4e81-abe3-22a426f85693";
    "id_aeronave" : "f13498fc-c3d3-481e-acf6-58a85e5968c5";
    "nr_assentos_executivo" : 10;
    "nr_assentos_economico" : 20;
    "capacidade_total" 30: ;
    "data" : "2025-07-01";
    "partida_prevista" : "";
    "chegada_prevista" : "";
    "partida_real" : "";
    "chegada_real" : "";
    "situacao_voo" : CANCELADO;
    "situacao_partida" : null ;
    "situacao_chegada" : null ;
}

-Deletar voo(Delete)
http://localhost:4004/odata/v4/export-passageiro/DeleteHorarioVoo(id_horario_voo='84300f5a-392c-4f66-a5f9-ba11ea054567')

