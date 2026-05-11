import React from 'react';
import type { MatrixRow, Callout } from '../../data/schools/types';

type Props = { columns: string[]; rows: MatrixRow[]; callouts?: Callout[] };

export const SupportMatrix: React.FC<Props> = ({ columns, rows, callouts }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      논술 지원 매트릭스
    </h2>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '6px' }}>
        <thead>
          <tr>
            <th style={{ width: '120px' }}></th>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  background: 'var(--primary-deep-forest)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              <th
                style={{
                  background: 'var(--primary-forest)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  textAlign: 'center',
                  width: '120px',
                  verticalAlign: 'middle',
                }}
              >
                {row.rowLabel}
              </th>
              {row.cells.map((cellList, ci) => (
                <td
                  key={ci}
                  style={{
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '1rem',
                    verticalAlign: 'top',
                  }}
                >
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {cellList.map((c, i) => (
                      <li key={i}>
                        {c.label}{c.count !== undefined ? ` (${c.count})` : ''}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {callouts && callouts.length > 0 && (
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {callouts.map((c, i) => (
          <div
            key={i}
            style={{
              padding: '0.5rem 1rem',
              background: '#fdf2f2',
              color: '#7a1f1f',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            💡 {c.text}
          </div>
        ))}
      </div>
    )}
  </div>
);
