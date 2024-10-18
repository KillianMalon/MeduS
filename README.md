# Projet Full-Stack React & Node.js avec Express

Ce projet est une application complète incluant un **front-end** construit avec React et un **back-end** utilisant Node.js et Express. Le front-end gère l'interface utilisateur, tandis que le back-end est responsable des API et de la logique côté serveur.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
  - [1. Cloner le projet](#1-cloner-le-projet)
  - [2. Installation des dépendances](#2-installation-des-dépendances)
    - [Front-end (React)](#front-end-react)
    - [Back-end (Node.js & Express)](#back-end-nodejs--express)
  - [3. Configuration des variables d'environnement](#3-configuration-des-variables-denvironnement)
    - [Front-end](#front-end)
    - [Back-end](#back-end)
  - [4. Lancer le projet](#4-lancer-le-projet)
    - [Lancer le Back-end](#lancer-le-back-end)
    - [Lancer le Front-end](#lancer-le-front-end)
- [Scripts NPM Utiles](#scripts-npm-utiles)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
- [Technologies Utilisées](#technologies-utilisées)
  - [Front-end](#front-end-1)
  - [Back-end](#back-end-1)
- [Contribution](#contribution)
- [License](#license)

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Un compte Firebase pour Firestore (si utilisé pour le stockage des messages)
- Un compte AWS (si utilisé avec **multer-s3** pour le stockage des fichiers)

## Installation

### 1. Cloner le projet

Clonez le projet depuis GitHub :

```bash
git clone https://github.com/5hiroe/API-AROSAGE.git
cd API-AROSAGE
### 2. Installation des dépendances

#### Front-end (React)

Accédez au dossier **front-end** et installez les dépendances :

```bash
cd front-end
npm install

#### Back-end (Express et Node.js)

Accédez au dossier **back-end** et installez les dépendances :

```bash
cd back-end
npm install

### 3. Configuration des variables d'environnement

#### Front-end

Créez un fichier `.env` dans le dossier **front-end** à la racine pour y configurer les variables d'environnement nécessaires, comme l'URL de l'API du back-end.


#### Back-end

Créez un fichier `.env` dans le dossier **back-end** à la racine pour configurer les variables d'environnement comme MongoDB, Firebase, AWS, JWT, etc.

Exemple de fichier `.env` pour le back-end :

DB_URL = "mongoURL"
PORT=8082
KEY_ENCRYPTION='chaine de caractère'
JWT="JWT"
AWS_ACCESS_KEY='AKIA34AMDJLBYAB2MOZK'


### 4. Lancer le projet

#### Lancer le Back-end

Dans le dossier `back-end`, exécutez :

```bash
cd back-end
npm start

Le back-end sera démarré sur le port défini dans votre fichier .env (par défaut : 8082).

#### Lancer le Front-end
Dans le dossier front-end, exécutez :

bash
Copier le code
cd front-end
npm start

