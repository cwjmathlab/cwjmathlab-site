import React from 'react';
import type { Lecture } from '../data/lectures';
import { getSchoolName, getThumbnailUrl, getYoutubeUrl } from '../data/lectures';

type Props = { lecture: Lecture };

export const LectureCard: React.FC<Props> = ({ lecture }) => {
  const handleClick = () => {
    window.open(getYoutubeUrl(lecture.videoId), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: 'var(--bg-white)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
        <img
          src={getThumbnailUrl(lecture.videoId)}
          alt={lecture.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.0)',
            transition: 'background 0.2s',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            ▶
          </div>
        </div>
      </div>
      <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <h3
          style={{
            margin: 0,
            color: 'var(--primary-deep-forest)',
            fontSize: '1rem',
            lineHeight: 1.4,
            fontWeight: 600,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {lecture.title}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: 'auto' }}>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              background: 'var(--primary-deep-forest)',
              color: 'var(--bg-cream)',
              fontWeight: 600,
            }}
          >
            {getSchoolName(lecture.schoolId)}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {lecture.year}학년도
          </span>
        </div>
      </div>
    </div>
  );
};
