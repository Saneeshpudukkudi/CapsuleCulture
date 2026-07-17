import React, { useState, useMemo } from 'react';

const KITCHEN_OPTIONS = [
  { id: 'none', label: 'None', width: 0 },
  { id: 'compact', label: 'Compact', width: 70 },
  { id: 'full', label: 'Full kitchen', width: 110 },
];

const SOFA_OPTIONS = [
  { id: 'none', label: 'None', width: 0 },
  { id: 'single', label: 'Single sofa', width: 80 },
  { id: 'lshaped', label: 'L-shaped sofa', width: 130 },
];

const BED_OPTIONS = [
  { id: 'none', label: 'None', width: 0 },
  { id: 'single', label: 'Single', width: 70 },
  { id: 'queen', label: 'Queen', width: 100 },
  { id: 'king', label: 'King', width: 130 },
];

const GAP = 16;
const PADDING = 30;
const SHELL_HEIGHT = 160;
const MARGIN = 40;

export default function ConfiguratorSection() {
  const [lengthFt, setLengthFt] = useState(20);
  const [kitchen, setKitchen] = useState('compact');
  const [sofa, setSofa] = useState('single');
  const [bed, setBed] = useState('queen');

  const kitchenOpt = KITCHEN_OPTIONS.find((o) => o.id === kitchen);
  const sofaOpt = SOFA_OPTIONS.find((o) => o.id === sofa);
  const bedOpt = BED_OPTIONS.find((o) => o.id === bed);

  const layout = useMemo(() => {
    const zones = [
      kitchenOpt.id !== 'none' && { label: 'Kitchen', width: kitchenOpt.width, kind: 'kitchen' },
      sofaOpt.id !== 'none' && { label: 'Sofa', width: sofaOpt.width, kind: 'sofa' },
      bedOpt.id !== 'none' && { label: 'Bed', width: bedOpt.width, kind: 'bed' },
    ].filter(Boolean);

    const zonesWidth = zones.reduce((sum, z) => sum + z.width, 0) + GAP * Math.max(zones.length - 1, 0);
    const requiredWidth = zonesWidth + PADDING * 2;
    const lengthWidth = 260 + ((lengthFt - 12) / (32 - 12)) * 200;
    const shellWidth = Math.max(lengthWidth, requiredWidth);

    let cursorX = MARGIN + (shellWidth - zonesWidth) / 2;
    const positioned = zones.map((z) => {
      const x = cursorX;
      cursorX += z.width + GAP;
      return { ...z, x };
    });

    return {
      shellWidth,
      shellX: MARGIN,
      shellY: MARGIN,
      viewBoxWidth: shellWidth + MARGIN * 2,
      viewBoxHeight: SHELL_HEIGHT + MARGIN * 2,
      zones: positioned,
    };
  }, [lengthFt, kitchenOpt, sofaOpt, bedOpt]);

  const kindStyles = {
    kitchen: { fill: '#E1F5EE', stroke: '#0F6E56', text: '#085041' },
    sofa: { fill: '#F1EFE8', stroke: '#5F5E5A', text: '#2C2C2A' },
    bed: { fill: '#E6F1FB', stroke: '#185FA5', text: '#0C447C' },
  };

  const summaryLine = `${lengthFt} ft capsule — ${kitchenOpt.label} kitchen, ${sofaOpt.label.toLowerCase()}, ${bedOpt.label.toLowerCase()} bed`;
  const whatsappMessage = encodeURIComponent(
    `Hi Capsule Culture, I'd like a quote for: ${summaryLine}.`
  );

  const OptionGroup = ({ label, options, value, onChange }) => (
    <div className="mb-8">
      <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
              value === opt.id
                ? 'bg-gray-900 border-gray-900 text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="configure" className="py-24 bg-white border-t-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">Build Your Own</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Configure your capsule.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 sticky top-24">
            <svg width="100%" viewBox={`0 0 ${layout.viewBoxWidth} ${layout.viewBoxHeight}`} role="img">
              <title>Capsule floor plan preview</title>
              <desc>Top-down layout of the capsule that updates as you change options</desc>
              <rect
                x={layout.shellX}
                y={layout.shellY}
                width={layout.shellWidth}
                height={SHELL_HEIGHT}
                rx={SHELL_HEIGHT / 2}
                fill="#FFFFFF"
                stroke="#1f2937"
                strokeWidth="1.5"
              />
              {layout.zones.length === 0 && (
                <text x={layout.viewBoxWidth / 2} y={layout.viewBoxHeight / 2} textAnchor="middle" fontSize="13" fill="#9ca3af">
                  Open floor plan — pick options below
                </text>
              )}
              {layout.zones.map((z) => {
                const style = kindStyles[z.kind];
                const zoneY = layout.shellY + (SHELL_HEIGHT - 70) / 2;
                return (
                  <g key={z.kind}>
                    <rect x={z.x} y={zoneY} width={z.width} height="70" rx="8" fill={style.fill} stroke={style.stroke} strokeWidth="1" />
                    <text x={z.x + z.width / 2} y={zoneY + 40} textAnchor="middle" fontSize="12" fill={style.text} fontWeight="600">
                      {z.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="text-center text-sm text-gray-500 mt-4 font-light">{lengthFt} ft × 10 ft capsule (schematic — actual photos coming soon)</p>
          </div>

          <div>
            <div className="mb-10">
              <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-3">
                Length: <span className="text-gray-900">{lengthFt} ft</span>
              </p>
              <input
                type="range"
                min="12"
                max="32"
                step="1"
                value={lengthFt}
                onChange={(e) => setLengthFt(Number(e.target.value))}
                className="w-full accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>12 ft</span>
                <span>32 ft</span>
              </div>
            </div>

            <OptionGroup label="Kitchen" options={KITCHEN_OPTIONS} value={kitchen} onChange={setKitchen} />
            <OptionGroup label="Sofa" options={SOFA_OPTIONS} value={sofa} onChange={setSofa} />
            <OptionGroup label="Bed size" options={BED_OPTIONS} value={bed} onChange={setBed} />

            <div className="mt-10 pt-8 border-t border-gray-200">
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
