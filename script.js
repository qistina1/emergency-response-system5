// ========================
// Translation System
// ========================
const translations = {
    en: {
        title: "🚨 GuardianPulse",
        profileTitle: "Your Emergency Profile",
        namePlaceholder: "Full Name*",
        bloodTypePlaceholder: "Select Blood Type*",
        allergiesPlaceholder: "Allergies",
        conditionsPlaceholder: "Medical Conditions",
        contactPlaceholder: "Emergency Contact*",
        saveBtn: "Save Profile",
        servicesTitle: "Emergency Services",
        voiceText: "Voice Command",
        policeText: "Police",
        ambulanceText: "Ambulance",
        fireText: "Fire Department",
        emergencyText: "EMERGENCY BUTTON",
        qrTitle: "Emergency QR Code",
        qrHelp: "Print and stick on your phone/wallet",
        voicePrompt: "Say 'Help', 'Ambulance', or 'Police'",
        savedSuccess: "Profile saved successfully!",
        policeAlert: "Police alerted with your location!",
        ambulanceAlert: "Ambulance alerted with your location!",
        fireAlert: "Fire Department alerted!",
        generalAlert: "Emergency services alerted!",
        shakeStatus: "Shake detection: ON (shake phone to test)",
        voiceListening: "Listening... Say a command",
        voiceNotSupported: "Voice commands not supported in your browser"
    },
    zh: {
        title: "🚨 守护脉冲",
        profileTitle: "您的紧急资料",
        namePlaceholder: "全名*",
        bloodTypePlaceholder: "选择血型*",
        allergiesPlaceholder: "过敏",
        conditionsPlaceholder: "健康状况",
        contactPlaceholder: "紧急联系人*",
        saveBtn: "保存资料",
        servicesTitle: "紧急服务",
        voiceText: "语音指令",
        policeText: "警察",
        ambulanceText: "救护车",
        fireText: "消防部门",
        emergencyText: "紧急按钮",
        qrTitle: "紧急二维码",
        qrHelp: "打印并贴在手机/钱包上",
        voicePrompt: "说'帮助'、'救护车'或'警察'",
        savedSuccess: "资料保存成功！",
        policeAlert: "已通知警察并提供您的位置！",
        ambulanceAlert: "已通知救护车并提供您的位置！",
        fireAlert: "已通知消防部门！",
        generalAlert: "已通知紧急服务！",
        shakeStatus: "摇晃检测：开启（摇晃手机测试）",
        voiceListening: "聆听中...请说出指令",
        voiceNotSupported: "您的浏览器不支持语音指令"
    },
    ms: {
        title: "🚨 GuardianPulse",
        profileTitle: "Profil Kecemasan Anda",
        namePlaceholder: "Nama Penuh*",
        bloodTypePlaceholder: "Pilih Jenis Darah*",
        allergiesPlaceholder: "Alahan",
        conditionsPlaceholder: "Masalah Kesihatan",
        contactPlaceholder: "Kontak Kecemasan*",
        saveBtn: "Simpan Profil",
        servicesTitle: "Perkhidmatan Kecemasan",
        voiceText: "Arahan Suara",
        policeText: "Polis",
        ambulanceText: "Ambulans",
        fireText: "Bomba",
        emergencyText: "BUTANG KECEMASAN",
        qrTitle: "Kod QR Kecemasan",
        qrHelp: "Cetak dan letak pada telefon/dompet",
        voicePrompt: "Kata 'Tolong', 'Ambulans' atau 'Polis'",
        savedSuccess: "Profil berjaya disimpan!",
        policeAlert: "Polis dihubungi dengan lokasi anda!",
        ambulanceAlert: "Ambulans dihubungi dengan lokasi anda!",
        fireAlert: "Bomba dihubungi!",
        generalAlert: "Perkhidmatan kecemasan dihubungi!",
        shakeStatus: "Pengesanan goncangan: AKTIF (goncang telefon untuk uji)",
        voiceListening: "Mendengar... Sila beri arahan",
        voiceNotSupported: "Arahan suara tidak disokong oleh penyemak imbas anda"
    }
};

// ========================
// Voice Command System
// ========================
const voiceCommands = {
    en: {
        help: ["help", "emergency"],
        police: ["police"],
        ambulance: ["ambulance", "medical"],
        fire: ["fire", "fire department"]
    },
    zh: {
        help: ["帮助", "救命"],
        police: ["警察"],
        ambulance: ["救护车"],
        fire: ["消防", "火灾"]
    },
    ms: {
        help: ["tolong", "kecemasan"],
        police: ["polis"],
        ambulance: ["ambulans"],
        fire: ["bomba", "kebakaran"]
    }
};

// ========================
// Emergency Numbers Database
// ========================
const emergencyNumbers = {
    police: { 
        us: '911', uk: '999', eu: '112', 
        india: '100', china: '110', malaysia: '999'
    },
    ambulance: { 
        us: '911', uk: '999', eu: '112', 
        india: '108', china: '120', malaysia: '999'
    },
    fire: { 
        us: '911', uk: '999', eu: '112', 
        india: '101', china: '119', malaysia: '994'
    }
};

// ========================
// Core Application
// ========================
class EmergencySystem {
    constructor() {
        this.currentLanguage = 'en';
        this.recognition = null;
        this.initElements();
        this.initEventListeners();
        this.initVoiceRecognition();
        this.initShakeDetection();
        this.loadProfile();
    }

    initElements() {
        this.elements = {
            languageSelect: document.getElementById('languageSelect'),
            title: document.getElementById('title'),
            profileTitle: document.getElementById('profileTitle'),
            name: document.getElementById('name'),
            bloodType: document.getElementById('bloodType'),
            allergies: document.getElementById('allergies'),
            conditions: document.getElementById('conditions'),
            emergencyContact: document.getElementById('emergencyContact'),
            saveBtn: document.getElementById('saveBtn'),
            servicesTitle: document.getElementById('servicesTitle'),
            voiceText: document.getElementById('voiceText'),
            policeText: document.getElementById('policeText'),
            ambulanceText: document.getElementById('ambulanceText'),
            fireText: document.getElementById('fireText'),
            emergencyText: document.getElementById('emergencyText'),
            qrTitle: document.getElementById('qrTitle'),
            qrHelp: document.getElementById('qrHelp'),
            voiceStatus: document.getElementById('voiceStatus'),
            profileStatus: document.getElementById('profileStatus'),
            alertStatus: document.getElementById('alertStatus'),
            motionStatus: document.getElementById('motionStatus'),
            voiceBtn: document.getElementById('voiceBtn'),
            policeBtn: document.getElementById('policeBtn'),
            ambulanceBtn: document.getElementById('ambulanceBtn'),
            fireBtn: document.getElementById('fireBtn'),
            manualBtn: document.getElementById('manualBtn'),
            qrcode: document.getElementById('qrcode'),
            emergencyForm: document.getElementById('emergencyForm')
        };
    }

    initEventListeners() {
        this.elements.languageSelect.addEventListener('change', () => this.changeLanguage());
        this.elements.emergencyForm.addEventListener('submit', (e) => this.saveProfile(e));
        this.elements.voiceBtn.addEventListener('click', () => this.startVoiceCommand());
        this.elements.policeBtn.addEventListener('click', () => this.triggerEmergency('police'));
        this.elements.ambulanceBtn.addEventListener('click', () => this.triggerEmergency('ambulance'));
        this.elements.fireBtn.addEventListener('click', () => this.triggerEmergency('fire'));
        this.elements.manualBtn.addEventListener('click', () => this.triggerEmergency('general'));
    }

    // Language System
    changeLanguage() {
        this.currentLanguage = this.elements.languageSelect.value;
        this.updateUIText();
    }

    updateUIText() {
        const lang = translations[this.currentLanguage];
        Object.keys(lang).forEach(key => {
            const element = this.elements[key];
            if (element) {
                if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                    element.placeholder = lang[key];
                } else {
                    element.textContent = lang[key];
                }
            }
        });
    }

    // Voice Command System
    initVoiceRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.elements.voiceStatus.textContent = translations[this.currentLanguage].voiceNotSupported;
            return;
        }

        this.recognition = new SpeechRecognition();
        this.updateRecognitionLanguage();
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = () => {
            this.elements.voiceStatus.textContent = translations[this.currentLanguage].voiceListening;
        };

        this.recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript.toLowerCase();
            const commands = voiceCommands[this.currentLanguage];
            
            if (commands.help.some(cmd => speechResult.includes(cmd))) {
                this.triggerEmergency('general');
            } 
            else if (commands.police.some(cmd => speechResult.includes(cmd))) {
                this.triggerEmergency('police');
            }
            else if (commands.ambulance.some(cmd => speechResult.includes(cmd))) {
                this.triggerEmergency('ambulance');
            }
            else if (commands.fire.some(cmd => speechResult.includes(cmd))) {
                this.triggerEmergency('fire');
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Voice recognition error', event.error);
        };

        this.recognition.onend = () => {
            setTimeout(() => {
                this.elements.voiceStatus.textContent = translations[this.currentLanguage].voicePrompt;
            }, 2000);
        };
    }

    updateRecognitionLanguage() {
        if (!this.recognition) return;
        this.recognition.lang = this.currentLanguage === 'en' ? 'en-US' : 
                              this.currentLanguage === 'zh' ? 'zh-CN' : 'ms-MY';
    }

    startVoiceCommand() {
        if (this.recognition) {
            this.updateRecognitionLanguage();
            this.recognition.start();
        }
    }

    // Emergency Functions
    getEmergencyNumber(service, country) {
        return emergencyNumbers[service][country] || emergencyNumbers[service]['us'];
    }

    triggerEmergency(type) {
        const country = navigator.language.split('-')[1]?.toLowerCase() || 'us';
        const profile = JSON.parse(localStorage.getItem('emergencyProfile')) || {};
        const lang = translations[this.currentLanguage];
        
        let number, alertMessage;
        switch(type) {
            case 'police':
                number = this.getEmergencyNumber('police', country);
                alertMessage = lang.policeAlert;
                break;
            case 'ambulance':
                number = this.getEmergencyNumber('ambulance', country);
                alertMessage = lang.ambulanceAlert;
                break;
            case 'fire':
                number = this.getEmergencyNumber('fire', country);
                alertMessage = lang.fireAlert;
                break;
            default:
                number = this.getEmergencyNumber('police', country);
                alertMessage = lang.generalAlert;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const location = {
                    lat: position.coords.latitude.toFixed(6),
                    lng: position.coords.longitude.toFixed(6)
                };
                
                // Call emergency number
                window.open(`tel:${number}`);
                
                // Notify emergency contact
                if (profile.contact) {
                    const message = `${type.toUpperCase()} ALERT for ${profile.name || 'You'}! Location: ${location.lat},${location.lng}`;
                    window.open(`sms:${profile.contact}?body=${encodeURIComponent(message)}`);
                }
                
                this.showStatus(this.elements.alertStatus, alertMessage, 'success');
            }, () => {
                // Location blocked
                window.open(`tel:${number}`);
                this.showStatus(this.elements.alertStatus, alertMessage, 'error');
            });
        } else {
            window.open(`tel:${number}`);
            this.showStatus(this.elements.alertStatus, alertMessage, 'success');
        }
    }

    // Profile Management
    saveProfile(e) {
        e.preventDefault();
        
        const profile = {
            name: this.elements.name.value,
            bloodType: this.elements.bloodType.value,
            allergies: this.elements.allergies.value || 'None',
            conditions: this.elements.conditions.value || 'None',
            contact: this.elements.emergencyContact.value,
            lastUpdated: new Date().toLocaleString()
        };
        
        localStorage.setItem('emergencyProfile', JSON.stringify(profile));
        this.showStatus(this.elements.profileStatus, translations[this.currentLanguage].savedSuccess, 'success');
        this.generateQRCode();
    }

    loadProfile() {
        if (localStorage.getItem('emergencyProfile')) {
            const profile = JSON.parse(localStorage.getItem('emergencyProfile'));
            this.elements.name.value = profile.name || '';
            this.elements.bloodType.value = profile.bloodType || '';
            this.elements.allergies.value = profile.allergies || '';
            this.elements.conditions.value = profile.conditions || '';
            this.elements.emergencyContact.value = profile.contact || '';
            this.generateQRCode();
        }
    }

    generateQRCode() {
        const profile = JSON.parse(localStorage.getItem('emergencyProfile'));
        if (!profile) return;
        
        this.elements.qrcode.innerHTML = '';
        const qrText = `EMERGENCY CONTACT\n\nName: ${profile.name}\nBlood: ${profile.bloodType}\nAllergies: ${profile.allergies}\nConditions: ${profile.conditions}\nContact: ${profile.contact}\n\nLast Updated: ${profile.lastUpdated}`;
        
        new QRCode(this.elements.qrcode, {
            text: qrText,
            width: 200,
            height: 200,
            colorDark: "#e74c3c",
            colorLight: "#ffffff"
        });
    }

    // Shake Detection
    initShakeDetection() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', this.handleShake.bind(this));
            this.elements.motionStatus.textContent = translations[this.currentLanguage].shakeStatus;
        }
    }

    handleShake(event) {
        const acceleration = event.accelerationIncludingGravity;
        const force = Math.sqrt(acceleration.x**2 + acceleration.y**2 + acceleration.z**2);
        
        if (force > 15) {
            this.triggerEmergency('general');
            window.removeEventListener('devicemotion', this.handleShake);
            setTimeout(() => window.addEventListener('devicemotion', this.handleShake.bind(this)), 5000);
        }
    }

    // Helper Functions
    showStatus(element, message, type) {
        element.textContent = message;
        element.className = `status ${type}`;
        element.classList.remove('hidden');
        setTimeout(() => element.classList.add('hidden'), 5000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new EmergencySystem();
    
    // Set initial language based on browser
    const browserLang = navigator.language.split('-')[0];
    if (['zh', 'ms'].includes(browserLang)) {
        app.elements.languageSelect.value = browserLang;
        app.changeLanguage();
    }
});