// src/components/chatEvents.ts

export const CHAT_OPEN_EVENT = "yext:chat-open";
export const CHAT_CLOSE_EVENT = "yext:chat-close";

export function openChat(payload?: { messagePrefill?: string }) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(CHAT_OPEN_EVENT, {
      detail: payload,
    })
  );
}

export function closeChat() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent(CHAT_CLOSE_EVENT));
}
