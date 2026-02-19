const URL_base = "http://localhost:3000/api/login";

test("POST: /login = 200", async () => {
  const res = await fetch(URL_base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "thayson.sousa@gmail.com",
      senha: "12345678"
    }),
  });

  const text = await res.text();  
  console.log("Status:", res.status);
  console.log("Corpo da resposta:", text);

  expect(res.status).toBe(200);
});