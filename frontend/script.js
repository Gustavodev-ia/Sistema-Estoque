const API = "http://localhost:3000"

const registerForm = document.getElementById('register');

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    try {
        const response = await fetch(`${API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            // Limpa os campos
            registerForm.reset();

            // Exibe mensagem de sucesso
            if (mensagem) {
                mensagem.innerText = "Cadastro realizado com sucesso!";
                mensagem.style.color = "green";
            }

            // Redireciona para login após 1.5 segundos
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            if (mensagem) {
                mensagem.innerText = data.message || "Erro ao cadastrar.";
                mensagem.style.color = "red";
            }
        }
    } catch (error) {
        console.log(error);
        if (mensagem) {
            mensagem.innerText = "Erro no servidor.";
            mensagem.style.color = "red";
        }
    }
});
