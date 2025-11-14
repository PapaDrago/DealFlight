# DealFlight - Flight Search Engine

Buscador de vuelos integrado con Amadeus API.

## Instalación Rápida

### 1. Clonar y configurar

```bash
git clone https://github.com/tu-usuario/DealFlight.git
cd DealFlight
cp .env.example .env
```

### 2. Agregar tus credenciales de Amadeus en `.env`

```env
AMADEUS_API_KEY=tu_api_key_aqui
AMADEUS_API_SECRET=tu_api_secret_aqui
```

### 3. Levantar Docker y ejecutar setup

```bash
docker-compose up -d
```

¡Listo! La app estará en http://localhost

## Detener

```bash
docker-compose down
```

## Stack

-   Laravel 11 + React 18 + TypeScript + Inertia.js
-   MySQL 8.0 + Docker
