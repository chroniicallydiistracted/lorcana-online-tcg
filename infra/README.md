# Infrastructure

Local development currently uses the single `.devcontainer/compose.yaml` definition. It creates the tool workspace and PostgreSQL, with no host database publication or cloud services. Application/deployment images, CI definitions, staging provider definitions and backup tooling belong to their foundation tasks; do not reuse the development image as a production image.
