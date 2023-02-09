export type Configuration = {
  // The server url
  serverUrl: string;
  // The default language
  defaultLanguage: string;
  // An array of supported languages
  supportedLanguages: string[];
  // The key for the recaptcha site
  recaptchaSiteKey: string;
  // The default format to display dates and time
  defaultDateTimeFormat: string;
};
