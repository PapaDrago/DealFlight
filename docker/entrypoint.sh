#!/bin/bash

set -e

echo "->Iniciando DealFlight..."

# Esperar a que MySQL esté disponible
until mysql -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" -e "SELECT 1" &> /dev/null; do
    echo "->Esperando a MySQL..."
    sleep 2
done

echo "->MySQL está listo"

# Verificar si ya se ejecutó el setup
if [ ! -f /var/www/html/.setup_complete ]; then
    echo "📦 Primera ejecución: instalando dependencias..."
    
    composer install --no-interaction --optimize-autoloader
    npm install --legacy-peer-deps
    
    php artisan key:generate --force
    php artisan migrate --force
    npm run build
    
    touch /var/www/html/.setup_complete
    echo "->Setup completado"
else
    echo "->Setup ya ejecutado previamente"
fi

# Iniciar el servidor
exec "$@"