FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY education.nginx.conf /etc/nginx/sites-available/mysite.nginx.conf


RUN mkdir /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/mysite.nginx.conf /etc/nginx/sites-enabled/

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]