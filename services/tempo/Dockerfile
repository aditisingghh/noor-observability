FROM grafana/tempo:2.3.0

RUN apk add --no-cache nginx dos2unix && \
    mkdir -p /tmp/tempo/wal /tmp/tempo/blocks && \
    chmod -R 777 /tmp/tempo

COPY configs/tempo.yaml /etc/tempo.yaml
COPY services/tempo/nginx.conf /etc/nginx/nginx.conf
COPY services/tempo/start.sh /start.sh

RUN dos2unix /etc/tempo.yaml /etc/nginx/nginx.conf /start.sh && \
    chmod +x /start.sh

EXPOSE 10000

CMD ["/start.sh"]
