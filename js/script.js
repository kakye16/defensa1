'use strict';
dayjs.extend(dayjs_plugin_customParseFormat);
dayjs.extend(dayjs_plugin_duration);
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);
dayjs.locale('es');

// ==================================================
// PUNTO 1: EDAD EN COSAS RARAS
// ==================================================

function contarViernes13(fechaInicio, fechaFin) {
  let contador = 0;
  let mesActual = fechaInicio.startOf('month');
  const ultimoMes = fechaFin.startOf('month');

  while (
    mesActual.isBefore(ultimoMes, 'month') ||
    mesActual.isSame(ultimoMes, 'month')
  ) {
    const viernes13 = mesActual.date(13);

    if (
      viernes13.day() === 5 &&
      !viernes13.isBefore(fechaInicio, 'day') &&
      !viernes13.isAfter(fechaFin, 'day')
    ) {
      contador++;
    }

    mesActual = mesActual.add(1, 'month');
  }

  return contador;
}

function calcularEdad(fechaNacimiento) {
  const ahora = dayjs();
  const inicio = dayjs(fechaNacimiento, 'YYYY-MM-DD', true).startOf('day');

  const diasCompletos = ahora.diff(inicio, 'day');
  const horasCompletas = ahora.diff(inicio, 'hour');
  const segundosCompletos = ahora.diff(inicio, 'second');

  const diaSemana = inicio.format('dddd');
  const totalViernes13 = contarViernes13(inicio, ahora);

  return {
    diasCompletos,
    horasCompletas,
    segundosCompletos,
    diaSemana,
    totalViernes13,
    calculadoEn: ahora.format('DD/MM/YYYY HH:mm:ss')
  };
}

function mostrarEdad(datos) {
  document.getElementById('dias-edad').textContent =
    datos.diasCompletos.toLocaleString('es-ES');

  document.getElementById('horas-edad').textContent =
    datos.horasCompletas.toLocaleString('es-ES');

  document.getElementById('segundos-edad').textContent =
    datos.segundosCompletos.toLocaleString('es-ES');

  const diaCapitalizado =
    datos.diaSemana.charAt(0).toUpperCase() +
    datos.diaSemana.slice(1);

  document.getElementById('dia-semana').textContent =
    diaCapitalizado;

  document.getElementById('viernes').textContent =
    datos.totalViernes13.toLocaleString('es-ES');

  document.getElementById('instante-calculo').textContent =
    `Cálculo realizado el ${datos.calculadoEn}`;

  document.getElementById('error-edad').textContent = '';
  document.getElementById('resultado-edad').hidden = false;
}

function procesarFormularioEdad(event) {
  event.preventDefault();

  const inputFecha = document.getElementById('nacimiento').value;
  const errorEl = document.getElementById('error-edad');
  const resultadoEl = document.getElementById('resultado-edad');

  errorEl.textContent = '';
  resultadoEl.hidden = true;

  if (!inputFecha) {
    errorEl.textContent =
      'Por favor, selecciona una fecha de nacimiento.';
    return;
  }

  const fechaNac = dayjs(inputFecha, 'YYYY-MM-DD', true);

  if (!fechaNac.isValid()) {
    errorEl.textContent =
      'La fecha introducida no es válida.';
    return;
  }

  if (fechaNac.isAfter(dayjs(), 'day')) {
    errorEl.textContent =
      'La fecha de nacimiento no puede ser futura.';
    return;
  }

  const resultado = calcularEdad(inputFecha);
  mostrarEdad(resultado);
}

// ==================================================
// PUNTO 2: CUENTA ATRÁS
// ==================================================

let fechaDestino;
function inicializarCuentaAtras() {
  const ahora = dayjs();
  let anioDestino = ahora.year();

  fechaDestino = dayjs(
    `${anioDestino}-01-01T00:00:00`
  );

  if (!ahora.isBefore(fechaDestino)) {
    anioDestino++;
    fechaDestino = dayjs(
      `${anioDestino}-01-01T00:00:00`
    );
  }

  document.getElementById('fecha-evento').textContent =
    `Fecha objetivo: 1 de enero de ${anioDestino} a las 00:00`;

  document.getElementById('estado-evento').textContent = '';
}

function actualizarCuentaAtras() {
  const elementoContador = document.getElementById('contador');
  const elementoEstado = document.getElementById('estado-evento');

  const ahora = dayjs();
  const diferenciaMs = fechaDestino.diff(ahora);

  if (diferenciaMs <= 0) {
    elementoContador.textContent = '';
    elementoEstado.textContent = '¡El evento ha llegado!';
    return;
  }

  const duracion = dayjs.duration(diferenciaMs);

  const dias = Math.floor(duracion.asDays());
  const horas = duracion.hours();
  const minutos = duracion.minutes();
  const segundos = duracion.seconds();

  elementoContador.textContent =
    `Faltan ${dias} días, ${horas} horas, ` +
    `${minutos} minutos y ${segundos} segundos para Año Nuevo.`;

  elementoEstado.textContent = '';
}

// ==================================================
// PUNTO 3: ZONAS HORARIAS
// ==================================================
function actualizarZonasHorarias() {
  const ahora = dayjs();
  const formato = 'DD/MM/YYYY HH:mm:ss';

  document.getElementById('hora-local').textContent =
    ahora.format(formato);

  document.getElementById('hora-tokio').textContent =
    ahora.tz('Asia/Tokyo').format(formato);

  document.getElementById('hora-nueva-york').textContent =
    ahora.tz('America/New_York').format(formato);

  document.getElementById('hora-sidney').textContent =
    ahora.tz('Australia/Sydney').format(formato);
}

// ==================================================
// INICIALIZACIÓN Y ACTUALIZACIÓN COMÚN
// ==================================================

function inicializarComun() {
  const form = document.getElementById('form-edad');

  if (form) {
    form.addEventListener('submit', procesarFormularioEdad);
  }

  inicializarCuentaAtras();
  actualizarComun();

  setInterval(actualizarComun, 1000);
}


function actualizarComun() {
  actualizarCuentaAtras();
  actualizarZonasHorarias();
}

inicializarComun();

