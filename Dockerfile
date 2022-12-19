FROM node:18.4.0-alpine AS builder

WORKDIR /excalidraw

ADD . .
RUN yarn

WORKDIR /excalidraw/src/packages/excalidraw

RUN yarn
RUN yarn build:umd
RUN yarn pack

FROM nginx:stable-alpine AS nginx
COPY --from=builder /excalidraw/src/packages/excalidraw/dist /usr/share/nginx/excalidraw
COPY --from=builder /excalidraw/src/packages/excalidraw/excalidraw-excalidraw-*.tgz /usr/share/nginx/excalidraw
COPY --from=builder /excalidraw/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
