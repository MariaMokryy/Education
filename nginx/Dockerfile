FROM node:19.6.0 as build

WORKDIR /frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend/ ./
RUN npm run build


FROM nginx:latest

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/education.nginx.conf /etc/nginx/sites-available/mysite.nginx.conf
COPY --from=build /frontend/build /usr/share/nginx/html


RUN mkdir /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/mysite.nginx.conf /etc/nginx/sites-enabled/

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]