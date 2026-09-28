import urllib.parse
import re

with open('database_details.txt', 'r') as f:
    text = f.read()

# Let's extract items from database_details.txt
def parse_section(header):
    pattern = rf'=== {header} \(\d+ RECORDS\) ===([\s\S]*?)(?=== [A-Z]|\Z)'
    match = re.search(pattern, text)
    if not match: return []
    sec = match.group(1).strip()
    records = []
    for l in sec.split('\n'):
        if re.match(r'^\d+\.\s+ID:', l):
            records.append(l)
    return records

print("General Gallery records:", len(parse_section('GENERAL GALLERY')))
print("Smile Gallery records:", len(parse_section('SMILE GALLERY')))
print("Social Service records:", len(parse_section('SOCIAL SERVICE')))
print("Technology records:", len(parse_section('TECHNOLOGY')))
print("Awards records:", len(parse_section('AWARDS')))
print("International Patients records:", len(parse_section('INTERNATIONAL PATIENTS')))
print("Doctors records:", len(parse_section('DOCTORS')))
print("Services records:", len(parse_section('SERVICES')))
