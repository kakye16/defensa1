# El Reloj del Juicio Final

Crea una aplicación con **Day.js** y tres secciones: edad, cuenta atrás y zonas horarias.

Puedes usar el código proporcionado o hacerlo a tu manera.

## 1. Edad en cosas raras

Añade un campo de fecha de nacimiento y un botón **Calcular**. Al pulsarlo, muestra:

- Los días, horas y segundos completos desde el nacimiento, como tres totales independientes.
- El día de la semana del nacimiento, en español.
- El número de viernes 13 desde el nacimiento hasta hoy, incluyendo ambos días.

Cuenta desde las **00:00 del día de nacimiento, en hora local**, e indícalo en pantalla. Un día de duración equivale a 24 horas. Los resultados solo cambian al pulsar el botón.

Si la fecha está vacía, es inválida o futura, muestra un error y oculta los resultados anteriores.

## 2. Cuenta atrás hasta Año Nuevo

Muestra el nombre del evento, su fecha y el tiempo que falta para el **próximo 1 de enero a las 00:00, en hora local**.

- Calcula el año de destino al cargar la página.
- Usa el plugin **duration** y actualiza el contador cada segundo.
- Muestra días totales, horas de 0 a 23, minutos y segundos de 0 a 59.
- En cada actualización, calcula la diferencia entre el destino y el momento actual.
- Al llegar, muestra **«¡El evento ha llegado!»** y conserva ese estado hasta recargar, sin números negativos.

Ejemplo: «Faltan 142 días, 3 horas, 12 minutos y 8 segundos para Año Nuevo».

## 3. Zonas horarias

Usa los plugins **utc** y **timezone** para mostrar la fecha y hora actuales en:

| Lugar | Zona |
| --- | --- |
| Tu ubicación | Zona local del navegador |
| Tokio | `Asia/Tokyo` |
| Nueva York | `America/New_York` |
| Sídney | `Australia/Sydney` |

Actualiza cada segundo y muestra el formato `DD/MM/YYYY HH:mm:ss`. Usa las zonas indicadas, sin sumar o restar horas manualmente.

## Requisitos comunes

- Usa Day.js para los cálculos y activa el idioma español y los plugins necesarios.
- Separa el JavaScript en funciones e identifica el código de cada punto.
- Crea un único intervalo para actualizar la cuenta atrás y las zonas horarias.
- Muestra resultados y errores en la página.
- Utiliza un diseño sencillo, adaptable a móvil, con etiquetas para los campos.
- No necesitas guardar datos ni usar `localStorage`.

## Pruebas básicas

- Una fecha de nacimiento vacía o futura muestra un error.
- Del 01/01/2023 al 31/12/2023 hay 2 viernes 13.
- Si quedan 49 horas, el contador muestra 2 días y 1 hora.
- Para probar el final, usa temporalmente un destino a unos segundos del momento actual.
- Los relojes muestran la fecha y hora de cada zona.

## Entrega

Sube el proyecto a tu portfolio, asegurándote que está disponible tanto su ejecución en la web, como su código y comparte la url únicamente del portfolio si no lo has hecho previamente.

## Documentación

- [Instalación](https://day.js.org/docs/en/installation/browser).
- [Diferencias entre fechas](https://day.js.org/docs/en/display/difference) y [formatos](https://day.js.org/docs/en/display/format).
- [Idioma español](https://day.js.org/docs/en/i18n/loading-into-browser) y [activación de plugins](https://day.js.org/docs/en/plugin/loading-into-browser).
- [Duraciones](https://day.js.org/docs/en/durations/durations) y [zonas horarias](https://day.js.org/docs/en/plugin/timezone).

