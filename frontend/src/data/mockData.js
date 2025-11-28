// No imports needed here! We use string keys ('twitter', 'shield') which the component maps to icons.

export const claims = [
  {
    id: 1,
    cardType: 'standard',
    type: 'misleading',
    title: "Claim: Charging your phone overnight destroys the battery.",
    verdict: "MISLEADING",
    summary: "Modern Lithium-Ion batteries have smart management chips that cut off power flow exactly at 100%.",
    source: "Apple Support",
    timeline: [
      { type: 'origin', platform: 'TikTok', label: "Viral Video posted by @tech_guru", time: "Oct 12, 10:00 AM", icon: 'video' },
      { type: 'spread', platform: 'WhatsApp', label: "Forwarded 'Highly Frequently'", time: "+ 4 hours", icon: 'message' },
      { type: 'spread', platform: 'Twitter', label: "Trending Topic #PhoneBattery", time: "+ 12 hours", icon: 'twitter' },
      { type: 'verdict', platform: 'TruthScroll', label: "Agentic Verification Complete", time: "Now", icon: 'shield' }
    ]
  },
  {
    id: 2,
    cardType: 'quiz',
    type: 'verified',
    question: "OpenAI confirmed they are exploring 'NSFW' content. What is the stated reason?",
    verdict: "QUIZ TIME",
    options: [
      { id: 'a', text: "To generate more revenue", isCorrect: false },
      { id: 'b', text: "To treat adult users like adults", isCorrect: true, explanation: "Correct! CEO Sam Altman stated this is about giving users autonomy." },
      { id: 'c', text: "A bug in the system", isCorrect: false },
      { id: 'd', text: "To compete with X (Twitter)", isCorrect: false }
    ],
    source: "BBC News",
    summary: "OpenAI is exploring age-gated content to allow more freedom for adult users."
  },
  {
    id: 3,
    cardType: 'standard',
    type: 'false',
    title: "Claim: New 'Tax' on all UPI transactions above ₹500 starting tomorrow.",
    verdict: "FALSE",
    summary: "The NPCI has NOT issued any such circular. This is a panic-inducing rumor based on a misinterpretation.",
    source: "NPCI Official",
    timeline: [
      { type: 'origin', platform: 'Telegram', label: "Fake Circular Image Uploaded", time: "Yesterday, 8:00 PM", icon: 'message' },
      { type: 'spread', platform: 'News', label: "Picked up by regional blogs", time: "+ 2 hours", icon: 'globe' },
      { type: 'verdict', platform: 'PIB FactCheck', label: "Official Denial Issued", time: "+ 6 hours", icon: 'shield' }
    ]
  },
  {
    id: 4,
    cardType: 'poll',
    type: 'verified',
    title: "Community Pulse: Deepfakes",
    verdict: "COMMUNITY",
    question: "Have you seen a deepfake video of a politician this week?",
    summary: "Deepfakes are rising. Our Agent has detected 14 unique AI-generated political videos in the last 24 hours.",
    votes: {
      yes: 68,
      no: 32
    },
    source: "TruthScroll Agent Data"
  },
  {
    id: 5,
    cardType: 'standard',
    type: 'verified',
    title: "Claim: NASA's James Webb Telescope detected life on K2-18b.",
    verdict: "UNPROVEN",
    summary: "NASA detected 'Dimethyl Sulfide' (DMS), which on Earth is only produced by life. However, the data is preliminary and requires verification.",
    source: "NASA.gov",
    timeline: [
      { type: 'origin', platform: 'NASA', label: "NASA publishes raw data", time: "Sep 12", icon: 'globe' },
      { type: 'spread', platform: 'YouTube', label: "Clickbait titles say 'Aliens Found'", time: "+ 1 day", icon: 'video' },
      { type: 'verdict', platform: 'Science Community', label: "Scientists urge caution", time: "+ 3 days", icon: 'shield' }
    ]
  }
];