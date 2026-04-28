"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <header className="h-10 flex items-center px-4 border-b bg-white">
            <SidebarTrigger />
          </header>

          <main className="flex-1 p-6 bg-[#f7f7f8] overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}