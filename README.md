# dbo-database-server (Juno)

> Mongodb, Node, Express

##### setup

```
cp .env.example .env
```

##### run server

```sh
# dev docker container up
yarn docker-dev-up
# or
yarn docker-up
# prod docker container up
```

##### run server

```sh
yarn start
```

##### backup db

```sh
# backup
yarn dump

# restore db manually
DUMP=Z:\\_backups\\MyServer\\date--time\\databaseName yarn restore
```
