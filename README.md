Agenda Médica – Proyecto Full Stack

Aplicación de agenda médica desarrollada como prueba.
Incluye frontend (HTML, CSS, jQuery, Bootstrap) y backend en ASP.NET Web API.
Los datos se gestionan en memoria (sin base de datos).

**CARACTERÍSTICAS PRINCIPALES**

**FRONTEND**  (HTML, CSS, jQuery, Bootstrap)
  Interfaz limpia con Bootstrap
  Tabla con pacientes, códigos, fechas, horas y observaciones
  Filtrado por médico (colores)
  Filtrado por pendientes (P)
  Filas coloreadas automáticamente según el médico
  Modal con detalle de la cita al hacer clic en Código o Paciente
  Responsive y compatible con cualquier navegador

**BACKEND** (C# + ASP.NET)
  API REST con endpoint /api/citas
  Datos almacenados en memoria
  Respuestas JSON
  Listo para extender o conectar a base de datos futura

Estructura del proyecto
  AgendaMedicaProyecto/
│
├── AgendaBackend/        ← Backend .NET (Web API)
│     ├── Program.cs
│     ├── Controllers/
│     └── ...
│
└── agenda-medica/        ← Frontend (HTML/CSS/JS)
      ├── index.html
      ├── css/styles.css
      └── js/app.js


_Necesitas tener instalado .NET SDK (8 o 10)._
