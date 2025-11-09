"use client";

import React, { useContext, useMemo, useState, useEffect, useCallback } from "react";
import { Slot } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { useIsMobile } from "./use-mobile";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className = "",
  style = {},
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) setOpenProp(openState);
      else _setOpen(openState);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = useCallback(
    () => (isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o)),
    [isMobile, setOpen, setOpenMobile]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={
            "group/sidebar-wrapper flex min-h-screen w-full " +
            (className || "")
          }
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className = "",
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={
          "bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col " +
          className
        }
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          className={
            "bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 " +
            className
          }
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Mobile Sidebar</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={
        "group peer text-sidebar-foreground hidden md:block " + className
      }
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div className="relative w-[var(--sidebar-width)] bg-transparent transition-all duration-200 ease-linear" />
      <div
        className={
          "fixed inset-y-0 z-10 hidden h-screen w-[var(--sidebar-width)] transition-all duration-200 ease-linear md:flex " +
          (side === "left"
            ? "left-0"
            : "right-0 border-l") +
          " " +
          className
        }
        {...props}
      >
        <div className="bg-sidebar flex h-full w-full flex-col rounded-lg border shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export function SidebarTrigger({ className = "", onClick, ...props }) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={"size-7 " + className}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export function SidebarHeader({ className = "", ...props }) {
  return (
    <div className={"flex flex-col gap-2 p-2 " + className} {...props} />
  );
}

export function SidebarFooter({ className = "", ...props }) {
  return (
    <div className={"flex flex-col gap-2 p-2 " + className} {...props} />
  );
}

export function SidebarSeparator({ className = "", ...props }) {
  return <Separator className={"mx-2 w-auto " + className} {...props} />;
}

export function SidebarContent({ className = "", ...props }) {
  return (
    <div
      className={
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto " + className
      }
      {...props}
    />
  );
}

export function SidebarInput({ className = "", ...props }) {
  return <Input className={"bg-background h-8 w-full " + className} {...props} />;
}
