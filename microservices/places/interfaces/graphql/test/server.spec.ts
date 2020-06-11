import { GraphQlExceptionFilter } from "@micro/server-graphql";
import { INestApplication } from "@nestjs/common";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../src/modules/app.module";

describe("Places GraphQL Server", () => {
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

  it("/search (GET)", async () => {
    const result = await request(server)
      .post("/graphql")
      .send({
        operationName: null,
        variables: {
          input: {
            country: "PE",
            address: "Los Olivos",
          },
        },
        query: `
        query search($input: SearchInput!) {
          search(input: $input) {
            id
            country
            description
            latLng {
              lat
              lng
            }
          }
        }
        `,
      })
      .expect(200);

    const { data } = result.body;
    const { search } = data;

    expect(Array.isArray(search)).toBeTruthy();
    expect(Object.keys(search[0])).toEqual(
      expect.arrayContaining(["country", "description", "latLng"])
    );
  });

  it("/geocode (GET)", async () => {
    const result = await request(server)
      .post("/graphql")
      .send({
        operationName: null,
        variables: {
          input: {
            lat: "-11.9448686",
            lng: "-77.05029780000001",
          },
        },
        query: `
        query geocode($input: LocationInput!) {
          geocode(input: $input) {
            id
            country
            description
            latLng {
              lat
              lng
            }
          }
        }
        `,
      })
      .expect(200);

    const { data } = result.body;
    const { geocode } = data;

    expect(Array.isArray(geocode)).toBeTruthy();
    expect(Object.keys(geocode[0])).toEqual(
      expect.arrayContaining(["country", "description", "latLng"])
    );
  });

  it("/search (GET) Iso Invalid", async () => {
    const result = await request(server)
      .post("/graphql")
      .send({
        operationName: null,
        variables: {
          input: {
            country: "xx",
            address: "Los Olivos",
          },
        },
        query: `
        query search($input: SearchInput!) {
          search(input: $input) {
            id
            country
            description
            latLng {
              lat
              lng
            }
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
    expect(extensions.code).toBe("COUNTRY_INVALID");
  });
});
