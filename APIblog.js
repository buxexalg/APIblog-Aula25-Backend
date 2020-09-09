//Um post não pode existir sem um autor.
//Ao deletar um autor, é necessário verificar se ele possui um post publicado ou não.
//Ao deletar um post, ele não pode mais aparecer como resposta da requisição, mas ele ainda pode existir na lista de posts.
//Não é possível criar um post com um autor marcado como deletado, o usuário deve receber um erro de Proibido.
//Obter a lista de posts deve sempre trazer as últimas adicionadas. */

/* const post = {
    id:
    titulo:
    subtitulo:
    autor:
    publicado:
    deletado:
}

const autor = {
    id:
    primeiroNome:
    ultimoNome:
    email:
    senha:
    deletado:
} */
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");

const server = new Koa();

server.use(bodyparser());

const autores = [];
const posts = [];
let index = 0;

const criarAutor = (body) => {
    if (autores.length === 0) {
        index = 1;
    } else {
        index = autores[autores.length-1].id + 1;
    }
    const novoAutor = {
        id: index,
        primeiroNome: body.primeiroNome,
        ultimoNome: body.ultimoNome,
        email: body.email,
        senha: body.senha,
        deletado: false
    }
    //Verificar se o autor já existe
    autores.push(novoAutor);
}

const obterAutor = (id) => {
    for (item of autores) {
        if (item.id == id) {
            return item
        }
    }
}

const obterAutores = () => {
    return autores;
}

const removerAutor = (id) => {
    const autor = obterAutor(id);
    autor.deletado = true;
}

const atualizaAutor = (id, propriedade, valor) => {
    const autor = obterAutor(id)
    const index = autores.indexOf(autor);

    if (propriedade === 'primeiroNome') {
        autores[index].primeiroNome = valor;
    } else if (propriedade === 'ultimoNome') {
        autores[index].ultimoNome = valor;
    } else if (propriedade === 'email') {
        autores[index].email = valor;
    } else if (propriedade === 'senha') {
        autores[index].senha = valor;
    }
}

server.use((ctx) => {
    const method = ctx.method;
    const path = ctx.url;
    const idRequisicao = ctx.url.split('/')[2];

    if (path.includes("/autores")) {
        if (method === 'GET') {
            if (idRequisicao) {
                ctx.body = obterAutor(idRequisicao);
            } else ctx.body = obterAutores();
            //Se não encontrar?
        } else 
        if (method === 'POST') {
            criarAutor(ctx.request.body);
            //Se já existir?
        } else
        if (method === 'DELETE') {
            if (idRequisicao) {
                removerAutor(idRequisicao);
            }//E se não tiver?
        } else
        if (method === 'PUT') {
            if (idRequisicao) {
                atualizaAutor(idRequisicao, ctx.request.body.propriedade, ctx.request.body.valor);
            }//E se der errado?
        }
    }

    if (path.includes("/posts")) {
        if (method === 'GET') {

        } else 
        if (method === 'POST') {

        } else 
        if (method === 'DELETE') {

        } else 
        if (method === 'PUT') {

        }
    }
})

server.listen(8081, () => console.log("Rodando na porta 8081"))