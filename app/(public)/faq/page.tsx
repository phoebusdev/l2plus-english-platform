'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, BookOpen, CreditCard, Users, Calendar, FileText } from 'lucide-react'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about L2+ English. Can't find what you're looking for? <a href="/contact" className="text-primary hover:underline">Contact us</a>.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {/* Getting Started */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is L2+ English?</AccordionTrigger>
                  <AccordionContent>
                    L2+ English is an online English language learning platform that offers CEFR-based placement testing, live Zoom classes with qualified instructors, and downloadable course materials. We help students improve their English proficiency from beginner (A1) to advanced (C2) levels.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I get started?</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Create a free account on our registration page</li>
                      <li>Take the free placement test to determine your CEFR level</li>
                      <li>Choose a subscription plan that fits your needs</li>
                      <li>Browse and enroll in classes matching your level</li>
                      <li>Start learning with live Zoom sessions!</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Do I need any special software?</AccordionTrigger>
                  <AccordionContent>
                    You'll need a modern web browser (Chrome, Firefox, Safari, or Edge) and the Zoom app installed for attending live classes. All other features work directly in your browser without any additional downloads.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What are the technical requirements?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Stable internet connection (minimum 5 Mbps recommended)</li>
                      <li>Computer, tablet, or smartphone</li>
                      <li>Webcam and microphone (for live classes)</li>
                      <li>Updated web browser with cookies enabled</li>
                      <li>Zoom app (free to download)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Placement Test */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Placement Test
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger>What is the CEFR placement test?</AccordionTrigger>
                  <AccordionContent>
                    Our placement test assesses your English proficiency using the Common European Framework of Reference (CEFR) standard. It consists of 20 multiple-choice questions covering grammar, vocabulary, and reading comprehension. Based on your score, you'll be assigned a level from A1 (beginner) to C2 (proficient).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>How long does the test take?</AccordionTrigger>
                  <AccordionContent>
                    The placement test typically takes 15-20 minutes to complete. You'll see 4 questions per page across 5 pages. There's no time limit, so take your time to answer carefully.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>Can I retake the placement test?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can retake the test after 7 days from your last completion. This waiting period ensures that your improvement is genuine. You can view all your test results in your dashboard to track your progress over time.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>What do the CEFR levels mean?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      <li><strong>A1 (Beginner):</strong> Basic phrases and simple sentences</li>
                      <li><strong>A2 (Elementary):</strong> Everyday expressions and common topics</li>
                      <li><strong>B1 (Intermediate):</strong> Main points of familiar topics</li>
                      <li><strong>B2 (Upper Intermediate):</strong> Complex texts and spontaneous conversations</li>
                      <li><strong>C1 (Advanced):</strong> Demanding texts and flexible language use</li>
                      <li><strong>C2 (Proficient):</strong> Near-native mastery of English</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Pricing & Payments */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Pricing & Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-9">
                  <AccordionTrigger>How much does it cost?</AccordionTrigger>
                  <AccordionContent>
                    We offer four subscription tiers: Basic ($29/month, 4 classes), Standard ($49/month, 8 classes), Premium ($79/month, 12 classes), and Intensive ($129/month, 20 classes). All plans include access to course materials and placement testing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through our secure payment processor, Stripe. We do not store your card details on our servers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 14-day money-back guarantee for first-time subscribers. Try any plan risk-free, and if you're not satisfied within the first 14 days, we'll provide a full refund.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                  <AccordionContent>
                    You can cancel anytime from your account settings or billing page. Simply click "Manage Payment Method" to access the Stripe Customer Portal where you can cancel your subscription. You'll retain access until the end of your current billing period.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-13">
                  <AccordionTrigger>What happens if my payment fails?</AccordionTrigger>
                  <AccordionContent>
                    If a payment fails, you'll have a 3-day grace period to update your payment method. We'll send you email notifications. During the grace period, you retain full access to classes. After 3 days, if payment is still unsuccessful, your subscription will be cancelled.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger>Can I upgrade or downgrade my plan?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can change your plan at any time through the billing portal. When upgrading, you'll be charged a prorated amount for the remainder of the billing period. When downgrading, the change takes effect at the start of your next billing cycle.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Classes */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-15">
                  <AccordionTrigger>How do I join a class?</AccordionTrigger>
                  <AccordionContent>
                    Browse available classes in the "My Classes" section. You'll only see classes matching your CEFR level. Click "Enroll Now" to join a class. Once enrolled, you can click "Join Class" to access the Zoom meeting when the class starts.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-16">
                  <AccordionTrigger>How many students are in each class?</AccordionTrigger>
                  <AccordionContent>
                    Class sizes vary but are typically limited to 10-15 students to ensure everyone gets personalized attention from the instructor. You can see the current enrollment count and capacity for each class before enrolling.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-17">
                  <AccordionTrigger>What if I miss a class?</AccordionTrigger>
                  <AccordionContent>
                    We understand that life happens! While there's no penalty for missing classes, they don't roll over to the next month. We recommend reviewing the course materials available for that session to catch up on what you missed.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-18">
                  <AccordionTrigger>Are classes recorded?</AccordionTrigger>
                  <AccordionContent>
                    No, our classes are live-only and not recorded to protect student privacy and encourage active participation. However, all course materials and resources used in the class are available for download in your Materials section.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-19">
                  <AccordionTrigger>Can I switch to a different level?</AccordionTrigger>
                  <AccordionContent>
                    Your level is determined by your placement test results. If you feel you're in the wrong level, you can retake the test after 7 days, or contact an admin who can manually adjust your level based on your progress and performance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Account & Support */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Account & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-20">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    Click the "Forgot Password" link on the login page. Enter your email address, and we'll send you a password reset link. Follow the link to create a new password. For security, reset links expire after 1 hour.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-21">
                  <AccordionTrigger>Can I change my email address?</AccordionTrigger>
                  <AccordionContent>
                    Currently, email changes must be requested through our support team for security reasons. Contact us at support@l2plusenglish.com with your current email and the new email you'd like to use. We'll verify your identity and make the change.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-22">
                  <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                  <AccordionContent>
                    To delete your account and all associated data, please contact our support team at privacy@l2plusenglish.com. We'll process your request within 30 days in compliance with GDPR regulations. Note that active subscriptions must be cancelled first.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-23">
                  <AccordionTrigger>How can I contact support?</AccordionTrigger>
                  <AccordionContent>
                    You can reach our support team via:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Email: support@l2plusenglish.com</li>
                      <li>Contact form: <a href="/contact" className="text-primary hover:underline">www.l2plusenglish.com/contact</a></li>
                      <li>Phone: +44 20 1234 5678 (Mon-Fri, 9am-6pm GMT)</li>
                    </ul>
                    <p className="mt-2">We typically respond within 24 hours on business days.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-24">
                  <AccordionTrigger>Is my data secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We take security seriously. All data is transmitted over encrypted connections (SSL/TLS), passwords are hashed using industry-standard Argon2id encryption, and we never store your credit card details (handled by Stripe). Read our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for details.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Still Have Questions */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/contact">Contact Support</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/register">Create Free Account</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
