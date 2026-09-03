import React from 'react';
import type { DataTableSection as DataTableProps } from '../../data/schools/types';

/** 숫자·퍼센트·부호 편차는 오른쪽 정렬, 텍스트는 왼쪽 정렬 */
const isNumericLike = (v: string | number) =>
  typeof v === 'number' || /^[+−\-]?\d+(\.\d+)?%?$/.test(String(v).trim()) || /^\d+ \/ \d+$/.test(String(v).trim());

export const DataTableSection: React.FC<Omit<DataTableProps, 'type'>> = ({ title, subtitle, columns, rows, note }) => (
  <section className="scroll-reveal" style={{ marginBottom: '3rem' }}>
    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-deep-forest)', margin: '0 0 0.4rem', lineHeight: 1.35 }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ margin: '0 0 1rem', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{subtitle}</p>
    )}
    <div
      style={{
        overflowX: 'auto',
        background: 'var(--bg-white)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', minWidth: columns.length > 4 ? '640px' : '360px' }}>
        <thead>
          <tr style={{ background: 'var(--primary-deep-forest)', color: 'var(--bg-cream)' }}>
            {columns.map((c, i) => (
              <th
                key={i}
                style={{
                  padding: '0.7rem 0.8rem',
                  textAlign: i === 0 ? 'left' : 'right',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  fontSize: '0.85rem',
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} style={{ borderTop: '1px solid var(--border-color)', background: ri % 2 ? 'var(--bg-cream)' : 'transparent' }}>
              {r.map((cell, ci) => {
                const s = String(cell);
                const negative = s.startsWith('−') || (s.startsWith('-') && s.length > 1);
                const positive = s.startsWith('+');
                return (
                  <td
                    key={ci}
                    style={{
                      padding: '0.6rem 0.8rem',
                      textAlign: ci === 0 ? 'left' : isNumericLike(cell) ? 'right' : 'left',
                      fontWeight: ci === 0 ? 700 : 500,
                      color: ci === 0 ? 'var(--text-dark)' : negative ? 'var(--primary-forest)' : positive ? 'var(--accent-red)' : 'var(--text-dark)',
                      whiteSpace: ci === 0 ? 'normal' : 'nowrap',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {s}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {note && (
      <p
        style={{
          margin: '0.8rem 0 0',
          padding: '0.75rem 1rem',
          fontSize: '0.86rem',
          color: 'var(--text-muted)',
          background: 'var(--bg-cream)',
          borderRadius: '8px',
          lineHeight: 1.6,
        }}
      >
        ※ {note}
      </p>
    )}
  </section>
);
