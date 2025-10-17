import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardRedirect() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  // Server-side redirect based on role
  if (session.user.role === 'admin') {
    redirect('/admin/dashboard')
  } else {
    redirect('/student/dashboard')
  }
}
