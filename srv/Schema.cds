namespace sap.cap.schema;
entity Aeronave {
    key id_aeronave             : UUID;
    marca                   : String(100);
    modelo               : String(255);
    nr_serie                : String(100);
    cd_categoria            : String(50);
    cd_tipo                 : String(50);
    nm_fabricante           : String(255);
    cd_cls                  : String(50);
    nr_pmd                  : String(100);
    cd_tipo_icao            : String(50);
    nr_assentos_executivo   : Integer;
    nr_assentos_economico   : Integer;
    nr_assentos_max         : Integer;
    nr_ano_fabricacao       : Integer;
    tp_motor                : String(50);
    qt_motor                : Integer;
    tp_pouso                : String(50);
}
entity Aeroporto {
    key id_aeroporto : UUID;        
    icao: String(4);   
    nome: String(100); 
    cidade: String(50);  
    estado: String(2);   
    pais: String(50); 

}
entity Companhia {
    key id_companhia            : UUID;
    key icao                    : String(3);
    razao_social            : String(255);
    iata                    : String(2);
    representante_legal     : String(255);
    pais_sede               : String(100);
    cnpj                    : String(14);
    endereco                : String(500);
    cidade                  : String(100);
    uf                      : String(2);
    cep                     : String(8);
    telefone                : String(50);
    email                   : String(255);
    decisao_operacional     : String(255);
    atividades_areas        : String(255);
    data_decisao_operacao   : Date;
    validade_operacional    : Date;
}
entity PropriedadeAeronave {
    key id_propriedade_aeronave : UUID;
    id_companhia : UUID;
    id_aeronave : UUID;
    proprietario : String(255);
    sg_uf : String(2);
    cpf_cnpj : String(18);
    nm_operador : String(255);
    nr_cert_matricula : Decimal(10,1);
    dt_validade_cva : Date;
    dt_validade_ca : Date;
    dt_canc : Date;
    cd_interdicao : String(2);
    ds_gravame : String;
    dt_matricula : Date;
}
entity Conexao {
    key id_conexao : UUID;
    id_aeroporto_origem : UUID;
    id_aeroporto_destino : UUID
}
entity HorarioVoo {
    key id_horario_voo : UUID;
    id_companhia : UUID;
    id_conexao : UUID;
    id_aeronave : UUID;
    nr_assentos_executivo : Integer;
    nr_assentos_economico : Integer;
    capacidade_total : Integer;
    data : Date;
    partida_prevista : DateTime;
    chegada_prevista : DateTime;
    partida_real : DateTime;
    chegada_real : DateTime;
    situacao_voo : String(50);
    situacao_partida : String(50);
    situacao_chegada : String(50);
}
entity Passageiro {
 key id_passageiro : UUID;
    cpf: String(11);
    nome: String(100);
    email: String(100);
    telefone: String(15); 
    data_de_nascimento : Date;
    endereco : String(255); 
}
entity ReservaPassagem {
    key id_reserva: UUID;
    id_passageiro: UUID;  
    id_horario_voo: UUID; 
    assento: String(10);              
    classe: String(20);                
    status: String(20);                
    data_reserva: DateTime;                  
    preco: Decimal(10,2);             
}