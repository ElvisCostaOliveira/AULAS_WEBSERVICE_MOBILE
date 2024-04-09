const express = require('express'); //Importa o módulo do framework Express, que é usado para criar e gerenciar aplicativos web.
const axios = require('axios');//Importa o módulo Axios, que é uma biblioteca HTTP client para fazer requisições HTTP a servidores.
const path = require('path');//Importa o módulo Path, que fornece utilitários para lidar com caminhos de arquivos e diretórios.
const app = express();//Cria uma instância do aplicativo Express que será usado para definir rotas e configurar o servidor.
const PORT = 8080;//Define a porta em que o servidor Express irá escutar as conexões. Aqui, o servidor estará acessível em http://localhost:8080

app.use(express.static('public')); //O método express.static() é uma função middleware incorporada do Express para servir arquivos estáticos, basicamente criar a pasta public para colocar minhas paginas web.

app.get('/api/cep/:cep', async (req, res) => {//define a rota onde cep é um parâmetro 
    try {
        const { cep } = req.params; //obtém o valor CEP da rota
        const url = `https://viacep.com.br/ws/${cep}/json/`;    //Constrói a URL para fazer a requisição HTTP GET para a API ViaCEP com o CEP fornecido na rota.
        const response = await axios.get(url); //Faz uma requisição HTTP GET assíncrona usando a biblioteca Axios para a URL construída.O await espera pela conclusão da requisição e atribui o resultado à constante response.
        const data = response.data;//contém os dados JSON retornados pela API ViaCEP para o CEP solicitado.

        res.json(data); //Envia uma resposta HTTP com os dados obtidos da API ViaCEP de volta para o cliente.
    } catch (error) { //Mensagem em caso de erro
        console.error('Erro ao fazer solicitação para API CEP:', error);
        res.status(500).json({ error: 'Erro ao obter dados da API CEP' });
    }
});

app.get('/', (req, res) => { //Define uma rota HTTP GET em seu aplicativo Express para o caminho raiz ('/')
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//res.sendFile() é um método do objeto de resposta (res) do Express usado para enviar um arquivo como resposta para uma solicitação HTTP.
// path.join() é uma função do módulo path do Node.js utilizada para construir caminhos de arquivos de forma segura e compatível com diferentes sistemas operacionais.
// __dirname é uma variável global no Node.js que representa o diretório do arquivo atual (ou seja, o diretório onde o código está sendo executado).
// 'public' é o nome do diretório onde está localizado o arquivo que você deseja enviar como resposta.
// 'index.html' é o nome do arquivo HTML que será enviado como resposta para a solicitação.

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
