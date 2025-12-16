function Services() {
  return (
    <section className="section" id="services">
      <h2>Servicios</h2>
      <p className="section-subtitle">
        Estos son algunos de los servicios más solicitados. Podremos ajustar
        nombres, precios y descripciones después.
      </p>

      <div className="cards-grid">
        <div className="card">
          <h3>Maquillaje social</h3>
          <p>
            Perfecto para eventos, cenas, invitadas a boda, graduaciones y más.
          </p>
          <p className="card-price">Desde $600 MXN</p>
        </div>
        <div className="card">
          <h3>Maquillaje para novia</h3>
          <p>
            Incluye prueba de maquillaje y retoque el día del evento (a definir
            con ella).
          </p>
          <p className="card-price">Desde $1,500 MXN</p>
        </div>
        <div className="card">
          <h3>Peinado para evento</h3>
          <p>
            Recogidos, ondas, trenzas y estilos personalizados según tu cabello.
          </p>
          <p className="card-price">Desde $500 MXN</p>
        </div>
        <div className="card">
          <h3>Paquete XV años</h3>
          <p>
            Maquillaje + peinado para quinceañera. Se puede agregar a mamá y
            damas.
          </p>
          <p className="card-price">Paquetes personalizados</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
