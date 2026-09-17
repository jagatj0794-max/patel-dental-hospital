/**
 * Analytics and Conversion Tracking Service
 * Patel Dental Hospital
 * 
 * Supports dynamic loading of Google Analytics 4 (GA4) 
 * if environment keys are supplied, with safe guards for SSR/SSG.
 */

const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

// Safely initialize dataLayer and tracking queues on window object
if (typeof window !== 'undefined') {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = (window as any).gtag || function() {
    (window as any).dataLayer.push(arguments);
  };
}

let isGoogleInitialized = false;

/**
 * Dynamically initializes Google Analytics 4 (GA4) if Measurement ID is provided
 */
export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined' || !GA_ID || isGoogleInitialized) return;

  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    const gtag = (window as any).gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    isGoogleInitialized = true;
    console.log(`[PDH Analytics] GA4 initialized successfully with ID: ${GA_ID}`);
  } catch (err) {
    console.error('[PDH Analytics] Failed to initialize GA4:', err);
  }
}

/**
 * Master initializer for all configured analytics.
 * Should be called once during application bootstrap (e.g. App.tsx / main.tsx).
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  initGoogleAnalytics();
}

/**
 * Tracks a custom event to GA4
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;

  // Track to GA4
  if (GA_ID && isGoogleInitialized && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }

  // Log to console in development mode
  if (import.meta.env.DEV) {
    console.log(`[PDH Analytics Event] Name: ${eventName}`, params);
  }
}

/**
 * Specific conversion trackers
 */

export function trackWhatsAppClick(channel: string): void {
  trackEvent('whatsapp_click', {
    event_category: 'Engagement',
    event_label: `WhatsApp ${channel}`,
    channel: channel
  });
}

export function trackPhoneClick(number: string, location: string): void {
  trackEvent('phone_click', {
    event_category: 'Engagement',
    event_label: `Phone Call ${location}`,
    phone_number: number,
    location: location
  });
}

export function trackAppointmentCTAClick(ctaText: string, location: string): void {
  trackEvent('appointment_cta_click', {
    event_category: 'Engagement',
    event_label: `CTA: ${ctaText} from ${location}`,
    cta_text: ctaText,
    location: location
  });
}

export function trackAppointmentFormSubmit(success: boolean, data: Record<string, any> = {}): void {
  if (success) {
    trackEvent('book_appointment', {
      event_category: 'Conversion',
      event_label: 'Appointment Booking Success',
      treatment: data.treatment || 'Not Specified',
      preferred_doctor: data.doctor || 'Any Doctor',
      value: 1.0,
      currency: 'INR'
    });
  } else {
    trackEvent('appointment_booking_failed', {
      event_category: 'Error',
      event_label: 'Appointment Booking Failure',
      error_message: data.error || 'Unknown Error'
    });
  }
}

export function trackContactFormSubmit(success: boolean, subject: string): void {
  if (success) {
    trackEvent('submit_contact', {
      event_category: 'Conversion',
      event_label: 'Contact Form Submission Success',
      subject: subject || 'General Query'
    });
  } else {
    trackEvent('contact_submission_failed', {
      event_category: 'Error',
      event_label: 'Contact Form Submission Failure'
    });
  }
}

export function trackServiceEnquiryClick(serviceName: string, actionType: string): void {
  trackEvent('service_enquiry', {
    event_category: 'Lead Generation',
    event_label: `Enquiry for ${serviceName} via ${actionType}`,
    service_name: serviceName,
    action_type: actionType
  });
}
