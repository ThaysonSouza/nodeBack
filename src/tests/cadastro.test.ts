test("POST /cadastro → deve retornar 201 e um token JWT", async () => {
  const payload = {
    nome: "Thayson Sousa",
    cpf: "4000404040",
    email: "thayson.sousa@gmail.com",
    senha: "12345678",
    telefone: "(15) 40028922"
  };

  const res = await fetch("http://localhost:3000/api/login/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  expect(res.status).toBe(201);
});