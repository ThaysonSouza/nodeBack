const URL_LOGIN:string = "http://localhost:3000/api/client/login"

let newLogin = {
    email: "joao.silva@email.cm",
    senha: "senha123",
}

let newClient = {
    nome: "senha123",
    email: "senha@gmail.com",
    telefone: "1540028922",
}

let clientId:number = 3


test("POST: api/login = 201", async () => {
    const res = await fetch(URL_LOGIN, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newLogin)
    })
    expect(res.status).toBe(201) 
    const json = await res.json()
    console.log("Token de login: ")
    console.log(json)
}) 

test("POST: api/client = 201", async () => {
        const res = await fetch("http://localhost:3000/api/client", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newClient)
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    console.log("Token de cadastro: ")
    console.log(json)
})

test("POST: api/client/id = 201", async () => {
        const res = await fetch(`http://localhost:3000/api/client/${clientId}`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newClient)
    })
    expect(res.status).toBe(200)
})