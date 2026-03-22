import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Route segment config
export const size = {
  width: 96,
  height: 96,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #2563eb, #1e40af)', // Primary blue gradient
          color: 'white',
          fontSize: 60,
          fontWeight: 800,
          fontFamily: 'Inter, sans-serif',
          borderRadius: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        F
      </div>
    ),
    {
      ...size,
    }
  );
}
