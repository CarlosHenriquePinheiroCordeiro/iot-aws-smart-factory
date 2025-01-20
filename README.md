# AWS Project: IoT Smart Factory

This is the project beginning, so this README file is being building according new commits.

---

## Overview

This project aims to showcase a smart IoT factory managed by an app built in hexagonal architecture using AWS.

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

Keep track of development progress or planned tasks with this checklist:

- [ ] **AWS Cognito Authentication**  
  - Provision authentication with AWS Cognito

---

## Configuration

Adjust your environment variables and AWS settings as needed. For instance, you might use a `.env` file (add it to your `.gitignore` to avoid committing secrets):

```bash
AWS_REGION=us-east-1
```

---

## Contact

- **Maintainer**: [Your Name](mailto:carloshenpincord@gmail.com)  

If you have any questions, feel free to reach out or open an issue in this repository.