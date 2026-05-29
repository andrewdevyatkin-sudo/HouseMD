import re, random

# State data: abbr -> (full_name, [cities], region_description, soil_note)
STATES = {
  "AL": ("Alabama", ["Birmingham","Huntsville","Mobile","Montgomery","Tuscaloosa","Dothan"], "Central Alabama's clay-heavy soils and Gulf Coast humidity", "expansive clay"),
  "AK": ("Alaska", ["Anchorage","Juneau","Fairbanks","Wasilla","Sitka","Kenai"], "Alaska's extreme freeze-thaw and permafrost conditions", "permafrost and rocky terrain"),
  "AR": ("Arkansas", ["Little Rock","Fayetteville","Fort Smith","Springdale","Jonesboro","Rogers"], "Arkansas's Ozark terrain and clay soil", "clay-heavy soils"),
  "AZ": ("Arizona", ["Phoenix","Tucson","Mesa","Chandler","Gilbert","Glendale","Tempe","Peoria","Scottsdale","Surprise"], "Arizona's desert caliche and expansive clay", "caliche layer"),
  "CA": ("California", ["Los Angeles","San Diego","San Jose","San Francisco","Fresno","Sacramento","Long Beach","Oakland","Bakersfield","Anaheim"], "California's seismic zones and varied geology", "expansive clays and seismic activity"),
  "CO": ("Colorado", ["Denver","Colorado Springs","Aurora","Fort Collins","Lakewood","Thornton","Arvada","Pueblo","Westminster","Boulder"], "Colorado's expansive bentonite clay and freeze-thaw", "shrink-swell clay"),
  "CT": ("Connecticut", ["Bridgeport","New Haven","Stamford","Hartford","Waterbury","Norwalk","Danbury","New Britain","West Hartford","Greenwich"], "Connecticut's glacial till and New England freeze-thaw", "glacial till"),
  "DE": ("Delaware", ["Wilmington","Dover","Newark","Middletown","Smyrna","Milford","Seaford","Georgetown","Elsmere","New Castle"], "Delaware's coastal plain sandy soils", "sandy and silty soils"),
  "FL": ("Florida", ["Jacksonville","Miami","Tampa","Orlando","St. Petersburg","Hialeah","Tallahassee","Fort Lauderdale","Port St. Lucie","Cape Coral"], "Florida's limestone, sand, and sinkhole terrain", "sandy and limestone karst"),
  "GA": ("Georgia", ["Atlanta","Augusta","Columbus","Macon","Savannah","Athens","Sandy Springs","South Fulton","Roswell","Warner Robins"], "Georgia's expansive red clay and Piedmont geology", "red clay"),
  "HI": ("Hawaii", ["Honolulu","Pearl City","Hilo","Kailua","Waipahu","Kaneohe","Kahului","Mililani","Ewa Beach","Kihei"], "Hawaii's volcanic basalt and tropical moisture", "volcanic basalt"),
  "IA": ("Iowa", ["Des Moines","Cedar Rapids","Davenport","Sioux City","Iowa City","Waterloo","Council Bluffs","Dubuque","Ames","West Des Moines"], "Iowa's loess and clay prairie soils", "loess and clay"),
  "ID": ("Idaho", ["Boise","Nampa","Meridian","Idaho Falls","Pocatello","Caldwell","Coeur d'Alene","Twin Falls","Lewiston","Post Falls"], "Idaho's volcanic and alluvial soils", "volcanic basalt and alluvial"),
  "IL": ("Illinois", ["Chicago","Aurora","Rockford","Joliet","Naperville","Springfield","Peoria","Elgin","Waukegan","Champaign"], "Illinois's clay and expansive glacial till", "glacial till and clay"),
  "IN": ("Indiana", ["Indianapolis","Fort Wayne","Evansville","South Bend","Carmel","Fishers","Bloomington","Hammond","Gary","Muncie"], "Indiana's clay till and limestone terrain", "clay till"),
  "KS": ("Kansas", ["Wichita","Overland Park","Kansas City","Topeka","Olathe","Lawrence","Shawnee","Manhattan","Lenexa","Salina"], "Kansas's expansive clay and loess plains", "expansive shale clay"),
  "KY": ("Kentucky", ["Louisville","Lexington","Bowling Green","Owensboro","Covington","Hopkinsville","Richmond","Florence","Georgetown","Henderson"], "Kentucky's limestone karst and clay terrain", "limestone karst"),
  "LA": ("Louisiana", ["New Orleans","Baton Rouge","Shreveport","Metairie","Lafayette","Lake Charles","Kenner","Bossier City","Monroe","Alexandria"], "Louisiana's subsiding deltaic soils and humidity", "soft deltaic clay"),
  "MA": ("Massachusetts", ["Boston","Worcester","Springfield","Lowell","Cambridge","Brockton","New Bedford","Providence area","Lynn","Fall River"], "Massachusetts's glacial till and freeze-thaw", "glacial till"),
  "MD": ("Maryland", ["Baltimore","Columbia","Germantown","Silver Spring","Waldorf","Glen Burnie","Ellicott City","Frederick","Rockville","Gaithersburg"], "Maryland's varied clay and Piedmont soils", "Piedmont clay"),
  "ME": ("Maine", ["Portland","Lewiston","Bangor","South Portland","Auburn","Biddeford","Saco","Augusta","Westbrook","Waterville"], "Maine's granite bedrock and severe freeze-thaw", "granite and glacial till"),
  "MI": ("Michigan", ["Detroit","Grand Rapids","Warren","Sterling Heights","Ann Arbor","Lansing","Flint","Dearborn","Livonia","Westland"], "Michigan's clay-heavy glacial soils", "lacustrine clay"),
  "MN": ("Minnesota", ["Minneapolis","St. Paul","Rochester","Duluth","Bloomington","Brooklyn Park","Plymouth","Maple Grove","Woodbury","St. Cloud"], "Minnesota's extreme freeze-thaw and clay", "lacustrine clay"),
  "MO": ("Missouri", ["Kansas City","St. Louis","Springfield","Columbia","Independence","Lee's Summit","O'Fallon","St. Joseph","St. Charles","Blue Springs"], "Missouri's expansive clay and loess soils", "loess and shale clay"),
  "MS": ("Mississippi", ["Jackson","Gulfport","Southaven","Hattiesburg","Biloxi","Meridian","Tupelo","Olive Branch","Horn Lake","Greenville"], "Mississippi's expansive delta clay", "Delta clay"),
  "MT": ("Montana", ["Billings","Missoula","Great Falls","Bozeman","Butte","Helena","Kalispell","Havre","Anaconda","Miles City"], "Montana's frost and rocky mountain terrain", "rocky mountain terrain"),
  "NC": ("North Carolina", ["Charlotte","Raleigh","Greensboro","Durham","Winston-Salem","Fayetteville","Cary","Wilmington","High Point","Concord"], "North Carolina's red clay Piedmont and coastal plain", "red clay"),
  "ND": ("North Dakota", ["Fargo","Bismarck","Grand Forks","Minot","West Fargo","Williston","Dickinson","Mandan","Jamestown","Wahpeton"], "North Dakota's expansive clay and extreme cold", "expansive shale clay"),
  "NE": ("Nebraska", ["Omaha","Lincoln","Bellevue","Grand Island","Kearney","Fremont","Hastings","North Platte","Norfolk","Columbus"], "Nebraska's loess and expansive clay plains", "loess and clay"),
  "NH": ("New Hampshire", ["Manchester","Nashua","Concord","Derry","Dover","Rochester","Salem","Merrimack","Hudson","Londonderry"], "New Hampshire's granite bedrock and freeze-thaw", "glacial till"),
  "NJ": ("New Jersey", ["Newark","Jersey City","Paterson","Elizabeth","Lakewood","Edison","Woodbridge","Toms River","Hamilton","Trenton"], "New Jersey's varied coastal and piedmont soils", "coastal plain soils"),
  "NM": ("New Mexico", ["Albuquerque","Las Cruces","Rio Rancho","Santa Fe","Roswell","Farmington","Clovis","Hobbs","Alamogordo","Carlsbad"], "New Mexico's caliche, adobe, and desert soils", "caliche and adobe"),
  "NV": ("Nevada", ["Las Vegas","Henderson","Reno","North Las Vegas","Sparks","Carson City","Fernley","Elko","Mesquite","Boulder City"], "Nevada's desert caliche and seismic activity", "caliche and alluvial"),
  "NY": ("New York", ["New York City","Buffalo","Rochester","Yonkers","Syracuse","Albany","New Rochelle","Mount Vernon","Schenectady","Utica"], "New York's glacial till and freeze-thaw extremes", "glacial till"),
  "OH": ("Ohio", ["Columbus","Cleveland","Cincinnati","Toledo","Akron","Dayton","Parma","Canton","Youngstown","Lorain"], "Ohio's clay-heavy glacial till", "lacustrine clay"),
  "OK": ("Oklahoma", ["Oklahoma City","Tulsa","Norman","Broken Arrow","Lawton","Edmond","Moore","Midwest City","Enid","Stillwater"], "Oklahoma's expansive clay and tornado-stress damage", "shrink-swell clay"),
  "OR": ("Oregon", ["Portland","Salem","Eugene","Gresham","Hillsboro","Beaverton","Bend","Medford","Springfield","Corvallis"], "Oregon's wet clay and volcanic soils", "clay and volcanic"),
  "PA": ("Pennsylvania", ["Philadelphia","Pittsburgh","Allentown","Erie","Reading","Scranton","Bethlehem","Lancaster","Harrisburg","York"], "Pennsylvania's varied shale and glacial soils", "shale and glacial till"),
  "RI": ("Rhode Island", ["Providence","Cranston","Warwick","Pawtucket","East Providence","Woonsocket","Coventry","Cumberland","North Providence","West Warwick"], "Rhode Island's glacial till and coastal soils", "glacial till"),
  "SC": ("South Carolina", ["Columbia","Charleston","North Charleston","Mount Pleasant","Rock Hill","Greenville","Summerville","Goose Creek","Hilton Head Island","Sumter"], "South Carolina's red clay Piedmont and coastal plain", "red clay"),
  "SD": ("South Dakota", ["Sioux Falls","Rapid City","Aberdeen","Brookings","Watertown","Mitchell","Yankton","Pierre","Huron","Spearfish"], "South Dakota's expansive shale clay", "Pierre shale clay"),
  "TN": ("Tennessee", ["Nashville","Memphis","Knoxville","Chattanooga","Clarksville","Murfreesboro","Franklin","Jackson","Johnson City","Bartlett"], "Tennessee's clay and limestone karst terrain", "clay and karst"),
  "TX": ("Texas", ["Houston","San Antonio","Dallas","Austin","Fort Worth","El Paso","Arlington","Corpus Christi","Plano","Lubbock"], "Texas's expansive Blackland Prairie clay", "expansive clay"),
  "UT": ("Utah", ["Salt Lake City","West Valley City","Provo","West Jordan","Sandy","Ogden","St. George","Layton","Taylorsville","South Jordan"], "Utah's expansive soil and seismic zones", "expansive bentonite"),
  "VA": ("Virginia", ["Virginia Beach","Norfolk","Chesapeake","Richmond","Newport News","Alexandria","Hampton","Roanoke","Portsmouth","Suffolk"], "Virginia's varied Piedmont and coastal plain soils", "Piedmont clay"),
  "VT": ("Vermont", ["Burlington","South Burlington","Rutland","Barre","Montpelier","Winooski","St. Albans","Newport","Vergennes","Middlebury"], "Vermont's granite bedrock and extreme freeze-thaw", "granite and glacial till"),
  "WA": ("Washington", ["Seattle","Spokane","Tacoma","Vancouver","Bellevue","Kent","Everett","Renton","Spokane Valley","Kirkland"], "Washington's clay and wet Pacific conditions", "clay and volcanic"),
  "WI": ("Wisconsin", ["Milwaukee","Madison","Green Bay","Kenosha","Racine","Appleton","Waukesha","Oshkosh","Eau Claire","Janesville"], "Wisconsin's clay glacial till and freeze-thaw", "lacustrine clay"),
  "WV": ("West Virginia", ["Charleston","Huntington","Morgantown","Parkersburg","Wheeling","Weirton","Fairmont","Beckley","Clarksburg","Martinsburg"], "West Virginia's hilly terrain and shale bedrock", "shale and mountain terrain"),
  "WY": ("Wyoming", ["Cheyenne","Casper","Laramie","Gillette","Rock Springs","Sheridan","Green River","Evanston","Riverton","Jackson"], "Wyoming's frost heave and expansive soils", "high-altitude expansive soil"),
}

# Specialty templates: (name_template, specialty_list, bio_template, tags_template)
# {state}, {city}, {region_desc}, {soil_note} are substituted
TEMPLATES = [
  # Foundation (2 templates)
  ("{city} Foundation Solutions", ["Foundation"], "Expert foundation repair in {city}, {state}. Helical piers, slab crack injection, and basement waterproofing for {region_desc}.", ["Helical piers","Slab repair","Waterproofing","Licensed"]),
  ("{state} Pro Foundation Repair", ["Foundation"], "Serving homeowners across {state} with pier and beam leveling, wall anchors, and drainage systems built for {soil_note}.", ["Pier and beam","Wall anchors","Drainage","Warranty"]),
  # Roof (2 templates)
  ("{city} Roofing & Exteriors", ["Roof","Exterior"], "Full-service roofing contractor in {city}, {state}. Architectural shingle, metal roofing, storm damage repair, and gutter installation.", ["Metal roofing","Storm damage","Gutters","Free inspection"]),
  ("{state} Elite Roofing", ["Roof"], "Residential and commercial roofing throughout {state}. Wind and hail damage specialists with insurance claim assistance and next-day estimates.", ["Wind damage","Hail","Insurance claims","Fast estimates"]),
  # HVAC (2 templates)
  ("{city} Comfort HVAC", ["HVAC"], "Heating and cooling specialists in {city}. Heat pump installation, furnace replacement, AC repair, and preventive maintenance for {state} homeowners.", ["Heat pump","Furnace","AC repair","Maintenance"]),
  ("All-Season HVAC {state}", ["HVAC","Plumbing"], "Year-round HVAC and plumbing service throughout {state}. Emergency repairs, new equipment installs, and water heater replacement.", ["Emergency repair","New install","Water heater","Year-round"]),
  # Plumbing (2 templates)
  ("{city} Master Plumbing", ["Plumbing"], "Licensed plumbers in {city}, {state}. Drain cleaning, sewer line repair, water heater replacement, and 24/7 emergency service.", ["Drain cleaning","Sewer repair","Water heater","24/7"]),
  ("{state} Pro Plumbing", ["Plumbing"], "Full-service plumbing throughout {state}. Repiping, tankless water heater installation, slab leak detection, and camera inspections.", ["Repiping","Tankless","Slab leak","Camera inspection"]),
  # Electrical (2 templates)
  ("{city} Licensed Electric", ["Electrical","Safety"], "Licensed electricians serving {city} and surrounding {state} communities. Panel upgrades, EV chargers, generator hookups, and surge protection.", ["Panel upgrade","EV charger","Generator","Surge protection"]),
  ("{state} Power Electrical", ["Electrical"], "Residential electrical services across {state}. Whole-home rewiring, service upgrades, smart home systems, and storm damage repairs.", ["Rewiring","Service upgrade","Smart home","Storm damage"]),
  # Interior (2 templates)
  ("{city} Home Renovations", ["Interior","Exterior"], "General contractor in {city}, {state}. Kitchen and bath remodels, basement finishing, deck construction, and exterior updates.", ["Kitchen remodel","Bath remodel","Basement finish","Deck building"]),
  ("{state} Premier Home Services", ["Interior"], "Full-service interior remodeling throughout {state}. Flooring, drywall, painting, kitchen cabinetry, and bathroom tile work.", ["Flooring","Drywall","Painting","Cabinetry"]),
  # Exterior (2 templates)
  ("{city} Exterior Specialists", ["Exterior","Roof"], "Exterior home improvement in {city}, {state}. Siding replacement, deck building, fence installation, and roof repairs.", ["Siding","Deck building","Fence","Roof repair"]),
  ("{state} Curb Appeal Contractors", ["Exterior"], "Exterior renovations across {state}. Pressure washing, painting, siding, driveway sealing, and landscaping for maximum curb appeal.", ["Pressure washing","Painting","Siding","Driveway sealing"]),
]

import re
with open('/Users/andrewdevyatkin/.gemini/antigravity-ide/scratch/lib/data.ts') as f:
    content = f.read()

# Find current max ct number
ids = [int(m) for m in re.findall(r'id: "ct(\d+)"', content)]
next_id = max(ids) + 1

# Find what each state already has
blocks = re.findall(r'\{ id: "ct\d+".*?completedJobs: \d+.*?\}', content, re.DOTALL)
from collections import defaultdict
state_spec_count = defaultdict(lambda: defaultdict(int))
state_cities_used = defaultdict(set)

for block in blocks:
    abbr_m = re.search(r'stateAbbr: "([A-Z]{2})"', block)
    spec_m = re.search(r'specialty: \[([^\]]+)\]', block)
    city_m = re.search(r'city: "([^"]+)"', block)
    if abbr_m and spec_m:
        abbr = abbr_m.group(1)
        specs = re.findall(r'"([^"]+)"', spec_m.group(1))
        for s in specs:
            state_spec_count[abbr][s] += 1
        if city_m:
            state_cities_used[abbr].add(city_m.group(1))

SPECIALTIES = ['Foundation','Roof','HVAC','Plumbing','Electrical','Interior','Exterior']
TARGET = 5

ratings = [4.5, 4.6, 4.7, 4.7, 4.8, 4.8, 4.9]
reviews = [134, 156, 178, 198, 212, 234, 256, 267, 289, 312, 334, 356, 389, 412]
years = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
prices = ["$", "$$", "$$", "$$", "$$$"]
responses = ["< 1 hour", "< 2 hours", "< 2 hours", "< 3 hours", "Same day", "1-2 days"]
jobs = [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3500, 3800, 4000]

new_contractors = []
ri = 0  # rotation index

for abbr, (full_state, cities, region_desc, soil_note) in sorted(STATES.items()):
    # Figure out what specialties still need more contractors
    needed_specs = {s for s in SPECIALTIES if state_spec_count[abbr][s] < TARGET}
    if not needed_specs:
        continue
    
    # Pick unused cities
    available_cities = [c for c in cities if c not in state_cities_used[abbr]]
    if not available_cities:
        available_cities = cities  # reuse if all used
    
    city_idx = 0
    for tmpl in TEMPLATES:
        name_tmpl, spec_list, bio_tmpl, tags = tmpl
        # Check if this template covers any needed specialty
        covers = [s for s in spec_list if s in needed_specs]
        if not covers:
            continue
        
        city = available_cities[city_idx % len(available_cities)]
        city_idx += 1
        
        name = name_tmpl.format(city=city, state=full_state)
        bio = bio_tmpl.format(city=city, state=full_state, region_desc=region_desc, soil_note=soil_note)
        
        # Build contractor entry
        spec_str = ', '.join(f'"{s}"' for s in spec_list)
        tags_str = ', '.join(f'"{t}"' for t in tags)
        
        rating = ratings[ri % len(ratings)]
        review_count = reviews[ri % len(reviews)]
        yrs = years[ri % len(years)]
        price = prices[ri % len(prices)]
        response = responses[ri % len(responses)]
        job_count = jobs[ri % len(jobs)]
        ri += 1
        
        entry = f'  {{ id: "ct{next_id}", name: "{name}", specialty: [{spec_str}], city: "{city}", state: "{full_state}", stateAbbr: "{abbr}", rating: {rating}, reviewCount: {review_count}, yearsInBusiness: {yrs}, verified: true, responseTime: "{response}", priceRange: "{price}", bio: "{bio}", completedJobs: {job_count}, tags: [{tags_str}] }},'
        new_contractors.append(entry)
        
        # Update counts
        for s in spec_list:
            state_spec_count[abbr][s] += 1
        state_cities_used[abbr].add(city)
        needed_specs -= set(covers)
        
        next_id += 1
        
        if not needed_specs:
            break

new_ts = "\n" + "\n".join(new_contractors) + "\n"

# Find the closing ];\n of the contractors array (after the last ct entry)
all_ct = [(m.start(), int(m.group(1))) for m in re.finditer(r'id: "ct(\d+)"', content)]
last_ct_pos = max(all_ct, key=lambda x: x[1])[0]
end_of_last = content.find('\n', last_ct_pos) + 1
close_idx = content.find('\n];', end_of_last)

new_content = content[:close_idx] + new_ts + content[close_idx:]

with open('/Users/andrewdevyatkin/.gemini/antigravity-ide/scratch/lib/data.ts', 'w') as f:
    f.write(new_content)

added = len(new_contractors)
total = new_content.count('stateAbbr:')
print(f"Added {added} contractors. Total: {total}")

# Final audit
blocks2 = re.findall(r'\{ id: "ct\d+".*?completedJobs: \d+.*?\}', new_content, re.DOTALL)
state_spec2 = defaultdict(lambda: defaultdict(int))
for block in blocks2:
    abbr_m = re.search(r'stateAbbr: "([A-Z]{2})"', block)
    spec_m = re.search(r'specialty: \[([^\]]+)\]', block)
    if abbr_m and spec_m:
        abbr = abbr_m.group(1)
        for s in re.findall(r'"([^"]+)"', spec_m.group(1)):
            state_spec2[abbr][s] += 1

still_missing = [(abbr, s, state_spec2[abbr][s]) for abbr in sorted(state_spec2) for s in SPECIALTIES if state_spec2[abbr][s] < TARGET]
if still_missing:
    print(f"Still below {TARGET}: {len(still_missing)} slots")
    for abbr, s, have in still_missing[:10]:
        print(f"  {abbr} {s}: {have}")
else:
    print(f"SUCCESS: All 50 states have {TARGET}+ contractors for every specialty!")
