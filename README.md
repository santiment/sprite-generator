# sprite-generator

Generates image sprite from all crypto projects that can be found on [santiment](https://api.santiment.net/graphiql?variables=&query=%7B%0A%20%20allProjects%20%7B%0A%20%20%20%20slug%0A%20%20%20%20logo64Url%0A%20%20%7D%0A%7D%0A).

## Prerequisites

* node.js >= 12
* npm

## Install

    npm install

## Run

    ./cli.js

## Develop

Create `.env` file with S3 credentials:

```yaml
AWS_S3_ACCESS_KEY_ID=key
AWS_S3_SECRET_ACCESS_KEY=secret
AWS_S3_BUCKET_NAME=bucket
AWS_S3_BUCKET_REGION=region
```

Load the vars and enable debugging mode with:

    DEBUG=runner node -r dotenv/config cli.js

## Test

    npm test
