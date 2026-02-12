const URL_ROOMS: string = "http://localhost:3000/api/room";

let searchParams = {
    inicio: "2024-12-20",
    fim: "2024-12-25",
    qtdPessoas: 2
};

test("POST: api/rooms/available = 200", async () => {
    const res = await fetch(URL_ROOMS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchParams)
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    console.log("Quartos disponíveis encontrados:");
    console.table(json);
    expect(Array.isArray(json)).toBe(true);
    if (json.length > 0) {
        expect(json[0]).toHaveProperty("id");
    }
});