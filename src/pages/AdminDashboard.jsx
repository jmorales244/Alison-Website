import { useEffect, useMemo, useState } from "react";

function formatDateTime(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function StatCard({ label, value, hint }) {
  return (
    <div className="admin-card">
      <div className="admin-card-label">{label}</div>
      <div className="admin-card-value">{value}</div>
      {hint ? <div className="admin-card-hint">{hint}</div> : null}
    </div>
  );
}

function Badge({ children, tone = "neutral" }) {
  return <span className={`admin-badge admin-badge-${tone}`}>{children}</span>;
}

export default function AdminDashboard() {
  const [status, setStatus] = useState({ loading: true, ok: false, message: "", time: "" });
  const [activeTab, setActiveTab] = useState("appointments");
  const [query, setQuery] = useState("");

  // Demo data for now (we’ll replace with D1 later)
  const [appointments, setAppointments] = useState([
    {
      id: "apt_001",
      name: "Daniela Pérez",
      phone: "+52 238 123 4567",
      service: "Maquillaje social",
      dateTime: "2025-12-20T18:00:00.000Z",
      status: "pending",
      notes: "Quiere un look natural. Alergia a látex.",
    },
    {
      id: "apt_002",
      name: "María González",
      phone: "+52 238 555 9876",
      service: "Novia (prueba)",
      dateTime: "2025-12-22T16:30:00.000Z",
      status: "confirmed",
      notes: "",
    },
    {
      id: "apt_003",
      name: "Sofía Ramírez",
      phone: "+52 222 555 1212",
      service: "Peinado para evento",
      dateTime: "2025-12-28T20:00:00.000Z",
      status: "cancelled",
      notes: "Canceló por emergencia familiar.",
    },
  ]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/status", { credentials: "include" });
        const data = await res.json();
        if (!cancelled) {
          setStatus({ loading: false, ok: !!data.ok, message: data.message || "", time: data.time || "" });
        }
      } catch (e) {
        if (!cancelled) setStatus({ loading: false, ok: false, message: "Failed to reach /api/admin/status", time: "" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return appointments;
    return appointments.filter((a) => {
      return (
        a.name.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q)
      );
    });
  }, [appointments, query]);

  const counts = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const cancelled = appointments.filter((a) => a.status === "cancelled").length;
    return { total, pending, confirmed, cancelled };
  }, [appointments]);

  function updateStatus(id, nextStatus) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
    );
  }

  function updateNotes(id, nextNotes) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, notes: nextNotes } : a))
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-title">Alison Admin</div>
          <div className="admin-brand-subtitle">Private Portal</div>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            Citas
          </button>
          <button
            className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Configuración
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-api">
            <div className="admin-api-row">
              <span>API:</span>{" "}
              {status.loading ? (
                <Badge tone="neutral">checking…</Badge>
              ) : status.ok ? (
                <Badge tone="ok">ok</Badge>
              ) : (
                <Badge tone="bad">down</Badge>
              )}
            </div>
            <div className="admin-api-small">
              {status.message ? status.message : "—"}
            </div>
            <div className="admin-api-small">
              {status.time ? formatDateTime(status.time) : ""}
            </div>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1 className="admin-title">
              {activeTab === "appointments" ? "Citas" : "Configuración"}
            </h1>
            <p className="admin-subtitle">
              {activeTab === "appointments"
                ? "Gestiona solicitudes, cambios, cancelaciones y notas."
                : "Preferencias del negocio, reglas y notificaciones."}
            </p>
          </div>

          {activeTab === "appointments" ? (
            <div className="admin-actions">
              <input
                className="admin-input"
                placeholder="Buscar: nombre, servicio, estado…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="admin-btn admin-btn-primary" onClick={() => alert("Next: create appointment modal")}>
                + Nueva cita
              </button>
            </div>
          ) : null}
        </header>

        {activeTab === "appointments" ? (
          <>
            <section className="admin-stats">
              <StatCard label="Total" value={counts.total} />
              <StatCard label="Pendientes" value={counts.pending} hint="Requieren confirmación/acción" />
              <StatCard label="Confirmadas" value={counts.confirmed} />
              <StatCard label="Canceladas" value={counts.cancelled} />
            </section>

            <section className="admin-panel">
              <div className="admin-panel-header">
                <div className="admin-panel-title">Lista de citas</div>
                <div className="admin-panel-meta">
                  Mostrando <b>{filtered.length}</b> de <b>{appointments.length}</b>
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Servicio</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                      <th>Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a) => (
                      <tr key={a.id}>
                        <td>
                          <div className="admin-strong">{a.name}</div>
                          <div className="admin-muted">{a.phone}</div>
                        </td>
                        <td>{a.service}</td>
                        <td>{formatDateTime(a.dateTime)}</td>
                        <td>
                          {a.status === "pending" ? (
                            <Badge tone="warn">pending</Badge>
                          ) : a.status === "confirmed" ? (
                            <Badge tone="ok">confirmed</Badge>
                          ) : (
                            <Badge tone="bad">cancelled</Badge>
                          )}
                        </td>
                        <td>
                          <div className="admin-row-actions">
                            <button
                              className="admin-btn admin-btn-small"
                              onClick={() => updateStatus(a.id, "confirmed")}
                            >
                              Confirmar
                            </button>
                            <button
                              className="admin-btn admin-btn-small admin-btn-ghost"
                              onClick={() => updateStatus(a.id, "cancelled")}
                            >
                              Cancelar
                            </button>
                          </div>
                        </td>
                        <td style={{ minWidth: 260 }}>
                          <textarea
                            className="admin-textarea"
                            placeholder="Notas internas (solo admin)…"
                            value={a.notes}
                            onChange={(e) => updateNotes(a.id, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div className="admin-panel-title">Configuración (próximo)</div>
              <div className="admin-panel-meta">Esto lo conectamos a D1 / KV después.</div>
            </div>

            <div className="admin-settings-grid">
              <div className="admin-card">
                <div className="admin-card-label">Regla de aprobación</div>
                <div className="admin-card-hint">
                  “Más de X días en el futuro requiere aprobación”
                </div>
                <div className="admin-setting-row">
                  <input className="admin-input" type="number" defaultValue={14} min={0} />
                  <span className="admin-muted">días</span>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-label">Notificaciones</div>
                <div className="admin-card-hint">
                  Telegram / Email / (más adelante WhatsApp Business)
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => alert("Next: connect Telegram bot")}>
                  Conectar Telegram
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-card-label">Calendario</div>
                <div className="admin-card-hint">
                  Conectar Google Calendar OAuth + seleccionar calendario
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => alert("Next: Google Calendar connect flow")}>
                  Conectar Google Calendar
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}