/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const sanitizeEnvValue = (val: string | undefined): string | undefined => {
  if (!val) return undefined;
  let trimmed = val.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.substring(1, trimmed.length - 1).trim();
  }
  return trimmed;
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use raw parser for Supabase API requests to preserve exact binary/JSON payloads
  app.use('/api/supabase', express.raw({ type: '*/*', limit: '50mb' }));

  // API Proxy for Supabase requests
  app.all('/api/supabase/*', async (req, res) => {
    const rawUrl = process.env.VITE_SUPABASE_URL;
    const supabaseUrl = sanitizeEnvValue(rawUrl);

    if (!supabaseUrl) {
      console.error('[Supabase Proxy] VITE_SUPABASE_URL environment variable is missing.');
      return res.status(500).json({ error: 'Supabase URL is not configured on the server.' });
    }

    // Extract the relative path and query parameters
    const pathAndQuery = req.url.slice('/api/supabase'.length);
    const targetUrl = `${supabaseUrl}${pathAndQuery}`;

    try {
      const headers: Record<string, string> = {};
      
      // Forward incoming client request headers safely
      for (const [key, value] of Object.entries(req.headers)) {
        if (
          typeof value === 'string' &&
          !['host', 'connection', 'content-length', 'accept-encoding', 'origin', 'referer'].includes(key.toLowerCase())
        ) {
          headers[key] = value;
        }
      }

      // Explicitly set content-type if it was supplied
      if (req.headers['content-type']) {
        headers['content-type'] = req.headers['content-type'] as string;
      }

      const fetchOptions: RequestInit = {
        method: req.method,
        headers,
      };

      // Set the body for payload methods
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && req.body) {
        fetchOptions.body = req.body;
      }

      console.log(`[Supabase Proxy] Forwarding ${req.method} request to: ${targetUrl}`);
      const response = await fetch(targetUrl, fetchOptions);

      // Copy response headers to the client
      response.headers.forEach((value, name) => {
        if (!['content-encoding', 'transfer-encoding', 'content-length'].includes(name.toLowerCase())) {
          res.setHeader(name, value);
        }
      });

      res.status(response.status);

      // Stream the response back as an ArrayBuffer
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (err: any) {
      console.error('[Supabase Proxy Error] Failed to proxy request:', err);
      res.status(500).json({
        error: 'Failed to proxy request to Supabase',
        message: err.message,
      });
    }
  });

  const ORIGINAL_GOOGLE_REVIEWS = [
    {
      id: 'google-review-1',
      patient_name: 'Mihir Mirani',
      patient_photo_url: '',
      rating: 5,
      review_text: "My mother haven’t a single teeth in her mouth so she not chewing everything and properly. After then we visit PATEL DENTAL HOSPITAL and Dr. VIPUL PATEL advise to implant supported teeth in lower and upper complete denture. Now today 11 month complete and she eat everything thing even also hard food. Her smile is so beautiful after the treatment. We all are so satisfied with hospitality to hospital. Thank you Dr. Vipul Patel and they entire team.",
      review_date: '3 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 1,
      enabled: true
    },
    {
      id: 'google-review-2',
      patient_name: 'Chetan Gohel',
      patient_photo_url: '',
      rating: 5,
      review_text: "I have pain and cheek biting problem in my upper wisdom teeth so I visit patel dental hospital so where dr done check up very well after that he advised me to remove that wisdom teeth so that I removed my that teeth and dr removed that teeth in couple of minute without any pain and I feel very comfort in this procedure. I'm very thankful to team patel dental hospital.",
      review_date: '6 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 2,
      enabled: true
    },
    {
      id: 'google-review-3',
      patient_name: 'Ladva Hiren',
      patient_photo_url: '',
      rating: 5,
      review_text: "I have pain in my lower teeth so that I came to Patel dental hospital. After thorough check up dr suggest me to do one root canal treatment and wisdom teeth removal. So in first sitting I have done my root canal treatment in single sitting after that in second visit Dr removed my one wisdom teeth and after 1 week they placed cap on my root canal treated teeth and removed remaining two wisdom teeth. I'm very happy with all the doctor teams works and hospital staff are also very kind in nature and atmosphere of clinic is very sound full so that I'm very thankful to team Patel dental hospital.",
      review_date: '6 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 3,
      enabled: true
    },
    {
      id: 'google-review-4',
      patient_name: 'Amit Pabari',
      patient_photo_url: '',
      rating: 5,
      review_text: "Hello people, I connected with Patel Dental Hospital since 2 years and I had take a treatment of root canal and wisdom tooth removal. I had a great experience with Patel Dental Hospital. Staff are very helpful and doctors are also very accurate with their knowledge. Thank you Dr. Kinjal Patel for your great support.",
      review_date: '6 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 4,
      enabled: true
    },
    {
      id: 'google-review-5',
      patient_name: 'Bhakhar Gaming',
      patient_photo_url: '',
      rating: 5,
      review_text: "I have unbearable wisdom tooth pain in upper left jaw side so I came to Patel Dental Hospital with reference of my friend where Dr. Vipul Patel take big x ray of whole mouth and explain me the cause of tooth pain then he advised me for removal of wisdom tooth. He has removed it just in second and it's totally painless so I'm very impressed with skill of doctor. Hospital is neat and clean and very hygienic. I'm impressed with big batrishi x ray which is taken at Patel Dental Hospital. Very hi-tech hospital. Best dental clinic in Rajkot I have ever seen yet. Highly recommended for any dental treatment.",
      review_date: '5 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 5,
      enabled: true
    },
    {
      id: 'google-review-6',
      patient_name: 'Dinesh Trivedi',
      patient_photo_url: '',
      rating: 5,
      review_text: "Dr. Vipul Patel and staff are friendly and caring professionals. Over the years I have crowns, root canal treatment and cleanings done without any problems and stress. They also make use of the latest technologies and enhance the service. I would recommend the clinic for every dental treatment or diagnosis.",
      review_date: '1 year ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 6,
      enabled: true
    },
    {
      id: 'google-review-7',
      patient_name: 'Denish Rajput',
      patient_photo_url: '',
      rating: 5,
      review_text: "I have severe pain in my tooth even swelling is also on my face when I came to PDH where Dr give me advice of root canal treatment in my tooth just after one sitting my pain and swelling gone. Today my dental treatment is completed. Very happy. Dr is soft handed and highly skillful and hospital is advanced. Best dentist I have ever met. Best dental clinic and maybe topmost dental hospital in Gujarat having so advanced technology. Highly recommend.",
      review_date: '3 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 7,
      enabled: true
    },
    {
      id: 'google-review-8',
      patient_name: 'Bhupat Sojitra',
      patient_photo_url: '',
      rating: 5,
      review_text: "I had a lot of pain in my teeth. I took an emergency appointment for Dr. Vipul Patel and saw him. He took x-ray and told me that my tooth is still not bad that I have go for root canal. I had done root canal treatment and I'm very impressed to Dr. Vipul Patel and entire staff. Best dental hospital.",
      review_date: '3 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 8,
      enabled: true
    },
    {
      id: 'google-review-9',
      patient_name: 'Jagdish Patel',
      patient_photo_url: '',
      rating: 5,
      review_text: "My had teeth problem so visited at Patel Dental Hospital. Dr. Vipul Patel checked and advised root canal treatment and removal of cyst. Treatment is excellent and hospital atmosphere is very positive and friendly. Best dental hospital.",
      review_date: '4 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 9,
      enabled: true
    },
    {
      id: 'google-review-10',
      patient_name: 'Sabudin Thobhani',
      patient_photo_url: '',
      rating: 5,
      review_text: "I have 3 missing teeth in my mouth and that's why I don't eat properly so I visit Patel Dental Hospital to Dr. Vipul Patel and they advise me to implant supported teeth. Done my treatment and now today I have implant supported teeth, it's look like totally natural teeth. I eat even hard food, now no need to worry about my teeth because Dr. Vipul Patel is always there for my oral hygiene care. Thanks to Dr. Vipul Patel and they entire team.",
      review_date: '3 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 10,
      enabled: true
    },
    {
      id: 'google-review-11',
      patient_name: 'Kalpesh Patel',
      patient_photo_url: '',
      rating: 5,
      review_text: "Implant supported fix teeth treatment done in Patel Dental Hospital. I enjoyed a lot like a natural teeth. Really amazing work with soft hand skill. Today I completed 2 year of my treatment. I'm very satisfied with my treatment. Highly recommend Patel Dental Hospital.",
      review_date: '5 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 11,
      enabled: true
    },
    {
      id: 'google-review-12',
      patient_name: 'Hitesh Korat',
      patient_photo_url: '',
      rating: 5,
      review_text: "3 ago my wife got implant supported teeth at Patel Hospital. She is very satisfied with the treatment. Teeth look like natural teeth. She can eat properly with them. After 3 year teeth are as it is. Thank you Dr. Vipul Patel.",
      review_date: 'Edited 3 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 12,
      enabled: true
    },
    {
      id: 'google-review-13',
      patient_name: 'Jayanti Thanki',
      patient_photo_url: '',
      rating: 5,
      review_text: "Best dentist in Rajkot. I have pain in teeth and Dr Vipul Patel give advise for implant supported fix teeth and really enjoy like a natural teeth. Thank you so much for my treatment.",
      review_date: '5 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 13,
      enabled: true
    },
    {
      id: 'google-review-14',
      patient_name: 'Devshibhai Sardhara',
      patient_photo_url: '',
      rating: 5,
      review_text: "Experience is nice. Hospital is neat and clean. High-tech instruments like CT scan and laser. By this fixed teeth I can chew anything. Today have completed 4.5 years after fixing of teeth. I'm so satisfied. Highly recommended.",
      review_date: 'Edited 3 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 14,
      enabled: true
    },
    {
      id: 'google-review-15',
      patient_name: 'Dev Busa',
      patient_photo_url: '',
      rating: 5,
      review_text: "I have taken treatment of dental implant supported fix teeth before five year, it's still working. Doctor's work is very neat and clean. Happy with work. Best dental implant hospital in Gujarat.",
      review_date: '5 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 15,
      enabled: true
    },
    {
      id: 'google-review-16',
      patient_name: 'Kishor Sakhiya',
      patient_photo_url: '',
      rating: 5,
      review_text: "Good doctors with best knowledge. Thank you Dr. Vipul Patel for my fix teeth treatment. Very friendly atmosphere and supportive staff during my treatment. Highly recommend for Patel Dental Hospital.",
      review_date: '5 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 16,
      enabled: true
    },
    {
      id: 'google-review-17',
      patient_name: 'Bhikhabhai Patel',
      patient_photo_url: '',
      rating: 5,
      review_text: "I have taken treatment of fix dentures. Nice clinic, very well equipped, highly appreciated dental hospital in Rajkot, maybe in Gujarat.",
      review_date: '5 years ago',
      review_url: 'https://www.google.com/maps?cid=8837447286611548556',
      display_order: 17,
      enabled: true
    }
  ];

  // API Route for Google Reviews (can fetch from Google Places API if configured)
  app.get('/api/google-reviews', async (req, res) => {
    const apiKey = sanitizeEnvValue(process.env.GOOGLE_PLACES_API_KEY);
    const placeId = sanitizeEnvValue(process.env.GOOGLE_PLACE_ID) || 'ChIJswcjoXPKWzkRjJm4v3frpHo'; // Default Place ID or from env

    if (!apiKey) {
      console.log('[Google Reviews API] GOOGLE_PLACES_API_KEY is not configured. Falling back to local original reviews.');
      return res.json({ reviews: ORIGINAL_GOOGLE_REVIEWS, success: true });
    }

    try {
      console.log(`[Google Reviews API] Fetching real reviews for Place ID: ${placeId}`);
      
      // Call Google Places Details API (Legacy) to retrieve top 5 reviews
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Places API returned status ${response.status}`);
      }
      
      const data: any = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Google Places API error status: ${data.status}. Details: ${data.error_message || 'None'}`);
      }

      const googleReviews = data.result?.reviews || [];
      if (googleReviews.length === 0) {
        return res.json({ reviews: ORIGINAL_GOOGLE_REVIEWS, success: true });
      }

      const formattedReviews = googleReviews.map((rev: any, idx: number) => ({
        id: `google-real-review-${idx}-${rev.time || Date.now()}`,
        patient_name: rev.author_name || 'Anonymous Patient',
        patient_photo_url: rev.profile_photo_url || '',
        rating: Number(rev.rating) || 5,
        review_text: rev.text || '',
        review_date: rev.relative_time_description || 'Recently',
        review_url: rev.author_url || `https://www.google.com/maps?cid=8837447286611548556`,
        display_order: idx + 1,
        enabled: true,
      }));

      return res.json({ reviews: formattedReviews, success: true });
    } catch (err: any) {
      console.error('[Google Reviews API Error] Falling back to local original reviews:', err);
      return res.json({ 
        reviews: ORIGINAL_GOOGLE_REVIEWS, 
        success: true,
        error: 'Failed to fetch real reviews from Google Places API, fell back to original reviews',
        message: err.message 
      });
    }
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log('[Server] Vite middleware mounted in development mode');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Server] Serving production assets from dist/');
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Startup Error]', err);
  process.exit(1);
});
