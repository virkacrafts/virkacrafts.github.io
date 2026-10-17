# Sanity webhook cache refresh

The website exposes a signed webhook endpoint at `/api/revalidate`. It invalidates the site layout and pages when a published Sanity document changes.

## Configure the shared secret

1. Create a unique random secret with at least 32 characters.
2. Add it as `SANITY_REVALIDATE_SECRET` in the Vercel project's Production environment (and Preview if needed).
3. Add the same secret to the Sanity webhook's **Secret** field. Keep it out of Git and do not send it in chat.

## Create the Sanity webhook

- URL: `https://virkacrafts.com/api/revalidate`
- Method: `POST`
- Trigger on: create, update, and delete
- Filter: `_type in ["siteSettings", "guide", "product", "pattern", "category", "tag", "course", "post"]`
- Projection: `{_type}`
- Secret: the shared secret configured above

After deployment, send a test delivery from Sanity. A successful request returns HTTP 200 and a JSON response with `revalidated: true`. The handler validates Sanity's request signature and rejects missing or invalid signatures.
