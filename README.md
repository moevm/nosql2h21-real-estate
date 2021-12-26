# nosql2h21-real-estate

WEB: <a href="https://nahui.me/" target="_blank">real-estate</a>

> Картинок на сайте нет, циан болчит
>
> Если графики не работают, отключите блокировщик рекламы(рекламы там нет)

## Screencast
stage 1: https://drive.google.com/drive/folders/1K7iJmywjCsTB6ucvJoBitbTb58f5psz7?usp=sharing

> with docker

### Dev (скорее всего не работает)

1. build

```
yarn docker:dev:build
```

2. run

```
yarn docker:dev:start
```
### Stage

1. build

```
yarn docker:stage:build
```

2. run

```
yarn docker:stage:start
```

#### Web app
port: ```80```
#### MongoDB
port: ```27018```


## Другое
в мастере лежат google карты, можно использовать yandex maps. Версия с YandexMap лежит в ветке  <a href="https://github.com/moevm/nosql2h21-real-estate/tree/feature/yandexmap" target="_blank">feature/yandexmap</a>

