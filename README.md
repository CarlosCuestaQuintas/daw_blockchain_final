# Ejemplo de ERC721 y despliegue de contrato

Este proyecto incluye un contrato que implementa ERC721 y AccessControl.

Incluye dos roles (admin y minter) que nos permiten controlar qué usuarios ejecutan qué funciones.

Además implementa todas las funciones necesarias para acuñar un nuevo NFT, para poner un NFT a la venta, para retirarlo de la venta, para comprarlo y para quemarlo, además de para buscar información de URI y de precio. También hay dos funciones que nos permite otorgar y retirar el rol de acuñador.

También se incluye otro contrato más sencillo con el que podemos comprobar el despliegue con ignition.

## Configuración del entorno

Para preparar el entorno tenemos que ejecutar el comando:
```shell
npm install
```

## Despliegue del contrato

Si queremos desplegar el contrato en una red de pruebas debemos ejecutar el comando:
```shell
npx hardhat node
```
Desplegamos nuestro contrato, tanto si hemos decidido desplegar una red de prueba como si no, con el siguiente comando:
```shell
npx hardhat ignition deploy ./ignition/modules/desplegar.js
```