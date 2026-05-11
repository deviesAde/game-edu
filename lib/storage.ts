export const getTokens = (): number => {
  if (typeof window === "undefined") return 0;
  const tokens = localStorage.getItem("game_tokens");
  return tokens ? parseInt(tokens, 10) : 0;
};

export const addTokens = (amount: number = 1): number => {
  if (typeof window === "undefined") return 0;
  const current = getTokens();
  const newAmount = current + amount;
  localStorage.setItem("game_tokens", newAmount.toString());
  // Dispatch a custom event so UI can update immediately
  window.dispatchEvent(new Event("tokensUpdated"));
  return newAmount;
};

export const resetTokens = (): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("game_tokens", "0");
  window.dispatchEvent(new Event("tokensUpdated"));
};
