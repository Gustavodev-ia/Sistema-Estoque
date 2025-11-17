const API = "http://localhost:3000";

// LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("input[type='text']").value;
        const senha = document.querySelector("input[type='password']").value;

        try {
            const response = await fetch(`${API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login realizado!");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    });
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(`${API}/logout`, {
                method: "POST",
                credentials: "include"
            });
            const data = await response.json();
            if (data.message) {
                window.location.href = "index.html";
            }
        } catch (error) {
            console.log(error);
        }
    });
}
