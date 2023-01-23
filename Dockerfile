
# Construccion en local 

FROM node:18 As development

# Creacion de la carpeta donde se guarda el proyecto


WORKDIR /usr/src/app


# Copia las dependencias y evita que se necesite utilizar el npm install denuevo

COPY --chown=node:node package*.json ./


# Comando para instalar las dependencias
RUN yarn install --frozen-lockfile


# Carpeta principal 
COPY --chown=node:node . .



USER node 



# Construir para produccion


FROM node:18 As build


WORKDIR /usr/src/app


COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules


COPY --chown=node:node . .

RUN node build/index.js


ENV NODE_ENV production


RUN yarn install --frozen-lockfile --only=production && yarn cache clean --force


USER node


## Produccion

FROM node:18 As production


# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist


CMD [ "yarn", "dist/main.js" ]





