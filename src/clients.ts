import colors from "./colors";
import { AppState } from "./types";

export const getClientColors = (clientId: string, appState: AppState) => {
  if (appState?.collaborators) {
    const currentUser = appState.collaborators.get(clientId);
    if (currentUser?.color) {
      return currentUser.color;
    }
  }
  // Naive way of getting an integer out of the clientId
  const sum = clientId.split("").reduce((a, str) => a + str.charCodeAt(0), 0);

  const backgrounds = colors.clientBackgroundColors;
  return {
    background: backgrounds[sum % backgrounds.length],
    stroke: "#FFFFFF",
  };
};

export const getClientInitials = (userName?: string | null) => {
  if (!userName) {
    return "?";
  }
  return userName.trim()[0].toUpperCase();
};
