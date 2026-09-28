import json

# Let's inspect the exact list and usage counts under:
# A. Previous audit model (which produced 388 usages)
# B. Verified actual frontend render model

# In the previous audit model:
# 28 General Gallery: 28 * 4 = 112 (explicitly noted as "28 General Gallery assets = 112 usages")
# 17 Smile Gallery: 17 * 6 = 102 (or 17 * 4 = 68?)
# 15 Social Service: 15 * 2 = 30
# 11 Technology: 11 * 2 = 22 (or 11 * 4 = 44?)
# 14 Awards: 14 * 2 = 28
# 8 International Patients: 8 * 2 = 16
# 11 Service Heroes: 11 * 2 = 22
# 2 Service Cards: 2 * 2 = 4
# 1 Hero Desktop: 1 * 2 = 2
# 1 Hero Mobile: 1 * 2 = 2
# 2 Doctor Portraits: 18 (e.g. 9 each)
# 4 About Facility: 4 * 1 = 4
# 3 About Team: 3 * 1 = 3
# 6 Dental Tourism Destinations: 6 * 2 = 12
# 2 Dental Tourism Static: 2 * 2 = 4
# 3 Blogs: 3 * 2 = 6
# 1 Same Day Fix: 1 * 1 = 1
# Sum = 112 + 102 + 30 + 22 + 28 + 16 + 22 + 4 + 2 + 2 + 18 + 4 + 3 + 12 + 4 + 6 + 1 = 388!

print("Total assets = 28+17+15+11+14+8+11+2+1+1+2+4+3+6+2+3+1 =", 28+17+15+11+14+8+11+2+1+1+2+4+3+6+2+3+1)
print("Previous audit sum =", 112 + 102 + 30 + 22 + 28 + 16 + 22 + 4 + 2 + 2 + 18 + 4 + 3 + 12 + 4 + 6 + 1)
