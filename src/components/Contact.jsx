function Contact({ whatsappLink }) {
  return (
    <section className="section" id="contact">
      <h2>Contacto</h2>
      <p className="section-subtitle">
        Comparte aquí sus datos básicos para que el cliente sepa cómo
        encontrarla.
      </p>

      <div className="contact-grid">
        <div>
          <h3>WhatsApp</h3>
          <p>
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              Enviar mensaje
            </a>
          </p>
        </div>
        <div>
          <h3>Instagram / Facebook</h3>
          <p>@allisonnmakeup</p>
          <p>/allissondom</p>
        </div>
        <div>
          <h3>Ubicación</h3>
          <p>Tehuacán, Puebla (o la ciudad donde esté)</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
