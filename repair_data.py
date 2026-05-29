import re

with open('/Users/andrewdevyatkin/.gemini/antigravity-ide/scratch/lib/data.ts') as f:
    content = f.read()

# Positions identified:
qa_start = 71207          # start of export const qaThreads
ct61_pos = 79974          # where contractors accidentally start inside qaThreads
# q10 ends just before ct61: content[79974-6:79974] = '  },\n  { '  (the { starts ct61)
# So q10's closing is at 79974 - len('  { ')  = 79974 - 4 = 79970, ends with '  },\n'
q10_end = 79970           # position right after q10's closing brace+comma+newline

# contractors array runs from ct61_pos to the ] that closes it
# The ] that closes contractors is just before HOME SYSTEMS CATALOG
home_systems_comment = 730498  # '// --- HOME SYSTEMS CATALOG'

# Find the last contractor's closing brace  
last_ct_search = content.rfind('id: "ct1363"')
last_ct_area = content[last_ct_search:last_ct_search + 500]
# Find the }  and , that closes the last entry
last_entry_close = last_ct_area.rfind('}')
contractors_array_end = last_ct_search + last_entry_close + 1  # position after the last }

print(f"q10_end at: {q10_end}, content: {repr(content[q10_end-20:q10_end+20])}")
print(f"ct61 starts at: {ct61_pos}")
print(f"Last contractor end at: {contractors_array_end}")
print(f"HOME SYSTEMS CATALOG at: {home_systems_comment}")

# Extract components:
before_qa = content[:qa_start]
# qaThreads array: from qa_start to q10's closing },
# The correct qaThreads body ends after q10 at: 79970
# content[q10_end] should be '\n  { ' (start of ct61) - we want to insert "];\n\n" here
correct_qa_body = content[qa_start:q10_end]  # includes q1..q10 properly closed

# Find the actual last char of the correct qa body
print(f"Correct qa body ends with: {repr(correct_qa_body[-30:])}")

# Contractors: from ct61 to last ct1363 entry close
# These need to go into their own export const contractors = [...];
contractors_body = content[ct61_pos:contractors_array_end]
print(f"Contractors body starts with: {repr(contractors_body[:60])}")
print(f"Contractors body ends with: {repr(contractors_body[-60:])}")

# After contractors: home systems and rest
# Find actual start of home systems export
home_sys_export = content.find('export const homeSystems', home_systems_comment)
print(f"homeSystems export at: {home_sys_export}")
after_contractors = content[home_sys_export:]
print(f"After contractors starts with: {repr(after_contractors[:80])}")

# Also need to find the original contractors = [ from before insertion
# Check if there's already an "export const contractors" declaration somewhere
orig_contractors_decl = content.find('export const contractors')
print(f"Original contractors decl at: {orig_contractors_decl}")

# Rebuild the file
# 1. Everything before qaThreads
# 2. qaThreads with only q1..q10
# 3. The contractors array comment + export
# 4. homeSystems and rest

# Find the comment that originally preceded contractors array
contractors_comment = '// \u2500\u2500\u2500 CONTRACTORS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500'

new_content = (
    before_qa +
    correct_qa_body +          # qaThreads with q1..q10, ends with '  },\n'
    '\n];\n\n' +               # close qaThreads array
    contractors_comment + '\n\n' +
    'export const contractors: Contractor[] = [\n  ' +
    contractors_body +         # ct61..ct1363 entries
    '\n];\n\n' +               # close contractors array  
    after_contractors          # homeSystems + rest
)

with open('/Users/andrewdevyatkin/.gemini/antigravity-ide/scratch/lib/data.ts', 'w') as f:
    f.write(new_content)

print("\n=== REPAIR COMPLETE ===")
print(f"qaThreads count: {new_content.count('id: \"q')}")
print(f"Contractor count: {new_content.count('stateAbbr:')}")
print(f"File size: {len(new_content):,} bytes")
