import React, { useState, useMemo } from 'react';

const VIEWBOX_W = 600;
const VIEWBOX_H = 300;
const SHELL_Y = 90;
const SHELL_H = 120;
const MIN_SHELL_W = 200;
const MAX_SHELL_W = 460;
const ZONE_H = 56;
const GAP = 14;
const PADDING = 20;

const MODELS = [
  { id: 'studio', label: 'Studio', defaults: { width: 10, length: 16, height: 8, kitchen: 'compact', bedroom: 'none', deck: 'none' } },
  { id: 'office', label: 'Office', defaults: { width: 10, length: 20, height: 9, kitchen: 'none', bedroom: 'none', deck: '4ft' } },
  { id: 'resort', label: 'Resort', defaults: { width: 12, length: 24, height: 9, kitchen: 'standard', bedroom: 'queen', deck: 'wrap' } },
  { id: 'family', label: 'Family', defaults: { width: 14, length: 30, height: 9, kitchen: 'premium', bedroom: 'king', deck: '6ft' } },
  { id: 'cafe', label: 'Cafe', defaults: { width: 12, length: 20, height: 9, kitchen: 'luxury', bedroom: 'none', deck: 'wrap' } },
];

const WIDTH_OPTIONS = [10, 12, 14];
const LENGTH_OPTIONS = [14, 16, 20, 24, 30, 40];

const EXTERIOR_STYLES = [
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'wood', label: 'Wood-clad' },
  { id: 'industrial', label: 'Industrial' },
];

const COLORS = [
  { id: 'white', label: 'White', hex: '#F5F5F0', price: 0 },
  { id: 'black', label: 'Black', hex: '#1F2023', price: 10000 },
  { id: 'grey', label: 'Grey', hex: '#9CA3AF', price: 10000 },
  { id: 'olive', label: 'Olive', hex: '#6B7A4A', price: 20000 },
  { id: 'wood', label: 'Wood', hex: '#9C6B3F', price: 30000 },
  { id: 'navy', label: 'Navy', hex: '#1E3A5F', price: 20000 },
  { id: 'sand', label: 'Sand', hex: '#D9C6A5', price: 15000 },
];

const DECKS = [
  { id: 'none', label: 'None', price: 0 },
  { id: '4ft', label: '4 ft deck', price: 50000 },
  { id: '6ft', label: '6 ft deck', price: 100000 },
  { id: 'wrap', label: 'Wrap-around', price: 200000 },
];

const KITCHENS = [
  { id: 'none', label: 'None', price: 0 },
  { id: 'compact', label: 'Compact', price: 75000 },
  { id: 'standard', label: 'Standard', price: 150000 },
  { id: 'premium', label: 'Premium', price: 250000 },
  { id: 'luxury', label: 'Luxury Island', price: 350000 },
];

const BEDROOMS = [
  { id: 'none', label: 'No bedroom', price: 0 },
  { id: 'single', label: 'Single', price: 40000 },
  { id: 'queen', label: 'Queen', price: 70000 },
  { id: 'king', label: 'King', price: 100000 },
  { id: 'bunk', label: 'Bunk bed', price: 120000 },
];

const BASE_PRICE = 1050000;
const BASE_WIDTH = 10;
const BASE_LENGTH = 14;
const BASE_HEIGHT = 8;
const PRICE_PER_EXTRA_LENGTH_2FT = 75000;
const PRICE_PER_EXTRA_WIDTH_2FT = 90000;
const PRICE_PER_HEIGHT_FT = 30000;

function formatINR(amount) {
  return `₹${Math.round(amount / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function PickerGrid({ options, value, onChange, columns = 3 }) {
  const gridClass = columns === 2 ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 sm:grid-cols-3 gap-3';
  return (
    <div className={gridClass}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`px-4 py-4 rounded-xl text-sm font-semibold border-2 transition-colors text-left ${
            value === opt.id ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
          }`}
        >
          {opt.label}
          {typeof opt.price === 'number' && opt.price > 0 && (
            <span className={`block text-xs mt-1 font-normal ${value === opt.id ? 'text-gray-300' : 'text-gray-400'}`}>
              +{formatINR(opt.price)}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

const STEP_ORDER = ['model', 'size', 'style', 'color', 'deck', 'interior'];

function nextStepAfter(id) {
  const idx = STEP_ORDER.indexOf(id);
  return idx >= 0 && idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;
}

export default function ConfiguratorSection() {
  const [openStep, setOpenStep] = useState('model');
  const [modelId, setModelId] = useState('studio');
  const [width, setWidth] = useState(10);
  const [length, setLength] = useState(16);
  const [height, setHeight] = useState(8);
  const [styleId, setStyleId] = useState('modern');
  const [colorId, setColorId] = useState('white');
  const [deckId, setDeckId] = useState('none');
  const [kitchenId, setKitchenId] = useState('compact');
  const [bedroomId, setBedroomId] = useState('none');

  const model = MODELS.find((m) => m.id === modelId);
  const colorOpt = COLORS.find((c) => c.id === colorId);
  const deckOpt = DECKS.find((d) => d.id === deckId);
  const kitchenOpt = KITCHENS.find((k) => k.id === kitchenId);
  const bedroomOpt = BEDROOMS.find((b) => b.id === bedroomId);
  const styleOpt = EXTERIOR_STYLES.find((s) => s.id === styleId);

  const applyModel = (id) => {
    setModelId(id);
    const d = MODELS.find((m) => m.id === id).defaults;
    setWidth(d.width);
    setLength(d.length);
    setHeight(d.height);
    setKitchenId(d.kitchen);
    setBedroomId(d.bedroom);
    setDeckId(d.deck);
    setOpenStep(nextStepAfter('model'));
  };

  const chooseStyle = (id) => {
    setStyleId(id);
    setOpenStep(nextStepAfter('style'));
  };

  const chooseColor = (id) => {
    setColorId(id);
    setOpenStep(nextStepAfter('color'));
  };

  const chooseDeck = (id) => {
    setDeckId(id);
    setOpenStep(nextStepAfter('deck'));
  };

  const sqft = width * length;

  const price = useMemo(() => {
    const extraWidthUnits = Math.max((width - BASE_WIDTH) / 2, 0);
    const extraLengthUnits = Math.max((length - BASE_LENGTH) / 2, 0);
    const extraHeight = Math.max(height - BASE_HEIGHT, 0);
    return (
      BASE_PRICE +
      extraWidthUnits * PRICE_PER_EXTRA_WIDTH_2FT +
      extraLengthUnits * PRICE_PER_EXTRA_LENGTH_2FT +
      extraHeight * PRICE_PER_HEIGHT_FT +
      colorOpt.price +
      deckOpt.price +
      kitchenOpt.price +
      bedroomOpt.price
    );
  }, [width, length, height, colorOpt, deckOpt, kitchenOpt, bedroomOpt]);

  const shellWidth = MIN_SHELL_W + ((length - 14) / (40 - 14)) * (MAX_SHELL_W - MIN_SHELL_W);
  const shellX = (VIEWBOX_W - shellWidth) / 2;
  const shellRx = styleId === 'modern' ? SHELL_H / 2 : styleId === 'minimal' ? 20 : styleId === 'industrial' ? 8 : 18;
  const shellStrokeWidth = styleId === 'industrial' ? 3 : 1.5;

  const layout = useMemo(() => {
    const rawZones = [
      kitchenOpt.id !== 'none' && { label: `Kitchen (${kitchenOpt.label})`, width: 110, kind: 'kitchen' },
      bedroomOpt.id !== 'none' && { label: `Bed (${bedroomOpt.label})`, width: 110, kind: 'bed' },
    ].filter(Boolean);

    const rawTotal = rawZones.reduce((sum, z) => sum + z.width, 0);
    const available = shellWidth - PADDING * 2;
    const rawGapTotal = GAP * Math.max(rawZones.length - 1, 0);

    let scale = 1;
    if (rawTotal + rawGapTotal > available && rawTotal > 0) {
      scale = Math.max((available - rawGapTotal) / rawTotal, 0.4);
    }

    const scaledZones = rawZones.map((z) => ({ ...z, width: Math.max(z.width * scale, 60) }));
    const scaledTotal = scaledZones.reduce((sum, z) => sum + z.width, 0) + GAP * Math.max(scaledZones.length - 1, 0);

    let cursorX = shellX + (shellWidth - scaledTotal) / 2;
    const positioned = scaledZones.map((z) => {
      const x = cursorX;
      cursorX += z.width + GAP;
      return { ...z, x };
    });

    return { zones: positioned };
  }, [shellWidth, shellX, kitchenOpt, bedroomOpt]);

  const kindStyles = {
    kitchen: { fill: '#E1F5EE', stroke: '#0F6E56', text: '#085041' },
    bed: { fill: '#E6F1FB', stroke: '#185FA5', text: '#0C447C' },
  };

  const summaryLine = `${model.label} model — ${width} x ${length} ft (${sqft} sqft), ${height} ft height, ${styleOpt.label} style, ${colorOpt.label} exterior, ${deckOpt.label} deck, ${kitchenOpt.label} kitchen, ${bedroomOpt.label}`;
  const whatsappMessage = encodeURIComponent(`Hi Capsule Culture, I'd like a quote for: ${summaryLine}. Estimated price: ${formatINR(price)}.`);

  return (
    <section id="configure" className="py-24 bg-white border-t-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-inter font-semibold mb-2">Build Your Own</p>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Configure your capsule
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 sticky top-24">
            <svg width="100%" viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`} role="img">
              <title>Capsule preview</title>
              <desc>Top-down schematic that updates as you build your capsule</desc>

              {deckId === 'wrap' && (
                <rect
                  x={shellX - 12}
                  y={SHELL_Y - 12}
                  width={shellWidth + 24}
                  height={SHELL_H + 24}
                  rx={shellRx + 10}
                  fill="none"
                  stroke="#c4b28a"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
              )}
              {(deckId === '4ft' || deckId === '6ft') && (
                <rect
                  x={shellX - (deckId === '4ft' ? 30 : 46)}
                  y={SHELL_Y + 10}
                  width={deckId === '4ft' ? 30 : 46}
                  height={SHELL_H - 20}
                  fill="#EADFC7"
                  stroke="#c4b28a"
                  strokeWidth="1"
                />
              )}

              <rect
                x={shellX}
                y={SHELL_Y}
                width={shellWidth}
                height={SHELL_H}
                rx={shellRx}
                fill={colorOpt.hex}
                stroke="#1f2937"
                strokeWidth={shellStrokeWidth}
              />
              {styleId === 'wood' &&
                Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={i}
                    x1={shellX + 20 + i * ((shellWidth - 40) / 5)}
                    y1={SHELL_Y + 8}
                    x2={shellX + 20 + i * ((shellWidth - 40) / 5)}
                    y2={SHELL_Y + SHELL_H - 8}
                    stroke="#7a5230"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                ))}

              {layout.zones.length === 0 && (
                <text x={VIEWBOX_W / 2} y={SHELL_Y + SHELL_H / 2} textAnchor="middle" fontSize="13" fill={colorId === 'black' || colorId === 'navy' ? '#e5e7eb' : '#6b7280'}>
                  Open floor plan
                </text>
              )}
              {layout.zones.map((z) => {
                const style = kindStyles[z.kind];
                const zoneY = SHELL_Y + (SHELL_H - ZONE_H) / 2;
                return (
                  <g key={z.kind}>
                    <rect x={z.x} y={zoneY} width={z.width} height={ZONE_H} rx="8" fill={style.fill} stroke={style.stroke} strokeWidth="1" />
                    <text x={z.x + z.width / 2} y={zoneY + ZONE_H / 2 + 4} textAnchor="middle" fontSize="10" fill={style.text} fontWeight="600">
                      {z.label}
                    </text>
                  </g>
                );
              })}

              <line x1={shellX} y1={SHELL_Y + SHELL_H + 26} x2={shellX + shellWidth} y2={SHELL_Y + SHELL_H + 26} stroke="#9ca3af" strokeWidth="1" />
              <text x={shellX + shellWidth / 2} y={SHELL_Y + SHELL_H + 46} textAnchor="middle" fontSize="12" fill="#6b7280" fontWeight="600">
                {width} ft x {length} ft x {height} ft — {sqft} sqft
              </text>
            </svg>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Estimated price</p>
              <p className="text-3xl font-bold text-gray-900">{formatINR(price)}</p>
              <p className="text-xs text-gray-400 mt-1 font-light">Illustrative estimate only — confirm final pricing with our team.</p>
            </div>
          </div>

          <div>
            {[
              { id: 'model', title: 'Model', summary: model.label },
              { id: 'size', title: 'Size', summary: `${width} x ${length} x ${height} ft — ${sqft} sqft` },
              { id: 'style', title: 'Exterior Style', summary: styleOpt.label },
              { id: 'color', title: 'Color', summary: colorOpt.label },
              { id: 'deck', title: 'Deck', summary: deckOpt.label },
              { id: 'interior', title: 'Interior', summary: `${kitchenOpt.label} kitchen, ${bedroomOpt.label}` },
            ].map(({ id, title, summary }) => {
              const isOpen = openStep === id;
              return (
                <div key={id} className="border-b border-gray-200 py-5">
                  <button
                    onClick={() => setOpenStep(isOpen ? null : id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{title}</p>
                      <p className="text-base font-semibold text-gray-900 mt-1">{summary}</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="mt-5">
                      {id === 'model' && <PickerGrid options={MODELS} value={modelId} onChange={applyModel} />}

                      {id === 'size' && (
                        <div>
                          <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3">Width</p>
                          <div className="flex flex-wrap gap-3 mb-6">
                            {WIDTH_OPTIONS.map((w) => (
                              <button
                                key={w}
                                onClick={() => setWidth(w)}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold border-2 ${
                                  width === w ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                                }`}
                              >
                                {w} ft
                              </button>
                            ))}
                          </div>
                          <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3">Length</p>
                          <div className="flex flex-wrap gap-3 mb-6">
                            {LENGTH_OPTIONS.map((l) => (
                              <button
                                key={l}
                                onClick={() => setLength(l)}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold border-2 ${
                                  length === l ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                                }`}
                              >
                                {l} ft
                              </button>
                            ))}
                          </div>
                          <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3">Height</p>
                          <div className="flex flex-wrap gap-3 mb-6">
                            {[8, 9, 10, 11].map((h) => (
                              <button
                                key={h}
                                onClick={() => setHeight(h)}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold border-2 ${
                                  height === h ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                                }`}
                              >
                                {h} ft
                              </button>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 font-light mb-4">
                            Total area: <span className="font-semibold text-gray-900">{sqft} sqft</span>
                          </p>
                          <button
                            onClick={() => setOpenStep(nextStepAfter('size'))}
                            className="px-6 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800"
                          >
                            Done
                          </button>
                        </div>
                      )}

                      {id === 'style' && <PickerGrid options={EXTERIOR_STYLES} value={styleId} onChange={chooseStyle} columns={2} />}

                      {id === 'color' && (
                        <div className="flex flex-wrap gap-4">
                          {COLORS.map((c) => (
                            <button key={c.id} onClick={() => chooseColor(c.id)} className="flex flex-col items-center gap-2" aria-label={c.label}>
                              <span
                                className="w-12 h-12 rounded-full border-2"
                                style={{
                                  backgroundColor: c.hex,
                                  borderColor: colorId === c.id ? '#111827' : '#e5e7eb',
                                  boxShadow: colorId === c.id ? '0 0 0 2px #111827' : 'none',
                                }}
                              />
                              <span className="text-xs text-gray-600 font-medium">{c.label}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {id === 'deck' && <PickerGrid options={DECKS} value={deckId} onChange={chooseDeck} columns={2} />}

                      {id === 'interior' && (
                        <div>
                          <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3">Kitchen</p>
                          <PickerGrid options={KITCHENS} value={kitchenId} onChange={setKitchenId} />
                          <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3 mt-8">Bedroom</p>
                          <PickerGrid options={BEDROOMS} value={bedroomId} onChange={setBedroomId} />
                          <button
                            onClick={() => setOpenStep(null)}
                            className="mt-6 px-6 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800"
                          >
                            Done
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

<div className="flex flex-wrap gap-4">
                
                  <a href={`https://wa.me/918848337921?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  WhatsApp Quote
                </a>
                
                  <a href="#contact"
                  className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Get a Detailed Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
