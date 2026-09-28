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

# 1. Hero
hero_desktop = {
    'url': 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1785241452779_awgdq7e5.webp',
    'table': 'hero_content',
    'id': 'main (desktop)',
    'category': 'Hero Desktop',
    'asset_id': 'HERO-DESKTOP-01'
}

hero_mobile = {
    'url': 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1787578103805_e0b9bvq5.webp',
    'table': 'hero_content',
    'id': 'main (mobile)',
    'category': 'Hero Mobile',
    'asset_id': 'HERO-MOBILE-01'
}

# 2. General Gallery (28)
gen_gallery_raw = get_records('GENERAL GALLERY')
gen_gallery = []
for idx, r in enumerate(gen_gallery_raw):
    # e.g. 1. ID: img-1786731863664-jum99 | URL: https://... | Alt:  | Title: nri patient (2) | Category: Homepage Gallery | Branch: All Branches
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    gen_gallery.append({
        'url': url,
        'table': 'gallery',
        'id': rec_id,
        'category': 'General Gallery',
        'asset_id': f'GEN-GAL-{idx+1:02d}'
    })

# 3. Smile Gallery (17)
smile_gallery_raw = get_records('SMILE GALLERY')
smile_gallery = []
for idx, r in enumerate(smile_gallery_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    smile_gallery.append({
        'url': url,
        'table': 'gallery',
        'id': rec_id,
        'category': 'Smile Gallery',
        'asset_id': f'SMILE-GAL-{idx+1:02d}'
    })

# 4. Social Service (15)
social_raw = get_records('SOCIAL SERVICE')
social = []
for idx, r in enumerate(social_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    social.append({
        'url': url,
        'table': 'social_service',
        'id': rec_id,
        'category': 'Social Service',
        'asset_id': f'SOC-SRV-{idx+1:02d}'
    })

# 5. Technology (11)
tech_raw = get_records('TECHNOLOGY')
tech = []
for idx, r in enumerate(tech_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    tech.append({
        'url': url,
        'table': 'technology',
        'id': rec_id,
        'category': 'Technology',
        'asset_id': f'TECH-{idx+1:02d}'
    })

# 6. Awards (14)
awards_raw = get_records('AWARDS')
awards = []
for idx, r in enumerate(awards_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    awards.append({
        'url': url,
        'table': 'awards',
        'id': rec_id,
        'category': 'Awards & Recognition',
        'asset_id': f'AWARD-{idx+1:02d}'
    })

# 7. International Patients (8)
ip_raw = get_records('INTERNATIONAL PATIENTS')
ip = []
for idx, r in enumerate(ip_raw):
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*URL:\s*([^|]+)', r)
    rec_id = m.group(1).strip()
    url = m.group(2).strip()
    ip.append({
        'url': url,
        'table': 'international_patients_gallery',
        'id': rec_id,
        'category': 'International Patients',
        'asset_id': f'INT-PAT-{idx+1:02d}'
    })

# 8. Service Heroes (11)
services_raw = get_records('SERVICES')
srv_heroes = []
srv_cards = []
for idx, r in enumerate(services_raw):
    # ID: wisdom-srv | Slug: wisdom-tooth-surgery | Name: Wisdom Tooth Surgery | Hero: https://... | Card: ...
    m = re.search(r'ID:\s*([^|]+)\s*\|\s*Slug:\s*([^|]+)\s*\|\s*Name:\s*([^|]+)\s*\|\s*Hero:\s*([^|]+)\s*\|\s*Card:\s*([^|\n]+)', r)
    rec_id = m.group(1).strip()
    slug = m.group(2).strip()
    hero_url = m.group(4).strip()
    card_url = m.group(5).strip()
    
    srv_heroes.append({
        'url': hero_url,
        'table': 'services',
        'id': f'{rec_id} (hero)',
        'category': f'Service Hero ({slug})',
        'asset_id': f'SRV-HERO-{idx+1:02d}'
    })
    if card_url != 'null':
        srv_cards.append({
            'url': card_url,
            'table': 'services',
            'id': f'{rec_id} (card)',
            'category': f'Service Card ({slug})',
            'asset_id': f'SRV-CARD-{len(srv_cards)+1:02d}'
        })

print(f"Loaded: Hero={2}, GenGal={len(gen_gallery)}, SmileGal={len(smile_gallery)}, Social={len(social)}, Tech={len(tech)}, Awards={len(awards)}, IP={len(ip)}, SrvHero={len(srv_heroes)}, SrvCards={len(srv_cards)}")
