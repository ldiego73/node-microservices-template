import { HttpExceptionFilter } from "@micro/server";
import { INestApplication } from "@nestjs/common";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../src/modules/app.module";

describe("Place Rest Server", () => {
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

  it("/search (GET)", async () => {
    const country = "PE";
    const address = "Los Olivos";
    const result = await request(server)
      .get(`/search?country=${country}&address=${address}`)
      .expect(200);

    const addresses = result.body;

    expect(Array.isArray(addresses)).toBeTruthy();
    expect(Object.keys(addresses[0])).toEqual(
      expect.arrayContaining(["id", "country", "description", "latLng"])
    );
  });

  it("/geocode (GET)", async () => {
    const lat = "-11.9448686";
    const lng = "-77.05029780000001";
    const result = await request(server)
      .get(`/geocode?lat=${lat}&lng=${lng}`)
      .expect(200);

    const addresses = result.body;

    expect(Array.isArray(addresses)).toBeTruthy();
    expect(Object.keys(addresses[0])).toEqual(
      expect.arrayContaining(["id", "country", "description", "latLng"])
    );
  });

  it("/search (GET) Iso Invalid", async () => {
    const country = "pe";
    const address = "Los Olivos";
    const result = await request(server)
      .get(`/search?country=${country}&address=${address}`)
      .expect(400);

    const { status, code } = result.body;

    expect(status).toBe(400);
    expect(code).toBe("COUNTRY_INVALID");
  });
});
