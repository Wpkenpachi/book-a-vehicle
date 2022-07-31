import supertest from "supertest";
import app from "../../src/infra/http/Api";

jest.setTimeout(50000);
process.env.NODE_ENV = "development";
describe("Must test api calls", function() {
    let access_token: string;
    
    beforeAll(async () => {
        const { body: body } = await supertest(app).post("/api/authenticate")
        .send({
            username: "wesley.paulo",
            password: "4321"
        })
        .set('Accept', 'application/json')
        .expect(200);
        access_token = body.access_token;
        expect(body).toHaveProperty('access_token');
    }, 3000);

    test("Must Try List Vehicles without access_token", async function () {
        await supertest(app)
            .get('/api/vehicle')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401);
    });

    test("Must List Vehicles", async function () {
        await supertest(app)
            .get('/api/vehicle')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${access_token}`)
            .expect(200);
    });

    test("Must Try Book Vehicles without access_token", async function () {
        const { body } = await supertest(app)
            .post('/api/book/vehicle')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                plate: "BBB1111"
            })
            .expect(401);

        expect(body).toEqual({ message: "Invalid token" });
    });

    test("Must Book a Vehicle", async function () {
        const {body} = await supertest(app)
            .post('/api/book/vehicle')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${access_token}`)
            .send({
                plate: "BBB1111"
            })
            .expect(200);
        expect(body).toBeTruthy();
        await supertest(app)
            .put('/api/return/vehicle')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${access_token}`)
            .expect(200);
    });
});