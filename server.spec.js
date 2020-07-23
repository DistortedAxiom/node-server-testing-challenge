const supertest = require("supertest");

const server = require("./server.js");

describe("server", function () {
    it("runs the tests", function () {
        expect(true).toBe(true);
    });

    describe("GET /", function() {
        it("Return status 200 OK", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200)
                })
        });

        it("Return with JSON data", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
    })

    describe("GET /:id", () => {
        it("Return status 200 OK", () => {
            return supertest(server)
              .get("/api/users/1")
              .then(res => {
                expect(res.status).toBe(200);
              });
            });

        it("Return id value and body", () => {
            return supertest(server)
                .get("/api/users/1")
                .then(res => {
                    expect(res.body = {
                        id: 1,
                        username: "test",
                        password: "test"
                    })
                })
        })
    })

    let newId = 0;

    describe("POST", () => {
        it("Return status 201 on creation and body", () => {
            return supertest(server)
                .post("/api/users")
                .send({
                    username: "NewUser",
                    password: "Password"
                })
                .then(res => {
                    newId = res.id;
                    expect(res.status).toBe(201);
                    expect(res.body = {
                        id: newId,
                        username: "NewUser",
                        password: "Password"
                    })
                })
        })
    })


    it("New user inserted successfully", () => {
        return supertest(server)
                .get(`/api/users/${newId}`)
                .then(res => {
                    expect(res.body = {
                        id: newId,
                        username: "NewUser",
                        password: "Password"
                    })
                })
    })

    describe("DELETE", () => {
        it("Deletion successful on successful deletion", () => {
            return supertest(server)
                    .delete(`/api/users/${newId}`)
                    .then(res => {
                        expect(res.body = {
                            id: newId,
                            username: "NewUser",
                            password: "Password"
                        })
                    })
        })
        it("User is no longer in database", () => {
            return supertest(server)
                    .get(`/api/users/${newId}`)
                    .then(res => {
                        expect(res.status).toBe(404)
                    })
        })
    })

})
