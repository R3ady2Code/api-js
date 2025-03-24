## Установка и запуск API

Установка звисимостей

```bash
npm i
```

Запуск контейнера с БД

```bash
docker run --name postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=sample_db -p 5432:5432 -d postgres
```

Запуск приложения

```bash
npm run start:task
```
