var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function criar(idUsuario, idJogador) {

    instrucaoSql = `insert into resultadoVotacao values 
    (${idUsuario},"${idJogador}");
    `

    return database.executar(instrucaoSql);
}

function listar() {

    instrucaoSql = `

        SELECT 
                jog.nome          AS 'jogador'
            ,	sum(jog.qtdVotos) AS 'votos'
                
        FROM	resultadoVotacao AS rv

        INNER
        JOIN	usuario as usu
        on		rv.fkUsuario = usu.idUsuario

        INNER
        JOIN	jogador as jog
        on		rv.fkjogador = jog.idJogador

        GROUP
        BY		jog.nome;

    `

    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    criar,
    listar
}
