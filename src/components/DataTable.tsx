import React, { useState } from 'react';

type Column = {
  key: string;
  label: string;
  render?: (val: any) => React.ReactNode;
};

type DataTableProps = {
  title: string;
  subtitle?: string;
  columns: Column[];
  data: any[];
  mobileTitleKey: string;
};

export const DataTable: React.FC<DataTableProps> = ({ title, subtitle, columns, data, mobileTitleKey }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="data-table-container animate-fade-in">
      <div className="data-table-header">
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>
          {subtitle && <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0, marginTop: '0.25rem', fontWeight: 400 }}>{subtitle}</p>}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="table-wrapper desktop-only" style={{ display: 'none' }}>
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>
                    {col.render ? col.render(row[col.key]) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion View */}
      <div className="mobile-only" style={{ display: 'none' }}>
        {data.map((row, rowIdx) => {
          const isOpen = openIndexes.includes(rowIdx);
          return (
            <div key={rowIdx} className="accordion-item">
              <button 
                className="accordion-header" 
                onClick={() => toggleAccordion(rowIdx)}
              >
                <span>{row[mobileTitleKey]}</span>
                <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
              </button>
              <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                <div style={{ padding: '0.5rem 0' }}>
                  {columns.map((col, colIdx) => {
                    if (col.key === mobileTitleKey) return null;
                    return (
                      <div key={colIdx} style={{ marginBottom: '0.75rem' }}>
                        <strong style={{ display: 'block', color: 'var(--primary-deep-forest)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{col.label}</strong>
                        <div style={{ fontSize: '0.95rem' }}>
                          {col.render ? col.render(row[col.key]) : row[col.key]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
