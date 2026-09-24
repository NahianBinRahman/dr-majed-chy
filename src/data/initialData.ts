import { SiteData, BlogPost, Appointment } from '@/types';

export const initialSiteData: SiteData = {
  theme: {
    primaryColor: '#0d9488', // Medical Teal
    primaryColorName: 'Teal Luxury',
    fontFamily: 'Inter',
    fontSizeScale: 'normal',
    mode: 'dark'
  },
  profile: {
    name: 'Dr. Md. Mohiuddin Majed Chy',
    shortName: 'Dr. Majed Chowdhury',
    honorific: 'Consultant Interventional Pain Specialist',
    titles: 'MBBS, MD (Anaesthesiology), FIPM (Fellow Interventional Pain Medicine)',
    subTitle: 'European Society of Regional Anaesthesia & Pain Therapy (ESRA) Certified Specialist',
    heroBio: 'Dedicated to liberating patients from debilitating chronic spinal pain, neuropathic disorders, and joint agony through state-of-the-art C-Arm fluoroscopic interventions and precision ultrasound-guided nerve blocks—without invasive surgery.',
    fullBio: 'Dr. Md. Mohiuddin Majed Chowdhury is an internationally trained Consultant in Regional Anaesthesia and Interventional Pain Medicine. Holding prestigious certification from The European Society of Regional Anaesthesia & Pain Therapy (ESRA) and active leadership in the Bangladesh Society for Study of Pain (BSSP - Chapter of IASP), Dr. Majed utilizes cutting-edge medical technologies such as real-time C-Arm fluoroscopic guidance and high-definition musculoskeletal ultrasound to diagnose and neutralize pain generators with pin-point accuracy.',
    experienceYears: 14,
    patientsTreated: 12500,
    proceduresDone: 4800,
    successRate: 98,
    phone: '+880 1819-234567',
    emergencyPhone: '+880 1711-890123',
    email: 'contact@drmajedpaincare.com',
    chamberAddress: 'Suite 402, Interventional Pain Care Center, Dhaka, Bangladesh',
    hospitalAffiliation: 'Central Specialized Hospital & Research Institute',
    visitingHours: '05:00 PM – 09:30 PM (Saturday to Thursday)',
    availableDays: 'Saturday - Thursday (Friday by Appointment for Emergencies)',
    avatarUrl: '/images/dr_majed_portrait_hd.jpg',
    badgeText: 'Active Member, ESRA (European Society) 2026'
  },
  menus: [
    { id: 'about', label: 'About', href: '#about', enabled: true, order: 1 },
    { id: 'services', label: 'Procedures', href: '#services', enabled: true, order: 2 },
    { id: 'pain-locator', label: 'Pain Map', href: '#pain-locator', enabled: true, order: 3 },
    { id: 'achievements', label: 'Gallery', href: '#achievements', enabled: true, order: 4 },
    { id: 'blogs', label: 'Articles', href: '#blogs', enabled: true, order: 5 },
    { id: 'testimonials', label: 'Stories', href: '#testimonials', enabled: true, order: 6 },
    { id: 'chambers', label: 'Chambers', href: '#chambers', enabled: true, order: 7 },
  ],
  services: [
    {
      id: 'c-arm-spine',
      title: 'C-Arm Guided Spine Interventions',
      shortDesc: 'Minimally-invasive fluoroscopy-guided precision injections for slipped disc, spinal stenosis, and sciatica.',
      fullDesc: 'Using real-time live X-ray fluoroscopy (C-Arm), Dr. Majed delivers therapeutic agents directly around compressed spinal nerves, epidural spaces, and facet joints with millimetric precision, avoiding major open spinal surgeries.',
      icon: 'Activity',
      tag: 'Spine & Disc Care',
      badge: 'Gold Standard',
      imageUrl: '/images/operation_ot_carm.jpg',
      benefits: [
        'Transforaminal & interlaminar epidural steroid injections',
        'Cervical & lumbar facet joint medial branch blocks',
        'Sacroiliac (SI) joint denervation & hydrodissection',
        'Same-day discharge with local anaesthesia'
      ]
    },
    {
      id: 'ultrasound-nerve',
      title: 'Ultrasound-Guided Regional Nerve Blocks',
      shortDesc: 'High-resolution sonography for direct visual needle trajectory without radiation exposure.',
      fullDesc: 'Direct visual real-time nerve tracing ensures optimal medication placement for complex regional pain syndromes, carpal tunnel, occipital migraines, and post-herpetic neuralgia.',
      icon: 'ShieldCheck',
      tag: 'Sonography Precision',
      badge: 'Zero Radiation',
      imageUrl: '/images/workshop_ultrasound.jpg',
      benefits: [
        'Brachial plexus, suprascapular & sciatic nerve targeting',
        'Trigeminal & occipital nerve blocks for intractable headaches',
        'Pudendal nerve & chronic pelvic pain management',
        'Instant bedside dynamic diagnostic assessment'
      ]
    },
    {
      id: 'radiofrequency-ablation',
      title: 'Radiofrequency Neurotomy (RFA)',
      shortDesc: 'Long-lasting molecular thermal neurolysis providing 12 to 24 months of continuous pain relief.',
      fullDesc: 'Advanced radiofrequency energy selectively interrupts pain signaling from worn facet joints and genicular knee nerves, restoring painless walking and active lifestyle without joint replacement.',
      icon: 'Zap',
      tag: 'Long-Term Relief',
      badge: '12-24 Mo Relief',
      benefits: [
        'Cooled and conventional RF for chronic knee osteoarthritis',
        'Lumbar & cervical facet joint rhizotomy',
        'Sacroiliac joint bipolar RF neurotomy',
        'Proven non-opioid chronic pain solution'
      ]
    },
    {
      id: 'cancer-palliative',
      title: 'Advanced Cancer Pain Interventions',
      shortDesc: 'Compassionate sympathetic nerve neurolysis restoring dignified quality of life for oncology patients.',
      fullDesc: 'Specialized neurolytic techniques including coeliac plexus neurolysis for pancreatic and upper abdominal malignancies, and hypogastric plexus blocks for pelvic neoplasms.',
      icon: 'HeartHandshake',
      tag: 'Oncology Pain Care',
      badge: 'Palliative Mastery',
      benefits: [
        'Coeliac plexus chemical neurolysis for abdominal pain',
        'Superior hypogastric plexus block for pelvic malignancies',
        'Subarachnoid and epidural targeted drug delivery',
        'Significant reduction in systemic narcotic side-effects'
      ]
    },
    {
      id: 'joint-regenerative',
      title: 'Regenerative Joint & Knee Therapy',
      shortDesc: 'Platelet-Rich Plasma (PRP) and viscosupplementation guided by dynamic musculoskeletal ultrasound.',
      fullDesc: 'Biological enhancement for degenerative cartilage, partial rotator cuff tears, plantar fasciitis, and tennis elbow, stimulating natural cellular repair pathways.',
      icon: 'Sparkles',
      tag: 'Regenerative Medicine',
      badge: 'Natural Healing',
      benefits: [
        'Autologous PRP injections for early knee osteoarthritis',
        'Shoulder adhesive capsulitis (Frozen Shoulder) hydrodilatation',
        'Trochanteric bursitis and tendinopathy therapies',
        'Preserves natural biomechanics and postpones surgery'
      ]
    },
    {
      id: 'neuropathic-migraine',
      title: 'Chronic Migraine & Neuropathy Clinic',
      shortDesc: 'Comprehensive neuro-modulation, Botox migraine protocols, and sympathetic blockade.',
      fullDesc: 'Specialized management for complex migraines, post-stroke neuropathic pain, diabetic peripheral neuropathy, and Phantom limb syndrome.',
      icon: 'Brain',
      tag: 'Neurology & Headache',
      badge: 'Specialized Protocol',
      benefits: [
        'Sphenopalatine ganglion (SPG) transnasal blocks',
        'Greater & lesser occipital nerve blocks',
        'Stellate ganglion sympathetic block for upper extremity CRPS',
        'Targeted neuropathic medication optimization'
      ]
    }
  ],
  achievements: [
    {
      id: 'esra-2026',
      title: 'Active Membership Certification',
      organization: 'The European Society of Regional Anaesthesia & Pain Therapy (ESRA)',
      year: '2026',
      description: 'Officially certified active international member of ESRA, upholding European gold-standard clinical safety, ultrasound guidance protocols, and multimodal analgesia.',
      imageUrl: '/images/certificate_esra.jpg',
      type: 'certificate',
      featured: true
    },
    {
      id: 'pain-congress-2026',
      title: 'Faculty Keynote Speaker at 27th Pain Congress',
      organization: 'Bangladesh Society for Study of Pain (BSSP) & IASP',
      year: '2026',
      description: 'Delivered keynote scientific presentation on recent innovations in interventional pain therapies at Hotel Intercontinental, Dhaka, in collaboration with International Association for the Study of Pain.',
      imageUrl: '/images/speech_pain_congress.jpg',
      type: 'keynote',
      featured: true
    },
    {
      id: 'carm-ot-mastery',
      title: 'Live Interventional Fluoroscopic Surgery Session',
      organization: 'National Specialized Pain Management Center',
      year: '2025-2026',
      description: 'Performing complex lumbar transforaminal epidural and disc decompression under state-of-the-art C-Arm image intensification in dedicated sterile intervention theater.',
      imageUrl: '/images/operation_ot_carm.jpg',
      type: 'procedure',
      featured: true
    },
    {
      id: 'ultrasound-workshop',
      title: 'Hands-on Ultrasound Masterclass Director',
      organization: 'Paincon & Regional Anaesthesia Scientific Academy',
      year: '2025',
      description: 'Directing hands-on sonography training for fellow physicians on ultrasonic vascular identification, echogenic needle tracking, and safe nerve block administration.',
      imageUrl: '/images/workshop_ultrasound.jpg',
      type: 'workshop',
      featured: true
    },
    {
      id: 'family-values',
      title: 'Humanitarian Care & Patient Dedication',
      organization: 'Chowdhury Pain Foundation & Compassionate Healthcare',
      year: '2026',
      description: 'Rooted in strong family values, maternal blessings, and empathy, Dr. Majed treats each patient as family, ensuring compassionate care and ethical medicine.',
      imageUrl: '/images/personal_family.jpg',
      type: 'procedure',
      featured: false
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      patientName: 'Engr. A. M. Faruq',
      condition: 'Severe L4-L5 Disc Herniation with Sciatica',
      comment: 'I was unable to stand for even 3 minutes due to sharp shooting leg pain. Orthopedic surgeons advised open spinal fusion. Dr. Majed performed a C-Arm transforaminal epidural procedure; within 48 hours my pain dropped by 90% and I avoided surgery completely!',
      rating: 5,
      recoveryTime: 'Recovered in 2 Days',
      verified: true
    },
    {
      id: 'test-2',
      patientName: 'Prof. Syeda Jahanara',
      condition: 'Chronic Grade 3 Knee Osteoarthritis',
      comment: 'Walking up the stairs was agonizing. Dr. Majed explained the radiofrequency genicular nerve ablation procedure with incredible patience. The procedure was painless and I have been walking comfortably for over a year now!',
      rating: 5,
      recoveryTime: 'Pain-Free for 14 Months',
      verified: true
    },
    {
      id: 'test-3',
      patientName: 'Khandaker Rafiqul Islam',
      condition: 'Intractable Chronic Trigeminal & Occipital Neuralgia',
      comment: 'Suffered for 6 years with excruciating electric shock-like facial and head pain. Dr. Majeds precision ultrasound-guided nerve block finally gave me my life back. His demeanor and skill are unmatched.',
      rating: 5,
      recoveryTime: 'Instant Relief',
      verified: true
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is Interventional Pain Medicine, and how does it differ from surgery?',
      answer: 'Interventional pain medicine involves targeted, minimally invasive techniques using imaging guidance (such as real-time C-Arm X-ray and ultrasound) to deliver medications or thermal energy directly to the source of pain. Unlike open surgery, it requires no large incisions, minimal or no hospital stay, and enables rapid recovery.'
    },
    {
      id: 'faq-2',
      question: 'Are C-Arm and Ultrasound guided procedures painful?',
      answer: 'Most procedures are performed under local anaesthesia with minimal discomfort. Patients generally feel only a tiny pinch during the local numbing injection, and procedures typically take 15 to 30 minutes.'
    },
    {
      id: 'faq-3',
      question: 'Can I avoid spinal surgery with Dr. Majeds procedures?',
      answer: 'In up to 85-90% of cases involving slipped disc, sciatica, and facet arthritis, targeted interventional pain procedures can alleviate symptoms effectively, enabling patients to avoid major surgery.'
    },
    {
      id: 'faq-4',
      question: 'How do I book an urgent appointment or consultation?',
      answer: 'You can use the online instant booking form on this website, or call the direct chamber helpline at +880 1819-234567. Emergency triage is available.'
    }
  ]
};

export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'slip-disc-without-surgery-c-arm-interventions',
    title: 'Avoiding Spinal Surgery: How C-Arm Guided Interventions Heal Slipped Discs',
    excerpt: 'Discover how modern fluoroscopy-guided transforaminal epidural injections provide long-term relief for disc herniation and sciatica without open incisions.',
    content: `
### The Modern Paradigm in Slipped Disc Management

For decades, patients suffering from lumbar disc herniation and debilitating sciatica were faced with two extreme choices: masking the pain with heavy medications or undergoing invasive open spinal surgery.

Today, advances in **Interventional Pain Medicine** have revolutionized how we manage spinal pathology.

#### How Real-Time C-Arm Fluoroscopy Works
Under real-time fluoroscopic visualization, we place a micro-gauge needle precisely into the epidural space, adjacent to the inflamed spinal nerve root. Contrast dye injection confirms sub-millimeter precision before administering anti-inflammatory medication.

#### Key Benefits of Non-Surgical Disc Interventions:
1. **Zero Incision & No Muscle Trauma**: Preserves natural spinal stability.
2. **Same-Day Procedure**: Patients walk out within 45 minutes.
3. **High Success Rate**: Over 85% of acute and subacute patients experience substantial, sustained relief.
4. **Fast Return to Work**: Resume normal daily routines in 24 to 48 hours.

If you are experiencing tingling, numbness, or shooting pain radiating down your leg, consultation with an interventional pain specialist is your vital first step.
    `,
    category: 'Spine Health',
    readTime: '4 min read',
    publishedAt: '2026-04-18',
    coverImage: '/images/operation_ot_carm.jpg',
    author: 'Dr. Md. Mohiuddin Majed Chy',
    featured: true,
    tags: ['Slipped Disc', 'Sciatica', 'C-Arm', 'Spine Care']
  },
  {
    id: 'blog-2',
    slug: 'esra-2026-advances-ultrasound-regional-anaesthesia',
    title: 'ESRA 2026 Highlights: The Power of Ultrasound in Pain & Nerve Targeting',
    excerpt: 'Key insights from The European Society of Regional Anaesthesia & Pain Therapy (ESRA) regarding dynamic ultrasound needle tracking for patient safety.',
    content: `
### Clinical Insights from ESRA 2026

As an active certified member of **The European Society of Regional Anaesthesia & Pain Therapy (ESRA)**, I continuously integrate international gold-standard protocols into our daily practice.

#### Why Ultrasound Has Replaced Blind Injections
Traditional "blind" or landmark-based injections carry risks of vascular punctures or inaccurate deposition. With high-frequency musculoskeletal ultrasound:
- Every critical vascular structure is visualized with color Doppler.
- The target nerve is traced in real-time cross-section.
- The spread of therapeutic fluid is monitored continuously around the epineurium.

#### Applications in Chronic Pain
From refractory occipital migraines to complex regional pain syndrome (CRPS) and post-surgical scar entrapments, ultrasound guidance allows us to achieve clinical outcomes that were previously impossible.
    `,
    category: 'Clinical Research',
    readTime: '5 min read',
    publishedAt: '2026-03-28',
    coverImage: '/images/workshop_ultrasound.jpg',
    author: 'Dr. Md. Mohiuddin Majed Chy',
    featured: true,
    tags: ['ESRA', 'Ultrasound', 'Regional Anaesthesia', 'Nerve Blocks']
  },
  {
    id: 'blog-3',
    slug: 'radiofrequency-ablation-chronic-knee-pain-relief',
    title: 'Radiofrequency Ablation (RFA): 18-Month Relief for Knee & Back Arthritis',
    excerpt: 'Explore how radiofrequency neurotomy desensitizes pain-carrying sensory nerves to restore pain-free mobility for severe osteoarthritis patients.',
    content: `
### What is Radiofrequency Neurotomy?

When cartilage in the knee or facet joints in the spine degenerates, sensory nerves transmit relentless pain signals to the brain. **Radiofrequency Ablation (RFA)** uses controlled thermal energy to disrupt these sensory nerve pathways.

#### The Genicular Nerve Protocol for Knee Osteoarthritis
For patients who cannot undergo knee replacement surgery due to diabetes, cardiac risks, or age, Genicular Nerve RFA provides:
- **Relief lasting 12 to 24 months**
- Substantial improvement in joint mobility and walking capacity
- Dramatic decrease in oral painkillers and NSAID toxicity
- Preservation of motor strength (only sensory pain nerves are targeted)

#### A Simple Outpatient Procedure
The entire procedure takes approximately 25 minutes under light local numbing. Patients walk comfortably the very same day.
    `,
    category: 'Joint Care',
    readTime: '4 min read',
    publishedAt: '2026-02-14',
    coverImage: '/images/speech_pain_congress.jpg',
    author: 'Dr. Md. Mohiuddin Majed Chy',
    featured: false,
    tags: ['Knee Pain', 'Osteoarthritis', 'RFA', 'Facet Joint']
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-101',
    patientName: 'Mrs. Salma Khatun',
    patientPhone: '+880 1712-334455',
    patientEmail: 'salma.khatun@example.com',
    patientAge: 54,
    painLocation: 'Lower Back & Right Leg (Sciatica)',
    preferredDate: '2026-09-28',
    preferredTimeSlot: '06:30 PM',
    symptoms: 'Sharp shooting pain down right leg for 4 months. MRI shows L4-L5 disc protrusion.',
    status: 'confirmed',
    createdAt: '2026-09-23T14:20:00Z',
    doctorNotes: 'Advised to bring previous MRI reports. Scheduled for initial diagnostic evaluation.'
  },
  {
    id: 'apt-102',
    patientName: 'Mr. Anisur Rahman',
    patientPhone: '+880 1819-887766',
    patientEmail: 'anisur.r@example.com',
    patientAge: 62,
    painLocation: 'Both Knees (Osteoarthritis)',
    preferredDate: '2026-09-29',
    preferredTimeSlot: '07:30 PM',
    symptoms: 'Severe knee pain upon standing and walking. Interested in radiofrequency ablation.',
    status: 'pending',
    createdAt: '2026-09-24T09:10:00Z'
  }
];
