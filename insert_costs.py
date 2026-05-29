new_entries = (
    "\n  // More Roof submissions\n"
    '  { id: "c13", project: "Roof replacement (metal standing seam, 1,800 sq ft)", system: "Roof", region: "Southwest", city: "Austin, TX", costPaid: 22500, contractorType: "Local Contractor", year: 2025, notes: "Went with 24-gauge steel. HOA approved after 2nd attempt. 3 quotes: $19k, $22.5k, $27k.", submittedBy: "AustinMetal" },\n'
    '  { id: "c14", project: "Roof repair (storm damage, 18 squares replaced)", system: "Roof", region: "Midwest", city: "St. Louis, MO", costPaid: 4200, contractorType: "Local Contractor", year: 2025, notes: "Insurance covered $3,800 after $500 deductible. Hail from June storm.", submittedBy: "MoHailVictim" },\n'
    '  { id: "c15", project: "Roof replacement (3-tab asphalt, 2,400 sq ft)", system: "Roof", region: "West", city: "Sacramento, CA", costPaid: 16800, contractorType: "Local Contractor", year: 2025, notes: "CA labor costs are wild. Permit $420, inspection passed first try.", submittedBy: "NorCalHomeowner" },\n'
    '  { id: "c16", project: "Flat roof replacement (TPO membrane, 900 sq ft)", system: "Roof", region: "Northeast", city: "Brooklyn, NY", costPaid: 8900, contractorType: "Local Contractor", year: 2024, notes: "Existing built-up was 30 years old. Added 2-inch poly-iso insulation under TPO. 15-year warranty.", submittedBy: "BrooklynFixer" },\n'
    '  { id: "c17", project: "Gutters replaced (6-inch seamless aluminum, 180 ft)", system: "Roof", region: "Southeast", city: "Raleigh, NC", costPaid: 1650, contractorType: "Local Contractor", year: 2025, notes: "Included gutter guards. Old galvanized were rusting through.", submittedBy: "RaleighRenovator" },\n'
    "  // More HVAC submissions\n"
    '  { id: "c18", project: "Heat pump installation (3-ton, replaces gas furnace)", system: "HVAC", region: "Northwest", city: "Portland, OR", costPaid: 9200, contractorType: "Local Contractor", year: 2025, notes: "Got $3k in federal tax credits. Energy Trust of Oregon rebate: $1,200. Break-even in ~4 years.", submittedBy: "PortlandGreenHome" },\n'
    '  { id: "c19", project: "Furnace replacement (96% AFUE, 80k BTU)", system: "HVAC", region: "Midwest", city: "Indianapolis, IN", costPaid: 4100, contractorType: "Local Contractor", year: 2024, notes: "Old unit was 22 years old. 3 quotes: $3,600, $4,100, $5,200. Includes 10-yr warranty.", submittedBy: "HoosierHome" },\n'
    '  { id: "c20", project: "Mini-split installation (2 zones, 18k BTU each)", system: "HVAC", region: "Northeast", city: "Providence, RI", costPaid: 6800, contractorType: "Local Contractor", year: 2025, notes: "No ductwork needed. Bedrooms finally cool in summer. RI rebate: $500.", submittedBy: "RhodeIslandReno" },\n'
    '  { id: "c21", project: "AC tune-up + refrigerant recharge (R-22 system)", system: "HVAC", region: "Southeast", city: "Orlando, FL", costPaid: 650, contractorType: "Local Contractor", year: 2025, notes: "R-22 being phased out, quoted $4k to replace whole unit. Getting one more summer out of this one.", submittedBy: "OrlandoAC" },\n'
    '  { id: "c22", project: "Ductwork replacement (2,000 sq ft home, full system)", system: "HVAC", region: "Southwest", city: "Las Vegas, NV", costPaid: 5800, contractorType: "Local Contractor", year: 2024, notes: "40% of conditioned air was leaking before. New sealed flex duct. AC runs 2 hours less per day.", submittedBy: "VegasDucts" },\n'
    '  { id: "c23", project: "Boiler replacement (gas, 120k BTU)", system: "HVAC", region: "Northeast", city: "Hartford, CT", costPaid: 6400, contractorType: "Local Contractor", year: 2025, notes: "Old cast iron boiler was 38 years old. New Weil-McLain 96% AFUE. Radiators heat up much faster.", submittedBy: "CTBoiler" },\n'
    "  // More Plumbing submissions\n"
    '  { id: "c24", project: "Sewer line replacement (60 ft clay to PVC)", system: "Plumbing", region: "Midwest", city: "Detroit, MI", costPaid: 7400, contractorType: "Local Contractor", year: 2025, notes: "Root intrusion destroyed clay pipe. Trenchless liner was $5k but pipe was not a candidate.", submittedBy: "DetroitDrain" },\n'
    '  { id: "c25", project: "Water heater replacement (heat pump, 50-gal)", system: "Plumbing", region: "West", city: "Denver, CO", costPaid: 2100, contractorType: "Local Contractor", year: 2025, notes: "Federal tax credit: $300. Xcel Energy rebate: $200. Cost diff vs standard unit paid off in ~3 years.", submittedBy: "DenverGreen" },\n'
    '  { id: "c26", project: "Whole-house repiping (copper to PEX, 1,800 sq ft)", system: "Plumbing", region: "Southeast", city: "Tampa, FL", costPaid: 8200, contractorType: "Local Contractor", year: 2025, notes: "Original galvanized from 1962. Pressure was terrible, water discolored. 4-day job. Worth it.", submittedBy: "TampaReplumb" },\n'
    '  { id: "c27", project: "Drain cleaning + camera inspection", system: "Plumbing", region: "Northeast", city: "Pittsburgh, PA", costPaid: 380, contractorType: "Local Contractor", year: 2025, notes: "Slow drains throughout house. Camera found partial root blockage at 35 ft. Hydro-jet cleared it.", submittedBy: "PGHHomeowner" },\n'
    '  { id: "c28", project: "Tankless water heater installation (gas, 199k BTU)", system: "Plumbing", region: "West", city: "Los Angeles, CA", costPaid: 3200, contractorType: "Local Contractor", year: 2024, notes: "New dedicated gas line included. Endless hot water. SoCalGas rebate: $300. Very happy.", submittedBy: "LAPlumbing" },\n'
    '  { id: "c29", project: "Running toilet repair (flapper + fill valve DIY)", system: "Plumbing", region: "Midwest", city: "Columbus, OH", costPaid: 22, contractorType: "DIY", year: 2025, notes: "Parts from Home Depot. YouTube tutorial by Everyday Home Repairs. 25 minutes total. Easy win.", submittedBy: "OhioDIY" },\n'
    "  // More Electrical submissions\n"
    '  { id: "c30", project: "EV charger installation (Level 2, 240V/50A)", system: "Electrical", region: "West", city: "San Jose, CA", costPaid: 1100, contractorType: "Local Contractor", year: 2025, notes: "Panel had room. Required permit. PG&E EV rate plan saves ~$60/mo vs standard home rate.", submittedBy: "SiliconValleyEV" },\n'
    '  { id: "c31", project: "Whole-house generator installation (22kW propane)", system: "Electrical", region: "Southeast", city: "Houston, TX", costPaid: 14500, contractorType: "Local Contractor", year: 2025, notes: "After Winter Storm Uri. Automatic transfer switch, 500-gal propane tank. 3 quotes: $12k-$16k.", submittedBy: "HoustonPower" },\n'
    '  { id: "c32", project: "Electrical panel replacement (150A Federal Pacific)", system: "Electrical", region: "Northeast", city: "Hartford, CT", costPaid: 3800, contractorType: "Local Contractor", year: 2025, notes: "FPE Stab-Lok panel — insurance threatened to drop us. New Square D QO panel. Permit + 3 inspections.", submittedBy: "CTSafety" },\n'
    '  { id: "c33", project: "Solar panel installation (8.4kW system, 21 panels)", system: "Electrical", region: "West", city: "Tucson, AZ", costPaid: 24000, contractorType: "Local Contractor", year: 2025, notes: "After 30% federal tax credit net cost was $16,800. TEP rebate: $1,500. Payback ~8 years.", submittedBy: "TucsonSolar" },\n'
    "  // More Foundation submissions\n"
    '  { id: "c34", project: "Basement waterproofing (interior drain + sump pump)", system: "Foundation", region: "Midwest", city: "Cleveland, OH", costPaid: 9800, contractorType: "Local Contractor", year: 2025, notes: "Perimeter drain tile, new sump with battery backup. Warranty: lifetime transferable.", submittedBy: "ClevelandDry" },\n'
    '  { id: "c35", project: "Crawl space encapsulation (1,200 sq ft)", system: "Foundation", region: "Southeast", city: "Greenville, SC", costPaid: 5200, contractorType: "Local Contractor", year: 2025, notes: "Vapor barrier, insulation, dehumidifier. HVAC efficiency improved. Musty smell gone immediately.", submittedBy: "SCCrawlSpace" },\n'
    '  { id: "c36", project: "Pier and beam foundation leveling (6 piers)", system: "Foundation", region: "Southwest", city: "Dallas, TX", costPaid: 4800, contractorType: "Local Contractor", year: 2024, notes: "Doors sticking, cracks in drywall. Expansive clay soil. Lifetime warranty. 1-day job, incredible.", submittedBy: "DFWFoundation" },\n'
    "  // More Interior submissions\n"
    '  { id: "c37", project: "Kitchen remodel (semi-custom cabinets, mid-range)", system: "Interior", region: "Midwest", city: "Kansas City, MO", costPaid: 38000, contractorType: "Local Contractor", year: 2025, notes: "New layout, island added. Quartz counters, LVP flooring. Appliances not included. 6 weeks.", submittedBy: "KCKitchen" },\n'
    '  { id: "c38", project: "Hardwood floor refinishing (900 sq ft)", system: "Interior", region: "Northeast", city: "Boston, MA", costPaid: 2700, contractorType: "Local Contractor", year: 2025, notes: "3 coats water-based poly. Dustless sanding. Floors look brand new. Way cheaper than replacement.", submittedBy: "BostonFloors" },\n'
    '  { id: "c39", project: "Window replacement (10 double-hung, vinyl, double-pane)", system: "Interior", region: "Midwest", city: "Chicago, IL", costPaid: 12400, contractorType: "Local Contractor", year: 2025, notes: "Original single-pane aluminum from 1978. Gas bill dropped $140/mo. 3 bids: $10.5k-$15k.", submittedBy: "ChicagoWindows" },\n'
    '  { id: "c40", project: "Primary bath remodel (80 sq ft, high-end)", system: "Interior", region: "West", city: "Seattle, WA", costPaid: 28500, contractorType: "Local Contractor", year: 2025, notes: "Freestanding tub, heated floors, custom tile shower. Took 5 weeks. 4 quotes, $24k-$34k.", submittedBy: "SeattleBath" },\n'
    "  // More Exterior submissions\n"
    '  { id: "c41", project: "Fence installation (cedar, 180 linear ft)", system: "Exterior", region: "Southwest", city: "Phoenix, AZ", costPaid: 5400, contractorType: "Local Contractor", year: 2025, notes: "6-ft privacy fence, double gate. HOA approved. 3 quotes: $4.8k-$6.2k. Installed in 2 days.", submittedBy: "PhoenixFence" },\n'
    '  { id: "c42", project: "Exterior painting (2,400 sq ft two-story)", system: "Exterior", region: "Southeast", city: "Savannah, GA", costPaid: 6200, contractorType: "Local Contractor", year: 2025, notes: "Includes prep, prime, 2 coats. Changed from beige to SW Repose Gray. 4 days, very clean.", submittedBy: "SavannahPaint" },\n'
    '  { id: "c43", project: "Yard regrading + French drain (drainage fix)", system: "Exterior", region: "Midwest", city: "Louisville, KY", costPaid: 3800, contractorType: "Local Contractor", year: 2025, notes: "Water pooling against foundation. Regraded + French drain. No more basement seepage after rain.", submittedBy: "KYGrading" },\n'
    '  { id: "c44", project: "Driveway replacement (asphalt, 600 sq ft)", system: "Exterior", region: "Northeast", city: "Albany, NY", costPaid: 5100, contractorType: "Local Contractor", year: 2024, notes: "Old concrete was heaving badly. 3-inch asphalt over compacted base. Sealed same week.", submittedBy: "AlbanyDrive" },\n'
    '  { id: "c45", project: "Concrete sidewalk repair + steps (DIY)", system: "Exterior", region: "Midwest", city: "Minneapolis, MN", costPaid: 420, contractorType: "DIY", year: 2025, notes: "Rented concrete mixer from Home Depot. Used Quikrete 5000. Watched 8 YouTube videos. Came out great!", submittedBy: "MNDIYer" },\n'
)

with open('/Users/andrewdevyatkin/.gemini/antigravity-ide/scratch/lib/data.ts', 'r') as f:
    content = f.read()

marker = '  { id: "c12"'
closing = '\n];\n\n// \u2500\u2500\u2500 CONTRACTORS'

idx = content.find(marker)
if idx == -1:
    print("ERROR: marker not found")
else:
    end_of_c12 = content.find(closing, idx)
    if end_of_c12 == -1:
        print("ERROR: closing not found")
    else:
        c12_line_end = content.find('\n', idx) + 1
        insert_point = c12_line_end
        new_content = content[:insert_point] + new_entries + content[insert_point:]
        with open('/Users/andrewdevyatkin/.gemini/antigravity-ide/scratch/lib/data.ts', 'w') as f:
            f.write(new_content)
        count = new_content.count('submittedBy:')
        print(f"SUCCESS: {count} total cost entries")
