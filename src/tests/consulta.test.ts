

test("POST: /api/quartosDisponiveis = 200", async()=>{
    const resp = await fetch("http://localhost:3000/api/quartosDisponiveis",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            dataInicio:"11/02/2026",
            dataFim:"12/02/2026",
            quantidade:3
        })
    });
    expect(resp.status).toBe(200);
    const json = await resp.json()
    console.log(json)
})