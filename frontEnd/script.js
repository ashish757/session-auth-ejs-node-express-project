const loginForm = document.querySelector("#loginForm")


loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const res = await fetch("http://localhost:8080/api/login",
        {
            method: "POST",
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
