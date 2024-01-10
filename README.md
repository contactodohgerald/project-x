# Project X - Checkout Management System
Project X is a SaaS software designed to help marketplace enterprises handle their checkout process. This system offers multi-user functionality, allowing different departments to access and update inventory in real-time. Roles are assigned to users, and permissions are assigned to each role to control the tasks users can perform.
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints Documentation](#api-documentation)
  - [Register User](#register-user)
  - [Login User](#login-user)
  - [Add New Account](#add-new-account)

## Installation

1. Clone the repository:
   ```bash
    git clone https://github.com/contactodohgerald/project-x.git
    cd project-x
    npm install
   
## Usage  

1. Start the project:
   ```bash
   npm run dev

## API Endpoints Documentation  

1. Register User: {{baseUrl-local}}/v1/register
    Method: POST
    Description: Register a new user account.
    Request Body:
     {
        "fullName": "Test Account",
        "email": "test@gmail.com",
        "companyName": "Troo Project X",
        "password": "password",
        "c_password": "password"
    }
3. Login User: {{baseUrl-local}}/v1/login
     Method: POST
    Description: Log in an existing user.
    Request Body:
      {
         "email":"test@gmail.com",
         "password": "password"
      }
5. Add New Account: {{baseUrl-local}}/v1/add-account
    Method: POST
    Description: Add a new account.
    Request Body:
     {
        "fullName": "Test Account",
        "email": "test@gmail.com"
     }
