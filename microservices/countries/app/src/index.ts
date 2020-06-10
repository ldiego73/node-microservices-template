/* eslint-disable @typescript-eslint/no-unused-vars */

import { CountryConsoleApplication } from "@micro/countries-console";
import { CountryGraphqlApplication } from "@micro/countries-graphql";
import { CountryRestApplication } from "@micro/countries-rest";
import { MicroApplication } from "@micro/kernel";

const app: MicroApplication = new CountryRestApplication();

app.start();
