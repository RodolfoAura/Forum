const user = document.querySelector("#usuario");
const psw = document.querySelector("#password");
const form = document.querySelector(".card")

function login(event) {
    event.preventDefault();
    let info = {
        "email": user.value,
        "senha": psw.value
    }

    fetch("http://localhost:3000/login/forum", {
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
            if (data.err === undefined) {

                if (data.token != null) {

                    localStorage.setItem("info", JSON.stringify({ "token": data.token, "username": data.username }));

                    window.location.href = "../Tela inicio/Inicio.html";

                } else {

                    alert("Usuario ou senha incorretos")

                }

            }
        })

}

form.addEventListener("submit", login)
