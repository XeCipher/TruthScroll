# TruthScroll

> The truth, one scroll at a time.

An Agentic AI system that makes fact-checking as addictive as social media.
A submission for **MumbaiHacks 2025** in the **Misinformation** track.

---

### **Core Features**

- **The Truth Feed:** An immersive, full-screen vertical feed of verified facts.
- **Interactive Quizzes:** Engage with content through MCQs that test your understanding.
- **Investigation Desk:** A powerful search engine to get detailed "Truth Files" on any claim.
- **Community Intelligence:** Submit new claims and contribute your own evidence to any fact-check.
- **Community Polls:** Participate in polls to help our AI assess a claim's real-world impact.

### **How It Works**

1.  **Scan:** Our AI agent monitors the Reddit API and RSS feeds for viral claims.
2.  **Analyze:** The Gemini API verifies facts, assesses community-submitted evidence, and generates structured content.
3.  **Store:** Verified information is saved to Firebase Firestore.
4.  **Present:** The Flutter app delivers the content in an interactive, scrollable feed.

### **Technology Stack**

- **Frontend:** Flutter & Dart
- **Backend:** Firebase (Firestore, Cloud Functions)
- **AI Core:** Google Gemini API
- **Data Sources:** Reddit API, RSS Feeds

### **Builders**

- Chaitanya Patil
- Jay Dhamankar
- Kashyap Patil
- Anuj Harad
