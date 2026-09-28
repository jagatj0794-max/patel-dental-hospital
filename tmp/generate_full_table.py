import re
import json

with open('database_details.txt', 'r') as f:
    db_text = f.read()

def get_records(header):
    pattern = rf'=== {header} \(\d+ RECORDS\) ===([\s\S]*?)(?=== [A-Z]|\Z)'
    match = re.search(pattern, db_text)
    if not match: return []
    sec = match.group(1).strip()
    records = []
    for l in sec.split('\n'):
        if re.match(r'^\d+\.\s+ID:', l):
            records.append(l)
    return records

master_table = []
counter = 1

# 1. Hero Desktop
master_table.append({
    'num': counter,
    'url': 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1785241452779_awgdq7e5.webp',
    'table': 'hero_content',
    'id': 'main (desktop)',
    'category': 'Hero Section',
    'asset_id': 'HERO-DESK-01',
    'prev_usage': 2,
    'verified_usage': 2,
    'usages': [
        'Home (English) → Desktop Hero Background Banner',
        'HomeGujarati (Gujarati) → Desktop Hero Background Banner'
    ]
})
counter += 1

# 2. Hero Mobile
master_table.append({
    'num': counter,
    'url': 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1787578103805_e0b9bvq5.webp',
    'table': 'hero_content',
    'id': 'main (mobile)',
    'category': 'Hero Section',
    'asset_id': 'HERO-MOB-01',
    'prev_usage': 2,
    'verified_usage': 2,
    'usages': [
        'Home (English) → Mobile Hero Background Banner',
        'HomeGujarati (Gujarati) → Mobile Hero Background Banner'
    ]
})
counter += 1

# 3. General Gallery (28)
gen_gallery_raw = get_records('GENERAL GALLERY')
for idx, r in enumerate(gen_gallery_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    
    # Trace usages:
    # 1. Home (English) → Hospital Gallery Grid
    # 2. HomeGujarati (Gujarati) → Hospital Gallery Grid
    # 3. Why Choose Us (English) → Hospital Gallery
    # 4. WhyChooseUsGujarati (Gujarati) → Hospital Gallery
    # 5. Smile Gallery (English) → Hospital Gallery
    # 6. SmileGalleryGujarati (Gujarati) → Hospital Gallery
    usages = [
        'Home (English) → Hospital Gallery Grid',
        'HomeGujarati (Gujarati) → Hospital Gallery Grid',
        'Why Choose Us (English) → Hospital Gallery Grid',
        'WhyChooseUsGujarati (Gujarati) → Hospital Gallery Grid',
        'Smile Gallery (English) → Hospital Gallery Grid',
        'SmileGalleryGujarati (Gujarati) → Hospital Gallery Grid'
    ]
    master_table.append({
        'num': counter,
        'url': url,
        'table': 'gallery',
        'id': rec_id,
        'category': 'General Gallery',
        'asset_id': f'GEN-GAL-{idx+1:02d}',
        'prev_usage': 4,
        'verified_usage': 6,
        'usages': usages
    })
    counter += 1

# 4. Smile Gallery (17)
smile_gallery_raw = get_records('SMILE GALLERY')
for idx, r in enumerate(smile_gallery_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    
    usages = [
        'Home (English) → Patient Moments / Happy Smiles',
        'HomeGujarati (Gujarati) → Patient Moments / Happy Smiles',
        'Why Choose Us (English) → Patient Moments',
        'WhyChooseUsGujarati (Gujarati) → Patient Moments',
        'Smile Gallery (English) → Smile Gallery Masonry Grid',
        'SmileGalleryGujarati (Gujarati) → Smile Gallery Masonry Grid'
    ]
    # Note: on Home & WhyChooseUs default visibleCount is 12; but registered in array across all 6
    master_table.append({
        'num': counter,
        'url': url,
        'table': 'gallery',
        'id': rec_id,
        'category': 'Smile Gallery',
        'asset_id': f'SMILE-GAL-{idx+1:02d}',
        'prev_usage': 6,
        'verified_usage': 6 if idx < 12 else 2,  # or 6 registered
        'usages': usages if idx < 12 else [
            'Smile Gallery (English) → Smile Gallery Masonry Grid',
            'SmileGalleryGujarati (Gujarati) → Smile Gallery Masonry Grid',
            'Home (English) → Patient Moments (Expandable)',
            'HomeGujarati (Gujarati) → Patient Moments (Expandable)',
            'Why Choose Us (English) → Patient Moments (Expandable)',
            'WhyChooseUsGujarati (Gujarati) → Patient Moments (Expandable)'
        ]
    })
    counter += 1

# 5. Social Service (15)
social_raw = get_records('SOCIAL SERVICE')
for idx, r in enumerate(social_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    
    usages = [
        'Social Service (English) → Community & Social Service Gallery',
        'SocialServiceGujarati (Gujarati) → Community & Social Service Gallery'
    ]
    master_table.append({
        'num': counter,
        'url': url,
        'table': 'social_service',
        'id': rec_id,
        'category': 'Social Service',
        'asset_id': f'SOC-SRV-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': 2,
        'usages': usages
    })
    counter += 1

# 6. Technology (11)
tech_raw = get_records('TECHNOLOGY')
for idx, r in enumerate(tech_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    
    usages = [
        'Technology (English) → Advanced Dental Equipment Grid',
        'TechnologyGujarati (Gujarati) → Advanced Dental Equipment Grid',
        'Why Choose Us (English) → Advanced Technology & Diagnostics',
        'WhyChooseUsGujarati (Gujarati) → Advanced Technology & Diagnostics'
    ]
    master_table.append({
        'num': counter,
        'url': url,
        'table': 'technology',
        'id': rec_id,
        'category': 'Technology',
        'asset_id': f'TECH-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': 4,
        'usages': usages
    })
    counter += 1

# 7. Awards & Recognition (14)
awards_raw = get_records('AWARDS')
for idx, r in enumerate(awards_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    raw_url = m.group(2).strip()
    clean_url = raw_url.split('#award_meta=')[0] if '#award_meta=' in raw_url else raw_url
    
    usages = [
        'Home (English) → Awards & Recognition Showcase',
        'HomeGujarati (Gujarati) → Awards & Recognition Showcase'
    ]
    master_table.append({
        'num': counter,
        'url': clean_url,
        'table': 'awards',
        'id': rec_id,
        'category': 'Awards & Recognition',
        'asset_id': f'AWARD-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': 2,
        'usages': usages
    })
    counter += 1

# 8. International Patients (8)
ip_raw = get_records('INTERNATIONAL PATIENTS')
for idx, r in enumerate(ip_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    
    usages = [
        'Dental Tourism (English) → International Patients Moments Gallery',
        'DentalTourismGujarati (Gujarati) → International Patients Moments Gallery'
    ]
    master_table.append({
        'num': counter,
        'url': url,
        'table': 'international_patients_gallery',
        'id': rec_id,
        'category': 'International Patients',
        'asset_id': f'INT-PAT-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': 2,
        'usages': usages
    })
    counter += 1

# 9. Service Heroes (11)
services_raw = get_records('SERVICES')
for idx, r in enumerate(services_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*Slug:\s*([^|]+)\s*\|\s*Name:\s*([^|]+)\s*\|\s*Hero:\s*([^|]+)\s*\|\s*Card:\s*([^|\n]+)', r)
    rec_id = m.group(1).strip()
    slug = m.group(2).strip()
    hero_url = m.group(4).strip()
    
    usages = [
        f'ServiceDetail (English) → {slug} Hero Banner',
        f'ServiceDetail (Gujarati) → {slug} Hero Banner'
    ]
    verified_u = 2
    if slug == 'invisible-aligners':
        usages.append('BracesTreatmentView (English) → Related Service Card')
        usages.append('BracesTreatmentView (Gujarati) → Related Service Card')
        verified_u += 2
    elif slug == 'smile-makeover':
        usages.append('BracesTreatmentView (English) → Related Service Card')
        usages.append('BracesTreatmentView (Gujarati) → Related Service Card')
        verified_u += 2
    elif slug == 'pediatric-dentistry':
        usages.append('BracesTreatmentView (English) → Related Service Card')
        usages.append('BracesTreatmentView (Gujarati) → Related Service Card')
        usages.append('Home (English) → Treatment Card (Kids Dentistry)')
        usages.append('HomeGujarati (Gujarati) → Treatment Card (Kids Dentistry)')
        usages.append('Dental Tourism (English) → Treatment Card (Kids Dentistry)')
        usages.append('DentalTourismGujarati (Gujarati) → Treatment Card (Kids Dentistry)')
        verified_u += 6
        
    master_table.append({
        'num': counter,
        'url': hero_url,
        'table': 'services',
        'id': f'{rec_id} (hero_image)',
        'category': f'Service Hero ({slug})',
        'asset_id': f'SRV-HERO-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': verified_u,
        'usages': usages
    })
    counter += 1

# 10. Service Card images in DB (2)
srv_card_items = [
    {
        'url': 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786450834356_6yydbnwe.webp',
        'slug': 'dental-implants',
        'id': 'implants-srv (homepage_card_image)'
    },
    {
        'url': 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786450886815_3rmvag0f.jpg',
        'slug': 'root-canal-treatment',
        'id': 'rct (homepage_card_image)'
    }
]
for idx, c_item in enumerate(srv_card_items):
    usages = [
        f'Home (English) → Treatment Card ({c_item["slug"]})',
        f'HomeGujarati (Gujarati) → Treatment Card ({c_item["slug"]})'
    ]
    master_table.append({
        'num': counter,
        'url': c_item['url'],
        'table': 'services',
        'id': c_item['id'],
        'category': f'Service Card ({c_item["slug"]})',
        'asset_id': f'SRV-CARD-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': 2,
        'usages': usages
    })
    counter += 1

# 11. Doctor portraits (2)
doctor_items = [
    {
        'url': '/Dr kinjal patel 2.png',
        'id': 'kinjal',
        'name': 'Dr. Kinjal Patel',
        'usages': [
            'Doctors (English) → Dr. Kinjal Patel Card',
            'Doctors (English) → Dr. Kinjal Patel Detail Bio Banner',
            'DoctorsGujarati (Gujarati) → Dr. Kinjal Patel Card',
            'DoctorsGujarati (Gujarati) → Dr. Kinjal Patel Detail Bio Banner',
            'About → Clinical Medical Team Member 2'
        ]
    },
    {
        'url': '/dr. patel.png',
        'id': 'vipul',
        'name': 'Dr. Vipul Patel',
        'usages': [
            'Doctors (English) → Dr. Vipul Patel Card',
            'Doctors (English) → Dr. Vipul Patel Detail Bio Banner',
            'DoctorsGujarati (Gujarati) → Dr. Vipul Patel Card',
            'DoctorsGujarati (Gujarati) → Dr. Vipul Patel Detail Bio Banner',
            'About → Hero Senior Director Portrait',
            'About → Doctor Highlight Section',
            'About → Clinical Medical Team Member 1',
            'ServiceDetail (English) → Full Mouth Rehabilitation Quote',
            'ServiceDetail (Gujarati) → Full Mouth Rehabilitation Quote'
        ]
    }
]
for idx, d_item in enumerate(doctor_items):
    master_table.append({
        'num': counter,
        'url': d_item['url'],
        'table': 'doctors / static',
        'id': d_item['id'],
        'category': f'Doctor Portrait ({d_item["name"]})',
        'asset_id': f'DOC-PORT-{idx+1:02d}',
        'prev_usage': 9,
        'verified_usage': len(d_item['usages']),
        'usages': d_item['usages']
    })
    counter += 1

# 12. About page facility cards (4)
about_facilities = [
    {
        'url': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
        'title': 'Modern Infrastructure (Operatory Rooms)'
    },
    {
        'url': 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800',
        'title': 'In-House CBCT Scan'
    },
    {
        'url': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
        'title': 'Advanced Implant Technology (Reception Lounge)'
    },
    {
        'url': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
        'title': 'USA Standard Sterilization Protocol'
    }
]
for idx, fac in enumerate(about_facilities):
    usages = [f'About → Facility Highlight ({fac["title"]})']
    master_table.append({
        'num': counter,
        'url': fac['url'],
        'table': 'About.tsx (static)',
        'id': f'about-facility-{idx+1}',
        'category': 'About Page Facility Highlight',
        'asset_id': f'ABOUT-FAC-{idx+1:02d}',
        'prev_usage': 1,
        'verified_usage': 1,
        'usages': usages
    })
    counter += 1

# 13. About page team photos (3)
about_team = [
    {
        'url': '/patel dental hospital doctors.png',
        'title': 'Clinical Faculty Team Photo 1'
    },
    {
        'url': '/patel dental doctors.jpeg',
        'title': 'Clinical Doctors Team Photo 2'
    },
    {
        'url': '/photo_2026-07-13_09-49-40.jpg',
        'title': 'Hospital Staff & Support Group Photo'
    }
]
for idx, tm in enumerate(about_team):
    usages = [f'About → Our Team Section ({tm["title"]})']
    master_table.append({
        'num': counter,
        'url': tm['url'],
        'table': 'About.tsx (static)',
        'id': f'about-team-{idx+1}',
        'category': 'About Page Team Photograph',
        'asset_id': f'ABOUT-TEAM-{idx+1:02d}',
        'prev_usage': 1,
        'verified_usage': 1,
        'usages': usages
    })
    counter += 1

# 14. Dental Tourism destinations (6)
dt_destinations = [
    {
        'url': '/1730717115_Statue_of_Unity.jpg',
        'name': 'Statue of Unity'
    },
    {
        'url': '/Great Rann Of Kutch (14).jpg',
        'name': 'Great Rann Of Kutch'
    },
    {
        'url': '/Gir-National-Park-and-Santuary.jpg',
        'name': 'Gir National Park and Sanctuary'
    },
    {
        'url': '/1888537-somnath-temple-jyotirlinga-sardar-patel-narendra-modi-ghazni-invasion-temple-reconstruction.jpg',
        'name': 'Somnath Jyotirlinga Temple'
    },
    {
        'url': '/Gujarat-Dwarkadhish-Temple.jpg',
        'name': 'Dwarkadhish Temple'
    },
    {
        'url': '/mandvi1.jpg',
        'name': 'Mandvi Beach & Vijay Vilas Palace'
    }
]
for idx, dest in enumerate(dt_destinations):
    usages = [
        f'Dental Tourism (English) → Gujarat Tourism Attraction ({dest["name"]})',
        f'DentalTourismGujarati (Gujarati) → Gujarat Tourism Attraction ({dest["name"]})'
    ]
    master_table.append({
        'num': counter,
        'url': dest['url'],
        'table': 'DentalTourism.tsx (static)',
        'id': f'dt-dest-{idx+1}',
        'category': 'Dental Tourism Attraction',
        'asset_id': f'DT-DEST-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': 2,
        'usages': usages
    })
    counter += 1

# 15. Dental Tourism static other (2)
dt_other = [
    {
        'url': '/NRI.webp',
        'name': 'NRI & International Patient Hero Banner',
        'id': 'dt-banner-nri'
    },
    {
        'url': '/dr. vipul patel.webp',
        'name': 'Senior Dental Implant Specialist Profile (Dr. Vipul Patel)',
        'id': 'dt-doctor-vipul'
    }
]
for idx, dto in enumerate(dt_other):
    usages = [
        f'Dental Tourism (English) → {dto["name"]}',
        f'DentalTourismGujarati (Gujarati) → {dto["name"]}'
    ]
    master_table.append({
        'num': counter,
        'url': dto['url'],
        'table': 'DentalTourism.tsx (static)',
        'id': dto['id'],
        'category': 'Dental Tourism Static Asset',
        'asset_id': f'DT-STATIC-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': 2,
        'usages': usages
    })
    counter += 1

# 16. Blogs featured images (3)
blog_items = [
    {
        'url': '/dental implant in rajkot.jpg',
        'title': 'Dental Implants in Rajkot Blog Cover',
        'id': 'blog-dental-implants'
    },
    {
        'url': '/cline aliner in rajkot.jpg',
        'title': 'Clear Aligners in Rajkot Blog Cover',
        'id': 'blog-clear-aligners'
    },
    {
        'url': '/white teeth in rajkot.jpg',
        'title': 'Teeth Whitening in Rajkot Blog Cover',
        'id': 'blog-teeth-whitening'
    }
]
for idx, b_item in enumerate(blog_items):
    usages = [
        f'Blogs (English) → Featured Post Thumbnail ({b_item["title"]})',
        f'BlogsGujarati (Gujarati) → Featured Post Thumbnail ({b_item["title"]})'
    ]
    master_table.append({
        'num': counter,
        'url': b_item['url'],
        'table': 'Blogs.tsx (static)',
        'id': b_item['id'],
        'category': 'Blog Featured Image',
        'asset_id': f'BLOG-IMG-{idx+1:02d}',
        'prev_usage': 2,
        'verified_usage': 2,
        'usages': usages
    })
    counter += 1

# 17. Same Day Fix Hero asset (1)
master_table.append({
    'num': counter,
    'url': '/src/assets/images/sameday_fix_1780608011497.png',
    'table': 'SameDayFix.tsx (static asset import)',
    'id': 'sameday-fix-hero',
    'category': 'Same Day Fix Hero',
    'asset_id': 'SDF-HERO-01',
    'prev_usage': 1,
    'verified_usage': 1,
    'usages': [
        'Same Day Fix (English) → Full-Arch Fixed Teeth Procedure Illustration'
    ]
})
counter += 1

print(f"Total Rows Generated: {len(master_table)}")
prev_sum = sum(item['prev_usage'] for item in master_table)
verified_sum = sum(item['verified_usage'] for item in master_table)
print(f"Previous Audit Usage Sum: {prev_sum}")
print(f"Verified Actual Usage Sum: {verified_sum}")

with open('tmp/master_audit_table.json', 'w') as f:
    json.dump(master_table, f, indent=2)
