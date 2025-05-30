// app/(dashboard)/customer-support/page.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import toast from 'react-hot-toast';
import { SendHorizontal } from 'lucide-react';

export default function CustomerSupportPage() {
  const [name, setName]         = useState('');
  const [topic, setTopic]       = useState('');
  const [desc,  setDesc]        = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setSubmitting(true);
      setTimeout(() => setSubmitting(false), 1200);
      toast.success("Your response has been submitted!")
    } catch (error) {
      console.log(error)
    }finally{
      setName("")
      setTopic("")
      setDesc("")
    }
  }

  return (
    <main className="h-screen overflow-y-auto bg-gray-50">
      <section className="mx-auto max-w-5xl space-y-10 p-6 md:p-10">

        {/* ░░░ Contact-Support Form ░░░ */}
        <Card className="shadow-md">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-700">
              Contact Support
            </h2>
            <p className="text-sm text-gray-600">
              Reach out to our admins — we’ll get back within 24 h.
            </p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Billing, Technical, Feature Request"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  rows={6}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe your issue or question…"
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end mt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-48 bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
              >
                {submitting ? 'Sending…' : 'Submit'}
                <SendHorizontal size={22} />
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* ░░░ FAQ Accordion ░░░ */}
        <Card className="shadow-md mb-20">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-700">
              Frequently Asked Questions
            </h2>
          </CardHeader>

          <CardContent>
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-200 ">
              {[
              {
  q: 'How long does it take to process uploaded documents?',
  a: 'We typically review and process uploaded documents within 24-48 hours on business days.',
},
{
  q: 'Where can I check the status of my uploaded documents?',
  a: 'After uploading, you will receive an email with a link to track the real-time status of your documents.',
},
{
  q: 'What file formats are accepted for document uploads?',
  a: 'We accept PDF, JPG, PNG, and DOCX file formats for uploads.',
},
{
  q: 'Can I upload multiple files at once?',
  a: 'Yes, you can upload multiple documents in one submission via the upload portal.',
},
{
  q: 'Who can I contact if I have issues uploading my documents?',
  a: 'Our support team is available via email and live chat to assist you with any upload issues.',
},

              ].map(({ q, a }, i) => (
                <AccordionItem value={`faq-${i}`} key={q}>
                  <AccordionTrigger className="py-4 text-base text-left font-medium cursor-pointer text-gray-800 hover:bg-blue-50">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-base text-gray-600">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
