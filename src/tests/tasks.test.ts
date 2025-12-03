test("GET: /tasks = 200", async()=>{
    const res = await fetch("http://localhost:3000/task/")
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(Array.isArray(body)).toBe(true)
})
