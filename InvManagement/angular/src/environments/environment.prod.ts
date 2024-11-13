import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'InvManagement',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44324/',
    redirectUri: baseUrl,
    clientId: 'InvManagement_App',
    responseType: 'code',
    scope: 'offline_access InvManagement',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44324',
      rootNamespace: 'InvManagement',
    },
  },
} as Environment;
