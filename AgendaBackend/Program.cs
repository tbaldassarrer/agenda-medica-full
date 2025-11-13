using AgendaBackend.Models;
using System.Linq;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");


List<Cita> citas = new List<Cita>
{
    new Cita
    {
        Id = 1,
        Fecha = "11/11/2025",
        Hora = "08:45",
        Codigo = "5716",
        Paciente = "FONTES RAMIREZ MARIA JESÚS",
        Observaciones = "derivar a enfermería",
        Medico = "verde",
        Pendiente = false
    },
    new Cita
    {
        Id = 2,
        Fecha = "13/12/2025",
        Hora = "09:00",
        Codigo = "6075",
        Paciente = "HERNÁNDEZ MOYA ANA",
        Observaciones = "cita telefónica",
        Medico = "verde",
        Pendiente = false
    },
    new Cita
    {
        Id = 3,
        Fecha = "23/01/2026",
        Hora = "09:15",
        Codigo = "6210",
        Paciente = "RODRÍGUEZ SOCORRO PAULA",
        Observaciones = "llamar antes para confirmar",
        Medico = "azul",
        Pendiente = false
    },
    new Cita
    {
        Id = 4,
        Fecha = "11/12/2025",
        Hora = "09:30",
        Codigo = "7055",
        Paciente = "MORAN RIVERO CRISTINA",
        Observaciones = "3 semanas de radio",
        Medico = "rojo",
        Pendiente = false
    }
    
};


app.MapGet("/api/citas", (string? medico, bool? soloPendientes) =>
{
    IEnumerable<Cita> resultado = citas;

    if (!string.IsNullOrEmpty(medico) && medico != "todos")
    {
        resultado = resultado.Where(c => c.Medico == medico);
    }

    if (soloPendientes == true)
    {
        resultado = resultado.Where(c => c.Pendiente);
    }

    return Results.Ok(resultado);
});

app.Run();
