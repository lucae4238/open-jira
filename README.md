  # Next.js OpenJira App

## Backend

Para correr localmente, se necesita la base de datos, la cual se crea utilizando el archivo docker-compose.yaml y ejecutando el comando:
  ```
  docker-compose up -d
  ```

  * El -d, significa __detached__ (asi no utilizamos una terminal para ello, corre internamente en docker)

MonggoDB URL local:  (para conectar desde mongo compass)

```
mongodb://localhost:27017/entriesdb
```

### Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## LLenar la base de tados con informacion de prueba

LLamar a : ```http://localhost:3000/api/seed```
