const URL_LOGIN:string = "http://localhost:3000/api/login"

let newLogin = {
    email: "joao.silva@email.cm",
    senha: "senha123"
}

test("POST: /login = 201", async () => {
    const res = await fetch(URL_LOGIN, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newLogin)
    })
    expect(res.status).toBe(200);
}) 