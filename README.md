# modern-draft
A minimal online custom draft application

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Clone

* In your terminal, type in ```cd /your/desired/path``` to enter the directory you would like to clone the repository
* Then run ```git clone https://github.com/stephenalonzo/modern-draft.git```

Voila! You have successfully cloned this project.

### Prerequisites

The things you need before installing the software.

* Composer
* Node.js (npm) version: 20.x
* PHP version: 8.x
* Laravel version: Master
* MySQL version：8.0.x / MariaDB version：10.3.x

### Installation

A step by step guide that will tell you how to get the development environment up and running.

```
copy .env.example .env
composer install
php artisan key:generate
php artisan migrate:fresh –seed
npm install
npm run build
```

## Usage

Development

```
php artisan serve
npm run dev
```

Clear & Cache

```optimize``` will cache & clear config and route files

```
php artisan optimize:clear
```

I utilized SQLite for this project because it does not require a client-server database engine. The server-less, self-contained database approach for this project was much more appropriate. However, if you want to use MySQL, below are the .env variables.

```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=modern-draft
DB_USERNAME=root
DB_PASSWORD=
```
