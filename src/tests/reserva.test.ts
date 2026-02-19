
test("POST: /api/reserva = 200", async()=> {
       
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: "thayson.sousa@gmail.com",
          senha: "12345678"}
        )
    })
    expect(res.status).toBe(200);
    const token = await res.json()
    
    const resp = await fetch("http://localhost:3000/api/reserva", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +token
    },
    body: JSON.stringify({
        pagamento: "pix",
        quartos: [
            {id: 1,
            dataInicio: "2024-07-01",
            dataFim: "2024-07-05",
        },
        {
            id: 2,
            dataInicio: "2024-07-01",
            dataFim: "2024-07-05",
        }
    ]
})
});
  expect(resp.status).toBe(200);
  const json = await resp.json()
  console.log(json);
  
 
});
 
 