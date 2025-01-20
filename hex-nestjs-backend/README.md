# AWS Project: IoT Smart Factory

This is the project beginning, so this README file is being building according new commits.

---

## Overview

Backend of the project.

**Key AWS Services** used in this project include (more will be added soon):

- **AWS Cognito:** Authentication and users management.

---

## Architecture

Below is a high-level overview of the architecture:

1. **News are coming**: Architecture coming soon as new commits has come.

> **Diagram coming soon**

---

## Why Ports and Adapters (hexagonal)?

I used it because I believe that smart factory machines must have an app that can change fastly some features like database connections, notification or message queue systems and stuff, so hexagonal provides it by only changing the adapter used for this cases. Finally, the core app aims to have just a few of feats as: auth user, manage factories, manage factory sector, their machines and their status, receiving notifications and providing analytics. It can look complex, but once we have a single one feat working, it is easy to recognize the architecture and how to add more features through it.

## Features Checklist

Keep track of development progress or planned tasks with this checklist, through cloud or not, it depends how do you configure the project:

- **Authentication:**
  - [ ] **AWS Cognito Authentication**
  - [ ] Local

---

## Configuration

Adjust your environment variables and AWS settings as needed. For instance, you might use a `.env` file (add it to your `.gitignore` to avoid committing secrets):

```bash
AWS_REGION=us-east-1
AWS_COGNITO_CLIENT_ID=cognito_client_id
DB_URL=db_url
SQLDB_TYPE=db_type
SQLDB_PORT=db_port
SQLDB_NAME=db_name
SQLDB_PASS=db_pass
NOSQLDB_TYPE=db_type
NOSQLDB_PORT=db_port
NOSQLDB_NAME=db_name
NOSQLDB_PASS=db_pass
```

---

## Contact

- **Maintainer**: [Your Name](mailto:carloshenpincord@gmail.com)  

If you have any questions, feel free to reach out or open an issue in this repository.