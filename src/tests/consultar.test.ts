test("GET /consultar → deve retornar 200 com quartos disponíveis", async () => {
  const params = new URLSearchParams({
    qtd: "2",
    inicio: "2026-03-20",
    fim: "2026-03-23"
  });

  // Tente essas variações uma por vez até passar
  const url = `http://localhost:3000/api/consultar?${params.toString()}`; 
  // const url = `http://localhost:3000/consultar?${params.toString()}`;
  // const url = `http://localhost:3000/quartos/consultar?${params.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  console.log("URL testada →", url);
  console.log("Status recebido →", res.status);

  expect(res.status).toBe(200);
});