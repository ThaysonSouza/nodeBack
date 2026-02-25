
test("POST: /api/reserva = 200", async()=>{
    // realizar login
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "teste@email.com",
            senha: "senha123"}
        )
    });
    expect(res.status).toBe(200);
    const token = await res.json()

    //realizar reserva
    const resp = await fetch("http://localhost:3000/api/reserva",{
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
            pagamento: "pix",
            quartos: [
                {
                    id: 30,
                    dataInicio: "2026/02/19",
                    dataFim: "2026/02/20",
                },
                {
                    id: 29,
                    dataInicio: "2026/02/19",
                    dataFim: "2026/02/20",
                }

            ]
        })

    });
    expect(resp.status).toBe(200);
    const json = await resp.json()
    console.log(json)
})