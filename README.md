[![Build status](https://ci.appveyor.com/api/projects/status/1c9sccm2mo0y6tk5/branch/main?svg=true)](https://ci.appveyor.com/project/marinaustinovich/ahj-homeworks-workers-loading-styling-front/branch/main)

### Loading Styling

#### Легенда

Сейчас модно показывать интерфейсы загрузки вроде следующего:

![](./pic/loading.png)

#### Описание

Реализуйте подобный интерфейс, закешировав статические ресурсы и показывая этот внешний вид до момента загрузки данных.

Даже если у пользователя нет подключения, страница всё равно должна отображаться, но в режиме загрузки и после неудачной попытки соединения переходить в режим:

![](./pic/loading-2.png)

Для эмуляции задержки - [koa-slow](https://github.com/bahmutov/koa-slow).

Для кеширования - плагин Workbox.
