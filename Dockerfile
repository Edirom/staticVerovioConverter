#########################
# Dockerfile to render all MEI files in a given volume as SVG, using Verovio
#
# USE: Navigate to the folder containing the MEI files that are supposed to be
# converted. Accepts files with both .xml and .mei ending.
# Then run the following command:
# docker run --rm -it -v $(pwd):/data edirom/staticVerovioConverter:latest
#########################

FROM node:18.1.0-alpine3.15
LABEL maintainer="Johannes Kepper"

ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .

CMD [ "node", "index.js" ]
