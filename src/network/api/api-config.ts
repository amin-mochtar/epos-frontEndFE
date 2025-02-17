// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
// const API_URL = 'https://pcarecruit.azurewebsites.net/pca/';
// const envConfig = require('../../config/env.js');

import { APIM_BASE_URL, APIM_AGENT } from '@env'

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  // api path
  url: string
  // Milliseconds before we timeout the request.
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: `${APIM_BASE_URL}${APIM_AGENT}`,
  timeout: 60000,
}
