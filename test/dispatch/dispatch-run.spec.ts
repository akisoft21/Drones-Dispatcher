import supertest from "supertest"
import { it } from "mocha";
import { expect } from "chai";
import * as faker from 'faker';
import app from "../../src/app";




const request = supertest(app);


describe("drone check", function name() {

    it.only("POST load drone", () => {

        let medication: any = [];
        for (let index = 0; index < 3; index++) {
            const data: any = {
                name: faker.name.firstName() + " " + faker.name.lastName(),
                weight: 500,
                code: faker.random.alphaNumeric(10),
                image: faker.image.abstract(),
            }
            medication.push(data)
            console.log(data);

        }
        return request.post("/api/v1/dispatch/load-drone/wdfijqnwfsdnfkjsdf").send({medications:medication}).then((res) => {
            console.log(res.body);
            expect(res.body.status).eq(true);
            //check the account details;
        })
    });
});