docker container run --rm -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 --name book_vehicle postgres:latest

# docker image build . -t postgres:lastest