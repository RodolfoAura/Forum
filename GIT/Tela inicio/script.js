const cardComentario = document.querySelector(".topico")

var dadosLocal = []

var backgroundComent = document.querySelector("#backgroundComent")

var dadosUsuario = JSON.parse(localStorage.getItem("info"))

var aberto

function modal() {
    var c = document.querySelector(".modal")
    var item = document.querySelector(".topico")
    c.style.display = "flex"
    item.style.display = "none"

    fetch("http://localhost:3000/categoria")
        .then(resp => resp.json())
        .then(categorias => {

            categorias.forEach(cate => {
                document.querySelector("#categoria").innerHTML += `<option value="${cate.id_categoria}">${cate.categoria}</option>`
            })
        })

    fetch("http://localhost:3000/subcategoria")
        .then(resp => resp.json())
        .then(Subbcategorias => {

            Subbcategorias.forEach(cate => {
                document.querySelector("#subcategoria").innerHTML += `<option value="${cate.id_subc}">${cate.sub_categoria}</option>`
            })
        })


}
function modalx() {
    var c = document.querySelector(".modal")
    var item = document.querySelector(".topico")
    c.style.display = "none"
    item.style.display = "flex"
}

function carregarComentarios() {

    document.querySelector("#usuario").innerHTML = dadosUsuario.username

    fetch("http://localhost:3000/publicacoes")
        .then(resp => resp.json())
        .then(comentarios => {

            dadosLocal = comentarios

            comentarios.forEach(comentario => {

                let card = cardComentario.cloneNode(true)
                card.classList.remove("model")

                card.querySelector(".nome").innerHTML = comentario.username
                card.querySelector(".conteudo").innerHTML = comentario.conteudo

                card.querySelector(".categoria").innerHTML = comentario.categoria

                card.querySelector(".subcategoria").innerHTML = comentario.sub_categoria

                card.querySelector(".data").innerHTML = comentario.data

                card.id = comentario.id_pub

                document.querySelector(".content").appendChild(card)
            })
        })

}

function carregarRespostas(id) {
    id = id.parentNode.parentNode.parentNode
    console.log(id)
    dadosLocal.forEach((dado) => {
        if (dado.id_pub == id.id) {
            aberto = dado          
        }
    })

    if(aberto != null){
        const options = { method: 'GET' };
            fetch(`http://localhost:3000/coment/${id.id}`, options)
                .then(response => response.json())
                .then(response => {
                    response.forEach((resp) => {

                        let respp = document.querySelector("#resp").cloneNode(true)
                        respp.querySelector("#user").innerHTML = resp.id_usuario_comentario
                        respp.querySelector("#resposta").innerHTML = resp.comentario
                        if (response == null) {
                            respp.querySelector("#user").innerHTML = "sem comentarios amigão"
                            respp.querySelector("#resposta").innerHTML = ""
                        }

                        document.querySelector("#Coment").appendChild(respp)
                        
                    })

                })
                .catch(err => console.error(err));

    }

    backgroundComent.classList.remove("model")
}

function fecharComentarios() {
    let respp = document.querySelector("#resp").cloneNode(true)
    document.querySelector("#Coment").innerHTML = ""
    document.querySelector("#Coment").appendChild(respp)
    backgroundComent.classList.add("model")
}

function cadastrarComentarios() {

    let categoria = document.querySelector("#categoria").value
    let Subcategoria = document.querySelector("#subcategoria").value
    let conteudo = document.querySelector("#conteudo").value

    const date = new Date();

    let dado = {
        "data": date.toLocaleDateString(),
        "conteudo": conteudo,
        "id_categoria": parseInt(categoria),
        "id_subc": parseInt(Subcategoria),
        "curtida": 0
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: dadosUsuario.token
        },
        body: JSON.stringify(dado)
    };

    fetch('http://localhost:3000/publi', options)
        .then(response => response.json())
        .then(dado => {
            console.log(dado)
        })
}

var comentariozinho = document.querySelector("#comentariozinho")

comentariozinho.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: dadosUsuario.token },
            body: `{"id_pub":${aberto.id_pub},"comentario":"${comentariozinho.value}","curtida":1}`
        };

        fetch('http://localhost:3000/coment', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                console.log(aberto)
            })
            .catch(err => console.error(err));
    }
});