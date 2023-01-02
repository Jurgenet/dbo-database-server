# dbo-database-server (Juno)

> Mongodb/Node/Express

##### setup

```
cp docker-compose.example.yml docker-compose.yml
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
