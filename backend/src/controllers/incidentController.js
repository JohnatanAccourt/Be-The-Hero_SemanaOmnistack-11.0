const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count(); //vai pegar a quantidade de incidents 

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) // vai retornar apenas 5 registros em uma pagina
            .offset((page - 1) *5) // vai pular 5 registros por página
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.email',
                'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']); // X-Total-Count é o total de itens que temos dentro dessa lista

        return response.json(incidents);
    },
    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id) // verifica se o id é igual o id que vai ser removido
        .select('ong_id') //seleciona a tabela ong_id
        .first(); // para retornar apenas um resultado

        //se o id que vai ser removido é diferente do id do user que cadastrou esse caso ele vai cancelar a operação
        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted'});
        }

        await connection('incidents').where('id', id).delete(); // pós verificação ele vai finalmente apagar o registro
        return response.status(204).send(); //deu sucesso mas indica que a página não possui conteúdo
    }
}