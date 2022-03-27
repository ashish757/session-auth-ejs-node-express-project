const loginForm = document.querySelector("#loginForm")
const accessSecretForm = document.querySelector("#accessSecret")
const logoutForm = document.querySelector("#logout")


loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const res = await fetch("http://localhost:8080/api/login",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await res.json()

    if (data.status) {
        console.log(data);
    } else {
        console.error(data);
    }

})

accessSecretForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const res = await fetch("http://localhost:8080/secret",
        {
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }   
        })

        const data = await res.json()

    if (data.status) {
        accessSecretForm.querySelector('p').textContent = data.msg
    } else {
        accessSecretForm.querySelector('p').textContent = data.msg
        console.error(data);
    }

})

logoutForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const res = await fetch("http://localhost:8080/logout",
        {   
            method: "DELETE",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }   
        })

        const data = await res.json()

    if (data.status) {
        console.log(data);
    } else {
        console.error(data);
    }

})
