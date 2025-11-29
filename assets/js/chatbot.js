class SchoolChatbot {
  constructor() {
    this.chatToggle = document.getElementById('chatbot-toggle');
    this.chatWindow = document.getElementById('chatbot-window');
    this.chatClose = document.getElementById('chatbot-close');
    this.chatInput = document.getElementById('chatbot-input');
    this.chatSend = document.getElementById('chatbot-send');
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.typingIndicator = null;
    this.schoolData = {
      name: "Tribhuwan Aadarsha Model Secondary School",
      location: "Putalibazar-1, Syangja, Nepal",
      phone: "+977-74-550-123",
      email: "info@tribhuwan-school.edu.np",
      admissions_email: "admissions@tribhuwan-school.edu.np",
      hours: "Mon-Fri: 10 AM - 5 PM, Sat: 10 AM - 2 PM",
      principal: "Prem Narayan Paudel",
      vice_principal: "Bishnu Pokhrel",
      programs: ["School Level (3 years)", "+2 Science (2 years)", "+2 Management (2 years)"],
      fees: { "School Level": "NPR 45,000/year", "+2 Science": "NPR 55,000/year", "+2 Management": "NPR 50,000/year" },
      facilities: ["Science labs", "Computer lab", "Digital library", "Sports complex", "Multimedia classrooms", "Medical clinic"],
      scholarships: ["Merit-based (50%)", "Need-based aid", "Sports grants", "Sibling discount", "Early registration (10%)"]
    };
    this.init();
  }

  init() {
    if (!this.chatToggle) return;
    this.chatToggle.addEventListener('click', () => this.toggleChat());
    this.chatClose.addEventListener('click', () => this.closeChat());
    this.chatSend.addEventListener('click', () => this.sendMessage());
    this.chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.sendMessage(); });
    // Show welcome message on first open
    const welcomed = sessionStorage.getItem('chatbot-welcomed');
    if (!welcomed) {
      setTimeout(() => this.addMessage("👋 Hi! I'm the AI Tutor for Tribhuwan School. Ask me anything about admissions, academics, fees, events, or how I can help you! 📚", 'bot'), 300);
      sessionStorage.setItem('chatbot-welcomed', 'true');
    }
  }

  toggleChat() { this.chatWindow.style.display = this.chatWindow.style.display === 'none' ? 'flex' : 'none'; }
  closeChat() { this.chatWindow.style.display = 'none'; }

  sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;
    this.addMessage(message, 'user');
    this.chatInput.value = '';
    this.showTyping();
    setTimeout(() => { 
      this.removeTyping();
      const response = this.getBotResponse(message); 
      this.addMessage(response, 'bot'); 
    }, 800 + Math.random() * 1200);
  }

  showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<p><span></span><span></span><span></span></p>';
    this.messagesContainer.appendChild(typingDiv);
    this.typingIndicator = typingDiv;
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  removeTyping() {
    if (this.typingIndicator) {
      this.typingIndicator.remove();
      this.typingIndicator = null;
    }
  }

  addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
    this.messagesContainer.appendChild(msgDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  getBotResponse(input) {
    const lower = input.toLowerCase().trim();
    
    // Admissions & Applications
    if (this.matchesKeywords(lower, ['admission', 'apply', 'how to apply', 'application', 'enroll', 'register', 'join'])) {
      if (lower.includes('deadline') || lower.includes('when')) {
        return `📅 Our application deadline is November 30th annually. We accept applications for School Level and +2 programs. Entrance exams and interviews are required for +2 programs. Contact: ${this.schoolData.admissions_email} or call ${this.schoolData.phone} for more details!`;
      }
      return `📝 To apply to ${this.schoolData.name}:\n\n✅ Visit our Admissions page\n✅ Entrance exam required for +2 programs\n✅ Interview stage after exam\n✅ Minimum marks: +2 Science (60%), +2 Management (55%)\n\nFor assistance: ${this.schoolData.admissions_email} or ${this.schoolData.phone}`;
    }

    // Programs & Academics
    if (this.matchesKeywords(lower, ['program', 'academic', 'course', 'subject', 'study', 'class', 'stream', 'science', 'management'])) {
      if (lower.includes('science')) {
        return `🔬 **+2 Science Program** (2 years)\nSubjects: Physics, Chemistry, Biology, Mathematics, English, Nepali\nFees: ${this.schoolData.fees['+2 Science']}\n\nPerfect for students interested in engineering, medical, or science careers. Contact us for detailed curriculum!`;
      }
      if (lower.includes('management')) {
        return `💼 **+2 Management Program** (2 years)\nSubjects: Accountancy, Economics, Business Studies, Mathematics, English, Nepali\nFees: ${this.schoolData.fees['+2 Management']}\n\nIdeal for students pursuing commerce, business, or finance fields.`;
      }
      return `📚 **Our Programs:**\n\n1️⃣ School Level (3 years) - ${this.schoolData.fees['School Level']}\n2️⃣ +2 Science (2 years) - ${this.schoolData.fees['+2 Science']}\n3️⃣ +2 Management (2 years) - ${this.schoolData.fees['+2 Management']}\n\nEach program combines strong academics with practical skills. Ask about a specific program!`;
    }

    // Fees & Scholarships
    if (this.matchesKeywords(lower, ['fee', 'cost', 'tuition', 'price', 'scholarship', 'financial aid', 'discount', 'afford', 'payment', 'installment'])) {
      if (lower.includes('scholarship') || lower.includes('aid') || lower.includes('discount')) {
        return `🎓 **Scholarship Opportunities:**\n\n🏆 Merit-based (50% discount)\n💪 Sports excellence grants\n👨‍👩‍👧‍👦 Sibling discounts\n📝 Early registration discount (10%)\n💰 Need-based financial aid available\n\nContact: ${this.schoolData.admissions_email} for scholarship applications!`;
      }
      return `💰 **Fee Structure:**\n\n• School Level: ${this.schoolData.fees['School Level']}\n• +2 Science: ${this.schoolData.fees['+2 Science']}\n• +2 Management: ${this.schoolData.fees['+2 Management']}\n\nPayment plans available. Scholarships & financial aid for eligible students. Contact us for payment options!`;
    }

    // Contact & Location
    if (this.matchesKeywords(lower, ['contact', 'phone', 'email', 'address', 'location', 'where', 'how to reach', 'visit'])) {
      if (lower.includes('hour') || lower.includes('time') || lower.includes('open')) {
        return `🕐 **Office Hours:**\n\nMonday - Friday: 10 AM - 5 PM\nSaturday: 10 AM - 2 PM\nSunday: Closed\n\nPhone: ${this.schoolData.phone}\nEmail: ${this.schoolData.email}`;
      }
      return `📍 **Contact Information:**\n\n🏫 ${this.schoolData.name}\n📌 ${this.schoolData.location}\n📞 ${this.schoolData.phone}\n📧 ${this.schoolData.email}\n🕐 ${this.schoolData.hours}\n\nVisit us or call for campus tours!`;
    }

    // Facilities
    if (this.matchesKeywords(lower, ['facility', 'facilities', 'lab', 'laboratory', 'campus', 'building', 'ground', 'infrastructure', 'amenities'])) {
      return `🏫 **Our Modern Facilities:**\n\n🔬 ${this.schoolData.facilities[0]} - Advanced equipment\n💻 ${this.schoolData.facilities[1]} with high-speed internet\n📖 ${this.schoolData.facilities[2]}\n🏅 ${this.schoolData.facilities[4]}\n⚽ ${this.schoolData.facilities[3]}\n🏥 ${this.schoolData.facilities[5]}\n\nWe provide a complete learning environment!`;
    }

    // Staff & Leadership
    if (this.matchesKeywords(lower, ['teacher', 'faculty', 'staff', 'principal', 'leader', 'leadership'])) {
      return `👨‍🏫 **Our Leadership:**\n\n🎓 **Principal:** ${this.schoolData.principal}\n   • 25+ years experience\n   • M.Ed qualification\n\n🎓 **Vice-Principal:** ${this.schoolData.vice_principal}\n   • 18+ years experience\n   • Oversees curriculum development\n\nOur experienced faculty is dedicated to student success!`;
    }

    // Events & Activities
    if (this.matchesKeywords(lower, ['event', 'activity', 'program', 'sports', 'festival', 'competition', 'club', 'extracurricular'])) {
      return `📅 **Events & Activities:**\n\nOur school regularly organizes:\n\n🎭 Cultural programs & competitions\n⚽ Inter-school sports tournaments\n🎨 Art & talent shows\n🏆 Academic competitions\n📚 Educational workshops\n🌍 Community service activities\n\nCheck our announcements section for upcoming events!`;
    }

    // General Questions
    if (this.matchesKeywords(lower, ['hello', 'hi', 'hey', 'greetings', 'how are you'])) {
      return `👋 Hello! I'm the AI Tutor for ${this.schoolData.name}. I'm here to help you with any questions about our school! Feel free to ask about admissions, academics, fees, facilities, or anything else. How can I assist you today? 😊`;
    }

    if (this.matchesKeywords(lower, ['thank', 'thanks', 'thank you', 'appreciate', 'grateful'])) {
      return `You're welcome! 😊 If you have any more questions about our school, feel free to ask. I'm always here to help!`;
    }

    if (this.matchesKeywords(lower, ['help', 'assist', 'question', 'what can you do', 'capabilities'])) {
      return `🤖 **I can help you with:**\n\n✅ Admissions & Applications\n✅ Academic Programs & Courses\n✅ Fee Structure & Scholarships\n✅ Campus Facilities\n✅ Contact Information\n✅ School Events & Activities\n✅ Staff & Leadership\n✅ General School Information\n\nJust ask me anything about Tribhuwan School!`;
    }

    // Fallback with intelligent suggestion
    return `😊 That's a great question! While I don't have specific information about that, I can help you with:\n\n📝 Admissions process\n📚 Academic programs\n💰 Fees & scholarships\n🏫 Facilities\n📞 Contact information\n📅 Events & activities\n\nOr you can reach us directly at ${this.schoolData.phone} or ${this.schoolData.email}. Our team will be happy to assist!`;
  }

  matchesKeywords(input, keywords) {
    return keywords.some(keyword => input.includes(keyword));
  }

  escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

document.addEventListener('DOMContentLoaded', () => { try { new SchoolChatbot(); } catch (e) { /* pages without markup will safely ignore */ } });
