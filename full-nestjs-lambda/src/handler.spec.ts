import {handler, MyHttpResponse} from './main';

describe ("Test Lambda handler", () => {
    it ("Should return successfull response", async ()=> {
        const event = {
            body: {
                firstName: "James",
                lastName: "Kirk"
            }
        };
        const response = await handler(event, null, null) as MyHttpResponse;
        expect (response.statusCode).toEqual(200);
        expect (response.body).not.toBeNull;
        const body = JSON.parse(response.body);
        expect (body.greeting).toBe("Greeing James Kirk; Live long and prosper 🖖")
    });
});