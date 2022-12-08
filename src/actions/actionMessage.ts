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

export const actionSuccessMessage = register({
  name: "successMessage",
  trackEvent: false,
  perform: (_elements, appState, value) => {
    return {
      appState: { ...appState, successMessageType: value },
      commitToHistory: false,
    };
  },
});
