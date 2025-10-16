'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BookOpen,
  User,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  userRole?: 'student' | 'admin'
  userName?: string
  userAvatar?: string
}

export function Sidebar({ userRole = 'student', userName, userAvatar }: SidebarProps) {
  const pathname = usePathname()

  const studentNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/test', label: 'Placement Test', icon: FileText },
    { href: '/classes', label: 'My Classes', icon: Calendar },
    { href: '/materials', label: 'Materials', icon: BookOpen },
  ]

  const adminNavItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/students', label: 'Students', icon: User },
    { href: '/admin/classes', label: 'Classes', icon: Calendar },
    { href: '/admin/test-management', label: 'Test Management', icon: FileText },
    { href: '/admin/content', label: 'Content', icon: BookOpen },
  ]

  const navItems = userRole === 'admin' ? adminNavItems : studentNavItems

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="px-6 py-8 border-b border-gray-200">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary font-poppins">
              L2+ English
            </span>
          </Link>
        </div>

        {/* User Profile Section */}
        {userName && (
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary border-l-4 border-primary'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-6 border-t border-gray-200">
          <button
            onClick={() => {
              // Implement logout logic
              window.location.href = '/api/auth/signout'
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
