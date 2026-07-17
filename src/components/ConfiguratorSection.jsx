import React, { useState, useMemo } from 'react';

const VIEWBOX_W = 600;
const VIEWBOX_H = 300;
const SHELL_Y = 80;
const SHELL_H = 130;
const MIN_SHELL_W = 220;
const MAX_SHELL_W = 480;
const ZONE_H = 64;
const GAP = 14;
const PADDING = 22;

const KITCHEN_OPTIONS = [
  { id: 'none', label: 'None', width: 0, price: 0 },
  { id: 'compact', label: 'Compact', width: 70, price: 25000 },
  { id: 'full', label: 'Full kitchen', width: 110, price: 60000 },
];

const BED_OPTIONS = [
  { id: 'none', label: 'None', width: 0, price: 0 },
  { id: 'single', label: 'Single', width: 70, price: 15000 },
  { id: 'queen', label: 'Queen', width: 100, price: 25000 },
  { id: 'king', label: 'King', width: 130, price: 35000 },
];

const HEIGHT_MULTIPLIER = { 8: 1, 9: 1.05, 10: 1.1, 11: 1.15 };

const INSULATION_TYPES = [
  { id: 'none', label: 'None' },
  { id: 'thermal', label: 'Thermal' },
  { id: 'acoustic', label: 'Acoustic' },
  { id: 'both', label: 'Thermal + acoustic' },
];
const INSULATION_TYPE_MULTIPLIER = { none: 0, thermal: 1, acoustic: 1.15, both: 1.9 };
const INSULATION_THICKNESS_MULTIPLIER = { 25: 1, 50: 1.6, 75: 2.2, 100: 2.8 };

const BASE_RATE_PER_SQFT = 1200;
const INSULATION_RATE_PER_SQFT = 150;

function formatINR(amount) {
  return `₹${Math.round(amount / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function SliderRow({ label, value, min, max, step, display, onChange, leftHint, rightHint }) {
  return (
    <div className="mb-5">
      <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-2">
        {label}: <span className="text-gray-900 normal-case tracking-normal">{display}</span>
      </p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full accent-gray-900"
      />
      {(leftHint || rightHint) && (
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{leftHint}</span>
          <span>{rightHint}</span>
        </div>
      )}
    </div>
  );
}

export default function ConfiguratorSection() {
  const [lengthFt, setLengthFt] = useState(24);
  const [heightFt, setHeightFt] = useState(9);
  const [kitchenIndex, setKitchenIndex] = useState(1);
  const [bedIndex, setBedIndex] = useState(2);
  const [officeCapacity, setOfficeCapacity] = useState(0);
  const [diningCapacity, setDiningCapacity] = useState(0);
  const [sofaSeats, setSofaSeats] = useState(2);
  const [insulationTypeIndex, setInsulationTypeIndex] = useState(0);
  const [insulationThickness, setInsulationThickness] = useState(50);

  const kitchenOpt = KITCHEN_OPTIONS[kitchenIndex];
  const bedOpt = BED_OPTIONS[bedIndex];
  const insulationType = INSULATION_TYPES[insulationTypeIndex];

  const shellWidth = MIN_SHELL_W + ((lengthFt - 10) / (80 - 10)) * (MAX_SHELL_W - MIN_SHELL_W);
  const shellX = (VIEWBOX_W - shellWidth) / 2;

  const layout = useMemo(() => {
    const rawZones = [
      kitchenOpt.id !== 'none' && { label: 'Kitchen', width: kitchenOpt.width, kind: 'kitchen' },
      officeCapacity > 0 && { label: `Office (${officeCapacity})`, width: 40 + officeCapacity * 12, kind: 'office' },
      diningCapacity > 0 && { label: `Dining (${diningCapacity})`, width: 50 + diningCapacity * 15, kind: 'dining' },
      sofaSeats > 0 && { label: `Sofa (${sofaSeats})`, width: 40 + sofaSeats * 14, kind: 'sofa' },
      bedOpt.id !== 'none' && { label: 'Bed', width: bedOpt.width, kind: 'bed' },
    ].filter(Boolean);

    const rawTotal = rawZones.reduce((sum, z) => sum + z.width, 0);
    const available = shellWidth - PADDING * 2;
    const rawGapTotal = GAP * Math.max(rawZones.length - 1, 0);

    let scale = 1;
    if (rawTotal + rawGapTotal > available && rawTotal > 0) {
      scale = Math.max((available - rawGapTotal) / rawTotal, 0.35);
    }

    const scaledZones = rawZones.map((z) => ({ ...z, width: Math.max(z.width * scale, 26) }));
    const scaledTotal = scaledZones.reduce((sum, z) => sum + z.width, 0) + GAP * Math.max(scaledZones.length - 1, 0);

    let cursorX = shellX + (shellWidth - scaledTotal) / 2;
    const positioned = scaledZones.map((z) => {
      const x = cursorX;
      cursorX += z.width + GAP;
      return { ...z, x };
    });

    return { zones: positioned };
  }, [shellWidth, shellX, kitchenOpt, bedOpt, officeCapacity, diningCapacity, sofaSeats]);

  const kindStyles = {
    kitchen: { fill: '#E1F5EE', stroke: '#0F6E56', text: '#085041' },
    office: { fill: '#FAEEDA', stroke: '#854F0B', text: '#633806' },
    dining: { fill: '#F1EFE8', stroke: '#5F5E5A', text: '#2C2C2A' },
    sofa: { fill: '#FBEAF0', stroke: '#993556', text: '#72243E' },
    bed: { fill: '#E6F1FB', stroke: '#185FA5', text: '#0C447C' },
  };

  const price = useMemo(() => {
    const floorArea = lengthFt * 10;
    let total = floorArea * BASE_RATE_PER_SQFT * HEIGHT_MULTIPLIER[heightFt];
    total += kitchenOpt.price;
    total += bedOpt.price;
    if (officeCapacity > 0) total += 8000 + officeCapacity * 3000;
    if (diningCapacity > 0) total += 10000 + diningCapacity * 4000;
    if (sofaSeats > 0) total += 8000 + sofaSeats * 5000;
    if (insulationType.id !== 'none') {
      total +=
        floorArea *
        INSULATION_RATE_PER_SQFT *
        INSULATION_THICKNESS_MULTIPLIER[insulationThickness] *
        INSULATION_TYPE_MULTIPLIER[insulationType.id];
    }
    return total;
  }, [lengthFt, heightFt, kitchenOpt, bedOpt, officeCapacity, diningCapacity, sofaSeats, insulationType, insulationThickness]);

  const furnitureSummary = [
    kitchenOpt.id !== 'none' && `${kitchenOpt.label} kitchen`,
    officeCapacity > 0 && `${officeCapacity}-seat office table`,
    diningCapacity > 0 && `${diningCapacity}-seat dining table`,
    sofaSeats > 0 && `${sofaSeats}-seat sofa`,
    bedOpt.id !== 'none' && `${bedOpt.label} bed`,
  ]
    .filter(Boolean)
    .join(', ');

  const summaryLine = `${lengthFt} ft x ${heightFt} ft capsule${furnitureSummary ? ` with ${furnitureSummary}` : ''}`;
  const whatsappMessage = encodeURIComponent(`Hi Capsule Culture, I'd like a quote for: ${summaryLine}.`);

  const handleDining = (e) => {
    let v = Number(e.target.value);
    if (v === 1) v = 2;
    setDiningCapacity(v);
  };

  const handleSofa = (e) => {
    let v = Number(e.target.value);
    if (v === 1) v = 2;
    setSofaSeats(v);
  };

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
              <title>Capsule floor plan preview</title>
              <desc>Top-down layout of the capsule that updates as you change options</desc>

              <rect
                x={shellX}
                y={SHELL_Y}
                width={shellWidth}
                height={SHELL_H}
                rx={SHELL_H / 2}
                fill="#FFFFFF"
                stroke="#1f2937"
                strokeWidth="1.5"
              />

              <rect x={shellX + shellWidth - 66} y={SHELL_Y - 26} width="66" height="20" rx="4" fill="#1f2937" />
              <text x={shellX + shellWidth - 33} y={SHELL_Y - 12} textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="600">
                H: {heightFt} ft
              </text>

              {layout.zones.length === 0 && (
                <text x={VIEWBOX_W / 2} y={SHELL_Y + SHELL_H / 2} textAnchor="middle" fontSize="13" fill="#9ca3af">
                  Open floor plan
                </text>
              )}
              {layout.zones.map((z) => {
                const style = kindStyles[z.kind];
                const zoneY = SHELL_Y + (SHELL_H - ZONE_H) / 2;
                return (
                  <g key={z.kind}>
                    <rect x={z.x} y={zoneY} width={z.width} height={ZONE_H} rx="8" fill={style.fill} stroke={style.stroke} strokeWidth="1" />
                    <text x={z.x + z.width / 2} y={zoneY + ZONE_H / 2 + 4} textAnchor="middle" fontSize="11" fill={style.text} fontWeight="600">
                      {z.label}
                    </text>
                  </g>
                );
              })}

              <line x1={shellX} y1={SHELL_Y + SHELL_H + 30} x2={shellX + shellWidth} y2={SHELL_Y + SHELL_H + 30} stroke="#9ca3af" strokeWidth="1" />
              <line x1={shellX} y1={SHELL_Y + SHELL_H + 24} x2={shellX} y2={SHELL_Y + SHELL_H + 36} stroke="#9ca3af" strokeWidth="1" />
              <line x1={shellX + shellWidth} y1={SHELL_Y + SHELL_H + 24} x2={shellX + shellWidth} y2={SHELL_Y + SHELL_H + 36} stroke="#9ca3af" strokeWidth="1" />
              <text x={shellX + shellWidth / 2} y={SHELL_Y + SHELL_H + 52} textAnchor="middle" fontSize="12" fill="#6b7280" fontWeight="600">
                {lengthFt} ft
              </text>
            </svg>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Estimated price</p>
              <p className="text-3xl font-bold text-gray-900">{formatINR(price)}</p>
              <p className="text-xs text-gray-400 mt-1 font-light">Illustrative estimate only — confirm final pricing with our team.</p>
            </div>
          </div>

          <div>
            <SliderRow
              label="Length"
              value={lengthFt}
              min={10}
              max={80}
              step={1}
              display={`${lengthFt} ft`}
              onChange={(e) => setLengthFt(Number(e.target.value))}
              leftHint="10 ft"
              rightHint="80 ft"
            />

            <SliderRow
              label="Height"
              value={heightFt}
              min={8}
              max={11}
              step={1}
              display={`${heightFt} ft`}
              onChange={(e) => setHeightFt(Number(e.target.value))}
              leftHint="8 ft"
              rightHint="11 ft"
            />

            <p className="text-xs uppercase tracking-widest text-gray-400 font-inter font-semibold mt-8 mb-3">Furniture</p>

            <SliderRow
              label="Kitchen"
              value={kitchenIndex}
              min={0}
              max={KITCHEN_OPTIONS.length - 1}
              step={1}
              display={kitchenOpt.label}
              onChange={(e) => setKitchenIndex(Number(e.target.value))}
            />

            <SliderRow
              label="Office table"
              value={officeCapacity}
              min={0}
              max={10}
              step={1}
              display={officeCapacity === 0 ? 'None' : `${officeCapacity} person`}
              onChange={(e) => setOfficeCapacity(Number(e.target.value))}
            />

            <SliderRow
              label="Dining table"
              value={diningCapacity}
              min={0}
              max={6}
              step={1}
              display={diningCapacity === 0 ? 'None' : `${diningCapacity} person`}
              onChange={handleDining}
            />

            <SliderRow
              label="Sofa"
              value={sofaSeats}
              min={0}
              max={8}
              step={1}
              display={sofaSeats === 0 ? 'None' : `${sofaSeats} seat`}
              onChange={handleSofa}
            />

            <SliderRow
              label="Bed size"
              value={bedIndex}
              min={0}
              max={BED_OPTIONS.length - 1}
              step={1}
              display={bedOpt.label}
              onChange={(e) => setBedIndex(Number(e.target.value))}
            />

            <p className="text-xs uppercase tracking-widest text-gray-400 font-inter font-semibold mt-8 mb-3">Insulation</p>

            <SliderRow
              label="Type"
              value={insulationTypeIndex}
              min={0}
              max={INSULATION_TYPES.length - 1}
              step={1}
              display={insulationType.label}
              onChange={(e) => setInsulationTypeIndex(Number(e.target.value))}
            />

            {insulationType.id !== 'none' && (
              <SliderRow
                label="Thickness"
                value={insulationThickness}
                min={25}
                max={100}
                step={25}
                display={`${insulationThickness} mm`}
                onChange={(e) => setInsulationThickness(Number(e.target.value))}
              />
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-700 font-light mb-6">{summaryLine}.</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/918848337921?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Enquire on WhatsApp
                </a>
                <a
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
