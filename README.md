# DealFlight ✈️

Buscador de vuelos inteligente con integración a Amadeus API. Encuentra los mejores vuelos al mejor precio.

## Instalación Rápida

### Requisitos

-   Docker & Docker Compose
-   Credenciales de [Amadeus Self-Service](https://developers.amadeus.com/register) (gratis)

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/PapaDrago/DealFlight.git
cd DealFlight
```

2. **Configurar variables de entorno**

```bash
cp .env.example .env
```

3. **Agregar credenciales de Amadeus en `.env`**

```env
AMADEUS_API_KEY=tu_client_id_aqui
AMADEUS_API_SECRET=tu_client_secret_aqui
AMADEUS_API_URL=https://test.api.amadeus.com/v2
AMADEUS_TOKEN_URL=https://test.api.amadeus.com/v1/security/oauth2/token
```

> Obtén tus credenciales en: https://developers.amadeus.com/my-apps

4. **Levantar contenedores**

```bash
docker compose up
```

El `entrypoint.sh` se encargará automáticamente de:

-   ✅ Instalar dependencias PHP (composer)
-   ✅ Instalar dependencias Node (npm)
-   ✅ Generar clave de aplicación
-   ✅ Ejecutar migraciones
-   ✅ Compilar assets (Vite)
-   ✅ Iniciar servidor de desarrollo

5. **Acceder a la aplicación**

Abre tu navegador en: **http://localhost**

## Comandos útiles

```bash
# Ver logs
docker compose logs -f laravel.test

# Entrar al contenedor
docker compose exec laravel.test bash

# Reiniciar contenedores
docker compose restart

# Detener todo
docker compose down

# Limpiar todo (volúmenes incluidos)
docker compose down -v
```

## Stack Tecnológico

### Backend

-   Laravel 11
-   PHP 8.4
-   MySQL 8.0
-   Amadeus Flight API

### Frontend

-   React 18
-   TypeScript
-   Inertia.js
-   Material-UI (MUI)
-   Vite

### DevOps

-   Docker & Docker Compose
-   Laravel Sail (customizado)

## Estructura del Proyecto

```
DealFlight/
├── app/
│   ├── Http/Controllers/Api/
│   │   └── FlightController.php      # Controlador de búsqueda de vuelos
│   ├── Services/
│   │   └── AmadeusService.php        # Integración con Amadeus API
│   └── Http/Requests/
│       └── FlightSearchRequest.php   # Validación de búsqueda
├── resources/
│   └── js/
│       ├── Components/DealComponents/
│       │   ├── SearchForm.tsx        # Formulario de búsqueda
│       │   ├── FlightCard.tsx        # Tarjeta de vuelo
│       │   └── FlightResultsContainer.tsx
│       └── Pages/Flights/
│           └── Search.tsx            # Página principal
├── routes/
│   ├── api.php                       # Rutas API
│   └── web.php                       # Rutas web
└── docker/
    └── entrypoint.sh                 # Script de inicialización
```

## Desarrollo

### Hot Reload

Vite está configurado para detectar cambios automáticamente. Los cambios en archivos `.tsx`, `.ts` y `.css` se reflejarán inmediatamente en el navegador.

### API Endpoints

-   `POST /api/flights/search` - Buscar vuelos

### Logs de Laravel

```bash
docker compose exec laravel.test tail -f storage/logs/laravel.log
```

[@PapaDrago](https://github.com/PapaDrago)
