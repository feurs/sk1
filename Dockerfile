# Používame oficiálny NGINX image
FROM nginx:alpine

# Kopírujeme obsah nášho app adresára do nginx servera
COPY ./app /usr/share/nginx/html

# Otvoríme port 80
EXPOSE 80

