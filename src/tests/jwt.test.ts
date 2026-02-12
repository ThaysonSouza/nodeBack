import { verifyJWT } from "../utils/jwt"

const URL_JWT:string = "http://localhost:3000/jwt"

test("GET: /jwt = 200", async () => {
    const res = await fetch(URL_JWT)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(typeof body).toBe('string')

    const token = verifyJWT(body)
    expect(typeof token).toBe("object")
})
