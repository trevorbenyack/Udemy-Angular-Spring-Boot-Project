// Sets up app configuration for OpenID Connect
// Used in LoginComponent to set up new Okta Sign-In widget

// removed variable assignment to follow Okta's sample project
export default {
  oidc: {
    clientId: '0oa1h6zg0thIRYeXM5d7',
    issuer: 'https://dev-35767185.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    // Scopes:
    //  openid: required for authentication requests
    scopes: ['openid', 'profile', 'email']
  }
}
