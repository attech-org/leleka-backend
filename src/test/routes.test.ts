import mongoose from "mongoose";
import request from "supertest";

import { app, server } from "../index";
import * as _routesData from "./routes.test.json";

interface Route {
  name: string;
  postData?: Record<string, unknown>;
  putData?: Record<string, unknown>;
  hasDelete: boolean;
  hasGetAll: boolean;
  hasGetById: boolean;
  hasCreate: boolean;
  hasUpdate: boolean;
}

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(jest.fn());
});

const routes: (Route & {
  createdId?: string;
})[] = _routesData.data;

let refreshToken: string;
let accessToken: string;
let id: string;
const register = (data: object) => {
  return request(app).post("/api/auth/register").send(data);
};

const deleteUser = (userId: string, token: string) => {
  return request(app)
    .delete("/api/users/" + userId)
    .set("Authorization", "Bearer " + token);
};
describe("Routes tests", () => {
  describe("User routes", () => {
    describe("Auth routes", () => {
      describe("Register", () => {
        it("should work", async () => {
          const res = await register({
            username: "ccc",
            password: "aaaaaaaa",
            email: "ccc@aaaaa.aaa",
            name: "aaa",
          });

          expect(res.status).toEqual(200);
        });

        it("should`nt work with less than 8 char. password", async () => {
          const res = await register({
            username: "zzz",
            password: "1234567",
            email: "zzz@aaaaa.aaa",
            name: "aaa",
          });
          if (res.status == 200) {
            await deleteUser(res.body.user._id, res.body.accessToken);
          }
          expect(res.status).toEqual(400);
        });

        it("shouldn`t work with blank username/email/name", async () => {
          const res1 = await register({
            username: "",
            password: "12345678",
            email: "zzz@aaaaa.aaa",
            name: "aaa",
          });
          const res2 = await register({
            username: "zzz",
            password: "12345678",
            email: "",
            name: "aaa",
          });
          const res3 = await register({
            username: "zzb",
            password: "12345678",
            email: "zzb@aaaaa.aaa",
            name: "",
          });
          if (res1.status == 200) {
            await deleteUser(res1.body.user._id, res1.body.accessToken);
          }
          expect(res1.status).toEqual(400);
          if (res2.status == 200) {
            await deleteUser(res2.body.user._id, res2.body.accessToken);
          }
          expect(res2.status).toEqual(400);
          if (res3.status == 200) {
            await deleteUser(res3.body.user._id, res3.body.accessToken);
          }
          expect(res3.status).toEqual(400);
        });
      });
      describe("Login", () => {
        it("should work with valid data", async () => {
          const user = await request(app)
            .post("/api/auth/login")
            .send({
              username: "ccc",
              password: "aaaaaaaa",
            })
            .expect(200);
          expect(user.body.refreshToken).not.toBeUndefined();
          expect(user.body.accessToken).not.toBeUndefined();
          expect(user.body.user._id).not.toBeUndefined();
          refreshToken = user.body.refreshToken;
          accessToken = user.body.accessToken;
          id = user.body.user._id;
        });
        it("should`nt work with invalid username", async () => {
          await request(app)
            .post("/api/auth/login")
            .send({
              username: "adsadsakdas;3123123123123231",
              password: "aaaaaaaa",
            })
            .expect(400);
        });
        it("should`nt work with invalid password", async () => {
          await request(app)
            .post("/api/auth/login")
            .send({
              username: "ccc",
              password: "ccccccccasdadadsadasdsa",
            })
            .expect(400);
        });
      });
      describe("refresh", () => {
        it("should work with valid token", async () => {
          const resp = await request(app)
            .post("/api/auth/refresh")
            .send({ refreshToken: refreshToken })
            .expect(200);
          expect(resp.body.accessToken).not.toBeUndefined();
        });
        it("shouldn`t work with invalid token", async () => {
          const resp = await request(app)
            .post("/api/auth/refresh")
            .send({ refreshToken: refreshToken + "a" });
          expect(resp.status).toEqual(400);
          expect(resp.body.error).toEqual("invalid signature");
        });
      });
    });
    describe("User rest", () => {
      it("getting all users has pagination", async () => {
        const users = await request(app)
          .get("/api/users")
          .set("Authorization", "Bearer " + accessToken)
          .expect(200);
        expect(users.body).toHaveProperty("docs");
      });

      it("getting user by id", async () => {
        const res = await request(app)
          .get("/api/users/" + id)
          .set("Authorization", "Bearer " + accessToken)
          .expect(200);
        expect(Object.keys(res.body).length).not.toEqual(0);
      });
      it("updating user", async () => {
        await request(app)
          .put("/api/users/" + id)
          .set("Authorization", "Bearer " + accessToken)
          .send({ name: "bbb" })
          .expect(200);

        const get = await request(app)
          .get("/api/users/" + id)
          .set("Authorization", "Bearer " + accessToken)
          .expect(200);
        expect(get.body.name).toEqual("bbb");
      });
      it("deleting user", async () => {
        await request(app)
          .delete("/api/users/" + id)
          .set("Authorization", "Bearer " + accessToken)
          .expect(200);

        //check if deleted
        const get = await request(app)
          .get("/api/users/" + id)
          .set("Authorization", "Bearer " + accessToken);
        expect(Object.keys(get.body).length).toEqual(0);
        //for the next routes
        const user = await request(app)
          .post("/api/auth/register")
          .send({
            username: "ccc",
            password: "aaaaaaaa",
            email: "ccc@aaaa.aaa",
            name: "aaa",
          })
          .expect(200);
        expect(user.body.refreshToken).not.toBeUndefined();
        expect(user.body.accessToken).not.toBeUndefined();
        expect(user.body.user._id).not.toBeUndefined();
        refreshToken = user.body.refreshToken;
        accessToken = user.body.accessToken;
        id = user.body.user._id;
      });
    });
  });

  for (const routeObj of routes) {
    const route = "/api/" + routeObj.name.toLowerCase() + "/";
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    describe(routeObj.name + " routes", () => {
      if (routeObj.hasCreate) {
        it("should have create one", async () => {
          const response = await request(app)
            .post(route)
            .send(routeObj.postData)
            .set("Authorization", "Bearer " + accessToken)
            .expect(201);
          routeObj.createdId = response.body._id;

          //check if created
          if (routeObj.hasGetById) {
            const get = await request(app)
              .get(route + routeObj.createdId)
              .set("Authorization", "Bearer " + accessToken)
              .expect(200);
            // eslint-disable-next-line jest/no-conditional-expect
            expect(get.body._id).not.toBeUndefined();
          } else if (routeObj.hasGetAll) {
            const get = await request(app)
              .get(route + `?query={"_id":"${routeObj.createdId}"}`)
              .set("Authorization", "Bearer " + accessToken)
              .expect(200);
            // eslint-disable-next-line jest/no-conditional-expect
            expect(get.body.docs[0]._id).not.toBeUndefined();
          }
        });
      }

      if (routeObj.hasGetAll) {
        it("should have getting all with pagination", async () => {
          const response = await request(app)
            .get(route)
            .set("Authorization", "Bearer " + accessToken)
            .expect(200);
          expect(response.body).toHaveProperty("docs");
        });
      }

      if (routeObj.hasGetById && routeObj.createdId) {
        it("should have get one by id", async () => {
          const response = await request(app)
            .get(route + routeObj.createdId)
            .set("Authorization", "Bearer " + accessToken)
            .expect(200);

          //check if we have saved data
          for (const key in routeObj.postData) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(response.body[key]).toEqual(routeObj.postData[key]);
          }
        });
      }

      if (routeObj.hasUpdate) {
        it("should have update one", async () => {
          if (routeObj.putData) {
            await request(app)
              .put(route + routeObj.createdId)
              .set("Authorization", "Bearer " + accessToken)
              .send(routeObj.putData)
              .expect(200);

            //checks if value`s changed
            if (routeObj.hasGetById) {
              const get = await request(app)
                .get(route + routeObj.createdId)
                .set("Authorization", "Bearer " + accessToken)
                .expect(200);
              for (const key in routeObj.putData) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(get.body[key]).toEqual(routeObj.putData[key]);
              }
            } else if (routeObj.hasGetAll) {
              const get = await request(app)
                .get(route + `?query={"_id":"${routeObj.createdId}"}`)
                .set("Authorization", "Bearer " + accessToken)
                .expect(200);
              for (const key in routeObj.putData) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(get.body[key]).toEqual(routeObj.putData[key]);
              }
            }
          }
        });
      }

      if (routeObj.hasDelete) {
        it("should have delete one", async () => {
          const res = await request(app)
            .delete(route + routeObj.createdId)
            .set("Authorization", "Bearer " + accessToken)
            .expect(200);

          //chack if deleted

          expect(res.body.deletedCount).not.toBe(0);
          if (routeObj.hasGetById) {
            const get = await request(app).get(route + routeObj.createdId);
            // eslint-disable-next-line jest/no-conditional-expect
            expect(get.body.id).toBeUndefined();
          } else if (routeObj.hasGetAll) {
            const get = await request(app).get(
              route + `?query={"_id":"${routeObj.createdId}"}`
            );
            // eslint-disable-next-line jest/no-conditional-expect
            expect(get.body.id).toBeUndefined();
          }
        });
      }
    });
  }
  describe("Likes routes", () => {
    let likeId: string;
    let tweetId: string;
    describe("Post", () => {
      it("should have create one", async () => {
        const tweet = await request(app)
          .post("/api/tweets")
          .set("Authorization", "Bearer " + accessToken)
          .send({ content: "Cool content" });

        tweetId = tweet.body._id;
        const result = await request(app)
          .post("/api/likes")
          .set("Authorization", "Bearer " + accessToken)
          .send({ tweet: tweetId });
        expect(result.status).toEqual(201);
        likeId = result.body._id;

        const get = await request(app).get("/api/likes/" + likeId);
        expect(get.body._id).toEqual(likeId);
      });
      it("should increase tweets like count after creation", async () => {
        const result = await request(app).get("/api/tweets/" + tweetId);
        expect(result.body.stats.likes).toEqual(1);
      });
    });
    it("should have getting all with pagination", async () => {
      const response = await request(app)
        .get("/api/likes")
        .set("Authorization", "Bearer " + accessToken)
        .expect(200);
      expect(response.body).toHaveProperty("docs");
    });
    it("should have delete likes(dislikes)", async () => {
      const result = await request(app)
        .post("/api/likes")
        .set("Authorization", "Bearer " + accessToken)
        .send({ tweet: tweetId });
      expect(result.status).toEqual(201);
    });
    it("should decrease tweet likes after dislike", async () => {
      const result = await request(app).get("/api/tweets/" + tweetId);
      expect(result.body.stats.likes).toEqual(0);
    });
    afterAll(async () => {
      await request(app)
        .delete("/api/tweets/" + tweetId)
        .set("Authorization", "Bearer " + accessToken);
    });
  });
  afterAll(async () => {
    await request(app)
      .delete("/api/users/" + id)
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);
    server.close();
    await mongoose.connection.close();
  });
});
