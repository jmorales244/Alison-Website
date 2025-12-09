function Booking({ whatsappLink }) {
  return (
    <section className="section section-highlight" id="booking">
      <h2>Agenda tu cita</h2>
      <p className="section-subtitle">
        Envía un mensaje por WhatsApp con el servicio que buscas y la fecha
        aproximada. Ella te confirmará horario y detalles.
      </p>

      <div className="booking-box">
        <ol>
          <li>Elige el servicio que te interesa.</li>
          <li>Indica la fecha y horario aproximado.</li>
          <li>
            Confirma la dirección (a domicilio o en estudio, según lo que
            maneje).
          </li>
        </ol>
        <a
          href={whatsappLink}
          className="btn btn-primary btn-big"
          target="_blank"
          rel="noreferrer"
        >
          Agendar por WhatsApp
        </a>
      </div>
    </section>
  );
}

export default Booking;
