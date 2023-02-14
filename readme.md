# Book Manager

The Book Manager is a POC about microservices and Oauth 2 authentication.

## Table of contents

- Requirements
- Modules Description
- Installation

## Requirements

This poc requires Docker and compose.

## Modules Description

- Percona mysql database
- Red Hat Keycloak 19
- Spring Boot back end
- Angular front end

## Installation

```
docker-compose -f docker-compose-env.yml up -d
```

When keycloak starts you have to login at the [administration dashboard](http://localhost:8080/auth/admin/master/console/) using default credentials.
- user: admin
- pass: changeme
Navigate to the section "Clients", chose "book-manager-be", switch to the tab "Credentials" and regenerate secret.
Finally [Book Manager](http://book-manager-fe:4200) can be reached.
- user: user1
- pass: changeme
