# Book Manager

The Book Manager is a POC about microservices and Oauth 2 authentication.

## Table of contents

- Requirements
- Modules Description
- Installation

## Requirements

This poc requires Docker and compose.
You also need [Switch Host](https://github.com/oldj/SwitchHosts/releases) or similar tools to add the following entries in the host file:
```
127.0.0.1 book-manager-fe
127.0.0.1 keycloak
127.0.0.1 book-manager-be
127.0.0.1 book-manager-mysql
```

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

Select the realm "Book", navigate to the section "Clients", chose "book-manager-be", switch to the tab "Credentials" and regenerate secret.
After that you need to create a new user, selecting "Users" from the left menu, then "Add user", chose a username and save.
Edit the new user assigning him a password and the role "ROLE_ADMIN_BOOK_MANAGER".
Finally [Book Manager](http://book-manager-fe:4200) can be reached.
