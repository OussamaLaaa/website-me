'use client';

export default function SceneDivider() {
  return (
    <div aria-hidden className="relative h-24 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-transparent opacity-80" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff12 1px, transparent 1px), linear-gradient(90deg, #ffffff12 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />
    </div>
  );
}
