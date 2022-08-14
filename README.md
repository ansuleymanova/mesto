# Проект: Место

![Внешний вид приложения](./src/images/readme.png?raw=true "Внешний вид приложения")

### Обзор

Mesto - это блог путешественника с возможностью настраивать
аватар, юзернейм и био пользователя, добавлять или удалять
свои посты и лайкать посты других пользователей.
В этом репозитории находится Vanilla-JS версия проекта. На
React-версию можно посмотреть [здесь](https://github.com/ansuleymanova/mesto-react), а на React-версию с
возможностью регистрации и авторизации [тут](https://github.com/ansuleymanova/react-mesto-auth).

### Технологии

Проект написан на VanillaJS без применения фреймворков 
и организован по БЭМ. Mesto имеет гибкую организацию модулей:
независимые классы связываются между собой только
в корневой точке сборки проекта. В проекте настроена сборка с помощью Webpack, включающая транспиляцию и минификацию.

### Сборка

Для сборки проекта нужно установить [Node.js и npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
и необходимые модули: выполните ```npm install``` из корневой папки проекта.
Запустить сборку проекта можно командой ```npm run build```, после чего минифицированный и транспилированный
проект будет собран в папке ```dist```, а посмотреть на него можно, открыв файл ```index.html``` из этой папки
в любом браузере.

Посмотреть на блог на Github Pages можно [здесь](https://ansuleymanova.github.io/mesto).
