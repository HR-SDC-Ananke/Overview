const request = require("supertest");
const app = require("../server/index");


describe("GET /products/:id/styles", () => {
  test("Styles endpoint should fetch correct styles", async () => {
    var response = await request(app).get("/products/10/styles");
    expect(response.statusCode).toBe(200);
    var response = await request(app).get("/products/-1/styles");
    expect(response.statusCode).toBe(401);
    var response = await request(app).get("/products/19/styles");
    expect(response.text.results).not.toEqual(null)
    var response = await request(app).get("/products/19/styles");
    response = JSON.parse(response.text)
    expect(response.results[0].photos).not.toEqual(null)
    var response = await request(app).get("/products/1/styles");
    response = JSON.parse(response.text)
    expect(response.results[0].name).toEqual("Forest Green & Black")
  });
});



describe("GET /products/:id", () => {
  test("produucts endpoint should fetch correct ID", async () => {
    var response = await request(app).get("/products/19");
    expect(response.body.product_id).toEqual(19);
    expect(response.statusCode).toBe(200);
    var response = await request(app).get("/products/10");
    expect(response.body.product_id).not.toEqual(19);
    expect(response.statusCode).toBe(200);
    var response = await request(app).get("/products/-1");
    expect(response.statusCode).toBe(401);
  });
});
