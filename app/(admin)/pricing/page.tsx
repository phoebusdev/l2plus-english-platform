'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Save, DollarSign } from 'lucide-react'

interface PricingPlan {
  id: string
  name: string
  description: string
  priceGbp: number
  billingCycle: 'monthly' | 'one_time'
  stripePriceId: string
  features: string[]
  isActive: boolean
  displayOrder: number
}

export default function AdminPricingManagementPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editedPlans, setEditedPlans] = useState<{ [id: string]: Partial<PricingPlan> }>({})

  useEffect(() => {
    fetchPlans()
  }, [])

  async function fetchPlans() {
    try {
      const response = await fetch('/api/pricing')
      if (response.ok) {
        const data = await response.json()
        setPlans(data.plans || [])
      }
    } catch (error) {
      console.error('Failed to fetch pricing plans:', error)
      alert('Failed to load pricing plans')
    } finally {
      setLoading(false)
    }
  }

  function handleFieldChange(planId: string, field: string, value: any) {
    setEditedPlans({
      ...editedPlans,
      [planId]: {
        ...(editedPlans[planId] || {}),
        [field]: value,
      },
    })
  }

  function handleFeatureChange(planId: string, index: number, value: string) {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return

    const currentFeatures = editedPlans[planId]?.features || plan.features
    const updatedFeatures = [...currentFeatures]
    updatedFeatures[index] = value

    handleFieldChange(planId, 'features', updatedFeatures)
  }

  function addFeature(planId: string) {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return

    const currentFeatures = editedPlans[planId]?.features || plan.features
    handleFieldChange(planId, 'features', [...currentFeatures, ''])
  }

  function removeFeature(planId: string, index: number) {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return

    const currentFeatures = editedPlans[planId]?.features || plan.features
    handleFieldChange(
      planId,
      'features',
      currentFeatures.filter((_, i) => i !== index)
    )
  }

  async function handleSave(planId: string) {
    const updates = editedPlans[planId]
    if (!updates || Object.keys(updates).length === 0) {
      alert('No changes to save')
      return
    }

    setSaving(planId)
    try {
      const response = await fetch(`/api/admin/pricing/${planId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Failed to save pricing plan')
      }

      alert('Pricing plan saved successfully')
      await fetchPlans()

      // Clear edited state for this plan
      const { [planId]: _, ...rest } = editedPlans
      setEditedPlans(rest)
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save pricing plan')
    } finally {
      setSaving(null)
    }
  }

  function getDisplayValue(plan: PricingPlan, field: string): any {
    return editedPlans[plan.id]?.[field as keyof PricingPlan] ?? plan[field as keyof PricingPlan]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <DollarSign className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold text-gray-900 font-poppins">Pricing Management</h1>
      </div>

      <p className="text-gray-600">
        Edit pricing plan names, descriptions, prices, and features. Note: Stripe Price ID and
        Billing Cycle cannot be changed after creation.
      </p>

      <div className="grid grid-cols-1 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                <span className="text-sm font-normal text-gray-600">
                  {plan.billingCycle === 'monthly' ? 'Monthly' : 'One-time'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${plan.id}`}>Plan Name</Label>
                  <Input
                    id={`name-${plan.id}`}
                    value={getDisplayValue(plan, 'name')}
                    onChange={(e) => handleFieldChange(plan.id, 'name', e.target.value)}
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`price-${plan.id}`}>Price (£ in pence)</Label>
                  <Input
                    id={`price-${plan.id}`}
                    type="number"
                    value={getDisplayValue(plan, 'priceGbp')}
                    onChange={(e) =>
                      handleFieldChange(plan.id, 'priceGbp', parseInt(e.target.value))
                    }
                    min="0"
                  />
                  <p className="text-xs text-gray-600">
                    Current: £{(getDisplayValue(plan, 'priceGbp') / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`desc-${plan.id}`}>Description</Label>
                <textarea
                  id={`desc-${plan.id}`}
                  value={getDisplayValue(plan, 'description')}
                  onChange={(e) => handleFieldChange(plan.id, 'description', e.target.value)}
                  className="w-full min-h-[80px] p-3 border rounded-md"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addFeature(plan.id)}
                  >
                    Add Feature
                  </Button>
                </div>

                {(getDisplayValue(plan, 'features') as string[]).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(plan.id, index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFeature(plan.id, index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Stripe Price ID:</strong> {plan.stripePriceId} (cannot be changed)
                </p>

                <Button
                  onClick={() => handleSave(plan.id)}
                  disabled={
                    saving === plan.id ||
                    !editedPlans[plan.id] ||
                    Object.keys(editedPlans[plan.id]).length === 0
                  }
                >
                  {saving === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
