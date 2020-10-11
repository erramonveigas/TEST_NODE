branch FGG/consumo_rest_externo,  tarea : llamar a las URL de mocks data https//mocks.data desde la apl servidor y grabarlos en un fichero JSON



ESTRUCTURA PROYECTO: TestNode Francisco Guzman 

src

-- Componentes nuevos:

    - GenApiFileDashboard : COMPONENTE generacion de los ficheros DASHBOARD
    - GenApiFileDashboard.controller : CONTROLLER tratamiento de los endpoint de generacion los ficheros
    
-- mocksdata 
  ( IMPORTANTE: directorio de  log, sirve como directorio para crear ficheros temporales para trazar la ejecuccion del process 
    dataapi?.temp : fichero tempòrla con los datls recuperados del mocks.data.free-beetee.com 
    csvapi.temp fichero temporal de trasnformacion de json a cvs )
    
    -mocksapi1backup.json : fichero de backup con los datos mocks api1 por si pronlema con mocks.data.free-beetee.com 
    -mocksapi2backup.json : fichero de backup con los datos mocks api2 por si pronlema con mocks.data.free-beetee.com 
        
-- models
    - iapamocs.ts   : interface de estructura de datos de los ficheros de config
    - idataitem.ts  : interface de estrcutra de datos de mocks

-- outputs
    - donde se generar los ficheros resultados    

-- utils
     - readconfigfile : utilidad para leer los fichros de configuracion
     - rmdir          : utilidad que vacia un directorio dato   


INSTRUCIONES: 

Lanzar programa despues compilacion: node build/server.js
aparece en consola el configiracion segun la variable de entorno desde navegador o postman lanzar la generacion de los ficheros Dashboard con 
localhost:3000/?api=api1 o localhost:3000/?api=api2  

los ficheros (999 lineas maximo) se generan en el diredtorio src/outputs despues de haber vaciado este mismo
