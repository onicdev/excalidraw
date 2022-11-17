/* eslint-disable prettier/prettier */
import { register } from "./register";

export const actionErrorMessage = register({
  name: "errorMessage",
  trackEvent: false,
  perform: (_elements, appState, value: string) => {
    return {
      appState: { ...appState, errorMessage: value },
      commitToHistory: false,
    };
  },
});
