## BUILDING
##   (from project root directory)
##   $ docker build -t node-js-6-3-0-on-ubuntu .
##
## RUNNING
##   $ docker run -p 3000:3000 node-js-6-3-0-on-ubuntu
##
## CONNECTING
##   Lookup the IP of your active docker host using:
##     $ docker-machine ip $(docker-machine active)
##   Connect to the container at DOCKER_IP:3000
##     replacing DOCKER_IP for the IP of your active docker host

FROM gcr.io/stacksmith-images/ubuntu-buildpack:14.04-r07

MAINTAINER Bitnami <containers@bitnami.com>

ENV STACKSMITH_STACK_ID="t4sqxym" \
    STACKSMITH_STACK_NAME="Node.js 6.3.0 on Ubuntu" \
    STACKSMITH_STACK_PRIVATE="1"

RUN bitnami-pkg install node-6.3.0-0 --checksum f2997c421e45beb752673a531bf475231d183c30f7f8d5ec1a5fb68d39744d5f

ENV PATH=/opt/bitnami/node/bin:/opt/bitnami/python/bin:$PATH \
    NODE_PATH=/opt/bitnami/node/lib/node_modules

# ExpressJS template
COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
