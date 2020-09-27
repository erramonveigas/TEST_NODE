# EXPRESS-API

    Prueba técnica de desarrollo en NodeJS con typescript.

# Versión de NodeJS

    La prueba esta pensada para Node v10.20.1.

    Si existe algún problema con la versión de NodeJS se puede solventar instalando nvm-windows:
    https://github.com/coreybutler/nvm-windows/releases

    Para otras plataformas nvm:
    https://github.com/creationix/nvm
    Use nvm-windows, it's like nvm but for Windows. Download and run the https://github.com/coreybutler/nvm-windows/releases, then:

    Uso:
    - nvm install [version]        # Download and install [version]
    - nvm uninstall [version]      # Uninstall [version]
    - nvm use [version]            # Switch to use [version]
    - nvm list                     # List installed versions

# Instalación

- npm install

# Arquitectura del proyecto

    La estructura del proyecto está definida del siguiente modo:
    .
    ├── src ├── config                  # Carpeta de configuraciones
    │       │   ├── dev.json            # Fichero de configuración para entorno dev
    │       │   ├── pre.json            # Fichero de configuración para entorno pre
    │       │   └── pro.json            # Fichero de configuración para entorno pro
    │       ├── components
    │       │   ├── nombreComponente
    │       │   │   ├── *.controller.ts # Controller del componente
    │       │   │   ├── *.utils.ts      # Utilidades propias del componente
    │       │   │   └── *.models.ts     # Modelos del componente
    │       │   ├── index.controller.ts # Controller demo
    │       ├── utils                   # Librería de utilidades genéricas del proyecto
    │       │   └── ...                 # Utilidades genéricas
    │       ├── routes.ts               # Application routes
    │       ├── package.json
    │       ├── README.md
    │       └── server.ts               # Entry point
    ├── .env                            # Archivo de configuración de entorno
    ├── package.json                    # Archivo de configuración del proyecto
    ├── README.md                       # Documentación del ejercicio.
    └── tsconfig.json                   # Archivo de configuración de typescript

# Ejercicio

    FAKE BRIEFING :

    El cliente solicita un desarrollo que permita hacer mensualmente un volcado de la información recuperada de dos apis en ficheros csv para posteriormente importarla en una herramienta de dashboarding. El proceso de iportación de dicha herramienta no es capaz de parsear más de 999 filas por csv.

    Cada bloque de ficheros generado tiene que quedarse en una carpeta fija e independiente para que la herramienta de dashboarding las recupere de una ruta concreta. Al ser un proceso mensual, cada vez que se inicie el proceso se ha de vaciar la carpeta.

    Las apis al igual que el desarrollo va a estar expuestas en 3 entornos.


    ESPECIFICACIONES TÉCNICAS:

    1- Crear nueva branch del proyecto.

    2- Crear una utilidad genérica en ./src/utils que recupere de manera dinámica el json de configuración en base al entorno y que exponga sus propiedades.
       (La variable de entorno está declarada dentro del fichero .env y se puede recuperar con la propiedad global process.env.NODE_ENV)

    3- Dadas las url http://localhost:3000/?api=api1 y http://localhost:3000/?api=api2, modificar el routing y crear un componente con la estructura indicada que:
        - Recupere los datos de cada api.
        - Teniendo en cuenta la limitación de 999 líneas por fichero, almacene los datos en formato csv en sus correspondientes rutas dentro de .src/outputs/.
        - Vacíe su correspondiente carpeta al iniciar el proceso.

# Descripcion:

    Para este test he intentado usar componentes pequeños pero estructurados, mas orientado a funcionalidad que a una programación orientada a objetos ya que las funciones son muy pequeñas.

    He usado las buenas practicas que conozco, como el uso de camel case , Capitalizando las variables que son exportadas y las que no empiezan con minúsculas. Obviamente cada compañía tiene sus reglas y me adaptaría a ellas.

    En el fichero .env he incluido dos variables más como USEMOCK ya que la api que se usa en este ejercicio tiene un limite y si se usa mucho se bloquea. Lo he hecho rápido esa parte ya que ese fue mi caso, la bloquee y no pude llamarla mas. Si encontráis ese caso con poner USEMOCK a true debería funcionar. Ya se que los mocks no se hacen asi, como he dicho, a sido algo rápido
    Tambien el tamaño de los fichero, en este caso 999 pero puede cambiarse en cualquier momento.

    Se pueden añadir mas configuraciones, solo hay que tocar el archivo config y su index file para añadir configuraciones nuevas. El programa acepta n configuraciones siempre que se incluyan ahi.

    Tambien añadir que los console.logs obviamente no se haría asi en una aplicación real, habría su gestión de errores con log files y también se guardarían los logs de las transacciones realizadas. Pero aquí dado el tiempo de la prueba solo he puesto console.logs

```bash
$ npm install

$ npm run start:tsnode

$ npm run build

$ node ./build/server.js

```
