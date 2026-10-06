import {createClient} from 'https://esm.sh/@sanity/client@6';

// Public read-only client. Never add a Sanity write token to this browser file.
window.virkaSanity = createClient({
  projectId: 'itnvs0vu',
  dataset: 'production',
  apiVersion: '2026-10-06',
  useCdn: true
});
window.dispatchEvent(new Event('virka-sanity-ready'));
