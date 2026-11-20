import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

// Expose only metric summaries, never URLs or DOM entries.
function report(metric: Metric) {
  const detail = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };
  window.dispatchEvent(new CustomEvent('aiollm:web-vital', { detail }));
  if (import.meta.env.DEV) console.debug('[aiollm:web-vital]', detail);
}

onLCP(report);
onINP(report);
onCLS(report);
