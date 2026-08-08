# REDSOUTH Studio - Guía de Estilos y Desarrollo

Este documento sirve como recordatorio y estándar de cómo deben implementarse nuevas características, páginas y componentes en el proyecto para mantener la coherencia visual y técnica que caracteriza a REDSOUTH.

## 1. Diseño y Estilos Visuales (UI/UX)
- **No inventar estilos nuevos**: Al crear nuevas páginas (ej. recuperación de contraseña), **copia siempre** la estructura, clases y fondos de las páginas existentes (como `Auth.tsx` o `Account.tsx`). 
- **Cero animaciones innecesrias**: Evita añadir librerías extra como `framer-motion` o fondos con desenfoques excesivos (`blur`) a menos que ya formen parte del componente base o se haya solicitado explícitamente.
- **Alineación al Píxel**: Presta especial atención a la alineación vertical de elementos en cuadrículas. Si un campo de texto tiene un botón a su lado en la etiqueta (Label) y otro no, asegúrate de envolver ambos Labels en un contenedor con altura estricta (ej. `<div className="flex justify-between items-center h-5">`) para que los inputs inferiores no se descuadren.
- **Contenedores y Paddings**: Confía en la clase `.container` de Tailwind para los márgenes laterales. No añadas `px-4` manuales dentro de un `.container` ya que duplica el espaciado en pantallas móviles y descuadra los elementos con el Header.

## 2. Componentes y Modales
- **Prohibido el uso de modales nativos**: NUNCA utilices `window.confirm()` o `window.alert()`. 
- **Confirmaciones**: Utiliza siempre el componente `<ConfirmDialog />` (`src/components/ui/confirm-dialog.tsx`) gestionando su estado localmente para pedir confirmaciones de acciones destructivas o importantes.
- **Avisos Globales**: Si necesitas informar a los usuarios sobre algo a nivel global (modo Beta, mantenimiento), no crees banners "hardcodeados" en el código. Añade la alerta al archivo `src/config/alerts.json` utilizando el sistema de _Global Banners_.
- **Botones de Cancelar**: Los botones para cancelar acciones dentro de un Dialog deben tener la variante `variant="ghost"` de Shadcn, sin bordes ni colores de fondo por defecto.

## 3. Internacionalización (i18n)
- **Todo debe ser traducible**: No incluyas texto puro en los componentes React. 
- **Patrón de uso**: Utiliza siempre el hook `useTranslation` y el patrón `t('ruta.clave', 'Texto por defecto')`.
- **Sincronización**: Cuando añadas una nueva clave, estás obligado a añadirla simultáneamente en `src/locales/en/translation.json` y `src/locales/es/translation.json`.

## 4. Estructura de Rutas
- Al añadir nuevas páginas (rutas) de autenticación o cuenta, actualiza siempre `src/App.tsx` envolviendo la ruta en `<GuestRoute>` o `<ProtectedRoute>` según corresponda.
- Mantén la lógica de navegación dinámica limpia, por ejemplo usando `useParams()` para detectar `/account/:tab?` en lugar de crear un archivo nuevo por cada pestaña.

> **Nota para IAs y asistentes de código**: Lee este archivo antes de proponer cambios de diseño significativos en el proyecto REDSOUTH.
