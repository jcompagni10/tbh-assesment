docker run \
      --name postgres \
      -e POSTGRES_PASSWORD=pass \
      -p 5432:5432 \
      -d postgres


 docker exec -ti -u postgres postgres psql
 
 create database tbh;
