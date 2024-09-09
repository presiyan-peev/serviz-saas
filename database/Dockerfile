# Use the official PostgreSQL image as a parent image
FROM postgres:13

# Set environment variables
ENV POSTGRES_DB=serviz_erp
ENV POSTGRES_USER=serviz_user
ENV POSTGRES_PASSWORD=your_strong_password

# Copy initialization scripts
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
