namespace AgendaBackend.Models
{
    public class Cita
    {
        public int Id { get; set; }
        public string Fecha { get; set; } = "";
        public string Hora { get; set; } = "";
        public string Codigo { get; set; } = "";
        public string Paciente { get; set; } = "";
        public string Observaciones { get; set; } = "";
        public string Medico { get; set; } = "";   
        public bool Pendiente { get; set; }        
    }
}
