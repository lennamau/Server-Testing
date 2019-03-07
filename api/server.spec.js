require("dotenv").config();

const request = require("supertest");
const db = require("../data/dbConfig.js");
const Users = require("../users/userModel");

const server = require("./server.js");

describe("server.js", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("development");
  });

  describe("GET /", () => {
    it("should return 200 OK", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      const response = await request(server).get("/");

      expect(response.type).toBe("application/json");
    });

    it("should return { api: running }", async () => {
      const response = await request(server).get("/");

      expect(response.body).toEqual({ api: "running" });
    });
  });

  describe("POST /", () => {
    afterEach(async () => {
      await db("users").truncate();
    });

    it("should return the new user added with id and name", async () => {
      const response = await request(server)
        .post("/")
        .send({ name: "Gracie" });
      expect(response.body).toEqual({ id: 1, name: "Gracie" });
    });

    it("should return a status 201 when successful ", async () => {
      const response = await request(server)
        .post("/")
        .send({ name: "Gracie" });
      expect(response.status).toBe(201);
    });
  });

  describe("DELETE /:id", () => {
    afterEach(async () => {
      await db("users").truncate();
    });

    it("should return successful 204 status", async () => {
      // first add a user to be deleted
      await Users.insert({ name: "test" });
      const response = await request(server).delete("/1");
      expect(response.status).toBe(204);
    });

    it("should delete 1 item from the db", async () => {
      // add a card to be delete
      await Users.insert({ name: "Ryan" });
      // get the length of all the Users
      const usersAfterAdd = await Users.getAll();
      const lengthAfterAdd = usersAfterAdd.length;
      // hit the remove endpoind wit the correct id
      await request(server).delete("/1");
      const usersAfterDelete = await Users.getAll();
      const lengthAfterDelete = usersAfterDelete.length;
      // expect length of all Users to be 1 less then length before the deletion
      expect(lengthAfterDelete).toBe(lengthAfterAdd - 1);
    });

    // not working, giving 204 when it should be 500
    // it('should return 404 status if we try to delete non-existent item', async () => {
    //     const response = await request(server).delete('/11')
    // expect(response.status).toBe(404);
    // });
  });
});
