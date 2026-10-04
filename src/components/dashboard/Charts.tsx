import React, { useState } from 'react';
import { DashboardMetrics } from '../../types';

interface ChartsProps {
  metrics: DashboardMetrics;
}

export const CategoryDonutChart: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const data = metrics.partnersByCategory;
  const total = metrics.totalPartners;

  // Compute SVG Donut paths
  let cumulativeAngle = 0;
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm">
          Parceiros por categoria
        </h3>
        <span className="text-[11px] text-slate-500 font-medium">Rede credenciada</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto py-2">
        {/* SVG Donut */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
            {data.map((item, idx) => {
              const strokeDasharray = `${(item.count / total) * circumference} ${circumference}`;
              const strokeDashoffset = -cumulativeAngle;
              cumulativeAngle += (item.count / total) * circumference;
              const isHovered = hoveredIdx === idx;

              return (
                <circle
                  key={item.category}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">
              {hoveredIdx !== null ? data[hoveredIdx].count : total}
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              {hoveredIdx !== null ? data[hoveredIdx].category.split(' ')[0] : 'parceiros'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1.5 flex-1 w-full text-xs">
          {data.map((item, idx) => (
            <div
              key={item.category}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between p-1 rounded-md transition-colors cursor-pointer ${
                hoveredIdx === idx ? 'bg-slate-50 font-semibold' : ''
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 truncate">{item.category}</span>
              </div>
              <div className="flex items-center gap-2 tabular-nums shrink-0">
                <span className="font-bold text-slate-900">{item.count}</span>
                <span className="text-[11px] text-slate-400 w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RegionBarChart: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => {
  const data = metrics.partnersByRegion;
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm">
          Parceiros por região
        </h3>
        <span className="text-[11px] text-slate-500 font-medium">Distribuição geográfica</span>
      </div>

      <div className="space-y-2.5 py-1 text-xs">
        {data.map((r) => {
          const percent = (r.count / maxCount) * 100;
          const isWarning = r.region === 'Região Oceânica';

          return (
            <div key={r.region} className="space-y-1">
              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-1.5 font-medium">
                  <span>{r.region}</span>
                  {isWarning && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-semibold">
                      Alta Demanda
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 tabular-nums">
                  <span className="text-[11px] text-slate-400">{r.coverageRatio}</span>
                  <span className="font-bold text-slate-900">{r.count}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isWarning ? 'bg-purple-500' : 'bg-[#18B77A]'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const NetworkEvolutionChart: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => {
  const data = metrics.networkEvolution;
  const maxVal = Math.max(...data.map((d) => d.active), 55);

  const height = 120;
  const width = 360;
  const paddingX = 24;
  const stepX = (width - paddingX * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = paddingX + i * stepX;
    const y = height - (d.active / maxVal) * (height - 20) - 10;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Evolução da rede
          </h3>
          <p className="text-[11px] text-slate-500">Crescimento de parceiros ativos (Abr–Out)</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
          +36% no período
        </span>
      </div>

      <div className="my-auto py-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32 overflow-visible">
          <defs>
            <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18B77A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#18B77A" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#netGrad)" />
          <path d={pathD} fill="none" stroke="#18B77A" strokeWidth="2.5" strokeLinecap="round" />
          {points.map((p) => (
            <g key={p.month}>
              <circle cx={p.x} cy={p.y} r="4" fill="#073B42" stroke="#ffffff" strokeWidth="2" />
              <text
                x={p.x}
                y={p.y - 8}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#073B42"
                className="tabular-nums font-mono"
              >
                {p.active}
              </text>
              <text
                x={p.x}
                y={height + 12}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
                fontWeight="500"
              >
                {p.month}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export const CorporateAdhesionChart: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => {
  const data = metrics.corporateAdhesion;
  const maxEligible = 9000;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Adesão corporativa
          </h3>
          <p className="text-[11px] text-slate-500">Elegíveis vs. Aderentes mensais</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-300" />
            <span className="text-slate-600">Elegíveis</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#3B82F6]" />
            <span className="text-slate-900 font-semibold">Aderentes</span>
          </div>
        </div>
      </div>

      <div className="my-auto py-2 space-y-2.5 text-xs">
        {data.map((d) => {
          const eligiblePct = (d.eligible / maxEligible) * 100;
          const adherentPct = (d.adherent / maxEligible) * 100;

          return (
            <div key={d.month} className="space-y-1">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold text-slate-800">{d.month}</span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500">
                  {d.adherent.toLocaleString('pt-BR')} de {d.eligible.toLocaleString('pt-BR')} ({d.rate}%)
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-blue-500 rounded-l-full"
                  style={{ width: `${adherentPct}%` }}
                />
                <div
                  className="h-full bg-slate-300 rounded-r-full"
                  style={{ width: `${eligiblePct - adherentPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ExpiryDonutChart: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => {
  const data = metrics.contractsByExpiry;
  const total = metrics.totalContracts;

  let cumulativeAngle = 0;
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm">
          Contratos por vencimento
        </h3>
        <span className="text-[11px] text-slate-500 font-medium">Prazo de vigência</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto py-2">
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
            {data.map((item) => {
              const strokeDasharray = `${(item.count / total) * circumference} ${circumference}`;
              const strokeDashoffset = -cumulativeAngle;
              cumulativeAngle += (item.count / total) * circumference;

              return (
                <circle
                  key={item.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">
              {total}
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              contratos
            </span>
          </div>
        </div>

        <div className="space-y-2 flex-1 w-full text-xs">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 tabular-nums">
                <span className="font-bold text-slate-900">{item.count}</span>
                <span className="text-[11px] text-slate-400 w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
