# Todo Application

Esta aplicación de tareas (Todo) ha sido desarrollada como parte de una prueba técnica, utilizando Angular para el frontend y FastAPI para el backend.

## Características principales

- Listado de tareas con filtrado por estado
- Creación, edición y eliminación de tareas
- Diseño responsive (mobile-friendly)
- Gestión de estado con NgRx
- Formularios reactivos con validaciones personalizadas y feedback inmediato
- Uso de RxJS para programación reactiva y manejo eficiente de observables
- Backend ligero con FastAPI
- Base de datos NoSQL (MongoDB)
- Despliegue con Docker y orquestación con Docker Compose

## Arquitectura

### Frontend (Angular)

- Utiliza Angular como framework principal
- Implementa NgRx para la gestión del estado y operaciones asíncronas
- Diseño responsive para una experiencia óptima en dispositivos móviles
- Formularios reactivos para la creación y edición de tareas

### Backend (FastAPI)

- Desarrollado con FastAPI para proporcionar una API REST ligera y eficiente
- Utiliza MongoDB como base de datos NoSQL para almacenar las tareas

## Despliegue

La aplicación está configurada para ser desplegada utilizando Docker y Docker Compose.

### Requisitos previos

- Docker
- Docker Compose

### Pasos para el despliegue

1. Asegúrate de que el motor de Docker esté en ejecución en tu sistema.
2. Clona este repositorio en tu máquina local.
3. Navega hasta el directorio raíz del proyecto.
4. Ejecuta el siguiente comando para construir y levantar los contenedores:

    ```bash
    docker-compose -f .\docker-compose.yml up -d --build
    ```

5. Una vez que los contenedores estén en ejecución, podrás acceder a la aplicación a través de tu navegador web:

    ```bash
    http://localhost:4200
    ```