const url_base:string = "http://localhost:3000/api/login";
 
test("POST / login = 200", async () => {
    const res = await fetch(url_base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "joao.silva@email.cm",
            senha: "senha123"}
        )
    });
    expect(res.status).toBe(200);
    const json = await res.json()
    // console.log(json);
});


test("POST / login(sem senha) = 400", async () => {
    const res = await fetch(url_base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "joao.silva@email.cm",
            senha: ""}
        )
    });
    expect(res.status).toBe(400);
});


// test("POST / create = 200", async () => {
//     const res = await fetch(url_base + "/cadastro" , {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             nome: "Teste",
//             email: "teste@email.com",
//             senha: "senha123",
//             telefone: "154002-8922",
//             cpf:"123456789-00"
//         })
//     });
//     expect(res.status).toBe(200);
//     const token = await res.json();

//     // console.log(token)
// });