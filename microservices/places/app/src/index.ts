/* eslint-disable @typescript-eslint/no-unused-vars */

import { MicroApplication } from "@micro/kernel";
import { PlaceConsoleApplication } from "@micro/places-console";
import { PlaceGraphqlApplication } from "@micro/places-graphql";
import { PlaceRestApplication } from "@micro/places-rest";

const app: MicroApplication = new PlaceRestApplication();

app.start();
