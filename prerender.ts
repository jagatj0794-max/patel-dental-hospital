/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  dentalImplantsFaqs,
  fullMouthFaqs,
  invisibleAlignersFaqs,
  rootCanalFaqs,
  smileMakeoverFaqs,
  crownsBridgesFaqs,
  pediatricDentistryFaqs
} from './src/data/serviceFaqs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routes to pre-render
const routes = [
  {
    path: '/',
    pageId: 'home',
    title: 'Best Dental Hospital in Rajkot | Patel Dental Hospital',
    description: 'Patel Dental Hospital is the best dental hospital in Rajkot, Gujarat & India. Offering advanced dental care in Rajkot, including dental implants, root canal treatment, braces, invisible aligners, and cosmetic dentistry.',
    keywords: 'Best Dental Hospital in Rajkot, Best Dental Clinic in Rajkot, Best Dental Hospital in India, Best Dental Hospital in Gujarat, Dental Hospital in Rajkot, Dental Clinic in Rajkot'
  },
  {
    path: '/about',
    pageId: 'about',
    title: 'About Patel Dental Hospital | Best Dentist & Dental Clinic in Rajkot',
    description: 'Discover Patel Dental Hospital in Rajkot, Gujarat. Led by Dr. Vipul Patel with 18+ years experience. Providing advanced, painless dental treatments under one roof with in-house CBCT and USA-standard sterilization.',
    keywords: 'About Patel Dental Hospital, Best Dentist in Rajkot, Dental Clinic in Rajkot, Best Dental Hospital in Rajkot'
  },
  {
    path: '/sameday',
    pageId: 'sameday',
    title: 'Same Day Fixed Teeth & Implants in Rajkot | Patel Dental Hospital',
    description: 'Get fixed teeth in a single day at Patel Dental Hospital, Rajkot. Advanced same-day implant technology, guided surgery templates, and quick restoration.',
    keywords: 'Same Day Fixed Teeth Rajkot, Same Day Implants Rajkot, Teeth in a Day Rajkot, Immediate Load Implants Gujarat'
  },
  {
    path: '/services/dental-implants',
    pageId: 'services/dental-implants',
    title: 'Full Mouth Dental Implants Rajkot | Patel Dental Hospital',
    description: 'Best dental implant hospital in Rajkot. Get permanent, natural-looking tooth replacements with advanced computer-guided implants by Dr. Vipul Patel.',
    keywords: 'Dental Implants Rajkot, Best Implant Dentist Rajkot, Full Mouth Implants Rajkot, Teeth Implants Cost Rajkot'
  },
  {
    path: '/services/invisible-aligners',
    pageId: 'services/invisible-aligners',
    title: 'Clear Invisible Aligners Rajkot | Patel Dental Hospital',
    description: 'Straighten your teeth invisibly with premium clear aligners at Patel Dental Hospital, Rajkot. USA-certified digital orthodontic templates for a perfect smile.',
    keywords: 'Invisible Aligners Rajkot, Clear Aligners Rajkot, Orthodontist Rajkot, Teeth Straightening Rajkot'
  },
  {
    path: '/services/pediatric-dentistry',
    pageId: 'services/pediatric-dentistry',
    title: 'Best Pediatric Dentist in Rajkot | Kids Dental Care',
    description: 'Kid-friendly dental treatments in Rajkot at Patel Dental Hospital. Painless pediatric dentistry, preventive fluoride, and gentle cavity treatments.',
    keywords: 'Pediatric Dentist Rajkot, Kids Dental Clinic Rajkot, Childrens Dentist Rajkot, Kids Tooth Cavity Treatment'
  },
  {
    path: '/services/braces-treatment',
    pageId: 'services/braces-treatment',
    title: 'Best Braces Treatment in Rajkot | Ceramic & Metal Braces',
    description: 'Advanced orthodontic braces treatment in Rajkot at Patel Dental Hospital. Metal, ceramic, and self-ligating braces for kids & adults by specialists.',
    keywords: 'Braces Treatment Rajkot, Best Orthodontist Rajkot, Ceramic Braces Rajkot, Metal Braces Rajkot'
  },
  {
    path: '/gallery',
    pageId: 'gallery',
    title: 'Smile Gallery & Success Stories | Patel Dental Hospital',
    description: 'View our before & after clinical cases, dental implant transformations, and happy patient moments at Patel Dental Hospital, Rajkot.',
    keywords: 'Dental Before After Rajkot, Smile Makeover Cases Rajkot, Dental Hospital Success Stories, Clinical Gallery Rajkot'
  },
  {
    path: '/social-service',
    pageId: 'social-service',
    title: 'Social Dental Service & Community Care | Patel Dental Hospital',
    description: 'Patel Dental Hospital actively leads community dental wellness drives, free diagnostic camps, and educational seminars across Rajkot and rural Gujarat.',
    keywords: 'Social Dental Service Rajkot, Free Dental Camps Gujarat, Community Dental Care, Patel Dental Hospital Outreach'
  },
  {
    path: '/technology',
    pageId: 'technology',
    title: 'Advanced Diagnostic & Clinical Technology | Patel Dental Hospital',
    description: 'Explore the advanced diagnostics at Patel Dental Hospital: In-house 3D CBCT, USA-standard sterilizers, and state-of-the-art computer guided systems.',
    keywords: 'Dental Technology Rajkot, 3D CBCT Scan Rajkot, Dental Autoclave Sterilization, Guided Dental Surgery'
  },
  {
    path: '/why-choose-us',
    pageId: 'why-choose-us',
    title: 'Why Choose Patel Dental Hospital | Advanced Dental Care Rajkot',
    description: 'Discover why Patel Dental Hospital is the most trusted dental clinic in Rajkot. Advanced equipment, experienced doctors, painless treatments, and high success rates.',
    keywords: 'Best Dentist in Rajkot, Why Patel Dental Hospital, Advanced Dental Clinic Gujarat, Painless Dentistry Rajkot'
  },
  {
    path: '/international',
    pageId: 'international',
    title: 'Dental Tourism in India | Patel Dental Hospital Rajkot',
    description: 'Combine your travel with world-class dental treatments in Rajkot, India. Premium implants & cosmetic dentistry at a fraction of Western costs for international patients.',
    keywords: 'Dental Tourism India, Dental Tourism Rajkot, Cheap Implants India, International Dental Patient Gujarat'
  },
  {
    path: '/blogs',
    pageId: 'blogs',
    title: 'Dental Health Blog & Articles | Patel Dental Hospital',
    description: 'Read the latest dental health tips, expert advice, and advanced treatment articles written by specialists at Patel Dental Hospital, Rajkot.',
    keywords: 'Dental Blog Rajkot, Teeth Care Tips, Dentist Articles Gujarat, Oral Health Blog India'
  },
  {
    path: '/doctors',
    pageId: 'doctors',
    title: 'Best Dentists & Dental Surgeons in Rajkot | Patel Dental Hospital',
    description: 'Meet our team of highly qualified dental specialists and surgeons in Rajkot, led by Dr. Vipul Patel. 18+ years of excellence in advanced oral healthcare.',
    keywords: 'Best Dentists in Rajkot, Dental Surgeon Rajkot, Orthodontist Rajkot, Dr Vipul Patel Rajkot'
  },
  {
    path: '/contact',
    pageId: 'contact',
    title: 'Contact Patel Dental Hospital Rajkot | Book Appointment',
    description: 'Get in touch with Patel Dental Hospital, Rajkot. Phone numbers, maps, address and direct online consultation booking for Gayatrinagar & Amin Marg branches.',
    keywords: 'Contact Patel Dental Hospital, Patel Dental Hospital Address, Dentist Phone Number Rajkot, Book Dentist Appointment Rajkot'
  },
  {
    path: '/services/smile-makeover',
    pageId: 'services/smile-makeover',
    title: 'Smile Makeover & Cosmetic Smile Designing in Rajkot | Patel Dental Hospital',
    description: 'Get your dream smile designed by expert cosmetic dentists in Rajkot. Patel Dental Hospital offers professional smile correction, veneers, and aesthetic smile makeovers.',
    keywords: 'Smile Makeover, Smile Designing, Cosmetic Dentistry, Smile Correction, Aesthetic Dentistry, Cosmetic Dentist Rajkot, Porcelain Veneers, Digital Smile Design, Patel Dental Hospital'
  },
  {
    path: '/services/full-mouth-rehabilitation',
    pageId: 'services/full-mouth-rehabilitation',
    title: 'Full Mouth Rehabilitation & Restoration in Rajkot | Patel Dental Hospital',
    description: 'Complete smile reconstruction and bite correction with full mouth rehabilitation in Rajkot. Painless restorative procedures by specialist clinicians at Patel Dental Hospital.',
    keywords: 'Full Mouth Rehabilitation, Full Mouth Restoration, Complete Dental Rehabilitation, Full Mouth Reconstruction, Restorative Dentistry, Advanced Dental Care in Rajkot, Dentist in Rajkot'
  },
  {
    path: '/services/crowns-bridges',
    pageId: 'services/crowns-bridges',
    title: 'Premium Dental Crowns & Bridges in Rajkot | Zirconia & Ceramic Caps',
    description: 'Restore damaged or missing teeth with high-durability Zirconia and Ceramic dental crowns and bridges in Rajkot at Patel Dental Hospital. CAD/CAM custom restorations.',
    keywords: 'Crowns and Bridges, Dental Crown, Zirconia Crown, Ceramic Crown, Dental Bridge, Tooth Cap, Best Dentist in Rajkot, Dental Clinic Rajkot, Restorative Dentistry, Patel Dental Hospital'
  },
  {
    path: '/services/root-canal-treatment',
    pageId: 'services/root-canal-treatment',
    title: 'Painless Single Sitting Root Canal Treatment in Rajkot | RCT Specialist',
    description: 'Experience comfortable, single-sitting Root Canal Treatment (RCT) in Rajkot at Patel Dental Hospital. Endodontic specialist care to resolve tooth pain & save natural teeth.',
    keywords: 'Root Canal Treatment, RCT, Single Sitting RCT, Root Canal Specialist, Tooth Pain Treatment, Endodontic Treatment, Best Dentist in Rajkot, Dental Clinic in Rajkot, Patel Dental Hospital'
  },
  {
    path: '/services/teeth-whitening',
    pageId: 'services/teeth-whitening',
    title: 'Professional Laser Teeth Whitening in Rajkot | Instant Bright Smile',
    description: 'Get a sparkling white smile in under 60 minutes with advanced laser teeth whitening in Rajkot at Patel Dental Hospital. Safe, painless, and highly effective shade brightening.',
    keywords: 'Teeth Whitening, Laser Teeth Whitening, Professional Teeth Whitening, Tooth Whitening, Cosmetic Dentist Rajkot, Best Dental Hospital in Rajkot, Instant Teeth Brightening, Patel Dental Hospital'
  },
  {
    path: '/services/wisdom-tooth-surgery',
    pageId: 'services/wisdom-tooth-surgery',
    title: 'Painless Wisdom Tooth Surgery & Removal in Rajkot | Patel Dental Hospital',
    description: 'Safe, comfortable, and pain-free wisdom tooth removal and impacted tooth surgery in Rajkot at Patel Dental Hospital. Advanced micromotor systems for fast post-op recovery.',
    keywords: 'Wisdom Tooth Removal, Wisdom Tooth Surgery, Impacted Tooth Surgery, Tooth Extraction, Best Dentist in Rajkot, Oral Surgeon Rajkot, Painless Extraction Rajkot, Patel Dental Hospital'
  },
  {
    path: '/services/tooth-coloured-filling',
    pageId: 'services/tooth-coloured-filling',
    title: 'Biocompatible Tooth Coloured Fillings in Rajkot | Composite Restoration',
    description: 'Restore cavities naturally with dental composite fillings in Rajkot. Patel Dental Hospital offers durable, aesthetic, and metal-free tooth-coloured tooth restorations.',
    keywords: 'Tooth Filling, Composite Filling, Tooth Coloured Filling, Dental Filling, Cavity Restoration, Best Dentist in Rajkot, Dental Clinic Rajkot, Preventive Dentistry, Patel Dental Hospital'
  },
  {
    path: '/blog/dental-implants-rajkot',
    pageId: 'blog/dental-implants-rajkot',
    title: 'Dental Implants in Rajkot: Cost, Procedure & Best Clinic | Patel Dental Hospital',
    description: 'Looking for the best dental clinic in Rajkot for tooth implants? Read our complete dental implants treatment guide: cost, process, and benefits at Patel Dental Hospital.',
    keywords: 'Dental Implants in Rajkot, best dental clinic in Rajkot, dental implant treatment, dental implant cost in Rajkot, implant specialist dentist Rajkot'
  },
  {
    path: '/blog/braces-vs-clear-aligners',
    pageId: 'blog/braces-vs-clear-aligners',
    title: 'Braces vs Clear Aligners: Cost & Results in Rajkot | Patel Dental Hospital',
    description: 'Wondering about braces vs clear aligners? Read our comprehensive comparison guide on orthodontic treatment cost, benefits, and invisible aligners in Rajkot.',
    keywords: 'Braces vs Clear Aligners, braces treatment in Rajkot, clear aligners Rajkot, invisible aligners Rajkot, best dentist in Rajkot'
  },
  {
    path: '/blog/maintain-white-teeth-after-whitening',
    pageId: 'blog/maintain-white-teeth-after-whitening',
    title: 'How to Maintain White Teeth After Teeth Whitening in Rajkot | Patel Dental Hospital',
    description: 'Discover 5 dentist-approved daily habits to maintain whiter, healthier teeth after professional teeth whitening treatment at Patel Dental Hospital Rajkot.',
    keywords: 'maintain white teeth after whitening, teeth whitening in Rajkot, teeth whitening aftercare, professional teeth whitening, dental treatment in Rajkot'
  }
];

function generateSchemasForRoute(route: typeof routes[number]) {
  const canonicalUrl = `https://pdhrajkot.com${route.path === '/' ? '/' : route.path + '/'}`;
  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Patel Dental Hospital",
    "image": "https://pdhrajkot.com/Best%20Dntal%20Hospital%20Rajkot.PNG",
    "@id": "https://pdhrajkot.com/#dentist",
    "url": "https://pdhrajkot.com/",
    "telephone": "+919510397046",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Centrum Complex, 1st Floor, Opp. Kings Heights, Beside Golden Super Market, Pandit Deendayal Upadhyay Road, From Rajnagar Chowk towards Amin Marg",
      "addressLocality": "Rajkot",
      "addressRegion": "Gujarat",
      "postalCode": "360001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.2856",
      "longitude": "70.7912"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "13:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "16:00",
        "closes": "20:00"
      }
    ]
  };

  const schemas: any[] = [];

  // Home Page
  if (route.path === '/') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Patel Dental Hospital",
      "url": "https://pdhrajkot.com/"
    });
    schemas.push(dentistSchema);
  } else {
    // Breadcrumb schema
    const pathParts = route.path.split('/').filter(Boolean);
    const breadcrumbListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pdhrajkot.com/"
      }
    ];

    if (pathParts.length === 1) {
      breadcrumbListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": route.title.split('|')[0].trim(),
        "item": canonicalUrl
      });
    } else if (pathParts.length === 2) {
      const parentName = pathParts[0] === 'services' ? 'Services' : pathParts[0] === 'blog' ? 'Blog' : pathParts[0];
      const parentUrl = `https://pdhrajkot.com/${pathParts[0]}/`;
      breadcrumbListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": parentName,
        "item": parentUrl
      });
      breadcrumbListElement.push({
        "@type": "ListItem",
        "position": 3,
        "name": route.title.split('|')[0].trim(),
        "item": canonicalUrl
      });
    }

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbListElement
    });

    // Page Specific Schema
    if (route.path.startsWith('/services/')) {
      // Dentist with clinical service catalog offer
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Dentist",
        "@id": "https://pdhrajkot.com/#dentist",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dental Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalSpecialty",
                "name": route.title.split('|')[0].trim(),
                "description": route.description
              }
            }
          ]
        }
      });

      // FAQ Page Schema
      let faqs: any[] = [];
      if (route.path.endsWith('/dental-implants')) {
        faqs = dentalImplantsFaqs;
      } else if (route.path.endsWith('/full-mouth-rehabilitation')) {
        faqs = fullMouthFaqs;
      } else if (route.path.endsWith('/invisible-aligners')) {
        faqs = invisibleAlignersFaqs;
      } else if (route.path.endsWith('/root-canal-treatment')) {
        faqs = rootCanalFaqs;
      } else if (route.path.endsWith('/smile-makeover')) {
        faqs = smileMakeoverFaqs;
      } else if (route.path.endsWith('/crowns-bridges')) {
        faqs = crownsBridgesFaqs;
      } else if (route.path.endsWith('/pediatric-dentistry')) {
        faqs = pediatricDentistryFaqs;
      }

      if (faqs.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        });
      }
    } else if (route.path.startsWith('/blog/')) {
      // Blog Article Schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": route.title,
        "description": route.description,
        "image": "https://pdhrajkot.com/Best%20Dntal%20Hospital%20Rajkot.PNG",
        "author": {
          "@type": "Person",
          "name": "Dr. Vipul Patel",
          "jobTitle": "Director & Chief Implantologist",
          "worksFor": {
            "@type": "Dentist",
            "name": "Patel Dental Hospital"
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Patel Dental Hospital",
          "logo": {
            "@type": "ImageObject",
            "url": "https://pdhrajkot.com/Best%20Dntal%20Hospital%20Rajkot.PNG"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      });
    } else if (route.path === '/doctors') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Dr. Vipul Patel",
        "jobTitle": "Chief Dental Implant Surgeon & Restorative Specialist",
        "worksFor": {
          "@type": "Dentist",
          "name": "Patel Dental Hospital"
        },
        "description": "Dr. Vipul Patel is the Director of Patel Dental Hospital, with 18+ years of clinical experience in advanced dental implants, computer guided surgeries, and full mouth rehabilitation."
      });
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Dr. Kinjal Patel",
        "jobTitle": "Pediatric Dentist & Aesthetic Consultant",
        "worksFor": {
          "@type": "Dentist",
          "name": "Patel Dental Hospital"
        },
        "description": "Dr. Kinjal Patel specializes in pediatric dentistry, child preventive care, and aesthetic smile correction procedures."
      });
    } else if (route.path === '/about') {
      schemas.push(dentistSchema);
    } else if (route.path === '/contact') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Patel Dental Hospital",
        "description": "Contact information, maps, phone numbers, and appointment details for Patel Dental Hospital Rajkot."
      });
      schemas.push(dentistSchema);
    }
  }

  return schemas;
}

async function prerender() {
  console.log('🏁 Starting static pre-rendering...');

  const templatePath = path.resolve(__dirname, './dist/index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Error: Client build (dist/index.html) was not found. Please run "vite build" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Load the server-side render function
  const ssrBundlePath = path.resolve(__dirname, './dist-ssr/entry-server.js');
  if (!fs.existsSync(ssrBundlePath)) {
    console.error('❌ Error: SSR bundle (dist-ssr/entry-server.js) was not found.');
    process.exit(1);
  }

  const { render } = await import(ssrBundlePath);

  for (const route of routes) {
    console.log(`Rendering route: ${route.path} (pageId: ${route.pageId})`);

    try {
      // 1. Render component to string
      const appHtml = render(route.pageId);

      // 2. Inject server-rendered HTML into the root div of template
      let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // 3. Inject route-specific meta tags and title
      // Replace existing Title tag
      html = html.replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${route.title}</title>`
      );

      // Replace or inject Description meta tag
      if (html.includes('name="description"')) {
        html = html.replace(
          /<meta name="description" content="[\s\S]*?"\s*\/?>/,
          `<meta name="description" content="${route.description}" />`
        );
      } else {
        html = html.replace(
          '</head>',
          `  <meta name="description" content="${route.description}" />\n</head>`
        );
      }

      // Replace or inject Keywords meta tag
      if (html.includes('name="keywords"')) {
        html = html.replace(
          /<meta name="keywords" content="[\s\S]*?"\s*\/?>/,
          `<meta name="keywords" content="${route.keywords}" />`
        );
      } else {
        html = html.replace(
          '</head>',
          `  <meta name="keywords" content="${route.keywords}" />\n</head>`
        );
      }

      // Inject open graph title & description tags
      html = html.replace(
        /<meta property="og:title" content="[\s\S]*?"\s*\/?>/,
        `<meta property="og:title" content="${route.title}" />`
      );
      html = html.replace(
        /<meta property="og:description" content="[\s\S]*?"\s*\/?>/,
        `<meta property="og:description" content="${route.description}" />`
      );

      // 3.5 Inject Canonical Tag and Schema JSON-LD blocks
      const canonicalUrl = `https://pdhrajkot.com${route.path === '/' ? '/' : route.path + '/'}`;
      let headInjections = `\n  <link rel="canonical" href="${canonicalUrl}" />\n`;

      const schemas = generateSchemasForRoute(route);
      for (const s of schemas) {
        headInjections += `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>\n`;
      }

      html = html.replace('</head>', `${headInjections}</head>`);

      // 4. Determine output file path
      let outputDir = path.resolve(__dirname, './dist');
      let outputPath = '';

      if (route.path === '/') {
        outputPath = path.join(outputDir, 'index.html');
      } else {
        // For sub-routes, create a folder like 'dist/about' and output 'index.html' there
        outputDir = path.join(outputDir, route.path.substring(1));
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        outputPath = path.join(outputDir, 'index.html');
      }

      fs.writeFileSync(outputPath, html, 'utf-8');
      console.log(`✅ Pre-rendered and saved: ${outputPath}`);
    } catch (routeErr) {
      console.error(`❌ Failed rendering route ${route.path}:`, routeErr);
    }
  }

  console.log('🎉 Static pre-rendering completed successfully!');
}

prerender().catch((err) => {
  console.error('❌ Prerender script crashed:', err);
  process.exit(1);
});
