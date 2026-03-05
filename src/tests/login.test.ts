const url_base:string = "https://node-back-rose.vercel.app/api/login";
 
// test("POST / login = 200", async () => {
//     const res = await fetch(url_base, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             email: "joao.silva@email.cm",
//             senha: "senha123"}
//         )
//     });
//     console.log(res);
//     const json = await res.json()
//     console.log(json);
//     expect(res.status).toBe(200);
// });


// test("POST / login(sem senha) = 400", async () => {
//     const res = await fetch(url_base, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             email: "joao.silva@email.cm",
//             senha: ""}
//         )
//     });
//     expect(res.status).toBe(400);
// });


test("POST / create = 200", async () => {
    const res = await fetch(url_base + "/cadastro" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: "Jeff",
            email: "jeff@email.com",
            senha: "senha123",
            telefone: "154004-8922",
            cpf:"123456789-01"
        })
    });
    console.log(res);
    const token = await res.json();
    console.log(token);
    expect(res.status).toBe(200);

    // console.log(token)
});