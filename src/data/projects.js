// All 57 project pages — service templates + city-specific raw data
export const projects = (() => {

  // ── Service-specific templates ─────────────────────────────────────────
  const SVC = {
    'brick-installation': {
      serviceType: 'Brick Installation',
      sqftDefault: '1,200', durationDefault: '1-3 weeks',
      materialsDefault: 'Full-bed clay brick', costRangeDefault: '$18,000-$42,000', warrantyDefault: '5-year labor',
      problemHeading: 'Inferior Brick Installation Costs Far More to Fix Than to Prevent',
      problemBullets: [
        'Separated brick veneer failure increases structural risk and long-term repair costs',
        'Water infiltration from wrong mortar mix causes interior damage over time',
        'Mismatched brick profiles and joint width devalue property by thousands',
      ],
      process: [
        { step: 1, title: 'Design Consultation & Brick Selection', body: "We start by matching existing brick profiles, mortar color, and bond patterns to the home's architecture. We bring samples on-site — no guessing, no surprises." },
        { step: 2, title: 'Foundation & Substrate Prep', body: 'Proper substrate preparation prevents premature failure. We inspect and prep the base, install wall ties correctly, and ensure drainage weeps are positioned to code.' },
        { step: 3, title: 'Brick Laying & Wall Tie Installation', body: 'Our masons hand-lay every course with precision tooling and consistent joint spacing. No speed-cuts — just clean, permanent brickwork built to outlast the house.' },
        { step: 4, title: 'Jointing, Cleanup & Final Walk-Through', body: 'We finish with proper joint tooling, full site cleanup, and a documented walk-through inspection. Every detail approved before we leave.' },
      ],
      valueProp: {
        heading: 'Precision Brickwork That Performs for Decades and Adds Real Property Value',
        body: 'When brick installation is done right, it requires no maintenance for 20-30 years and actively increases resale value. AMS brings 19+ years of Chicagoland masonry expertise to every course, every joint, every mortar match — so the result lasts as long as the structure it protects.',
      },
      faq: [
        { q: 'How do I choose the right brick for my home?', a: 'We bring brick samples to your property and match them against your existing facade, roof color, and trim. We consider texture, size (modular vs. standard), and regional availability. The right brick is one you will not have to think about in 20 years.' },
        { q: 'How long does a brick installation project take?', a: 'Most residential brick facade projects run 1-3 weeks depending on square footage and complexity. We provide a written schedule before we start so you know exactly when each phase completes.' },
        { q: 'Is brick better than stone veneer for my situation?', a: 'Brick offers better thermal mass, higher durability in freeze-thaw cycles, and lower long-term maintenance than thin stone veneer. For most Chicagoland homes, full-bed brick is almost always the right long-term choice.' },
      ],
      galCaptions: [
        'Front facade — deteriorated brick replaced with color-matched full-bed clay brick',
        'Side elevation — complete brick installation with proper wall tie placement',
        'Entry wall — mortar-matched joints with consistent tooling profile throughout',
      ],
    },

    'tuckpointing-repointing': {
      serviceType: 'Tuckpointing & Repointing',
      sqftDefault: '500', durationDefault: '2-5 days',
      materialsDefault: 'Type S mortar blend', costRangeDefault: '$2,000-$12,000', warrantyDefault: '5-year labor',
      problemHeading: 'Failed Mortar Is the Leading Cause of Preventable Water Damage in Brick Homes',
      problemBullets: [
        'Eroded mortar joints allow water infiltration that damages interior walls and framing',
        'Wrong mortar type used in DIY or inexperienced repointing causes accelerated brick failure',
        'Delayed tuckpointing turns a $2,000 job into a $15,000 structural repair',
      ],
      process: [
        { step: 1, title: 'Masonry Inspection & Joint Assessment', body: 'We probe joints to measure depth, assess mortar hardness, and identify all failure points before any work begins. A proper assessment prevents missing the full scope.' },
        { step: 2, title: 'Joint Removal & Cleaning', body: 'Failing mortar is removed to a minimum 3/4" depth using angle grinders and chisels. Compressed air cleans the joint before any mortar is applied.' },
        { step: 3, title: 'Mortar Mixing & Application', body: 'We mix Type S mortar to match the original color and consistency. Mortar is packed in layers, not applied in one pass — the correct method for a durable, weather-tight joint.' },
        { step: 4, title: 'Finishing, Tooling & Final Inspection', body: "Joints are tooled to match the existing profile when mortar reaches the right consistency. We walk every elevation before closeout — no missed joints, no uneven profiles." },
      ],
      valueProp: {
        heading: 'Mortar-Matched Tuckpointing That Keeps Water Out for 20+ Years',
        body: 'Tuckpointing done right is one of the highest-ROI investments in a brick building. Properly matched mortar and correct joint depth prevent water infiltration for two decades or more. AMS has been color-matching mortar on Chicagoland homes since 2007 — we do not guess.',
      },
      faq: [
        { q: 'How do I know if my brick needs tuckpointing?', a: 'Crumbling, missing, or recessed mortar joints are the primary sign. We also look for efflorescence (white mineral staining), soft mortar that can be scratched out with a key, and water stains on interior walls near the brick.' },
        { q: 'What mortar type do you use?', a: 'We use Type S mortar blended specifically for existing brick. Type S provides the right compressive strength — stronger Portland mortar actually damages older brick, so the mix matters as much as the application.' },
        { q: 'Can tuckpointing be done in winter?', a: 'We stop tuckpointing when temperatures fall below 40°F. Cold weather prevents proper mortar curing. We will never schedule mortar work into cold weather to meet a deadline — the integrity of the joint is the only standard.' },
      ],
      galCaptions: [
        'Main facade — failed mortar joints removed and replaced with Type S color-matched mortar',
        'Side wall — full-depth joint restoration with consistent tooled profile',
        'Chimney section — deteriorated mortar repointed and sealed against water infiltration',
      ],
    },

    'chimney-fireplace': {
      serviceType: 'Chimney & Fireplace',
      sqftDefault: '—', durationDefault: '3-7 days',
      materialsDefault: 'Matching clay brick & mortar', costRangeDefault: '$3,500-$12,000', warrantyDefault: '3-year labor',
      problemHeading: 'A Deteriorating Chimney Is a Structural and Fire Safety Risk You Cannot Delay',
      problemBullets: [
        'Cracked flue liner allows combustion gases and fire risk to reach surrounding framing',
        'Spalling crowns and missing caps let water in, accelerating freeze-thaw deterioration',
        'Damaged chimney mortar joints allow moisture infiltration that weakens the entire stack',
      ],
      process: [
        { step: 1, title: 'Chimney Inspection & Damage Assessment', body: 'We inspect the crown, cap, flashing, flue surround, and full stack exterior. Camera inspection of the flue liner is available when interior damage is suspected.' },
        { step: 2, title: 'Crown, Cap & Flashing Repair', body: 'We replace failing crowns with properly overhanging poured crowns, install stainless caps, and integrate counter-flashing at the roof interface — the three most common water entry points.' },
        { step: 3, title: 'Brick & Mortar Restoration', body: 'Spalling brick is removed and replaced with matched units. All mortar joints on the stack are repointed with color-matched Type S mortar tooled to original profile.' },
        { step: 4, title: 'Waterproofing & Final Inspection', body: 'We apply penetrant sealer to the full stack, document all work with before/after photos, and provide a written inspection record before we leave.' },
      ],
      valueProp: {
        heading: 'Chimney Masonry Restoration That Passes Inspection and Lasts for Decades',
        body: 'A properly restored chimney is both safe and low-maintenance. AMS handles every element — crown, cap, flashing, stack, and flue surround — so nothing is left unaddressed. Every chimney project closes with a written inspection record and a warranty on all labor.',
      },
      faq: [
        { q: 'How often should chimney masonry be inspected?', a: 'Annual inspection is the industry standard, especially in Illinois where freeze-thaw cycles are severe. We recommend a masonry inspection every 3-5 years unless you notice visible spalling, cracking, or water in the firebox.' },
        { q: 'What causes chimney brick to spall?', a: 'Spalling is almost always caused by water infiltration. Water freezes inside the brick face, expands, and pushes the face off. A compromised crown or cap is usually the entry point — fixing the crown first is the right order of operations.' },
        { q: 'Can you match the original brick on an old chimney?', a: 'In most cases, yes. We maintain relationships with regional and salvage suppliers that carry discontinued profiles. For very old or rare brick, we source salvaged matching units from demolition yards.' },
      ],
      galCaptions: [
        'Crown and cap — crumbling crown replaced with properly overhanging poured crown and new cap',
        'Stack exterior — spalling brick removed, matched replacements installed with fresh mortar',
        'Flashing and base — new counter-flashing installed and sealed at roof interface',
      ],
    },

    'chimney-repair-rebuilding': {
      serviceType: 'Chimney Repair & Rebuilding',
      sqftDefault: '—', durationDefault: '3-10 days',
      materialsDefault: 'Hard-fired clay brick', costRangeDefault: '$4,000-$18,000', warrantyDefault: '5-year labor',
      problemHeading: 'A Deteriorated Chimney Stack Left Unrebuilt Is a Structural and Liability Risk',
      problemBullets: [
        'Leaning or partially collapsed chimneys create structural instability for the entire roof section',
        'Failed flashing on deteriorated chimneys allows water infiltration into the roof structure',
        'Patch repairs on a failing stack fail again within 2-3 years — costing more than a proper rebuild',
      ],
      process: [
        { step: 1, title: 'Structural Assessment & Safety Review', body: 'We measure lean, assess mortar hardness, probe every course for structural integrity, and review flue liner condition before recommending partial or full rebuild.' },
        { step: 2, title: 'Partial or Full Dismantling', body: 'We dismantle systematically above the roofline, saving undamaged brick for reuse where possible. Staging and tarping protect the roof and interior throughout demo.' },
        { step: 3, title: 'Rebuilding with Matching Brick', body: 'Every course is rebuilt plumb and level using matched hard-fired brick and correctly formulated mortar. No shortcuts — the rebuilt chimney has to outlast the next 30+ years of Illinois winters.' },
        { step: 4, title: 'Crown, Cap, Flashing & Waterproofing', body: 'A properly overhanging poured crown, stainless cap, and integrated counter-flashing are installed as part of every rebuild. The weather envelope is complete before we leave.' },
      ],
      valueProp: {
        heading: 'Chimney Rebuilt to Code with Matching Brick That Performs for 30+ Years',
        body: 'A chimney rebuild is the most structurally demanding masonry repair on a residential property. AMS approaches every rebuild with engineered mortar formulations, full brick matching, and a documented inspection protocol — because a rebuilt chimney needs to outlast the next three decades of Chicagoland winters.',
      },
      faq: [
        { q: 'When does a chimney need to be fully rebuilt vs. repaired?', a: 'We recommend a full rebuild when the chimney has leaned more than 1 inch per 10 feet of height, when the flue liner is compromised throughout, or when more than 30% of the brick is structurally unsound. Partial repairs on a failing stack rarely hold.' },
        { q: 'How long does a chimney rebuild take?', a: 'Most single-flue residential chimney rebuilds from roofline up take 3-7 days. Full tear-down-to-foundation rebuilds on large chimneys run 2-3 weeks. We give you a written schedule before demo starts.' },
        { q: 'Is a permit required to rebuild a chimney in Illinois?', a: 'In most Chicagoland municipalities, yes. We handle permit applications as part of our project scope and ensure all work is code-compliant and inspected.' },
      ],
      galCaptions: [
        'Full stack — original leaning chimney demolished to roofline and rebuilt in matching brick',
        'Crown assembly — new crown, cap, and flashing integrated as a complete weather barrier',
        'Base detail — new brick courses set plumb and level with correct mortar joint spacing',
      ],
    },

    'cmu-block-installation': {
      serviceType: 'CMU Block Installation',
      sqftDefault: '600', durationDefault: '1-2 weeks',
      materialsDefault: 'CMU block & mortar', costRangeDefault: '$8,000-$28,000', warrantyDefault: '5-year structural',
      problemHeading: 'Improperly Installed CMU Block Creates Structural Risk That Fails Without Warning',
      problemBullets: [
        'CMU block without proper reinforcement fails under lateral loads and Illinois freeze-thaw cycles',
        'Missing control joints cause cracking across entire wall sections within 2-5 years',
        'Inadequate drainage detailing behind retaining walls causes hydrostatic pressure failure',
      ],
      process: [
        { step: 1, title: 'Foundation & Layout Assessment', body: 'We assess soil bearing, drainage conditions, and code requirements before block selection. Retaining walls and foundation walls require engineering review — we do not skip this step.' },
        { step: 2, title: 'Block Selection & Reinforcement Planning', body: 'We specify the correct CMU block type, rebar schedule, and control joint spacing for the load and soil conditions. Reinforcement is not optional for structural applications in Illinois.' },
        { step: 3, title: 'Block Laying, Grouting & Filling', body: 'Block is laid course by course with properly consolidated grout fill at all reinforced cells. Consolidation is inspected at each lift — improperly consolidated grout is the most common CMU failure point.' },
        { step: 4, title: 'Control Joints, Waterproofing & Final Inspection', body: 'Control joints are placed at code-required spacing to manage movement. Waterproofing is applied to below-grade and retaining walls before backfill. All work is documented before we leave.' },
      ],
      valueProp: {
        heading: 'CMU Block Masonry Built to Structural Code That Performs Without Maintenance',
        body: 'CMU block installation requires engineering knowledge that most contractors do not have: rebar schedules, control joint spacing, grout consolidation, and drainage detailing all affect long-term performance. AMS brings 19+ years of structural masonry experience to every CMU project.',
      },
      faq: [
        { q: 'What is CMU block and when is it used?', a: 'CMU (Concrete Masonry Unit) block is a structural masonry unit used for foundation walls, retaining walls, garage walls, and load-bearing construction. It is stronger and more water-resistant than brick when properly installed with reinforcement and grouting.' },
        { q: 'Does CMU block require reinforcement?', a: 'For most structural applications in Illinois — retaining walls, foundation walls, load-bearing walls — yes, vertical rebar and horizontal joint reinforcement are required by code. We design reinforcement schedules for every structural CMU project.' },
        { q: 'How long does a CMU block wall installation take?', a: 'A 100-linear-foot retaining wall typically takes 1-2 weeks. A full garage or addition foundation in CMU runs 2-3 weeks. We factor in curing time for grout consolidation before releasing the wall for loading.' },
      ],
      galCaptions: [
        'Retaining wall — CMU block installed with vertical rebar and grout consolidation throughout',
        'Foundation section — CMU foundation wall built to code with full grouting and drainage',
        'Corner detail — reinforced block corners with proper control joint placement',
      ],
    },

    'commercial-brick-stone': {
      serviceType: 'Commercial Brick & Stone',
      sqftDefault: '3,200', durationDefault: '3-8 weeks',
      materialsDefault: 'Commercial-grade brick & stone', costRangeDefault: '$35,000-$120,000', warrantyDefault: '5-year structural',
      problemHeading: 'Commercial Masonry Deterioration Is Visible, Costly, and Damaging to Property Value',
      problemBullets: [
        'Spalling or crumbling commercial facades signal neglect and reduce tenant and buyer confidence',
        'Delayed commercial repairs allow water infiltration that damages structural elements and interior finishes',
        'Code-non-compliant masonry creates liability exposure and fails municipal inspection',
      ],
      process: [
        { step: 1, title: 'Commercial Property Assessment & Scope', body: 'We walk every elevation, assess mortar condition and brick integrity, identify water infiltration sources, and scope the complete repair — not just the visible damage.' },
        { step: 2, title: 'Permit & Code Compliance Review', body: 'Commercial masonry requires municipal permits in virtually all Chicagoland jurisdictions. We handle permit applications, manage inspections, and ensure all work meets current code.' },
        { step: 3, title: 'Masonry Installation & Quality Control', body: 'Work is supervised by experienced field leads with daily QC checks. Matched brick replacement, repointing, and parapet work all follow documented procedures.' },
        { step: 4, title: 'Final Inspection & Documentation', body: 'We provide a complete project file: permit copies, inspection records, material data sheets, and before/after photos. Insurance carriers and property managers receive full documentation.' },
      ],
      valueProp: {
        heading: 'Commercial Masonry Restoration That Protects Your Property Value and Lease Rate',
        body: 'Commercial masonry failure is not just a maintenance issue — it affects tenant confidence, insurance ratings, and code compliance. AMS has completed commercial brick and stone restoration on properties across Chicagoland since 2007. We work within tenant schedules, obtain all permits, and deliver documented work that satisfies property management and insurers.',
      },
      faq: [
        { q: 'Can masonry restoration be done while the building is occupied?', a: 'Yes. We phase commercial projects to maintain tenant access throughout. Sections are isolated with scaffolding and barriers, and noisy work is scheduled per your tenant agreements.' },
        { q: 'What documentation do you provide for commercial projects?', a: 'We provide a full project file: permit copies, inspection records, material data sheets, before/after photos, and warranty documentation. Insurance carriers and property managers typically require this for large commercial repairs.' },
        { q: 'How do you handle historic commercial buildings with special brick profiles?', a: 'We source matching brick from regional suppliers and salvage yards. For buildings on historic registers, we work with the historic preservation office to ensure material compliance before any work starts.' },
      ],
      galCaptions: [
        'Main facade — original failing commercial brick restored and matched across full elevation',
        'Storefront surround — original stone trim cleaned, repointed, and sealed',
        'Corner and parapet — parapet cap replaced and flashing integrated correctly',
      ],
    },

    'commercial-masonry-veneers': {
      serviceType: 'Commercial Masonry Veneers',
      sqftDefault: '2,800', durationDefault: '2-6 weeks',
      materialsDefault: 'Commercial stone veneer panels', costRangeDefault: '$22,000-$85,000', warrantyDefault: '5-year labor',
      problemHeading: 'An Outdated or Failing Commercial Facade Reduces Lease Rates and Marketability',
      problemBullets: [
        'Worn or cracked commercial veneer panels create liability risks and fail code inspections',
        'Adhesive-set veneers installed without proper anchoring fail within 5-10 years in Illinois climate',
        'Generic or dated exterior finishes reduce competitiveness in commercial leasing markets',
      ],
      process: [
        { step: 1, title: 'Building Envelope Assessment', body: 'We assess the existing substrate, moisture conditions, and structural integrity before specifying the veneer system. Not every substrate is ready for veneer — we find out before we start.' },
        { step: 2, title: 'Veneer System Selection & Layout Design', body: 'We specify the correct panel type, anchoring system, drainage mat, and movement joint layout for the building. No adhesive shortcuts — every commercial installation uses mechanical anchoring.' },
        { step: 3, title: 'Substrate Preparation & Panel Installation', body: 'Substrate is cleaned, repaired, and moisture-mapped before drainage mat installation. Panels are set with mechanical anchors per manufacturer specification and code requirements.' },
        { step: 4, title: 'Sealing, Inspection & Documentation', body: 'All joints are sealed with appropriate sealant at movement joints and penetrations. Final inspection is documented with photos, and the complete installation file is provided to the owner.' },
      ],
      valueProp: {
        heading: 'Commercial Veneer Systems That Modernize Your Facade and Protect the Substrate',
        body: 'A commercial masonry veneer upgrade does two things at once: it dramatically improves exterior appearance and adds a protective weather barrier over the original substrate. AMS designs and installs commercial veneer systems using anchored panels and proper drainage mats — not adhesive shortcuts that fail within 5 years.',
      },
      faq: [
        { q: 'What types of commercial veneer does AMS install?', a: 'We install natural stone veneer, manufactured stone panels, thin brick veneer, and limestone panel systems on commercial buildings. We specify the right anchoring and drainage system for each product.' },
        { q: 'How long does commercial veneer installation take?', a: 'A 3,000 sq ft commercial facade typically takes 3-6 weeks depending on the panel system, substrate conditions, and permit timeline. We provide a phased schedule so property management can plan around the work.' },
        { q: 'Is a permit required for commercial veneer work?', a: 'Yes, in virtually all Chicagoland municipalities. We handle permit applications and manage municipal inspections as part of the project scope. Work does not start until permits are approved.' },
      ],
      galCaptions: [
        'Primary facade — plain concrete wall clad with anchored natural stone veneer panels',
        'Entry feature — stone veneer accent columns with proper anchoring and sealed joints',
        'Transition detail — stone panel joints sealed and caulked at all movement joints',
      ],
    },

    'custom-home-masonry': {
      serviceType: 'Custom Home Masonry',
      sqftDefault: '4,000', durationDefault: '4-12 weeks',
      materialsDefault: 'Premium brick, limestone & stone', costRangeDefault: '$45,000-$180,000', warrantyDefault: '10-year structural',
      problemHeading: 'Custom Home Masonry Done Wrong Is the Most Expensive Mistake in New Construction',
      problemBullets: [
        'Incorrect masonry detailing on a custom home can require $50,000+ to remediate after framing is in',
        'Poor brick-to-structure integration creates thermal bridging and long-term moisture infiltration',
        'Mismatched materials or inconsistent craftsmanship permanently devalue a luxury home',
      ],
      process: [
        { step: 1, title: 'Architectural Collaboration & Material Selection', body: 'We engage at schematic design — before materials are specified. We provide sample panels, shop drawings, and cost estimates early enough to influence decisions, not just react to them.' },
        { step: 2, title: 'Foundation & Structural Integration Review', body: 'We coordinate with the structural engineer and GC on all masonry-bearing conditions, wall tie schedules, and lintel specifications before any masonry starts.' },
        { step: 3, title: 'Masonry Construction & Quality Control', body: 'A field supervisor is on-site daily. Every course, every joint, and every transition detail is checked before the next lift. Photos are taken at each inspection point.' },
        { step: 4, title: 'Final Documentation & Warranty Transfer', body: 'We provide a complete material record, structural warranty documentation, and finish photos. The architect and homeowner receive the full project file at closeout.' },
      ],
      valueProp: {
        heading: 'Custom Home Masonry That Performs Structurally and Defines the Character of the Home',
        body: "On a custom home, masonry is both structural and aesthetic — and both have to be right from day one. AMS coordinates with architects and general contractors to ensure brick, stone, and limestone selections integrate correctly with the building envelope and thermal performance. The result is masonry that will still look exactly right in 50 years.",
      },
      faq: [
        { q: 'How early should a masonry contractor be involved in a custom home project?', a: 'Ideally at schematic design — before exterior materials are specified. Early involvement lets us advise on thermal performance, material availability, and lead times, which affect construction scheduling.' },
        { q: 'Can AMS coordinate directly with the project architect?', a: 'Yes. We provide shop drawings, material submittals, and mockup panels for architect approval. We also attend site meetings and coordinate with the GC on sequencing.' },
        { q: 'What warranty do you provide on custom home masonry?', a: 'We provide a 10-year structural warranty on all custom home masonry work and a 5-year labor warranty on finishing. Material warranties from manufacturers are transferred to the homeowner at project close.' },
      ],
      galCaptions: [
        'Primary facade — full exterior brick and limestone installation from foundation to roofline',
        'Entry surround — custom limestone arch and columns installed with precision alignment',
        'Window surrounds — limestone sills and lintels installed flush with consistent mortar profile',
      ],
    },

    'damaged-brick-replacement': {
      serviceType: 'Damaged Brick Replacement',
      sqftDefault: '400', durationDefault: '3-7 days',
      materialsDefault: 'Matching clay brick & mortar', costRangeDefault: '$2,500-$14,000', warrantyDefault: '3-year labor',
      problemHeading: 'Spalling or Cracked Brick Left Unrepaired Multiplies the Damage Each Winter',
      problemBullets: [
        'Spalling brick exposes the substrate to freeze-thaw cycling, multiplying the damage each season',
        'Mismatched replacement brick creates visible patchwork that permanently reduces curb appeal',
        'Delayed brick replacement turns a $3,000 repair into a full section rebuild at 5x the cost',
      ],
      process: [
        { step: 1, title: 'Damage Assessment & Brick Profile Matching', body: "We catalog all damaged units, measure profile dimensions (species, face size, texture), and source the correct matching brick before any removal begins. We won't start work without an approved match sample." },
        { step: 2, title: 'Selective Brick Removal', body: 'Mortar joints around damaged units are saw-cut before extraction to avoid damaging adjacent brick. Careful removal is the only way to preserve the surrounding wall.' },
        { step: 3, title: 'Replacement & Repointing', body: 'Matched replacement brick is set in correctly formulated mortar. All joints disturbed during removal are repointed with color-matched mortar tooled to existing profile.' },
        { step: 4, title: 'Surface Cleanup & Final Inspection', body: 'Completed work is cleaned and inspected under raking light to confirm matching and joint consistency. Before/after photos are taken at every location before we close out.' },
      ],
      valueProp: {
        heading: 'Brick Matched to Within One Production Run — Invisible Repair That Lasts 25+ Years',
        body: "The hardest part of damaged brick replacement is matching the original. AMS maintains relationships with regional and salvage suppliers specifically so we can find the right match — not the close match. A properly matched brick replacement is indistinguishable from the original wall within one season of weathering.",
      },
      faq: [
        { q: 'Can you always match my original brick?', a: 'In most cases, yes — we source from regional suppliers and salvage yards that stock discontinued profiles. For very rare or pre-1940 brick, we typically find salvaged matching units within 2-3 weeks. We always bring samples for approval before we start.' },
        { q: 'What causes brick to spall or fail?', a: 'Freeze-thaw cycling is the most common cause in Illinois. Water enters through a hairline crack or porous face, freezes, expands, and pushes the brick face off. The underlying cause is almost always water infiltration from failed mortar, cracks, or missing caulk — we fix the entry point when we replace the brick.' },
        { q: 'Can damaged brick replacement be done in sections or does the whole wall need to come down?', a: 'Selective replacement is almost always the right approach. We remove only the damaged units and restore adjacent joints. A full-wall demo is only warranted when structural damage affects the entire section — which is rare.' },
      ],
      galCaptions: [
        'Main wall section — spalling brick removed and replaced with matched clay brick units',
        'Corner detail — damaged corner brick replaced and repointed with color-matched mortar',
        'Window surround — frost-damaged brick around opening replaced, lintel inspected and sealed',
      ],
    },

    'natural-stone-limestone': {
      serviceType: 'Natural Stone & Limestone',
      sqftDefault: '850', durationDefault: '2-4 weeks',
      materialsDefault: 'Natural limestone & stone', costRangeDefault: '$22,000-$65,000', warrantyDefault: '5-year labor',
      problemHeading: 'Natural Stone Installed Without Proper Drainage and Sealant Fails Within One Decade',
      problemBullets: [
        'Limestone without drainage detailing absorbs water and cracks in the first hard Illinois winter',
        'Mismatched stone thickness at joints creates stress points and accelerates freeze-thaw failure',
        'Unsealed natural stone on Chicagoland homes shows heavy weathering and staining within 3-5 years',
      ],
      process: [
        { step: 1, title: 'Stone Selection & Sample Matching', body: 'We source stone from regional quarries and match profile, finish, and color to the existing exterior or architect specifications. Samples are approved on-site before any stone is ordered.' },
        { step: 2, title: 'Substrate Preparation & Layout Planning', body: 'We install the correct drainage mat and mortar bed for the stone type. Layout is planned to minimize cuts, manage joint lines, and protect against water infiltration at transitions.' },
        { step: 3, title: 'Stone Setting & Joint Pointing', body: 'Stone is set in proper mortar bed with back-buttering for full contact. Joints are pointed in matching mortar and tooled to the correct profile after initial set.' },
        { step: 4, title: 'Sealant Application & Final Inspection', body: 'All stone is sealed with penetrant sealer after mortar cure. Movement joints and transitions are caulked with appropriate sealant. Final inspection documented before closeout.' },
      ],
      valueProp: {
        heading: 'Natural Stone & Limestone Installation That Outlasts Every Alternative Exterior Material',
        body: 'Natural limestone and stone are the only exterior materials that get more beautiful over time. Installed correctly with proper drainage and sealed joints, limestone on a Chicagoland home will still look exactly right in 80 years. AMS selects quarry-direct stone and installs it with the same techniques used on historic buildings that have proven it across centuries.',
      },
      faq: [
        { q: 'What is the difference between natural limestone and manufactured stone veneer?', a: 'Natural limestone is quarried full-thickness material. Manufactured stone veneer is a concrete casting of a stone texture. In Illinois freeze-thaw conditions, natural limestone significantly outperforms manufactured stone in both durability and appearance retention over 20+ years.' },
        { q: 'Does natural stone need to be sealed?', a: 'We seal all limestone and porous stone installations with penetrant sealer. In Illinois, sealing is not optional — it dramatically reduces water absorption and extends the maintenance interval to 5-7 years between reseals.' },
        { q: 'Can existing stone be cleaned and restored instead of replaced?', a: 'Often yes. Weathered limestone and natural stone frequently responds well to professional cleaning and resealing. We inspect first and give you an honest assessment — restoration is significantly less expensive than replacement when the stone itself is intact.' },
      ],
      galCaptions: [
        'Entry steps — original concrete steps removed, natural limestone steps set in proper mortar bed',
        'Facade accent — limestone sills and lintels installed with proper sealant at all joints',
        'Front wall — natural stone veneer installed over drainage mat with back-butter mortar',
      ],
    },

    'brick-stone-veneers': {
      serviceType: 'Brick & Stone Veneers',
      sqftDefault: '850', durationDefault: '1-2 weeks',
      materialsDefault: 'Natural stone & brick veneer', costRangeDefault: '$12,000-$35,000', warrantyDefault: '5-year labor',
      problemHeading: 'Poorly Installed Veneer Fails Faster Than the Substrate It Was Installed to Protect',
      problemBullets: [
        'Veneer installed without proper wall ties pulls away from substrate within 5-10 years',
        'Wrong adhesive or mortar backing causes cracking, buckling, and water infiltration',
        'Mismatched stone profiles create visible inconsistencies that reduce curb appeal and value',
      ],
      process: [
        { step: 1, title: 'Substrate Assessment & Surface Prep', body: 'We assess substrate integrity, moisture levels, and drainage conditions. Veneer installed over a compromised substrate fails regardless of the installation quality on top.' },
        { step: 2, title: 'Layout Planning & Pattern Design', body: 'We plan joint lines, corner details, and transition points to create a coherent pattern. Samples are placed on the wall for homeowner approval before installation starts.' },
        { step: 3, title: 'Veneer Installation & Wall Tie Anchoring', body: 'Every veneer unit is mechanically tied to the substrate — no adhesive-only attachment. Mortar backing is applied at full coverage, not spot-troweled shortcuts.' },
        { step: 4, title: 'Grouting, Sealing & Final Inspection', body: 'Joints are grouted to matching color and tooled to correct profile. All edges and transitions are caulked and sealed. Final inspection walks every elevation before sign-off.' },
      ],
      valueProp: {
        heading: 'Stone & Brick Veneer Installed Right — Anchored, Drained, and Warranted for 5 Years',
        body: 'Brick and stone veneer are among the most impactful exterior upgrades available — when installed correctly. AMS uses full mechanical anchoring, proper drainage mats, and correctly formulated mortar on every veneer project. No adhesive shortcuts, no hidden installation problems.',
      },
      faq: [
        { q: 'What is the difference between full-bed brick and brick veneer?', a: 'Full-bed brick is a structural masonry unit set in a full mortar bed and tied to the structure. Brick veneer is a single-wythe facing attached to a frame structure. Both are durable when installed correctly — the key is correct wall tie spacing and mortar coverage.' },
        { q: 'Can veneer be installed over existing siding or stucco?', a: 'Often yes, depending on the substrate condition and load capacity of the existing structure. We assess substrate integrity before recommending over-cladding. Wet or soft substrates must be remediated first.' },
        { q: 'How long does brick or stone veneer installation take?', a: 'Most residential veneer projects on a single-family home run 1-2 weeks. Projects with complex pattern work, multiple transitions, or large square footage may run 3-4 weeks. We provide a written schedule before we start.' },
      ],
      galCaptions: [
        'Front facade — dated siding removed, stone veneer installed over proper drainage mat',
        'Entry surround — stone veneer accent columns and arch installed with matching mortar',
        'Side elevation — stone veneer cladding with soldier course cap detail at window sills',
      ],
    },
  };

  // ── Raw project data (city-specific only) ─────────────────────────────
  const raw = [
    // ── WINNETKA ──
    {
      slug: 'winnetka-brick-installation', serviceSlug: 'brick-installation',
      city: 'Winnetka', county: 'Cook County', location: 'North Shore, Winnetka', year: 2025, sqft: '1,350',
      title: 'Full-Bed Brick Facade Restored on a Historic Winnetka Estate',
      heroSub: 'Complete brick installation on a 1940s North Shore estate — matched profiles, color-corrected mortar, and brickwork built to outlast the original.',
      problemIntro: 'Most masonry failures are not obvious until years later — by then repair costs are 3-5x the original job. This Winnetka estate project corrected failing veneer ties and mismatched mortar left by a previous contractor.',
    },
    {
      slug: 'winnetka-chimney-fireplace', serviceSlug: 'chimney-fireplace',
      city: 'Winnetka', county: 'Cook County', location: 'North Shore, Winnetka', year: 2024,
      title: 'Chimney Crown & Full Stack Restoration on a Winnetka Tudor',
      heroSub: 'Crown, cap, and full stack restoration on a North Shore Tudor — new properly overhanging crown, matched brick replacement in upper courses, and a fully sealed weather envelope.',
      problemIntro: 'Chimney masonry failures on Winnetka historic homes are often invisible from the ground until the damage is severe. This Tudor had a failed crown, missing cap, and spalling brick in the upper two courses — all allowing water infiltration into the roof structure.',
    },
    {
      slug: 'winnetka-tuckpointing-repointing', serviceSlug: 'tuckpointing-repointing',
      city: 'Winnetka', county: 'Cook County', location: 'North Shore, Winnetka', year: 2025, sqft: '620',
      title: 'Mortar-Matched Tuckpointing on a 1940s Winnetka Brick Home',
      heroSub: "Mortar-matched tuckpointing on a 1940s North Shore brick home — original soft mortar replaced with a correct Type S formulation, tooled to period-correct profile on all four elevations.",
      problemIntro: "A 1940s Winnetka brick home with original soft mortar deteriorating — this is the most common scenario we see on the North Shore. Delaying tuckpointing on this property would have led to interior water damage within 2-3 seasons.",
    },

    // ── WILMETTE ──
    {
      slug: 'wilmette-brick-stone-veneers', serviceSlug: 'brick-stone-veneers',
      city: 'Wilmette', county: 'Cook County', location: 'Village Center, Wilmette', year: 2025, sqft: '780',
      title: 'Natural Stone & Brick Veneer Installation on a Wilmette Colonial',
      heroSub: 'Stone veneer upgrade on a Wilmette colonial — anchored installation over correct drainage mat, period-appropriate profile, and a five-year labor warranty on all work.',
      problemIntro: 'Wilmette colonials frequently have dated siding or painted concrete exteriors that undermine the home\'s curb appeal and value. This project replaced failing painted stucco with a properly anchored natural stone veneer system.',
    },
    {
      slug: 'wilmette-chimney-repair-rebuilding', serviceSlug: 'chimney-repair-rebuilding',
      city: 'Wilmette', county: 'Cook County', location: 'Village Center, Wilmette', year: 2024,
      title: 'Leaning Chimney Rebuilt from the Roofline Up — Wilmette',
      heroSub: 'Full chimney rebuild from the roofline up on a Wilmette residence — matched hard-fired brick, new crown, new cap, integrated flashing, and a complete weather barrier installed correctly.',
      problemIntro: 'This Wilmette chimney had leaned beyond the point where any repair was structurally adequate. The chimney was demolished to the roofline and fully rebuilt in matching brick — the only correct solution when lean exceeds one inch per 10 feet.',
    },
    {
      slug: 'wilmette-cmu-block-installation', serviceSlug: 'cmu-block-installation',
      city: 'Wilmette', county: 'Cook County', location: 'Village Center, Wilmette', year: 2025, sqft: '480',
      title: 'CMU Block Retaining Wall & Privacy Screen — Wilmette Residence',
      heroSub: 'CMU block retaining wall and privacy screen for a Wilmette residence — properly engineered with rebar, grouting, and drainage designed to last 30+ years.',
      problemIntro: 'Wilmette retaining walls built without proper rebar reinforcement fail regularly under Illinois soil pressure and frost. This project replaced a failing garden wall with a properly engineered CMU block system designed to outlast the property itself.',
    },

    // ── KENILWORTH ──
    {
      slug: 'kenilworth-commercial-brick-stone', serviceSlug: 'commercial-brick-stone',
      city: 'Kenilworth', county: 'Cook County', location: 'North Shore, Kenilworth', year: 2024, sqft: '2,600',
      title: 'Historic Commercial Building Brick Restoration in Kenilworth',
      heroSub: 'Historic commercial brick restoration in Kenilworth — matched brick sourcing, full repointing, and parapet cap replacement completed with minimal disruption to building tenants.',
      problemIntro: "Kenilworth's commercial buildings are some of the most architecturally significant in Cook County — and require a masonry contractor with historic brick sourcing relationships to match them correctly. This project corrected spalling and mortar failure that had been ignored for over a decade.",
    },
    {
      slug: 'kenilworth-commercial-masonry-veneers', serviceSlug: 'commercial-masonry-veneers',
      city: 'Kenilworth', county: 'Cook County', location: 'North Shore, Kenilworth', year: 2025, sqft: '2,200',
      title: 'Stone Veneer Facade Upgrade for a Kenilworth Commercial Property',
      heroSub: 'Stone veneer facade upgrade for a Kenilworth commercial property — anchored natural stone panels installed over existing masonry with proper movement joints and weather sealing.',
      problemIntro: 'This Kenilworth commercial building needed a complete exterior identity upgrade. The original concrete block exterior was clad with anchored natural stone veneer panels — a transformation that also improved the building\'s thermal performance.',
    },
    {
      slug: 'kenilworth-custom-home-masonry', serviceSlug: 'custom-home-masonry',
      city: 'Kenilworth', county: 'Cook County', location: 'North Shore, Kenilworth', year: 2026, sqft: '4,800',
      title: 'Custom Limestone & Brick Exterior Built for a Kenilworth Estate',
      heroSub: 'Custom limestone and brick exterior built for a Kenilworth estate — coordinated from design through final inspection, with quarry-selected stone and period-correct brick bond pattern.',
      problemIntro: 'Custom homes in Kenilworth demand masonry specification that starts at the design stage — not as an afterthought. We coordinated with the project architect from schematic design through final inspection on this estate exterior.',
    },

    // ── GLENCOE ──
    {
      slug: 'glencoe-damaged-brick-replacement', serviceSlug: 'damaged-brick-replacement',
      city: 'Glencoe', county: 'Cook County', location: 'North Shore, Glencoe', year: 2025, sqft: '360',
      title: 'Spalling Brick Replaced on a 1920s Glencoe Colonial Facade',
      heroSub: 'Spalling brick replaced on a 1920s Glencoe colonial — discontinued profile sourced from salvage supplier, matched installation, and a sealed finish indistinguishable from the original wall.',
      problemIntro: "Glencoe's 1920s-era colonials frequently present spalling brick from decades of freeze-thaw cycling without adequate waterproofing. This project required sourcing a discontinued brick profile from a salvage supplier in order to match the original facade correctly.",
    },
    {
      slug: 'glencoe-natural-stone-limestone', serviceSlug: 'natural-stone-limestone',
      city: 'Glencoe', county: 'Cook County', location: 'North Shore, Glencoe', year: 2024, sqft: '720',
      title: 'Natural Limestone Steps & Entry Installed on a Glencoe Estate',
      heroSub: 'Natural limestone steps and entry installed on a Glencoe estate — quarry-matched stone, properly drained mortar bed, and sealed joints designed to last through 30+ Illinois winters.',
      problemIntro: 'Natural limestone on Glencoe estates requires installation expertise that few Chicago-area contractors possess. This project involved limestone entry steps, sill extensions, and entry arch detail — all quarried to match the existing limestone accents on the property.',
    },
    {
      slug: 'glencoe-brick-installation', serviceSlug: 'brick-installation',
      city: 'Glencoe', county: 'Cook County', location: 'North Shore, Glencoe', year: 2024, sqft: '1,100',
      title: 'Custom Brick Installation Matched to Glencoe Classic Architecture',
      heroSub: "Custom brick installation on a historic Glencoe residence — properly sourced matching profiles, correctly formulated mortar, and a final product indistinguishable from period-correct construction.",
      problemIntro: "Glencoe's historic homes require brick selection and mortar matching that most contractors are not equipped for. This project replaced a failing facade that had been improperly installed during a 2018 renovation, with improper mortar that was damaging the original brick.",
    },

    // ── EVANSTON ──
    {
      slug: 'evanston-tuckpointing-repointing', serviceSlug: 'tuckpointing-repointing',
      city: 'Evanston', county: 'Cook County', location: 'South Evanston', year: 2024, sqft: '750',
      title: 'Full-Facade Tuckpointing for an Evanston 3-Flat Building',
      heroSub: 'Full-facade tuckpointing for an Evanston 3-flat — failed mortar removed to proper depth, color-matched Type S mortar applied, and joints tooled to original profile on all elevations.',
      problemIntro: 'The freeze-thaw cycle in Evanston is severe, and older multi-unit buildings show mortar failure faster than single-family homes. This 3-flat had not been tuckpointed since 1998 — water staining was visible on the second-floor interior walls.',
    },
    {
      slug: 'evanston-chimney-fireplace', serviceSlug: 'chimney-fireplace',
      city: 'Evanston', county: 'Cook County', location: 'South Evanston', year: 2025,
      title: 'Double-Flue Chimney Restoration for a 3-Story Evanston Home',
      heroSub: 'Double-flue chimney restoration for a 3-story Evanston home — crown replacement, matched brick replacement, and new flashing at both roof interfaces completed in five days.',
      problemIntro: 'This Evanston 3-story had two chimneys, both showing active spalling at the stack and crumbling crown mortar. The delay had allowed water to reach the second-floor framing through the chimney chase — a repair that added to the total project cost.',
    },
    {
      slug: 'evanston-brick-stone-veneers', serviceSlug: 'brick-stone-veneers',
      city: 'Evanston', county: 'Cook County', location: 'South Evanston', year: 2024, sqft: '650',
      title: 'Stone Veneer Exterior Upgrade for an Evanston 1940s Brick Home',
      heroSub: 'Stone veneer upgrade on an Evanston 1940s brick home — anchored installation, period-appropriate profile selected with homeowner approval, and a five-year warranty on all veneer work.',
      problemIntro: "This Evanston home had a partial stone veneer accent installed in 2010 using adhesive attachment — a technique that had already begun to delaminate. We removed the failing veneer and reinstalled the full elevation using correct mechanical anchoring.",
    },

    // ── HIGHLAND PARK ──
    {
      slug: 'highland-park-chimney-repair-rebuilding', serviceSlug: 'chimney-repair-rebuilding',
      city: 'Highland Park', county: 'Lake County', location: 'Downtown Highland Park', year: 2025,
      title: 'Full Chimney Rebuild for a Highland Park Colonial Estate',
      heroSub: 'Complete chimney demolition and rebuild for a Highland Park colonial — matched brick sourced from regional supplier, full rebuild with correctly formulated mortar and a new integrated weather envelope.',
      problemIntro: "Highland Park's older colonials often have original chimneys approaching 80-100 years old without a major rebuild. This project involved full demolition from the roofline and a complete rebuild with matching hard-fired brick — the correct approach when patching would have simply delayed the inevitable.",
    },
    {
      slug: 'highland-park-cmu-block-installation', serviceSlug: 'cmu-block-installation',
      city: 'Highland Park', county: 'Lake County', location: 'Downtown Highland Park', year: 2024, sqft: '520',
      title: 'CMU Foundation Wall for a Highland Park Home Addition',
      heroSub: 'CMU block foundation wall for a Highland Park addition — full rebar schedule, grout consolidation, and code-compliant construction backed by a structural warranty.',
      problemIntro: 'This Highland Park home addition required a full CMU block foundation wall — a structural installation that demands proper reinforcement, grouting, and drainage that most residential contractors are not qualified to perform. Two previous bids had not included the required rebar schedule.',
    },
    {
      slug: 'highland-park-commercial-brick-stone', serviceSlug: 'commercial-brick-stone',
      city: 'Highland Park', county: 'Lake County', location: 'Downtown Highland Park', year: 2025, sqft: '3,400',
      title: 'Storefront Brick Facade Renovation — Highland Park Main Street',
      heroSub: 'Storefront brick facade renovation on Highland Park Main Street — matched brick replacement, full repointing, and new storefront surround installed on time and within permit.',
      problemIntro: "This Highland Park Main Street storefront had a brick facade that had been incorrectly repointed with hard Portland mortar in the 1990s, causing brick face spalling across 60 linear feet. The damage required matched brick replacement and complete facade repointing.",
    },

    // ── NORTHBROOK ──
    {
      slug: 'northbrook-commercial-masonry-veneers', serviceSlug: 'commercial-masonry-veneers',
      city: 'Northbrook', county: 'Cook County', location: 'Village Center, Northbrook', year: 2024, sqft: '3,100',
      title: 'Commercial Stone Veneer Cladding — Northbrook Village Center',
      heroSub: 'Commercial stone veneer cladding at Northbrook Village Center — mechanical anchor system, correct drainage mat, and sealed joints deliver a 30+ year facade system.',
      problemIntro: "This Northbrook Village Center retail building had a dated exterior that was affecting lease rates. We installed a commercial stone veneer system over the existing masonry substrate using mechanical anchors — not adhesive attachment — to deliver a result that lasts.",
    },
    {
      slug: 'northbrook-custom-home-masonry', serviceSlug: 'custom-home-masonry',
      city: 'Northbrook', county: 'Cook County', location: 'Village Center, Northbrook', year: 2025, sqft: '3,700',
      title: 'Full-Exterior Custom Masonry on a Northbrook New-Construction Home',
      heroSub: 'Full-exterior custom masonry on a Northbrook new construction home — brick, limestone accents, and stone entry columns all coordinated with architect and GC from day one.',
      problemIntro: 'This Northbrook new construction required full exterior masonry coordination with the general contractor and architect across brick, limestone accent work, and stone entry columns — all specified to integrate correctly with the building envelope and thermal performance requirements.',
    },
    {
      slug: 'northbrook-damaged-brick-replacement', serviceSlug: 'damaged-brick-replacement',
      city: 'Northbrook', county: 'Cook County', location: 'Village Center, Northbrook', year: 2024, sqft: '290',
      title: 'Damaged Brick Section Replacement — Northbrook Split-Level',
      heroSub: 'Damaged brick section replacement on a Northbrook split-level — drainage issue corrected, matched brick installed, and adjacent mortar joints fully repointed to prevent recurrence.',
      problemIntro: 'This Northbrook split-level had a section of spalling brick concentrated at the foundation level — the result of grade drainage issues directing water toward the wall base. We corrected the drainage issue first, then replaced the affected brick.',
    },

    // ── HINSDALE ──
    {
      slug: 'hinsdale-brick-installation', serviceSlug: 'brick-installation',
      city: 'Hinsdale', county: 'DuPage County', location: 'Downtown Hinsdale', year: 2026, sqft: '1,200',
      title: 'Custom Brick Installation Built to Last Generations',
      heroSub: 'Premium brick installation for a historic Hinsdale home demanding permanence and lasting curb appeal.',
      problemIntro: 'Most masonry failures are not obvious until years later — by then the cost to repair is 3-5x the original job. This project corrected damage caused by a previous contractor in Hinsdale.',
      heroImage: '/images/proj-brick-facade.webp',
      heroImageSm: '/images/proj-brick-facade-m.webp',
      gallery: [
        { before: '/images/svc-brick-repair.webp', beforeSm: '/images/svc-brick-repair-m.webp', after: '/images/proj-brick-facade.webp', afterSm: '/images/proj-brick-facade-m.webp', caption: 'Front facade — deteriorated brick replaced with matched full-bed clay brick' },
        { before: '/images/svc-tuckpointing.webp', beforeSm: '/images/svc-tuckpointing-m.webp', after: '/images/proj-tuckpointing.webp', afterSm: '/images/proj-tuckpointing-m.webp', caption: 'Mortar joints — failing pointing replaced with color-matched mortar mix' },
        { before: '/images/svc-chimney.webp', beforeSm: '/images/svc-chimney-m.webp', after: '/images/proj-chimney.webp', afterSm: '/images/proj-chimney-m.webp', caption: 'Side elevation — complete brick installation with proper wall tie placement' },
      ],
    },
    {
      slug: 'hinsdale-tuckpointing-repointing', serviceSlug: 'tuckpointing-repointing',
      city: 'Hinsdale', county: 'DuPage County', location: 'Downtown Hinsdale', year: 2026, sqft: '580',
      title: 'Precision Tuckpointing Restores a Historic Hinsdale Residence',
      heroSub: 'Precision tuckpointing restores a historic Hinsdale residence — complete joint restoration with color-matched mortar and a 5-year warranty on every joint.',
      problemIntro: 'This Hinsdale residence had original soft mortar that had been eroding for over a decade before the homeowner noticed interior water staining. The most expensive part of delayed tuckpointing is always the interior damage — not the masonry.',
    },
    {
      slug: 'hinsdale-natural-stone-limestone', serviceSlug: 'natural-stone-limestone',
      city: 'Hinsdale', county: 'DuPage County', location: 'Downtown Hinsdale', year: 2025, sqft: '760',
      title: 'Limestone Window Surrounds & Entry Steps Restored in Hinsdale',
      heroSub: 'Limestone window surrounds and entry steps restored in Hinsdale — existing stone repaired where possible, fractured units replaced with quarry-matched limestone, and completed wall sealed.',
      problemIntro: 'This Hinsdale residence had original limestone window surrounds and sills that had suffered from water infiltration and freeze-thaw damage over several decades. We restored the existing stone where possible and replaced the units that had fractured beyond repair.',
    },

    // ── OAK BROOK ──
    {
      slug: 'oak-brook-chimney-fireplace', serviceSlug: 'chimney-fireplace',
      city: 'Oak Brook', county: 'DuPage County', location: 'Oak Brook Center Area', year: 2024,
      title: 'Chimney & Fireplace Masonry Rebuilt in Oak Brook',
      heroSub: 'Chimney and fireplace masonry rebuilt in Oak Brook — incorrect hard mortar removed, matched brick replacement throughout, and a new crown designed to last 25+ years.',
      problemIntro: "Oak Brook's higher-value homes often conceal serious chimney deterioration behind well-maintained exteriors. This project corrected a chimney that had been incorrectly repointed with hard Portland mortar in 2015, which had caused brick face spalling across the entire stack.",
    },
    {
      slug: 'oak-brook-brick-stone-veneers', serviceSlug: 'brick-stone-veneers',
      city: 'Oak Brook', county: 'DuPage County', location: 'Oak Brook Center Area', year: 2025, sqft: '920',
      title: 'Oak Brook Custom Home Stone Veneer — Full Exterior Upgrade',
      heroSub: 'Full exterior stone veneer upgrade for an Oak Brook custom home — mechanical anchoring, drainage mat, and period-appropriate profile selected with homeowner and architect approval.',
      problemIntro: 'This Oak Brook custom home had a stone veneer system installed during original construction that had begun delaminating from the substrate within 8 years. We removed the failing installation and rebuilt it correctly with anchored panels and proper drainage.',
    },
    {
      slug: 'oak-brook-chimney-repair-rebuilding', serviceSlug: 'chimney-repair-rebuilding',
      city: 'Oak Brook', county: 'DuPage County', location: 'Oak Brook Center Area', year: 2024,
      title: 'Chimney Structural Rebuild After Freeze-Thaw Failure in Oak Brook',
      heroSub: 'Structural chimney rebuild after freeze-thaw failure in Oak Brook — deteriorated stack demolished and rebuilt using matched brick and properly engineered mortar for the Illinois climate.',
      problemIntro: 'This Oak Brook chimney had sustained severe freeze-thaw damage after flashing failure allowed years of water infiltration. The brick was so deteriorated that patching would have failed within a season — a full rebuild was the only correct solution.',
    },

    // ── ELMHURST ──
    {
      slug: 'elmhurst-cmu-block-installation', serviceSlug: 'cmu-block-installation',
      city: 'Elmhurst', county: 'DuPage County', location: 'Downtown Elmhurst', year: 2025, sqft: '560',
      title: 'Detached Garage CMU Block Wall System — Elmhurst',
      heroSub: 'Detached garage CMU block walls in Elmhurst — engineered reinforcement, proper control joints, and a finished block system that meets all Illinois building code requirements.',
      problemIntro: 'This Elmhurst homeowner needed a detached garage with CMU block walls — a structure requiring engineered reinforcement to meet Illinois building code. Previous contractor bids had not included the required rebar schedule or control joint placement.',
    },
    {
      slug: 'elmhurst-commercial-brick-stone', serviceSlug: 'commercial-brick-stone',
      city: 'Elmhurst', county: 'DuPage County', location: 'Downtown Elmhurst', year: 2024, sqft: '2,800',
      title: 'Commercial Building Brick Restoration — Downtown Elmhurst',
      heroSub: 'Commercial building brick restoration in Downtown Elmhurst — parapet cap replacement, matched brick, and full facade repointing completed under permit with final municipal inspection.',
      problemIntro: 'This Downtown Elmhurst commercial building had a brick parapet and cornice detail that was failing. The parapet cap had lost its flashing integration, and water was penetrating into the top two floors of the building — a liability issue that required immediate resolution.',
    },
    {
      slug: 'elmhurst-commercial-masonry-veneers', serviceSlug: 'commercial-masonry-veneers',
      city: 'Elmhurst', county: 'DuPage County', location: 'Downtown Elmhurst', year: 2025, sqft: '2,400',
      title: 'Modern Stone Veneer Cladding for an Elmhurst Medical Office',
      heroSub: 'Modern stone veneer cladding transforms a dated Elmhurst medical office CMU exterior into a professional facade that projects the practice brand correctly.',
      problemIntro: 'This Elmhurst medical office building needed to project a higher level of professionalism than its existing plain CMU exterior allowed. We installed a stone veneer system with controlled movement joints across the primary facade — a 3-week project that delivered an immediate visual transformation.',
    },

    // ── WESTERN SPRINGS ──
    {
      slug: 'western-springs-custom-home-masonry', serviceSlug: 'custom-home-masonry',
      city: 'Western Springs', county: 'Cook County', location: 'Western Springs', year: 2024, sqft: '3,500',
      title: 'Stone & Brick Combination Exterior — Custom Home in Western Springs',
      heroSub: 'Stone and brick combination exterior for a Western Springs custom home — architect-approved materials, engineered integration with the building envelope, and a 10-year structural warranty.',
      problemIntro: 'This Western Springs custom home combined full-bed brick on the primary facade with natural stone accent work at the entry and window surrounds. AMS provided shop drawings and material submittals approved by the project architect before installation began.',
    },
    {
      slug: 'western-springs-damaged-brick-replacement', serviceSlug: 'damaged-brick-replacement',
      city: 'Western Springs', county: 'Cook County', location: 'Western Springs', year: 2025, sqft: '320',
      title: 'Brick Replacement After Contractor Damage — Western Springs',
      heroSub: 'Brick replacement after contractor damage in Western Springs — correct profile sourced, mismatched previous repair removed, and a final result that matches the original wall exactly.',
      problemIntro: 'This Western Springs home had a section of brick incorrectly replaced by a previous contractor using a mismatched profile and color. AMS sourced a proper match and replaced both the incorrect previous work and the additional surrounding damage it had caused.',
    },
    {
      slug: 'western-springs-natural-stone-limestone', serviceSlug: 'natural-stone-limestone',
      city: 'Western Springs', county: 'Cook County', location: 'Western Springs', year: 2024, sqft: '680',
      title: 'Natural Stone Veneer & Accent Work — Western Springs Residence',
      heroSub: 'Natural stone veneer and accent work for a Western Springs residence — drainage mat, back-butter mortar, and sealed joints transform the exterior while protecting the substrate.',
      problemIntro: 'This Western Springs home had a front facade that lacked the architectural presence expected of the neighborhood. Natural stone veneer on the primary elevation — with limestone accent sills and a new entry surround — delivered a complete transformation.',
    },

    // ── NAPERVILLE ──
    {
      slug: 'naperville-brick-installation', serviceSlug: 'brick-installation',
      city: 'Naperville', county: 'DuPage County', location: 'East Naperville', year: 2024, sqft: '1,150',
      title: 'New Brick Installation for a Naperville Colonial-Style Home',
      heroSub: 'New brick installation for a Naperville colonial — correct mortar formulation, proper substrate prep, and brickwork that will not require maintenance for 20-30 years.',
      problemIntro: "Poor brick installation in Naperville's freeze-thaw climate fails faster than anywhere else in Chicagoland. This project replaced a 12-year-old installation that had already begun to delaminate from the substrate due to inadequate wall tie spacing.",
    },
    {
      slug: 'naperville-tuckpointing-repointing', serviceSlug: 'tuckpointing-repointing',
      city: 'Naperville', county: 'DuPage County', location: 'East Naperville', year: 2025, sqft: '540',
      title: 'Complete Repointing for a Naperville Georgian Brick Home',
      heroSub: 'Complete repointing for a Naperville Georgian brick home — failed mortar removed, new Type S mortar applied in matching color, and a finish that will protect the brick for 20+ years.',
      problemIntro: 'This Naperville Georgian had visible mortar erosion on the south and west elevations — the sides most exposed to driving rain and freeze-thaw. Waiting another season would have resulted in interior water damage to newly renovated first-floor finishes.',
    },
    {
      slug: 'naperville-chimney-fireplace', serviceSlug: 'chimney-fireplace',
      city: 'Naperville', county: 'DuPage County', location: 'East Naperville', year: 2026,
      title: 'Chimney Masonry Repair & Waterproofing for a Naperville Home',
      heroSub: 'Chimney masonry repair and waterproofing for a Naperville residence — crown replaced, cap installed, brick repointed, and penetrant sealer applied to the complete stack.',
      problemIntro: "Chimney failures are disproportionately common in Naperville's post-1990 homes where builders used low-cost masonry details. This project corrected a chimney crown that had cracked in its first winter due to an improper overhang detail — a design flaw, not a maintenance failure.",
    },

    // ── DOWNERS GROVE ──
    {
      slug: 'downers-grove-brick-stone-veneers', serviceSlug: 'brick-stone-veneers',
      city: 'Downers Grove', county: 'DuPage County', location: 'Downtown Downers Grove', year: 2024, sqft: '700',
      title: 'Brick & Stone Veneer on a Downers Grove Split-Level Home',
      heroSub: 'Brick and stone veneer upgrade on a Downers Grove split-level home — correctly anchored installation, drainage mat, and a color-approved profile that transforms the street elevation.',
      problemIntro: "This Downers Grove split-level had a dated aluminum siding exterior that was masking the home's architectural bones. The owner's goal was to match the brick and stone aesthetic of neighboring 1970s homes that had been properly updated.",
    },
    {
      slug: 'downers-grove-chimney-repair-rebuilding', serviceSlug: 'chimney-repair-rebuilding',
      city: 'Downers Grove', county: 'DuPage County', location: 'Downtown Downers Grove', year: 2025,
      title: 'Chimney Crown & Partial Rebuild — Downers Grove Ranch Home',
      heroSub: 'Chimney crown replacement and top-section rebuild for a Downers Grove ranch home — correct crown overhang, new flashing, and matched brick in all rebuilt courses.',
      problemIntro: 'This Downers Grove ranch home had a chimney crown that had completely failed, allowing water to saturate the top 6 courses of brick. After assessment, we rebuilt the top section, installed a new crown with proper overhang, and integrated new counter-flashing.',
    },
    {
      slug: 'downers-grove-cmu-block-installation', serviceSlug: 'cmu-block-installation',
      city: 'Downers Grove', county: 'DuPage County', location: 'Downtown Downers Grove', year: 2024, sqft: '440',
      title: 'CMU Block Garden Wall & Steps — Downers Grove',
      heroSub: 'CMU block garden wall and steps for a Downers Grove residence — reinforced construction with proper drainage detailing and a clean finished appearance.',
      problemIntro: 'Garden walls and planter surrounds in Downers Grove frequently fail when built with insufficient block depth or no reinforcement. This project replaced a collapsed unreinforced garden wall with a properly designed CMU system that includes drainage and rebar.',
    },

    // ── LA GRANGE ──
    {
      slug: 'la-grange-commercial-brick-stone', serviceSlug: 'commercial-brick-stone',
      city: 'La Grange', county: 'Cook County', location: 'La Grange Business District', year: 2025, sqft: '3,000',
      title: 'La Grange Business District Brick & Stone Restoration',
      heroSub: 'La Grange business district brick and stone restoration — full facade repointing, matched brick replacement, and parapet work completed under permit with final municipal inspection.',
      problemIntro: "La Grange's historic business district buildings frequently show mortar failure and spalling on older commercial facades. This project included full repointing, matched brick replacement, and a new parapet cap system — all permitted and inspected.",
    },
    {
      slug: 'la-grange-commercial-masonry-veneers', serviceSlug: 'commercial-masonry-veneers',
      city: 'La Grange', county: 'Cook County', location: 'La Grange Business District', year: 2024, sqft: '2,600',
      title: 'La Grange Mixed-Use Building — Commercial Masonry Veneer',
      heroSub: 'La Grange mixed-use building commercial veneer — stone panel system installed with proper anchoring and movement joints, transforming the street-level presence.',
      problemIntro: "This La Grange mixed-use building had a ground-floor commercial exterior that was inconsistent with its premium tenant mix. Stone veneer cladding transformed the facade while adding weather protection to the original concrete substrate.",
    },
    {
      slug: 'la-grange-custom-home-masonry', serviceSlug: 'custom-home-masonry',
      city: 'La Grange', county: 'Cook County', location: 'La Grange Business District', year: 2025, sqft: '3,600',
      title: 'Custom Brick Facade on a Heritage La Grange Colonial',
      heroSub: 'Custom brick facade on a heritage La Grange colonial — traditional Flemish bond pattern, period-correct mortar profile, and masonry detailing that honors the architectural character of the neighborhood.',
      problemIntro: 'This La Grange heritage-style home required brick and stone masonry that would look period-appropriate while meeting modern building codes. We sourced brick from a regional supplier carrying the correct modular profile and used a traditional Flemish bond pattern approved by the homeowner and local historic commission.',
    },

    // ── BURR RIDGE ──
    {
      slug: 'burr-ridge-damaged-brick-replacement', serviceSlug: 'damaged-brick-replacement',
      city: 'Burr Ridge', county: 'DuPage County', location: 'Burr Ridge Village Center', year: 2024, sqft: '410',
      title: 'Brick Spalling Repair & Replacement on a Burr Ridge Estate',
      heroSub: 'Brick spalling repair and replacement on a Burr Ridge estate — 400+ sq ft of frost-damaged brick replaced with matched units after drainage correction.',
      problemIntro: 'This Burr Ridge estate had sustained frost spalling across the north elevation — an area that retained moisture through the spring thaw each year. After addressing the underlying drainage issue, we replaced 400 square feet of spalling brick with a correct color and profile match.',
    },
    {
      slug: 'burr-ridge-natural-stone-limestone', serviceSlug: 'natural-stone-limestone',
      city: 'Burr Ridge', county: 'DuPage County', location: 'Burr Ridge Village Center', year: 2025, sqft: '840',
      title: 'Custom Limestone Entry Steps & Surround — Burr Ridge Estate',
      heroSub: 'Custom limestone entry steps and surround for a Burr Ridge estate — quarried stone matched to interior limestone flooring, properly drained, and sealed for Chicago winters.',
      problemIntro: 'This Burr Ridge estate required natural limestone steps, a new entry surround, and limestone accent work at the garage facade — all coordinated to match the existing interior limestone flooring the homeowner had specified for the interior renovation.',
    },
    {
      slug: 'burr-ridge-brick-installation', serviceSlug: 'brick-installation',
      city: 'Burr Ridge', county: 'DuPage County', location: 'Burr Ridge Village Center', year: 2025, sqft: '1,400',
      title: 'Precision Brick Facade for a Burr Ridge Custom Estate',
      heroSub: 'Precision brick facade installation for a Burr Ridge estate home — color-matched mortar, period-correct bond pattern, and brickwork backed by a 5-year labor warranty.',
      problemIntro: 'Burr Ridge estate homes require exacting brick selection and craftsmanship — the cost of getting it wrong compounds every year. This project replaced an inferior installation that had developed water infiltration within 7 years due to inadequate wall tie density.',
    },

    // ── CLARENDON HILLS ──
    {
      slug: 'clarendon-hills-tuckpointing-repointing', serviceSlug: 'tuckpointing-repointing',
      city: 'Clarendon Hills', county: 'DuPage County', location: 'Downtown Clarendon Hills', year: 2024, sqft: '460',
      title: 'Tuckpointing on a Classic Clarendon Hills Bungalow',
      heroSub: "Tuckpointing and repointing on a classic Clarendon Hills bungalow — all joint faces ground out, color-matched mortar applied, and joints tooled to correct profile.",
      problemIntro: "This Clarendon Hills bungalow had failing mortar joints on the entire street-facing elevation — the result of previous spot-patching with incorrect Portland cement mortar that had damaged the surrounding joints. Proper restoration required removing all prior patch work before repointing.",
    },
    {
      slug: 'clarendon-hills-chimney-fireplace', serviceSlug: 'chimney-fireplace',
      city: 'Clarendon Hills', county: 'DuPage County', location: 'Downtown Clarendon Hills', year: 2025,
      title: 'Chimney Restoration & Fireplace Surround Repair in Clarendon Hills',
      heroSub: 'Chimney restoration and fireplace surround repair in Clarendon Hills — neglected chimney returned to full structural and waterproof condition in under a week.',
      problemIntro: 'This Clarendon Hills residence had a chimney stack that had not been inspected or maintained since the 1980s. Active water infiltration had damaged the flashing, crown, and top four courses of brick — and was beginning to affect the fireplace damper mechanism.',
    },
    {
      slug: 'clarendon-hills-brick-stone-veneers', serviceSlug: 'brick-stone-veneers',
      city: 'Clarendon Hills', county: 'DuPage County', location: 'Downtown Clarendon Hills', year: 2025, sqft: '610',
      title: 'Stone Veneer Accent Work & Brick Siding in Clarendon Hills',
      heroSub: 'Stone veneer accent work and brick siding in Clarendon Hills — anchored installation, properly detailed transitions, and a five-year labor warranty on all veneer and masonry work.',
      problemIntro: 'This Clarendon Hills homeowner wanted to add stone veneer accent columns and a new brick front facade to a home that had a plain painted exterior. We coordinated both scopes — brick and stone — to create a unified appearance.',
    },

    // ── WILLOWBROOK ──
    {
      slug: 'willowbrook-chimney-repair-rebuilding', serviceSlug: 'chimney-repair-rebuilding',
      city: 'Willowbrook', county: 'DuPage County', location: 'Willowbrook', year: 2024,
      title: 'Complete Chimney Rebuild for a Willowbrook Split-Level',
      heroSub: 'Complete chimney rebuild for a Willowbrook split-level — the only correct solution after two previous contractors had patched without addressing the structural cause.',
      problemIntro: 'This Willowbrook split-level had a chimney that had been patched by two previous contractors without addressing the structural root causes. We rebuilt from the roofline up — the only fix that provides a lasting result when the stack has been compromised at this level.',
    },
    {
      slug: 'willowbrook-cmu-block-installation', serviceSlug: 'cmu-block-installation',
      city: 'Willowbrook', county: 'DuPage County', location: 'Willowbrook', year: 2025, sqft: '490',
      title: 'CMU Block Foundation Extension for a Willowbrook Home',
      heroSub: 'CMU block foundation extension for a Willowbrook home — structural masonry construction with full reinforcement and waterproofing that meets building code.',
      problemIntro: "This Willowbrook home's basement foundation extension required CMU block construction with full grouting and waterproofing — a project that demanded structural masonry expertise well beyond basic block laying. The permit required engineered drawings, which we coordinated.",
    },
    {
      slug: 'willowbrook-commercial-brick-stone', serviceSlug: 'commercial-brick-stone',
      city: 'Willowbrook', county: 'DuPage County', location: 'Willowbrook', year: 2024, sqft: '2,700',
      title: 'Office Complex Brick Facade Repair — Willowbrook',
      heroSub: 'Office complex brick facade repair in Willowbrook — water infiltration source identified, matched brick installed, and complete facade repointed with Type S mortar.',
      problemIntro: 'This Willowbrook office complex had a brick facade with water damage concentrated at ground level and window surrounds — the result of failed caulk and incorrect mortar type from a 2012 maintenance project that had damaged the surrounding joints.',
    },

    // ── WHEATON ──
    {
      slug: 'wheaton-commercial-masonry-veneers', serviceSlug: 'commercial-masonry-veneers',
      city: 'Wheaton', county: 'DuPage County', location: 'Historic Downtown Wheaton', year: 2025, sqft: '3,200',
      title: 'Office Building Exterior Veneer Renovation — Downtown Wheaton',
      heroSub: 'Office building exterior veneer renovation in Downtown Wheaton — stone panel system transforms the facade and increases property value and lease competitiveness.',
      problemIntro: "This Downtown Wheaton office building's exterior had not been updated since the early 1990s. Stone veneer cladding on the primary and secondary facades increased property value and resulted in multiple new lease inquiries within 60 days of completion.",
    },
    {
      slug: 'wheaton-custom-home-masonry', serviceSlug: 'custom-home-masonry',
      city: 'Wheaton', county: 'DuPage County', location: 'Historic Downtown Wheaton', year: 2024, sqft: '4,200',
      title: 'Landmark Brick & Limestone Exterior — Wheaton Custom Estate',
      heroSub: 'Landmark brick and limestone exterior for a Wheaton custom estate — full exterior masonry scope completed on schedule with the general contractor over a 14-week build.',
      problemIntro: 'This Wheaton custom estate required a full exterior masonry scope: brick primary facade, limestone entry columns and arch, stone window surrounds, and a brick chimney cap — all coordinated with the general contractor over a 14-week build schedule.',
    },
    {
      slug: 'wheaton-damaged-brick-replacement', serviceSlug: 'damaged-brick-replacement',
      city: 'Wheaton', county: 'DuPage County', location: 'Historic Downtown Wheaton', year: 2025, sqft: '350',
      title: 'Frost-Damaged Brick Replaced & Repointed — Wheaton Tudor',
      heroSub: 'Frost-damaged brick replaced and repointed on a Wheaton Tudor — all spalling units removed, matched replacement installed, and completed wall sealed against future water infiltration.',
      problemIntro: 'This Wheaton Tudor had frost-damaged brick across the front facade — severe spalling that had progressively worsened over three consecutive winters. We matched the original profile, replaced all affected units, and sealed the completed wall.',
    },

    // ── CHICAGO ──
    {
      slug: 'chicago-natural-stone-limestone', serviceSlug: 'natural-stone-limestone',
      city: 'Chicago', county: 'Cook County', location: 'Logan Square, Chicago', year: 2026, sqft: '920',
      title: 'Limestone Facade Restoration on a Logan Square Greystone',
      heroSub: 'Limestone facade restoration on a Logan Square greystone — original coursework cleaned, fractured sill units replaced with quarry-matched limestone, and sealed penetrant applied.',
      problemIntro: 'Logan Square greystones are some of the most architecturally significant residential buildings in Chicago — built with natural limestone that now requires expert matching and restoration. This project restored the primary facade limestone coursework and replaced three window sill units.',
    },
    {
      slug: 'chicago-brick-installation', serviceSlug: 'brick-installation',
      city: 'Chicago', county: 'Cook County', location: 'Wicker Park, Chicago', year: 2026, sqft: '1,050',
      title: 'Chicago Two-Flat Brick Facade Replacement — Wicker Park',
      heroSub: "Chicago Wicker Park two-flat brick facade replacement — matched profiles for an early 1900s building, correct mortar type, and a result that looks like original construction.",
      problemIntro: "Chicago's dense urban environment and aggressive freeze-thaw cycles demand masonry done right the first time. This Wicker Park two-flat project corrected a facade that had been improperly repointed and was now allowing water infiltration into the first-floor unit.",
    },
    {
      slug: 'chicago-tuckpointing-repointing', serviceSlug: 'tuckpointing-repointing',
      city: 'Chicago', county: 'Cook County', location: 'Lincoln Square, Chicago', year: 2026, sqft: '680',
      title: 'Logan Square 1920s Building Tuckpointing — Color-Matched Mortar',
      heroSub: 'Logan Square 1920s building tuckpointing — historically correct lime-based mortar formula used to protect original soft brick from damage that modern Portland mortar would cause.',
      problemIntro: "1920s Logan Square buildings present a classic tuckpointing challenge: original lime mortar needs to be matched precisely. Using modern Portland mortar on soft historic brick damages the brick face — AMS uses the correct mortar formula for every building era.",
    },
  ];

  // ── Merge raw data with service templates ─────────────────────────────
  const projects = raw.map(p => {
    const svc = SVC[p.serviceSlug];
    const g = (n, side) => `/images/proj-${p.slug}-gal${n}-${side}.webp`;
    const gm = (n, side) => `/images/proj-${p.slug}-gal${n}-${side}-m.webp`;
    return {
      slug:         p.slug,
      serviceType:  svc.serviceType,
      serviceSlug:  p.serviceSlug,
      city:         p.city,
      county:       p.county,
      location:     p.location,
      year:         p.year,
      sqft:         p.sqft   ?? svc.sqftDefault,
      duration:     p.duration ?? svc.durationDefault,
      materials:    p.materials ?? svc.materialsDefault,
      costRange:    p.costRange ?? svc.costRangeDefault,
      warranty:     p.warranty  ?? svc.warrantyDefault,
      heroImage:    p.heroImage   || `/images/proj-${p.slug}-hero.webp`,
      heroImageSm:  p.heroImageSm || `/images/proj-${p.slug}-hero-m.webp`,
      title:     p.title,
      heroSub:   p.heroSub,
      problem: {
        heading: svc.problemHeading,
        intro:   p.problemIntro,
        bullets: svc.problemBullets,
      },
      process:   svc.process,
      valueProp: svc.valueProp,
      faq:       svc.faq,
      gallery: p.gallery || [1, 2, 3].map(n => ({
        before:   g(n, 'before'),
        beforeSm: gm(n, 'before'),
        after:    g(n, 'after'),
        afterSm:  gm(n, 'after'),
        caption:  svc.galCaptions[n - 1],
      })),
    };
  });

  // ── Compute related (runs at module load — pure JS, fine for static site) ──
  const byCity = {}, bySvc = {};
  for (const p of projects) {
    (byCity[p.city]         = byCity[p.city]         || []).push(p);
    (bySvc[p.serviceSlug]   = bySvc[p.serviceSlug]   || []).push(p);
  }
  const toRef = r => ({ title: r.title, slug: r.slug, service: r.serviceType, city: r.city });
  for (const p of projects) {
    p.relatedByCity    = byCity[p.city].filter(r => r.slug !== p.slug).slice(0, 3).map(toRef);
    p.relatedByService = bySvc[p.serviceSlug].filter(r => r.slug !== p.slug).slice(0, 3).map(toRef);
  }

  return projects;
})();
