import React, { useState, useMemo, useEffect } from 'react';

const VIEWBOX_W = 600;
const VIEWBOX_H = 340;
const SHELL_Y = 90;
const SHELL_H = 120;
const MIN_SHELL_W = 220;
const MAX_SHELL_W = 480;

const MODELS = [
  {
    id: 'studio',
    label: 'Studio',
    basePrice: 900000,
    baseSqft: 140,
    sizes: ['10x14', '12x16'],
    furniture: ['Sofa', 'Foldable table', 'Wardrobe', 'Queen Size Bed'],
    shellRx: 55,
  },
  {
    id: 'office',
    label: 'Office',
    basePrice: 1100000,
    baseSqft: 192,
    sizes: ['12x16', '14x18', '16x20', '18x22', '20x24'],
    furniture: ['Sofa', 'Dining Table', 'Foldable table', 'Wardrobe', 'King Size Bed', 'Queen Size Bed'],
    shellRx: 18,
  },
  {
    id: 'resort',
    label: 'Resort',
    basePrice: 1000000,
    baseSqft: 140,
    sizes: ['10x14', '12x16', '14x18'],
    furniture: ['Sofa', 'Foldable table', 'Wardrobe', 'King Size Bed', 'Queen Size Bed'],
    shellRx: 60,
  },
  {
    id: 'cafe',
    label: 'Cafe',
    basePrice: 1050000,
    baseSqft: 192,
    sizes: ['12x16', '14x18', '16x20', '18x22', '20x24'],
    furniture: ['Sofa', 'Dining Table', 'Foldable table', 'Office table'],
    shellRx: 30,
  },
];

const COLORS = [
  { id: 'grey', label: 'Grey', hex: '#9CA3AF' },
  { id: 'black', label: 'Black', hex: '#1F2023' },
  { id: 'white', label: 'White', hex: '#F5F5F0' },
  { id: 'charcoal', label: 'Charcoal', hex: '#36454F' },
];

const DECKS = [
  { id: 'none', label: 'No Deck', price: 0 },
  { id: 'deck', label: 'Deck', price: 50000 },
];

const LEG_HEIGHTS = [1, 2, 3, 4, 5];
const LEG_HEIGHT_RATE = 15000;

const INTERIOR_FINISHES = [
  { id: 'tile', label: 'Tile', price: 0 },
  { id: 'wood', label: 'Wooden Cladding', price: 40000 },
];

const FURNITURE_PRICES = {
  Sofa: 25000,
  'Dining Table': 30000,
  'Foldable table': 10000,
  Wardrobe: 20000,
  'Office table': 25000,
  'Queen Size Bed': 35000,
  'King Size Bed': 45000,
};

const APPLIANCES = [
  { id: 'TV', price: 15000 },
  { id: 'Fridge', price: 20000 },
  { id: 'CCTV', price: 12000 },
  { id: 'Smart curtain', price: 18000 },
];

const RATE_PER_EXTRA_SQFT = 1500;

const STEP_ORDER = ['model', 'size', 'color', 'deck', 'legHeight', 'interiorFinish', 'furniture', 'appliances'];

function nextStepAfter(id) {
  const idx = STEP_ORDER.indexOf(id);
  return idx >= 0 && idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;
}

function formatINR(amount) {
  return `₹${Math.round(amount / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function parseSize(sizeStr) {
  const [w, l] = sizeStr.split('x').map(Number);
  return { width: w, length: l, sqft: w * l };
}

function PickerGrid({ options, value, onChange, columns = 3 }) {
  const gridClass = columns === 2 ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 sm:grid-cols-3 gap-3';
  return (
    <div className={gridClass}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-colors text-left ${
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

function MultiSelectGrid({ items, selected, onToggle, priceMap }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item) => {
        const isOn = selected.includes(item);
        const price = priceMap[item] || 0;
        return (
          <button
            key={item}
            onClick={() => onToggle(item)}
            className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-colors text-left ${
              isOn ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
            }`}
          >
            {item}
            {price > 0 && (
              <span className={`block text-xs mt-1 font-normal ${isOn ? 'text-gray-300' : 'text-gray-400'}`}>+{formatINR(price)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function ConfiguratorSection() {
  const [openStep, setOpenStep] = useState('model');
  const [modelId, setModelId] = useState('studio');
  const [sizeStr, setSizeStr] = useState('10x14');
  const [colorId, setColorId] = useState('grey');
  const [deckId, setDeckId] = useState('none');
  const [legHeight, setLegHeight] = useState(1);
  const [interiorFinishId, setInteriorFinishId] = useState('tile');
  const [furniture, setFurniture] = useState([]);
  const [appliances, setAppliances] = useState([]);

  const model = MODELS.find((m) => m.id === modelId);
  const colorOpt = COLORS.find((c) => c.id === colorId);
  const deckOpt = DECKS.find((d) => d.id === deckId);
  const finishOpt = INTERIOR_FINISHES.find((f) => f.id === interiorFinishId);
  const size = parseSize(sizeStr);

  const applyModel = (id) => {
    const newModel = MODELS.find((m) => m.id === id);
    setModelId(id);
    setSizeStr(newModel.sizes[0]);
    setFurniture([]);
    setOpenStep(nextStepAfter('model'));
  };

  useEffect(() => {
    if (!model.sizes.includes(sizeStr)) setSizeStr(model.sizes[0]);
  }, [modelId]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFurniture = (item) => {
    setFurniture((prev) => (prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]));
  };

  const toggleAppliance = (id) => {
    setAppliances((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const price = useMemo(() => {
    const extraSqft = Math.max(size.sqft - model.baseSqft, 0);
    const furniturePrice = furniture.reduce((sum, f) => sum + (FURNITURE_PRICES[f] || 0), 0);
    const appliancePrice = appliances.reduce((sum, a) => {
      const found = APPLIANCES.find((x) => x.id === a);
      return sum + (found ? found.price : 0);
    }, 0);
    return (
      model.basePrice +
      extraSqft * RATE_PER_EXTRA_SQFT +
      deckOpt.price +
      (legHeight - 1) * LEG_HEIGHT_RATE +
      finishOpt.price +
      furniturePrice +
      appliancePrice
    );
  }, [model, size, deckOpt, legHeight, finishOpt, furniture, appliances]);

  const shellWidth = MIN_SHELL_W + ((size.length - 10) / (24 - 10)) * (MAX_SHELL_W - MIN_SHELL_W);
  const shellX = (VIEWBOX_W - shellWidth) / 2;
  const legPixelHeight = 8 + legHeight * 6;

  const summaryChips = [
    `${model.label}`,
    `${sizeStr} ft`,
    `${colorOpt.label}`,
    deckOpt.label,
    `${legHeight} ft legs`,
    finishOpt.label,
    ...furniture,
    ...appliances,
  ];

  const summaryLine = summaryChips.join(', ');
  const whatsappMessage = encodeURIComponent(`Hi Capsule Culture, I'd like a quote for: ${summaryLine}. Estimated price: ${formatINR(price)}.`);

  const steps = [
    { id: 'model', title: 'Model', summary: model.label },
    { id: 'size', title: 'Size', summary: `${sizeStr} ft (${size.sqft} sqft)` },
    { id: 'color', title: 'Color', summary: colorOpt.label },
    { id: 'deck', title: 'Deck', summary: deckOpt.label },
    { id: 'legHeight', title: 'Foundation Leg Height', summary: `${legHeight} ft` },
    { id: 'interiorFinish', title: 'Interior Finish', summary: finishOpt.label },
    { id: 'furniture', title: 'Furniture', summary: furniture.length ? furniture.join(', ') : 'None selected' },
    { id: 'appliances', title: 'Appliances', summary: appliances.length ? appliances.join(', ') : 'None selected' },
  ];

  return (
    <section id="configure" className="py-24 bg-white border-t-2 border-gray-100 scroll-mt-28">
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

              {deckId === 'deck' && (
                <polygon
                  points={`
                    ${shellX + shellWidth * 0.15},${SHELL_Y + SHELL_H - 8}
                    ${shellX + shellWidth * 0.85},${SHELL_Y + SHELL_H - 8}
                    ${shellX + shellWidth + 14},${SHELL_Y + SHELL_H + 44}
                    ${shellX - 14},${SHELL_Y + SHELL_H + 44}
                  `}
                  fill="#EADFC7"
                  stroke="#c4b28a"
                  strokeWidth="1"
                />
              )}

              <g transform={`rotate(6 ${shellX + shellWidth / 2} ${SHELL_Y + SHELL_H / 2})`}>
                <rect
                  x={shellX}
                  y={SHELL_Y}
                  width={shellWidth}
                  height={SHELL_H}
                  rx={model.shellRx}
                  fill={colorOpt.hex}
                  stroke="#1f2937"
                  strokeWidth="1.5"
                />

                {[0.15, 0.5, 0.85].map((frac, i) => (
                  <line
                    key={i}
                    x1={shellX + shellWidth * frac}
                    y1={SHELL_Y + SHELL_H}
                    x2={shellX + shellWidth * frac}
                    y2={SHELL_Y + SHELL_H + legPixelHeight}
                    stroke="#6b7280"
                    strokeWidth="3"
                  />
                ))}

                <text
                  x={shellX + shellWidth / 2}
                  y={SHELL_Y + SHELL_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="13"
                  fill={colorId === 'black' || colorId === 'charcoal' ? '#e5e7eb' : '#4b5563'}
                  fontWeight="600"
                >
                  {model.label}
                </text>
              </g>

              <text
                x={shellX + shellWidth / 2}
                y={SHELL_Y + SHELL_H + legPixelHeight + 60}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
                fontWeight="600"
              >
                {sizeStr} ft — {size.sqft} sqft
              </text>
            </svg>

            {summaryChips.length > 6 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {[...furniture, ...appliances].map((item) => (
                  <span key={item} className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Estimated price</p>
              <p className="text-3xl font-bold text-gray-900">{formatINR(price)}</p>
              <p className="text-xs text-gray-400 mt-1 font-light">Illustrative estimate only — confirm final pricing with our team.</p>
            </div>
          </div>

          <div>
            {steps.map(({ id, title, summary }) => {
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
                        <PickerGrid
                          options={model.sizes.map((s) => ({ id: s, label: `${s} ft` }))}
                          value={sizeStr}
                          onChange={(v) => {
                            setSizeStr(v);
                            setOpenStep(nextStepAfter('size'));
                          }}
                        />
                      )}

                      {id === 'color' && (
                        <div className="flex flex-wrap gap-4">
                          {COLORS.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setColorId(c.id);
                                setOpenStep(nextStepAfter('color'));
                              }}
                              className="flex flex-col items-center gap-2"
                              aria-label={c.label}
                            >
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

                      {id === 'deck' && (
                        <PickerGrid
                          options={DECKS}
                          value={deckId}
                          onChange={(v) => {
                            setDeckId(v);
                            setOpenStep(nextStepAfter('deck'));
                          }}
                          columns={2}
                        />
                      )}

                      {id === 'legHeight' && (
                        <div>
                          <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3">
                            Leg height: <span className="text-gray-900 normal-case tracking-normal">{legHeight} ft</span>
                          </p>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={legHeight}
                            onChange={(e) => setLegHeight(Number(e.target.value))}
                            className="w-full accent-gray-900"
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-1 mb-4">
                            <span>1 ft</span>
                            <span>5 ft</span>
                          </div>
                          <button
                            onClick={() => setOpenStep(nextStepAfter('legHeight'))}
                            className="px-6 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800"
                          >
                            Done
                          </button>
                        </div>
                      )}

                      {id === 'interiorFinish' && (
                        <PickerGrid
                          options={INTERIOR_FINISHES}
                          value={interiorFinishId}
                          onChange={(v) => {
                            setInteriorFinishId(v);
                            setOpenStep(nextStepAfter('interiorFinish'));
                          }}
                          columns={2}
                        />
                      )}

                      {id === 'furniture' && (
                        <div>
                          <MultiSelectGrid items={model.furniture} selected={furniture} onToggle={toggleFurniture} priceMap={FURNITURE_PRICES} />
                          <button
                            onClick={() => setOpenStep(nextStepAfter('furniture'))}
                            className="mt-5 px-6 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800"
                          >
                            Done
                          </button>
                        </div>
                      )}

                      {id === 'appliances' && (
                        <div>
                          <MultiSelectGrid
                            items={APPLIANCES.map((a) => a.id)}
                            selected={appliances}
                            onToggle={toggleAppliance}
                            priceMap={Object.fromEntries(APPLIANCES.map((a) => [a.id, a.price]))}
                          />
                          <button
                            onClick={() => setOpenStep(null)}
                            className="mt-5 px-6 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800"
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

            <div className="pt-8">
              <p className="text-gray-700 font-light mb-6">{summaryLine}.</p>
              <div className="flex flex-wrap gap-4">
                
                  href={`https://wa.me/918848337921?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  WhatsApp Quote
                </a>
                
                  href="#contact"
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
