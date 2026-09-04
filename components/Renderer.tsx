'use client';

import React, { useState } from 'react';
import { WebsiteSchema } from '@/lib/types';
import Renderer from '@/components/Renderer';

export default function BuilderPage() {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [paying, setPaying] = useState(false);
  const [websiteData, setWebsiteData] = useState<WebsiteSchema | null>(null);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSavedUrl(null);
    setSavedSlug(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, businessType, description }),
      });

      const data = await response.json();
      if (response.ok) {
        setWebsiteData(data);
      } else {
        alert('Ocurrió un error al crear la página.');
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!websiteData) return;
    setSaving(true);

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schema: websiteData }),
      });

      const data = await response.json();
      if (response.ok) {
        setSavedUrl(data.publicUrl);
        setSavedSlug(data.slug);
      } else {
        alert('Error al guardar la página.');
      }
    } catch (error) {
      alert('Error al conectar con la base de datos.');
    } finally {
      setSaving(false);
    }
  };

  const handleCheckout = async () => {
    if (!websiteData) return;
    setPaying(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteTitle: websiteData.siteTitle,
          slug: savedSlug || 'preview-site',
        }),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert('Error al iniciar la pasarela de pago.');
      }
    } catch (error) {
      alert('Error de conexión con el sistema de pagos.');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      {/* Panel Izquierdo: Control Remoto */}
      <div className="w-full md:w-1/3 p-6 border-r border-slate-800 bg-slate-900 flex flex-col justify-between overflow-y-auto">
        <div>
          <h1 className="text-2xl font-black text-cyan-400 mb-2">Fábrica Web Premium</h1>
          <p className="text-xs text-slate-400 mb-6">Genera, guarda y monetiza sitios web automáticos.</p>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nombre del Negocio</label>
              <input
                type="text"
                required
                placeholder="Ej. Tacos El Rayo"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">¿A qué se dedica?</label>
              <input
                type="text"
                required
                placeholder="Ej. Restaurante de comida rápida"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Detalles Especiales</label>
              <textarea
                rows={3}
                placeholder="Ej. Vendemos los mejores tacos de la ciudad con servicio a domicilio."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg transition-all text-sm shadow-lg disabled:opacity-50"
            >
              {loading ? '¡El robot está construyendo...!' : 'Crear Página Web Mágica'}
            </button>
          </form>

          {/* Acciones de Guardar y Pagar */}
          {websiteData && (
            <div className="mt-6 space-y-3 pt-6 border-t border-slate-800">
              <button
                onClick={handleSave}
                disabled={saving || !!savedUrl}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-lg transition-all text-sm shadow-lg disabled:opacity-50"
              >
                {saving ? 'Guardando en la Nube...' : savedUrl ? '✓ Página Guardada' : '💾 Guardar en Internet'}
              </button>

              {savedUrl && (
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-xs">
                  <p className="text-slate-400 mb-1">Enlace Público:</p>
                  <a href={savedUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold underline break-all">
                    {savedUrl}
                  </a>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={paying}
                className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 rounded-lg transition-all text-sm shadow-lg disabled:opacity-50"
              >
                {paying ? 'Conectando con el Banco...' : '💳 Comprar Web ($29 USD)'}
              </button>
            </div>
          )}

          {/* Estrategia de Ventas Secreta */}
          {websiteData && (
            <div className="mt-8 p-4 bg-slate-800/80 border border-slate-700 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-cyan-400">Estrategia de Ventas Secreta</h3>
              <div>
                <p className="text-xs font-semibold text-slate-300">Cliente Ideal:</p>
                <p className="text-xs text-slate-400">{websiteData.salesStrategy.targetAudience}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300">Propuesta Única:</p>
                <p className="text-xs text-slate-400">{websiteData.salesStrategy.valueProposition}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300">Guion para Cerrar la Venta:</p>
                <p className="text-xs text-slate-400 italic">"{websiteData.salesStrategy.closingScript}"</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Panel Derecho: La Pantalla Mágica */}
      <div className="w-full md:w-2/3 min-h-screen bg-slate-950 overflow-y-auto">
        {websiteData ? (
          <Renderer schema={websiteData} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-600">
            <div className="w-16 h-16 border-2 border-slate-800 rounded-full flex items-center justify-center mb-4 text-2xl">
              ✨
            </div>
            <p className="text-sm">Escribe los datos de un negocio a la izquierda y presiona el botón para ver la magia.</p>
          </div>
        )}
      </div>
    </div>
  );
}
