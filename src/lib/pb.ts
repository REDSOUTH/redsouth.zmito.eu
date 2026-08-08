import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Generar un ID de dispositivo único y persistente para el Gestor de Sesiones
let deviceId = localStorage.getItem('rs_device_id');
if (!deviceId) {
  deviceId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
  localStorage.setItem('rs_device_id', deviceId);
}

// Interceptar todas las peticiones para adjuntar las cabeceras de sesión
pb.beforeSend = function (url, options) {
  options.headers = Object.assign({}, options.headers, {
    'X-Device-Id': deviceId,
    'X-App-Name': 'REDSOUTH Web',
  });
  return { url, options };
};
