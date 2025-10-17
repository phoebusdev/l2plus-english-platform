import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Check if user is authenticated
  if (!session?.user) {
    redirect('/login')
  }

  // Redirect admins to admin dashboard
  if (session.user.role === 'admin') {
    redirect('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        userRole="student"
        userName={session.user.name || session.user.email}
      />
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  )
}
