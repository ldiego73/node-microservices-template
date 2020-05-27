import { MicroApplication } from '@micro/kernel';
import { CountryConsoleApplication } from '@micro/countries-console';
import { CountryGraphqlApplication } from '@micro/countries-graphql';
import { CountryRestApplication } from '@micro/countries-rest';

let app: MicroApplication = new CountryConsoleApplication();

app.start();
