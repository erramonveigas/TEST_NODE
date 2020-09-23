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
