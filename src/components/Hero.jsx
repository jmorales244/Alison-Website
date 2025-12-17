import heroImg from "../assets/images/hero/your_artist_2.jpg";
import heroWorkStationImg from "../assets/images/services/Salon_Shot.jpg";

function Hero({ whatsappLink }) {
  return (
    <section
      className="hero"
      id="home"
      style={{     
        "--hero-panel-bg": `url(${heroWorkStationImg})`,
      }}
    >
      <div className="hero-content">
        <h1 className="title-font">
          Maquillaje y peinado profesional para tus momentos más especiales.
        </h1>

        <p>
          Maquillaje social, novias, XV años, sesiones de fotos y más.
          Resaltamos tu belleza sin perder tu esencia.
        </p>

        <div className="hero-actions">
          <a href="#services" className="btn btn-primary">
            Ver servicios
          </a>
          <a
            href={whatsappLink}
            className="btn btn-outline"
            target="_blank"
            rel="noreferrer"
          >
            Agendar por WhatsApp
          </a>
        </div>
      </div>
      
      {/* keep the artist image */}
      <div className="hero-image">
        <img
          src={heroImg}
          alt="Maquilladora Profesional"
          className="hero-photo"
        />
      </div>      

    </section>
  );
}

export default Hero;
