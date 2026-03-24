"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AppNotification } from "@/features/notifications/types";

interface NotificationStoreState {
  addNotification: (notification: AppNotification) => void;
  items: AppNotification[];
  markAllAsRead: () => void;
  markAsRead: (notificationId: string) => void;
}

/**
 * Persists the in-app notification center state across refreshes.
 */
export const useNotificationStore = create<NotificationStoreState>()(
  persist(
    (set) => ({
      addNotification: (notification) =>
        set((state) => ({
          items: [notification, ...state.items].slice(0, 20),
        })),
      items: [],
      markAllAsRead: () =>
        set((state) => ({
          items: state.items.map((item) => ({
            ...item,
            isRead: true,
          })),
        })),
      markAsRead: (notificationId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === notificationId ? { ...item, isRead: true } : item
          ),
        })),
    }),
    {
      name: "notification-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
