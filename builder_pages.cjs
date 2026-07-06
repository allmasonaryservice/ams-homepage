const fs = require('fs');
const path = require('path');

const cities = [
  { "name": "Winnetka", "slug": "winnetka", "county": "Cook County", "zip": "60093", "areas": "Hubbard Woods, Indian Hill Estates, Tower Road area", "region": "North Shore" },
  { "name": "Wilmette", "slug": "wilmette", "county": "Cook County", "zip": "60091", "areas": "Central Wilmette, Linden Square, Mallinckrodt Park area", "region": "North Shore" },
  { "name": "Kenilworth", "slug": "kenilworth", "county": "Cook County", "zip": "60043", "areas": "Kenilworth Historic District, Sheridan Road corridor", "region": "North Shore" },
  { "name": "Glencoe", "slug": "glencoe", "county": "Cook County", "zip": "60022", "areas": "Downtown Glencoe, North Shore Drive, Ravine Drive area", "region": "North Shore" },
  { "name": "Evanston", "slug": "evanston", "county": "Cook County", "zip": "60201, 60202, 60203, 60208", "areas": "Central Evanston, South Evanston, Lakeshore District, West Evanston", "region": "North Shore" },
  { "name": "Highland Park", "slug": "highland-park", "county": "Lake County", "zip": "60035", "areas": "Downtown Highland Park, Ravinia District, Moraine Township area", "region": "North Shore" },
  { "name": "Northbrook", "slug": "northbrook", "county": "Cook County", "zip": "60062", "areas": "Downtown Northbrook, Techny Road area, Dundee Road corridor", "region": "North Shore" },
  { "name": "Hinsdale", "slug": "hinsdale", "county": "DuPage County", "zip": "60521, 60522", "areas": "Historic Downtown Hinsdale, Madison Street District, Katherine Avenue area", "region": "Western Suburbs" },
  { "name": "Oak Brook", "slug": "oak-brook", "county": "DuPage County", "zip": "60523", "areas": "Oak Brook Center corridor, Midwest Road area, Butler National area", "region": "Western Suburbs" },
  { "name": "Elmhurst", "slug": "elmhurst", "county": "DuPage County", "zip": "60126", "areas": "Downtown Elmhurst, Wilder Park area, York Road corridor", "region": "Western Suburbs" },
  { "name": "Western Springs", "slug": "western-springs", "county": "Cook County", "zip": "60558", "areas": "Downtown Western Springs, La Grange Road corridor, Commonwealth Avenue area", "region": "Western Suburbs" },
  { "name": "Naperville", "slug": "naperville", "county": "DuPage County", "zip": "60540, 60563, 60564, 60565, 60566, 60567", "areas": "Downtown Naperville Historic District, Naper Settlement area, Route 59 corridor", "region": "DuPage County" },
  { "name": "Downers Grove", "slug": "downers-grove", "county": "DuPage County", "zip": "60515, 60516", "areas": "Downtown Downers Grove, Downers Grove Estates, Belmont Road corridor", "region": "DuPage County" },
  { "name": "La Grange", "slug": "la-grange", "county": "Cook County", "zip": "60525, 60526", "areas": "Downtown La Grange Historic District, La Grange Park area, Stone Avenue corridor", "region": "Western Suburbs" },
  { "name": "Burr Ridge", "slug": "burr-ridge", "county": "DuPage County", "zip": "60527", "areas": "Burr Ridge Village Center, County Line Road corridor, Harvester Drive area", "region": "Western Suburbs" },
  { "name": "Clarendon Hills", "slug": "clarendon-hills", "county": "DuPage County", "zip": "60514", "areas": "Downtown Clarendon Hills, Chicago Avenue corridor, Prospect Avenue area", "region": "DuPage County" },
  { "name": "Willowbrook", "slug": "willowbrook", "county": "DuPage County", "zip": "60527", "areas": "Willowbrook Village, Route 83 corridor, Holmes subdivision area", "region": "DuPage County" },
  { "name": "Wheaton", "slug": "wheaton", "county": "DuPage County", "zip": "60187, 60188, 60189", "areas": "Downtown Wheaton, Danada Farms area, College Avenue corridor", "region": "DuPage County" },
  { "name": "Chicago", "slug": "chicago", "county": "Cook County", "zip": "60614, 60647, 60639, 60637, 60608", "areas": "Lincoln Park, Bucktown, Logan Square, Hyde Park, Pilsen", "region": "City of Chicago" }
];

const templatePath = path.join(__dirname, 'src', 'pages', 'locations', '[city].astro');
let baseTemplate = fs.readFileSync(templatePath, 'utf8');

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getUniqueN = (arr, n) => {
  let shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const heroHeadings = [
  "Custom Masonry Builders", "Premium Masonry Construction", "Architectural Masonry Experts",
  "Luxury Home Masonry", "Bespoke Brick & Stone Construction", "Structural Masonry Specialists",
  "Elite Masonry Craftsmen", "High-End Masonry Builders", "Master Masonry Contractors"
];
const heroSubs = [
  "We specialize in building custom homes, installing premium brick veneers, and constructing structural CMU blocks from the ground up.",
  "Partnering with builders and homeowners to construct high-end natural stone facades, complex chimneys, and structurally flawless estates.",
  "Engineering luxurious masonry structures. From new construction brickwork to grand limestone installations, our in-house crew delivers absolute perfection.",
  "Your trusted partner for new masonry builds. We handle custom architectural stone, deep foundation blocks, and intricate fireplace construction.",
  "Building legacies in brick and stone. We execute complex blueprints with meticulous craftsmanship, ensuring structural integrity that lasts generations."
];
const whatWeDoBody = [
  "Unlike companies that just patch cracks, we are full-scale builders. From sprawling new custom homes to commercial block work, our in-house craftsmen execute complex structural and veneer systems with zero subcontractors.",
  "We bring architectural blueprints to life. Whether constructing massive natural stone retaining walls, structural CMU framing, or luxury brick facades, our dedicated team guarantees precision on every single build.",
  "Our expertise lies in construction. We build grand chimneys, luxurious fireplaces, and flawless brick exteriors. We control the quality by keeping every artisan in-house—no handoffs, no middle-men.",
  "We are construction partners. General contractors and luxury homeowners rely on our structural engineering expertise to build exquisite limestone exteriors and rock-solid foundation blocks.",
  "Focusing on premium construction, we deliver complete masonry builds. Our team specializes in architectural block, premium face brick, and custom stonework for the most demanding luxury projects."
];
const howWeWorkSteps = {
  step1: [
    { title: "Blueprint Analysis & Consultation", text: "We review your architectural plans in detail, consulting on structural requirements and material logistics for your new build." },
    { title: "On-Site Build Assessment", text: "Before construction begins, our project managers evaluate the site conditions to ensure flawless structural integration and proper grading." },
    { title: "Comprehensive Scope Planning", text: "We don't guess. We provide a rigorous, line-by-line construction estimate covering all structural block, brick, and mortar needs." }
  ],
  step2: [
    { title: "Premium Material Selection", text: "We partner with top-tier suppliers to source the exact luxury brick, natural stone, or architectural CMU specified in your plans." },
    { title: "Custom Mortar & Stone Sourcing", text: "We secure high-end limestone and mix custom mortar batches tailored specifically for the structural load and aesthetic of your estate." },
    { title: "Procurement & Staging", text: "All masonry units, flashing, and structural components are secured and staged to ensure zero delays once our crews begin building." }
  ],
  step3: [
    { title: "GC Integration & Scheduling", text: "Masonry is on the critical path. We coordinate daily with your general contractor and framers to keep the entire build perfectly on schedule." },
    { title: "Site Protection & Scaffolding", text: "We erect professional scaffolding and implement strict site protection protocols to safeguard adjacent landscaping and foundation work." },
    { title: "Seamless Project Sequencing", text: "We sequence our block and veneer phases perfectly with plumbers, electricians, and carpenters to ensure a smooth construction flow." }
  ],
  step4: [
    { title: "Structural & Veneer Construction", text: "Our in-house master masons lay every block and brick perfectly plumb. We rigorously install flashing and weep systems to code." },
    { title: "Precision Masonry Execution", text: "From complex archways to load-bearing CMU walls, our team builds exactly to blueprint with uncompromising structural integrity." },
    { title: "In-House Master Craftsmanship", text: "No subcontractors. Our direct employees build your custom home, ensuring the highest standards of architectural masonry are met." }
  ],
  step5: [
    { title: "Final Walk-Through & Approval", text: "We inspect every joint and wash the new facade completely. We don't leave until the builder and homeowner are completely satisfied." },
    { title: "Architectural Handover", text: "We clean the site meticulously and perform a final structural review, handing over a flawless masonry build ready for the next trades." },
    { title: "Quality Assurance Sign-Off", text: "A rigorous quality check of all flashing, mortar joints, and stone alignments ensures your new home exceeds municipal building codes." }
  ]
};
const whyItMattersTitle = [
  "The Risk of Hiring Amateurs for New Builds", "Why Cheap Masonry Costs Fortunes Later",
  "The Hidden Dangers of Poor Construction", "What Happens When Builders Cut Corners",
  "The High Cost of Unqualified Masons"
];
const whyItMattersBody = [
  "Custom home masonry mistakes are catastrophic. Improperly built load-bearing walls or failed flashing systems don't just look bad—they cause massive structural failures that require tearing down the entire facade.",
  "In new construction, masonry is the first line of defense. If a contractor skips weep holes or uses the wrong mortar strength on a fresh build, water infiltrates the cavity, silently rotting the brand-new framing.",
  "Building a luxury home requires precision. Using unverified subcontractors often leads to out-of-plumb walls and mismatched veneers. Once the mortar cures, the only way to fix it is a total, expensive demolition.",
  "The structure of your home depends on the masonry. Inexperienced crews often fail to properly install ties and flashing in new builds, leading to devastating water damage and structural settling years down the line.",
  "Quality construction cannot be faked. When you hire bargain masons for a custom build, they rush the block work and compromise the mortar mix, leaving your new investment vulnerable to cracking and severe weather damage."
];
const whyItMattersItems = {
  i1: [ { t: "Missing Cavity Flashing", b: "Skipping proper through-wall flashing on new builds traps water inside, destroying the structural framing behind the beautiful new brick." }, { t: "Incorrect Mortar Strength", b: "Using overly hard mortar on modern brick causes the brick face to shatter under thermal expansion, ruining the new facade." } ],
  i2: [ { t: "Out-of-Plumb Block Work", b: "If the foundational CMU blocks are even slightly off level, the entire upper structure of the house will be permanently compromised." }, { t: "Subcontractor Chaos", b: "Brokering out work to unknown crews means zero quality control. The standards drop the minute the general contractor looks away." } ],
  i3: [ { t: "Failed Lintels & Arches", b: "Improperly supported steel lintels over new windows will sag, causing massive stair-step cracking through the brand new brickwork." }, { t: "Lack of Weep Systems", b: "Without correctly spaced weep holes in the new veneer, moisture cannot escape, leading to mold and efflorescence on your new walls." } ]
};
const whatSetsUsApartCards = [
  { t: "In-House Master Masons", b: "We never use subcontractors. The expert team that estimates your custom build is the exact same crew that executes it flawlessly." },
  { t: "Blueprint to Reality", b: "We specialize in translating complex architectural designs into structurally sound, breathtaking masonry masterpieces." },
  { t: "Family-Owned Heritage", b: "Masonry is our blood. I learned from my father, and we bring decades of traditional craftsmanship to modern luxury construction." },
  { t: "Structural Engineering Focus", b: "We don't just lay brick; we build systems. Flashing, drainage, and load-bearing capacities are executed perfectly to code." },
  { t: "Premium Material Sourcing", b: "We partner directly with quarries and brickyards to supply the highest grade natural stone and custom brick for your estate." },
  { t: "Flawless GC Collaboration", b: "We know construction scheduling. We arrive on time, coordinate with other trades, and never delay the critical path." }
];
const whyTrustItems = [
  { t: "Fully Licensed Builders", b: "We hold all necessary municipal licenses for new construction and heavy structural masonry across Chicagoland." },
  { t: "Zero Subcontractors", b: "Every artisan on your site is our direct employee. We maintain absolute control over the quality of your new build." },
  { t: "Built Right the First Time", b: "Our family motto dictates our work ethic. We engineer and construct your masonry correctly so it lasts a lifetime." },
  { t: "$2.5M General Liability", b: "Your multi-million dollar custom home project is fully protected. We carry premium insurance for luxury construction." },
  { t: "First-Time Inspection Pass", b: "Our strict adherence to building codes means we pass municipal structural inspections on the very first visit, avoiding delays." },
  { t: "Trusted by Top GCs", b: "Leading custom home builders repeatedly partner with us because we deliver absolute precision on complex blueprints." },
  { t: "Workers' Comp Covered", b: "Every single crew member is fully covered. You bear zero liability for our team while we build on your property." },
  { t: "Generations of Expertise", b: "Founded in 2007, our family brings decades of deep masonry construction knowledge to your modern project." }
];
const faqs = [
  { q: "Do you take on new custom home builds?", a: "Yes, our primary focus is partnering with builders and homeowners to construct high-end masonry for new luxury homes from the ground up." },
  { q: "Do you use subcontractors for large masonry projects?", a: "Never. All our work is performed by our highly trained, in-house master masons to guarantee flawless construction quality." },
  { q: "Can you read and execute complex architectural blueprints?", a: "Absolutely. We routinely build intricate arches, custom stone facades, and load-bearing CMU structures exactly to architectural specifications." },
  { q: "Do you install natural stone and limestone?", a: "Yes, we specialize in high-end natural stone veneers, custom limestone detailing, and premium brick installations for luxury estates." },
  { q: "How do you coordinate with our General Contractor?", a: "We work directly with your GC to ensure seamless scheduling, site safety, and perfect integration with framing and other critical trades." },
  { q: "Are you fully licensed and insured for new construction?", a: "Yes, we carry $2.5M in liability insurance, full workers' comp, and hold all necessary licenses for heavy masonry construction." },
  { q: "Do you also do masonry restoration?", a: "While we are primarily builders, we also provide expert restoration for historic and high-value properties requiring structural rebuilding." }
];
const reviewQuotes = [
  "They built the entire stone facade for our new custom home. The GC was blown away by their precision. Absolute master craftsmen.",
  "AMS constructed our massive double-sided limestone fireplace. It is the centerpiece of our new build. Flawless execution.",
  "No subcontractors! The same professional crew showed up every day and built our brick estate exactly to the architect's plans.",
  "We are custom home builders and AMS is our go-to masonry partner. They never cut corners on flashing or structural block work.",
  "They constructed the CMU foundation and brick veneer for our commercial property. On time, on budget, and perfect quality."
];
const reviewAuthors = ["Michael T.", "Sarah L.", "James R.", "David W., GC", "Robert K.", "Emily H."];

const pageUrlString = 'const pageUrl = `${siteUrl}/locations/${city.slug}`;';
const idx = baseTemplate.indexOf(pageUrlString);
let templateBase = `---
import Layout from '../../layouts/Layout.astro';
import Navbar from '../../components/Navbar.astro';
import Footer from '../../components/Footer.astro';
import DynamicCityMask from '../../components/DynamicCityMask.astro';
import Testimonials from '../../components/Testimonials.astro';
import Projects from '../../components/Projects.astro';

const toSlug = (name: string) => name.toLowerCase().replace(/\\s+/g, '-');
const allCityNames = ${JSON.stringify(cities.map(c => c.name))};
// CITY_DATA_INJECTION_POINT
` + baseTemplate.substring(idx + pageUrlString.length);

cities.forEach((c, index) => {
  let fileContent = templateBase;

  const uniqueCityData = {
    slug: c.slug,
    name: c.name,
    county: c.county,
    region: c.region,
    metaTitle: "Custom Masonry Construction " + c.name + " IL | Builders & Contractors",
    metaDesc: "Specializing in new custom home masonry, brick, stone, and structural block construction in " + c.name + ", IL. In-house crew, no subcontractors.",
    heroSub: rand(heroSubs),
    heroReview: {
      quote: rand(reviewQuotes),
      author: rand(reviewAuthors),
      location: c.name + ", IL"
    },
    problem: rand(whyItMattersBody),
    faqItems: getUniqueN(faqs, 5).map(f => ({ question: f.q, answer: f.a })),
    nearbyAreas: getUniqueN(cities.map(x=>x.name).filter(n => n !== c.name), 5),
    details: {
      areas: c.areas,
      zipCodes: c.zip
    }
  };

  const frontmatterInjection = `
const city = ${JSON.stringify(uniqueCityData, null, 2)};
const cityIndex = ${index};
const siteUrl = 'https://allmasonryservices.com';
const pageUrl = \`\${siteUrl}/locations/\${city.slug}\`;
`;

  fileContent = fileContent.replace('// CITY_DATA_INJECTION_POINT', frontmatterInjection);

  fileContent = fileContent.replace(/Masonry Contractor/, rand(heroHeadings));
  fileContent = fileContent.replace(/Mortar-Match Guarantee/g, "Structural Integrity Guaranteed");

  fileContent = fileContent.replace(/Why {city\.name} Masonry<br>Requires Local Expertise/, "Building Custom Masonry<br>in " + c.name);
  fileContent = fileContent.replace(/Chicago's suburbs each have distinct soil conditions, historic building materials, and architectural styles\. The wrong mason doesn't just do poor work — they cause damage that costs far more to reverse\./, 
    "Constructing luxury homes requires an elite understanding of structural engineering, premium materials, and flawless architectural execution. We partner with top builders to construct masterworks."
  );
  fileContent = fileContent.replace(/What Makes {city\.name} Different/, "Elite Construction in " + c.name);
  fileContent = fileContent.replace(/What Happens Without Local Knowledge/, "The Risk of Unqualified Crews");
  fileContent = fileContent.replace(/From brick installation to chimney rebuilds — every masonry service, handled by one crew, with the same mortar-match guarantee on every job\./, rand(whatWeDoBody));

  const s1 = rand(howWeWorkSteps.step1);
  const s2 = rand(howWeWorkSteps.step2);
  const s3 = rand(howWeWorkSteps.step3);
  const s4 = rand(howWeWorkSteps.step4);
  const s5 = rand(howWeWorkSteps.step5);
  
  fileContent = fileContent.replace(/Free On-Site Assessment/, s1.title);
  fileContent = fileContent.replace(/We visit your {city\.name} property to assess the exact condition of your masonry — joints, brick, chimney, and substrate\. No guessing from photos\./, s1.text);
  fileContent = fileContent.replace(/Every masonry assessment is free and in-person\. We don't scope work from photos — we only write estimates on what we can actually see, touch, and measure\./, "Our detailed blueprint analysis prevents costly mid-project change orders.");
  fileContent = fileContent.replace(/Written Estimate &amp; Material Selection/, s2.title);
  fileContent = fileContent.replace(/We provide a full written estimate — scope, materials, labor, and timeline — before any work begins\. Mortar type and brick source are selected to match your existing materials\./, s2.text);
  fileContent = fileContent.replace(/The wrong mortar hardness is the single most common cause of premature masonry failure\. We select mortar type before we estimate — not during the job\./, "Proper staging and exact material sourcing eliminate delays during the critical construction phase.");
  fileContent = fileContent.replace(/Scheduling &amp; Site Preparation/, s3.title);
  fileContent = fileContent.replace(/We confirm your schedule, deliver materials, and set up site protection before crews arrive\. Your {city\.name} neighbors and landscape are protected throughout the project\./, s3.text);
  fileContent = fileContent.replace(/Good masonry starts before the first tool touches the wall\. Proper protection and sequencing prevents damage to adjacent materials and accelerates the work itself\./, "Masonry forms the core structure. Seamless GC integration keeps the entire custom build moving perfectly.");
  fileContent = fileContent.replace(/Expert Masonry Installation/, s4.title);
  fileContent = fileContent.replace(/Our crew executes the scope exactly as written — same crew that estimated, same materials selected\. We check level and alignment at every stage\. No subcontractors, no surprises\./, s4.text);
  fileContent = fileContent.replace(/The crew that estimates is the crew that builds\. No handoff to subcontractors means the standards we set at estimate are the standards enforced on site\./, "We rely entirely on our in-house master craftsmen. Total control over execution guarantees architectural perfection.");
  fileContent = fileContent.replace(/Cleanup &amp; Walk-Through Approval/, s5.title);
  fileContent = fileContent.replace(/We clean the work area completely, remove mortar residue from brick faces, and walk the completed project with you before we consider the job closed\./, s5.text);
  fileContent = fileContent.replace(/Mortar residue left on brick permanently stains the face\. The walk-through is your final check — we don't consider the job done until you do\./, "We verify every structural detail and aesthetic line before handing the site back to the general contractor.");

  fileContent = fileContent.replace(/What Goes Wrong When You<br><em>Hire the Wrong Mason<\/em>/, rand(whyItMattersTitle));
  fileContent = fileContent.replace(/Custom home masonry mistakes are expensive — they're often invisible for years, then impossible to fix without opening walls\. Here's what hiring the wrong mason costs you\./, rand(whyItMattersBody));
  
  const w1 = rand(whyItMattersItems.i1);
  const w2 = rand(whyItMattersItems.i2);
  const w3 = rand(whyItMattersItems.i3);
  
  fileContent = fileContent.replace(/Wrong Mortar = Cracked Brick/, w1.t);
  fileContent = fileContent.replace(/Using mortar that's too hard for your brick is the single most common mistake in new construction masonry\. It looks fine for a few years — then bricks start spalling from freeze-thaw stress\./, w1.b);
  fileContent = fileContent.replace(/Missing Flashing Causes Leaks/, w2.t);
  fileContent = fileContent.replace(/Flashing, weep holes, and drainage mats are code requirements for a reason\. Skip them — or install them incorrectly — and water infiltrates your wall cavity, rotting framing from the inside out\./, w2.b);
  fileContent = fileContent.replace(/Poor Matching → Visible Damage/, w3.t);
  fileContent = fileContent.replace(/Mismatched brick or mortar is permanent\. Once it cures, there's no fixing the color or texture inconsistency — you're either living with it or tearing it out and starting over\./, w3.b);
  fileContent = fileContent.replace(/Deferred Tuckpointing → Water Infiltration/, "Unverified Subcontractors");
  fileContent = fileContent.replace(/Every year you delay tuckpointing on eroded joints, freeze-thaw cycles open them wider\. What starts as a \$1,500 repair becomes a \$6,000 wall cavity remediation when water reaches the framing\./, "Brokering work to random crews means zero accountability. When structural issues arise during the build, everyone points fingers.");

  const wsua = getUniqueN(whatSetsUsApartCards, 4);
  fileContent = fileContent.replace(/Mortar-Match Guarantee/, wsua[0].t);
  fileContent = fileContent.replace(/New mortar matched to your existing masonry in color, texture, and hardness — or we redo it at no charge\. No other contractor in {city\.region} offers this in writing\./, wsua[0].b);
  fileContent = fileContent.replace(/Transparent, Written Estimates/, wsua[1].t);
  fileContent = fileContent.replace(/Every estimate is free, on-site, and in writing — scope, materials, and timeline before any work begins\. You know exactly what you're paying before we start\./, wsua[1].b);
  fileContent = fileContent.replace(/Same Crew, Start to Finish/, wsua[2].t);
  fileContent = fileContent.replace(/No subcontractors, no handoffs\. The crew that estimates your {city\.name} project is the crew that builds it — same people, same standards, every time\./, wsua[2].b);
  fileContent = fileContent.replace(/Family-Owned Since 2007/, wsua[3].t);
  fileContent = fileContent.replace(/Not a franchise, not a call center\. When you contact AMS you reach the owners — same people who've been working {city\.name} and {city\.region} since 2007\./, wsua[3].b);

  const wt = getUniqueN(whyTrustItems, 6);
  fileContent = fileContent.replace(/Licensed in Illinois/, wt[0].t);
  fileContent = fileContent.replace(/License #MA-104-018887\. We pull permits when required and operate fully above board in {city\.name} and {city\.county}\./, wt[0].b);
  fileContent = fileContent.replace(/Fully Insured — \$2\.5M Liability/, wt[1].t);
  fileContent = fileContent.replace(/\$2\.5 million general liability on every job\. Proof of insurance available before any work begins in {city\.name}\./, wt[1].b);
  fileContent = fileContent.replace(/Workers' Comp Covered/, wt[2].t);
  fileContent = fileContent.replace(/Every crew member is covered\. You're not liable for injuries on your {city\.name} property\./, wt[2].b);
  fileContent = fileContent.replace(/Family-Owned Since 2007/, wt[3].t); 
  fileContent = fileContent.replace(/Not a franchise\. Not a call center\. You deal with the owners — same crew, same standards, every {city\.name} job\./, wt[3].b);
  fileContent = fileContent.replace(/Mortar-Match Guarantee/, wt[4].t);
  fileContent = fileContent.replace(/Every mortar mix matched to your existing masonry in color, texture, and hardness — or we redo it at no charge\./, wt[4].b);
  fileContent = fileContent.replace(/Serving {city\.name} Since 2007/, wt[5].t);
  fileContent = fileContent.replace(/19 Chicagoland communities including {city\.name}, {city\.nearbyAreas\[0\]}, and {city\.nearbyAreas\[1\]} — local crews with local knowledge\./, wt[5].b);

  fileContent = fileContent.replace(/19 years of brick, stone, and chimney masonry in {city\.name} and {city\.region}\. Free estimates\. No pressure\. Just honest work done right\./, "Partner with Chicagoland's premier masonry construction experts. Delivering impeccable structural and architectural builds for custom homes.");
  
  const outPath = path.join(__dirname, 'src', 'pages', 'locations', c.slug + '.astro');
  fs.writeFileSync(outPath, fileContent);
  console.log("Generated " + outPath);
});

console.log('All 19 construction-focused pages generated successfully!');
