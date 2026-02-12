const URL_TASK:string = "http://localhost:3000/task"

let taskId:number = 0

let newTask = {
    name: "Limpar Quarto",
    description: "As 13:00 você deve limpar o quarto de hóspedes"
}

let updateTask = {
    name: "Limpar Cozinha",
    description: "As 16:00 você deve limpar a cozinha"
}

// GetAllTasks
test("GET: /task = 200", async () => {
    const res = await fetch(URL_TASK)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(Array.isArray(body)).toBe(true)
})

// CreateTask
test("POST: /task = 201", async () => {
    const res = await fetch(URL_TASK, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newTask)
    })
    const cont = await res.json()
    taskId = cont.id
    expect(res.status).toBe(201)
    expect(cont).toHaveProperty("id") 
    expect(cont).toHaveProperty("name", newTask['name']) 
    expect(cont).toHaveProperty("description", newTask['description']) 
})


// GetTaskById
test("GET: /task/id = 200", async () => {
    const res = await fetch(`${URL_TASK}/${taskId}`)
    expect(res.status).toBe(200)
    const cont = await res.json()
    expect(cont).toHaveProperty("name", newTask['name']) 
    expect(cont).toHaveProperty("description", newTask['description']) 
})

// UpdateTask
test("PUT: /task/id = 201", async () => {
    const res = await fetch(`${URL_TASK}/${taskId}`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(updateTask)
    })
    const cont = await res.json()
    expect(res.status).toBe(201)
    expect(cont).toHaveProperty("name", updateTask['name']) 
    expect(cont).toHaveProperty("description", updateTask['description']) 
})
 
// DeleteTask
test("DELETE: /task/id = 200", async () => {
    const res = await fetch(`${URL_TASK}/${taskId}`,{
        method: "DELETE"
    })
    expect(res.status).toBe(200)
    const cont = await res.json()
    expect(cont).toHaveProperty("id") 
    expect(cont).toHaveProperty("name") 
    expect(cont).toHaveProperty("description") 
})
