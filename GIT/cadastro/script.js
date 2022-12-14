const nome =document.querySelector("#nmc")
const user = document.querySelector("#username");
const psw = document.querySelector("#senha");
const email= document.querySelector("#email")
const form = document.querySelector(".form");

function cadastrar(event) {
    event.preventDefault();
    let info = {
        "nome": nome.value,
        "username": user.value,
        "img": null,
        "email": email.value,
        "senha": psw.value,
    }

    fetch("http://localhost:3000/user", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(info)
        })

        .then(res => {
            return res.json()
        })

        .then(data => {
            alert(data.message)
            window.location.replace("../login/Login.html")
        })

}

 form.addEventListener("submit", cadastrar)
