# Realiza

## Global Requere

- node
- yarn
- nx

## Technologies

- Nestjs (backend)
  - Mailer
  - Logger Winston
  - Doc generetor by swagger
  - Https
  - TypeOrm for database
  - Authentication with Passport
- Nextjs (frontend)
  - React
  - Storybook
  - Styled component
  - React hook form
  - React query
- Infrastructure
  - NX - Monorepo
  - Docker componse
  - Typescript
  - Jest
  - Linters
- Cypress (e2e)
  - Test end to end

## Initial settup:

```
yarn install
yarn create-certs
docker-compose up -d
yarn start:dev
```

## Lint:

```
yarn lint:fix

// or

yarn nx run-many --target=lint --all --fix

// or more specific if you want

yarn nx lint api
yarn nx lint <project name>

```

## tscheck
### run
```
yarn tscheck

or

yarn nx run-many --target=tsc --all --only-failed 
```

### configure
In a new module you have to add in `projec.json` this config
```
{
  "targets": {
    ...
    "tsc": {
      "executor": "@webpro/nx-tsc:tsc",
      "options": {
        "tsConfig": ["tsconfig.json"]
      }
    }
  }
}
```


## Grouping modules:

#### backend modules

```
  nx g @nrwl/nest:lib module
  nx g move --project module <group>/module
```

#### frontend modules

```
  nx g @nrwl/next:lib module
  nx g move --project module <group>/module
```
