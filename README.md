# AWS Project: IoT Smart Factory

This is the project beginning, so this README file is being building according new commits.

---

## Overview

This project aims to showcase a smart IoT factory managed by an app built in hexagonal architecture through AWS (bringing local ways too through Docker, no cloud).

---

## Architecture

Below is a high-level overview of the architecture:

1. **Hexagonal Backend in AWS/Docker**: Ports and Adapters backend built in NestJS, through AWS or Docker, in this case using local features, for those who can have difficulty in configure AWS to run it and just want to test the project.

2. **React Frontend**: A front end built in React, and maybe a flutter soon... who knows.

> **Diagram coming soon**

---

## Why Ports and Adapters (hexagonal)?

I used it because I believe that smart factory machines must have an app that can change fastly some features like database connections, notification or message queue systems and stuff, so hexagonal provides it by only changing the adapter used for this cases. Finally, the core app aims to have just a few of feats as: auth user, manage factories, manage factory sector, their machines and their status, receiving notifications and providing analytics. It can look complex, but once we have a single one feat working, it is easy to recognize the architecture and how to add more features through it.

## Project Checklist

- [ ] **Backend:**
  - :white_check_mark: Authentication

- [ ] **Frontend:**
  - :white_check_mark: Authentication

---

## Configuration

Follow this README section of the projects.

---

## Contact

- **Maintainer**: [Your Name](mailto:carloshenpincord@gmail.com)  

If you have any questions, feel free to reach out or open an issue in this repository.
