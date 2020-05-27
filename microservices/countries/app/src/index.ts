/* eslint-disable @typescript-eslint/no-unused-vars */

import { MicroApplication } from '@micro/kernel';
import { CountryConsoleApplication } from '@micro/countries-console';
import { CountryGraphqlApplication } from '@micro/countries-graphql';
import { CountryRestApplication } from '@micro/countries-rest';

const app: MicroApplication = new CountryConsoleApplication();

app.start();
