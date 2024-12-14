using sap.cap.schema as my from './Schema';
using from '../app/browse/service';

service exportPassageiro{
    @readonly entity GetPassageiro as projection on my.Passageiro;
    @updatedonly entity UpdatePassageiro as projection on my.Passageiro;
    @insertonly entity InsertPassageiro as projection on my.Passageiro;
    @deleteonly entity DeletePassageiro as projection on my.Passageiro;

    @readonly entity GetReservaPassagem as projection on my.ReservaPassagem;
    @updatedonly entity UpdateReservaPassagem as projection on my.ReservaPassagem;
    @insertonly entity InsertReservaPassagem as projection on my.ReservaPassagem;
    @deleteonly entity DeleteReservaPassagem as projection on my.ReservaPassagem;

    @readonly entity GetHorarioVoo as projection on my.HorarioVoo;
    @updatedonly entity UpdateHorarioVoo as projection on my.HorarioVoo;
    @insertonly entity InsertHorarioVoo as projection on my.HorarioVoo;
    @deleteonly entity DeleteHorarioVoo as projection on my.HorarioVoo;

    @updatedonly entity UpdateStatusHorarioVoo as projection on my.HorarioVoo;

    @readonly entity GetCompanhia as projection on my.Companhia;
    @readonly entity GetAeronave as projection on my.Aeronave;
    @readonly entity GetPropriedadeAeronave as projection on my.PropriedadeAeronave;
    @readonly entity GetAeroporto as projection on my.Aeroporto;
    @readonly entity GetConexao as projection on my.Conexao;

}

