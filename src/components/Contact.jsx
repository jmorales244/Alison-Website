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
          <p>Tehuacán, Puebla</p>
          <div className="footer-map">
          <h4 className="footer-label">Encuéntranos aquí</h4>
          <div className="footer-map-frame">
            <iframe
              title="Mapa de ubicación Glam Studio"
              src="https://www.google.com/maps/embed?pb=!4v1765322003414!6m8!1m7!1szg7xMWCTDd_rkf8Dp7-dhQ!2m2!1d18.44794294594499!2d-97.40355282430195!3f183.05350741557936!4f-9.537481402370588!5f0.7820865974627469"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
