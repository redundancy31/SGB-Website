"use client";

import { useMemo, useState, type FormEvent } from "react";

import { companyProfile } from "@/data/company-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  details: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  serviceNeeded: "",
  details: ""
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.company.trim()) next.company = "Company name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.serviceNeeded.trim()) next.serviceNeeded = "Select a service.";
    if (form.details.trim().length < 20) next.details = "Please provide at least 20 characters.";
    return next;
  }, [form]);

  const onChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: keyof FormState) => setTouched((prev) => ({ ...prev, [key]: true }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      serviceNeeded: true,
      details: true
    });
    if (Object.keys(errors).length) return;
    setSubmitted(true);
    setForm(initialState);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <h3 className="text-lg font-semibold text-primary">Inquiry submitted (Demo State)</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you. This is a frontend mock submit. Connect your backend endpoint to process inquiries.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
          Submit another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <Input id="name" value={form.name} onChange={(e) => onChange("name", e.target.value)} onBlur={() => onBlur("name")} />
          {touched.name && errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
            Company
          </label>
          <Input
            id="company"
            value={form.company}
            onChange={(e) => onChange("company", e.target.value)}
            onBlur={() => onBlur("company")}
          />
          {touched.company && errors.company ? <p className="mt-1 text-xs text-red-600">{errors.company}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} onBlur={() => onBlur("email")} />
          {touched.email && errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <Input id="phone" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} onBlur={() => onBlur("phone")} />
          {touched.phone && errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium">
          Service Needed
        </label>
        <Select
          id="service"
          value={form.serviceNeeded}
          onChange={(e) => onChange("serviceNeeded", e.target.value)}
          onBlur={() => onBlur("serviceNeeded")}
        >
          <option value="">Select service area</option>
          {companyProfile.services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
        </Select>
        {touched.serviceNeeded && errors.serviceNeeded ? <p className="mt-1 text-xs text-red-600">{errors.serviceNeeded}</p> : null}
      </div>

      <div>
        <label htmlFor="details" className="mb-1.5 block text-sm font-medium">
          Project Details
        </label>
        <Textarea
          id="details"
          value={form.details}
          onChange={(e) => onChange("details", e.target.value)}
          onBlur={() => onBlur("details")}
          placeholder="Share your project requirements, timeline and key constraints."
        />
        {touched.details && errors.details ? <p className="mt-1 text-xs text-red-600">{errors.details}</p> : null}
      </div>

      <p className="text-xs text-muted-foreground">No obligation consultation. We respond within 1-2 business days.</p>
      <Button type="submit">Submit Inquiry</Button>
    </form>
  );
}
