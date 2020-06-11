import { GraphQlExceptionFilter } from "@micro/server-graphql";
import { INestApplication } from "@nestjs/common";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../src/modules/app.module";

describe("Country GraphQL Server", () => {
  let server: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.useGlobalFilters(new GraphQlExceptionFilter());
    server = app.getHttpServer();

    await app.init();

    app.getHttpAdapter().getInstance().ready();
  });

  it("/ (GET)", async () => {
    const result = await request(server)
      .post("/graphql")
      .send({
        operationName: null,
        variables: {},
        query: `
        query list {
          countries {
            iso
            name
            currency
            status
          }
        }
        `,
      })
      .expect(200);

    const { data } = result.body;
    const { countries } = data;

    expect(Array.isArray(countries)).toBeTruthy();
    expect(Object.keys(countries[0])).toEqual(
      expect.arrayContaining(["name", "iso", "currency", "status"])
    );
  });

  it("/:iso (GET)", async () => {
    const result = await request(server)
      .post("/graphql")
      .send({
        operationName: null,
        variables: {
          iso: "PE",
        },
        query: `
        query find($iso: String!) {
          country(iso: $iso) {
            iso
            name
          }
        }
        `,
      })
      .expect(200);

    const { data } = result.body;
    const { country } = data;

    expect(Object.keys(country)).toEqual(
      expect.arrayContaining(["name", "iso"])
    );
  });

  it("/:iso (GET) Iso Invalid", async () => {
    const result = await request(server)
      .post("/graphql")
      .send({
        operationName: null,
        variables: {
          iso: "xxx",
        },
        query: `
        query find($iso: String!) {
          country(iso: $iso) {
            iso
            name
          }
        }
        `,
      })
      .expect(200);

    const { errors } = result.body;

    expect(Array.isArray(errors)).toBeTruthy();

    const [error] = errors;

    expect(Object.keys(error)).toEqual(
      expect.arrayContaining(["message", "extensions"])
    );

    const { extensions } = error;

    expect(extensions.status).toBe(400);
    expect(extensions.code).toBe("ISO_INVALID");
  });

  it("/:iso (GET) Not Found", async () => {
    const result = await request(server)
      .post("/graphql")
      .send({
        operationName: null,
        variables: {
          iso: "XY",
        },
        query: `
        query find($iso: String!) {
          country(iso: $iso) {
            iso
            name
          }
        }
        `,
      })
      .expect(200);

    const { errors } = result.body;

    expect(Array.isArray(errors)).toBeTruthy();

    const [error] = errors;

    expect(Object.keys(error)).toEqual(
      expect.arrayContaining(["message", "extensions"])
    );

    const { extensions } = error;

    expect(extensions.status).toBe(404);
    expect(extensions.code).toBe("COUNTRY_NOT_FOUND");
  });
});
