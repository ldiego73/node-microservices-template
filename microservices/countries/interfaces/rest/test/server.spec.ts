import { HttpExceptionFilter } from "@micro/server";
import { INestApplication } from "@nestjs/common";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../src/modules/app.module";

describe("Country Rest Server", () => {
  let server: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.useGlobalFilters(new HttpExceptionFilter());
    server = app.getHttpServer();

    await app.init();

    app.getHttpAdapter().getInstance().ready();
  });

  it("/ (GET)", async () => {
    const result = await request(server).get("/").expect(200);

    const countries = result.body;

    expect(Array.isArray(countries)).toBeTruthy();
    expect(Object.keys(countries[0])).toEqual(
      expect.arrayContaining(["name", "iso", "currency", "status"])
    );
  });

  it("/:iso (GET)", async () => {
    const iso = "PE";
    const result = await request(server).get(`/${iso}`).expect(200);

    const country = result.body;

    expect(Object.keys(country)).toEqual(
      expect.arrayContaining(["name", "iso"])
    );
    expect(country.iso).toBe(iso);
  });

  it("/:iso (GET) Iso Invalid", async () => {
    const iso = "as";
    const result = await request(server).get(`/${iso}`).expect(400);

    const { status, code } = result.body;

    expect(status).toBe(400);
    expect(code).toBe("ISO_INVALID");
  });

  it("/:iso (GET) Not Found", async () => {
    const iso = "XY";
    const result = await request(server).get(`/${iso}`).expect(404);

    const { status, code } = result.body;

    expect(status).toBe(404);
    expect(code).toBe("COUNTRY_NOT_FOUND");
  });
});
