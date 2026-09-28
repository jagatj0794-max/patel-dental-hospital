-- ==============================================================================
-- Migration: Add persistent alt_text columns and synchronize records for CMS tables
-- Target Tables: public.doctors, public.technology, public.social_service, public.awards
-- ==============================================================================

-- 1. Ensure real nullable TEXT column 'alt_text' exists on all 4 CMS tables
ALTER TABLE public.doctors
  ADD COLUMN IF NOT EXISTS alt_text text NULL;

ALTER TABLE public.technology
  ADD COLUMN IF NOT EXISTS alt_text text NULL;

ALTER TABLE public.social_service
  ADD COLUMN IF NOT EXISTS alt_text text NULL;

ALTER TABLE public.awards
  ADD COLUMN IF NOT EXISTS alt_text text NULL;

-- Also ensure services table has alt text columns
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS alt_text text NULL,
  ADD COLUMN IF NOT EXISTS hero_image_alt_text text NULL,
  ADD COLUMN IF NOT EXISTS homepage_card_image_alt_text text NULL;

-- 2. Populate Doctors (2 records)
UPDATE public.doctors
SET alt_text = 'Dr. Kinjal Patel, cosmetic and aesthetic dentist, posing at Patel Dental Hospital, Rajkot.'
WHERE id = 'kinjal';

UPDATE public.doctors
SET alt_text = 'Dr. Vipul Patel, senior maxillofacial surgeon and implantologist, at Patel Dental Hospital, Rajkot.'
WHERE id = 'vipul';

-- 3. Populate Technology (11 records)
UPDATE public.technology
SET alt_text = 'Digital CBCT 3D scanner for advanced dental imaging and diagnostics.'
WHERE id = '7f8edb1a-3a19-4283-9f8c-d7dbb0356541';

UPDATE public.technology
SET alt_text = 'Advanced dental treatment chair inside the modern operatory of Patel Dental Hospital, Rajkot.'
WHERE id = '1670e875-07f3-488a-b7f1-37421867a0cf';

UPDATE public.technology
SET alt_text = 'Advanced physiodispenser implant surgery system used for high-precision dental implant procedures.'
WHERE id = 'bb81a4a8-804d-41d8-bff7-dcb19a08b124';

UPDATE public.technology
SET alt_text = 'Piezoelectric surgical unit for high-precision, minimally invasive bone surgery.'
WHERE id = '22db6afa-ab5c-4ecb-b4d3-679dd0a57a14';

UPDATE public.technology
SET alt_text = 'Dental Laser Unit used for state-of-the-art dental treatments at Patel Dental Hospital, Rajkot.'
WHERE id = 'aa2f95f6-d445-4d80-9b66-f28756059bf9';

UPDATE public.technology
SET alt_text = 'Digital intraoral scanner used for 3D digital impressions and custom crown design.'
WHERE id = '0ea9ddc6-e5d7-425f-ba5e-c8a5227dbcb4';

UPDATE public.technology
SET alt_text = 'Digital Ultrasonic Cleaner used for state-of-the-art dental treatments at Patel Dental Hospital, Rajkot.'
WHERE id = '35895d74-cdd4-4cbf-bec3-f590858d9077';

UPDATE public.technology
SET alt_text = 'class B autoclave melag used for state-of-the-art dental treatments at Patel Dental Hospital, Rajkot.'
WHERE id = '9bfff327-e051-4773-8b7f-1cac9d986d20';

UPDATE public.technology
SET alt_text = 'Digital X-Ray / RVG used for state-of-the-art dental treatments at Patel Dental Hospital, Rajkot.'
WHERE id = '89755b67-1327-49af-96c4-8daec1900494';

UPDATE public.technology
SET alt_text = 'Intraoral Camera used for state-of-the-art dental treatments at Patel Dental Hospital, Rajkot.'
WHERE id = '74cb3a9e-f3e7-43cc-92a2-88f10c0d7bfa';

UPDATE public.technology
SET alt_text = 'Clinical Photography with DSLR Camera used for state-of-the-art dental treatments at Patel Dental Hospital, Rajkot.'
WHERE id = '957ce6b9-b048-4a36-a39a-77c4ffa033bd';

-- 4. Populate Social Service (15 records)
UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '03945ed0-b92a-49b4-afe8-b36ca9570fe4';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '2f2f8b15-39bb-43ee-9dc4-d4fc54a6794c';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '971437bf-a267-44aa-8221-3b6a94456afa';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '721c01d9-ad98-4606-ad85-3af951493d91';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '9a69ab80-cb7d-44d0-bf46-09ae93820ab9';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '3a347c0c-b374-4d6a-98cb-c337ed0abe05';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '9264c7e5-e377-4065-8b0c-e580c02cd5f2';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '4956b6dc-bb1a-4ac5-aebd-3015cd6b0fcc';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '9de0af5a-251a-43ae-a367-a592baa6f72d';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '36d4a1a5-4fcd-44dc-84a5-81a33a616a3d';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '332ed567-4869-408f-b628-dbe8789f5f06';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = '8e4f214f-4d45-4989-a6b6-753be9870157';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = 'f3097a75-51c8-44f2-a2a5-5ea4c01e53d1';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = 'd94c7f16-4fa5-4c14-bc05-0181849db9a0';

UPDATE public.social_service
SET alt_text = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.'
WHERE id = 'f0d82eb2-2519-40ee-a7b1-999930e20366';

-- 5. Populate Awards (14 records)
UPDATE public.awards
SET alt_text = 'Award certificate representing ICOI Presentation Ceremony for Supporting Event Photograph awarded to Dr. Vipul Gothi on 1 August 2022.'
WHERE id = 'c7a3758a-24d3-4805-b019-1d739b1a1cfc';

UPDATE public.awards
SET alt_text = 'Award certificate representing Certificate of Accomplishment for Entrepreneur Gurukul Program – 29th Batch awarded to Dr. Vipul Gothi (Patel Dental Hospital) on 28 February 2019 – 18 September 2021.'
WHERE id = '4392637d-0d40-44f5-a651-5dac06faa458';

UPDATE public.awards
SET alt_text = 'Award certificate representing The International Congress of Oral Implantologists (ICOI) for Master – Implant Prosthodontics awarded to Dr. Vipul Gothi on 1 August 2022.'
WHERE id = '69dcf784-5006-4f3e-944a-0ca39904e634';

UPDATE public.awards
SET alt_text = 'Award certificate representing Indian Society of Oral Implantologists (ISOI) for Diplomate awarded to Dr. Vipul Gothi on 16 January 2022.'
WHERE id = 'c56700a3-75d7-479d-b674-bf9469b29a3b';

UPDATE public.awards
SET alt_text = 'Award certificate representing Master of Dental Surgery for Oral Medicine & Radiology awarded to Dr. Vipul Gothi on 29 January 2023.'
WHERE id = '3a7cc3e0-bfe6-4300-99fb-b5a153c5fc69';

UPDATE public.awards
SET alt_text = 'Award certificate representing ICOI Presentation Ceremony for Supporting Event Photograph awarded to Dr. Vipul Gothi on 1 August 2022.'
WHERE id = '08f697e9-c20b-43fe-91a2-9dd7fb746eb8';

UPDATE public.awards
SET alt_text = 'Award certificate representing ICOI Presentation Ceremony for Supporting Event Photograph awarded to Dr. Vipul Gothi on 1 August 2022.'
WHERE id = '36c520c2-de49-4af3-b162-5ca9acfa295c';

UPDATE public.awards
SET alt_text = 'Award certificate representing FAMDENT Excellence in Dentistry Awards 2021 for Nominated – Outstanding Dentist of the Year – Below 45, Zone A awarded to Dr. Vipul Gothi on 29 May 2021.'
WHERE id = '7ffc15f5-9d71-4472-94d1-4b741b96ab0c';

UPDATE public.awards
SET alt_text = 'Award certificate representing Indian Society of Oral Implantologists (ISOI) for Fellow awarded to Dr. Vipul Gothi on 16 January 2022.'
WHERE id = '472f0848-85d5-4d86-b167-5d0d722f9494';

UPDATE public.awards
SET alt_text = 'Award certificate representing International Congress of Oral Implantologists (ICOI) for Fellow awarded to Dr. Vipul Gothi on 1 August 2022.'
WHERE id = 'ba137ef1-c883-4b39-8333-f54518070ac4';

UPDATE public.awards
SET alt_text = 'Award certificate representing International Congress of Oral Implantologists (ICOI) for Fellow awarded to Dr. Kinjal Bhanderi on 1 August 2022.'
WHERE id = '1422a2d5-7feb-4b7e-8107-5607398d6032';

UPDATE public.awards
SET alt_text = 'Award certificate representing Indian Society of Oral Implantologists (ISOI) for Certificate of Achievement awarded to Dr. Kinjal Gothi on 20 January 2023.'
WHERE id = '2232f4c8-26dd-4ef9-8f6f-9e1c019608e6';

UPDATE public.awards
SET alt_text = 'Award certificate representing FAMDENT Excellence in Dentistry Awards 2021 for Highly Commended – Clinic of the Year – Multiple Chair, Zone B awarded to Dr. Vipul Gothi on 29 May 2021.'
WHERE id = '9eb730e0-e745-44cd-9394-469db3029213';

UPDATE public.awards
SET alt_text = 'Award certificate representing FAMDENT Excellence in Dentistry Awards 2022 for Nominated – Clinic of the Year – Multiple Chair (Zone B) awarded to Dr. Vipul Pravinbhai Gothi on 21 May 2022.'
WHERE id = '3e02c4f3-8784-4621-861b-54e56d1693a3';
