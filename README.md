# Node Microservices Template

Node Microservices Template using Driven Design Domain (DDD), CQRS and Event Sourcing

## Architecture

Architecture diagrams

![Explicit Architecture](images/architecture-1.png)

![Concentric Layers](images/architecture-2.png)

## Project structure

This project is structured by libraries and modules

```
├── .vscode                               # VSCode configuration to settings typescript version
│   └── settings.json                    
├── libs                                  # Folder that contains the libs for the microservices
│   ├── kernel                            # Shared Kernel (@micro/kernel)
│   ├── logger                            # Centralized library for logs both node js and browsers  (@micro/logger)  
│   └── utils                             # Library for validations, extensions, etc. (@micro/utils)  
├── modules
│   ├── countries
│   │   ├── app
│   │   ├── application
│   │   │   ├── dtos
│   │   │   ├── transforms
│   │   │   └── use-cases
│   │   ├── config
│   │   ├── domain
│   │   │   └── errors
│   │   ├── infraestructure
│   │   │   ├── database
│   │   │   ├── mappers
│   │   │   └── repositories
│   │   └── interfaces
│   │   │   ├── console
│   │   │   │   ├── commands
│   │   │   │   └── app.js
│   │   │   ├── graphql
│   │   │   │   ├── mutations
│   │   │   │   ├── queries
│   │   │   │   └── server.js
│   │   │   └── rest
│   │   │   │   ├── controllers
│   │   │   │   ├── routers
│   │   │   │   └── server.js
│   ├── customers
│   │   ├── app
│   │   ├── application
│   │   │   ├── dtos
│   │   │   ├── transforms
│   │   │   ├── commands
│   │   │   ├── handlers
│   │   │   └── queries
│   │   ├── config
│   │   ├── domain
│   │   │   ├── errors
│   │   │   └── events
│   │   ├── infraestructure
│   │   │   ├── database
│   │   │   ├── mappers
│   │   │   └── repositories
│   │   └── interfaces
│   │   │   ├── console
│   │   │   │   ├── commands
│   │   │   │   └── app.js
│   │   │   ├── graphql
│   │   │   │   ├── mutations
│   │   │   │   ├── queries
│   │   │   │   └── server.js
│   │   │   └── rest
│   │   │   │   ├── controllers
│   │   │   │   ├── routers
│   │   │   │   └── server.js
│   ├── orders
│   │   ├── app
│   │   ├── application
│   │   │   ├── dtos
│   │   │   ├── transforms
│   │   │   ├── commands
│   │   │   ├── handlers
│   │   │   └── queries
│   │   ├── config
│   │   ├── domain
│   │   │   ├── errors
│   │   │   └── events
│   │   ├── infraestructure
│   │   │   ├── database
│   │   │   ├── mappers
│   │   │   └── repositories
│   │   └── interfaces
│   │   │   ├── console
│   │   │   │   ├── commands
│   │   │   │   └── app.js
│   │   │   ├── graphql
│   │   │   │   ├── mutations
│   │   │   │   ├── queries
│   │   │   │   └── server.js
│   │   │   └── rest
│   │   │   │   ├── controllers
│   │   │   │   ├── routers
│   │   │   │   └── server.js
│   ├── pokemon
│   │   ├── app
│   │   ├── application
│   │   │   ├── dtos
│   │   │   ├── transforms
│   │   │   └── use-cases
│   │   ├── config
│   │   ├── domain
│   │   │   └── errors
│   │   ├── infraestructure
│   │   │   ├── database
│   │   │   ├── mappers
│   │   │   └── repositories
│   │   └── interfaces
│   │   │   ├── console
│   │   │   │   ├── commands
│   │   │   │   └── app.js
│   │   │   ├── graphql
│   │   │   │   ├── mutations
│   │   │   │   ├── queries
│   │   │   │   └── server.js
│   │   │   └── rest
│   │   │   │   ├── controllers
│   │   │   │   ├── routers
│   │   │   │   └── server.js
│   └── products
│   │   ├── app
│   │   ├── application
│   │   │   ├── dtos
│   │   │   ├── transforms
│   │   │   ├── commands
│   │   │   ├── handlers
│   │   │   └── queries
│   │   ├── config
│   │   ├── domain
│   │   │   ├── errors
│   │   │   └── events
│   │   ├── infraestructure
│   │   │   ├── database
│   │   │   ├── mappers
│   │   │   └── repositories
│   │   └── interfaces
│   │   │   ├── console
│   │   │   │   ├── commands
│   │   │   │   └── app.js
│   │   │   ├── graphql
│   │   │   │   ├── mutations
│   │   │   │   ├── queries
│   │   │   │   └── server.js
│   │   │   └── rest
│   │   │   │   ├── controllers
│   │   │   │   ├── routers
│   │   │   │   └── server.js
└── README.md