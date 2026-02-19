/**
 * AUTH UTILITIES
 *
 * Phase 1: Simple token-based auth (current)
 *   - Tokens stored in environment variables
 *   - Middleware validates tokens on protected routes
 *   - Cookies persist access across visits
 *
 * Phase 2: NextAuth.js (future)
 *   - Magic link or credential-based login
 *   - Session management
 *   - Role-based access (admin vs client)
 *
 * To generate a client token:
 *   openssl rand -hex 32
 *
 * To add a new client:
 *   1. Generate token
 *   2. Add to .env.local: CLIENT_TOKEN_CLIENTID=<token>
 *   3. Share access link: /proposals/clientid?token=<token>
 *   4. Client's browser will store cookie on first visit
 */

/**
 * Generate an access URL for a client.
 */
export function generateClientAccessUrl(
  baseUrl: string,
  clientId: string,
  token: string,
  path: 'proposals' | 'portal' = 'proposals'
): string {
  return `${baseUrl}/${path}/${clientId}?token=${token}`
}

/**
 * Validate a client token against environment.
 * Returns true if valid.
 */
export function validateClientToken(
  clientId: string,
  token: string
): boolean {
  const envKey = `CLIENT_TOKEN_${clientId.toUpperCase()}`
  const validToken = process.env[envKey]
  return !!validToken && token === validToken
}
