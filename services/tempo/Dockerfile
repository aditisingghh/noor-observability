FROM grafana/tempo:2.3.0

RUN apk add --no-cache nginx && \
    mkdir -p /tmp/tempo/wal /tmp/tempo/blocks && \
    chmod -R 777 /tmp/tempo

COPY configs/tempo.yaml /etc/tempo.yaml
COPY services/tempo/nginx.conf /etc/nginx/nginx.conf
COPY services/tempo/start.sh /start.sh

RUN chmod +x /start.sh

EXPOSE 10000

CMD ["/start.sh"]
