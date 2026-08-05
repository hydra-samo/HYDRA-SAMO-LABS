export type Lang = 'en' | 'fr' | 'ar';
export type Dict = Record<string, string>;

/**
 * UI chrome strings. `en` must stay byte-identical to the copy currently
 * rendered on the site — it is the source of truth. `t(key, vars?)` resolves
 * {placeholder} tokens against `vars`.
 */
export const UI: Record<Lang, Dict> = {
  en: {
    'nav.work': 'Work',
    'nav.voice': 'Voice',
    'nav.process': 'Process',
    'nav.origin': 'Origin',
    'btn.startProject': 'Start Project',
    'btn.startProjectShort': 'Start a Project',
    'btn.watchMasterShowreel': 'Watch Master Showreel',
    'btn.inspect': 'Inspect',
    'btn.requestVoiceAudition': 'Request Custom Voice Audition',
    'btn.submitAnotherBrief': 'Submit Another Brief',
    'btn.sendBrief': 'Send Project Brief',
    'btn.transmitting': 'Transmitting Brief...',
    'btn.formNotConfigured': 'Contact Form Not Configured',
    'btn.requestSimilar': 'Request Similar Production',
    'theme.interfaceTheme': 'Interface Theme',
    'theme.darkMode': 'Dark Mode',
    'theme.lightMode': 'Light Mode',
    'lang.label': 'Language',
    'lang.selectAria': 'Select display language',
    'hero.headingVideo': 'Video.',
    'hero.headingMotion': 'Motion.',
    'hero.headingVoice': 'Voice.',
    'hero.description':
      'is Hydra Samo. A unified creative force providing high-end video editing, 3D motion, and vocal narration without the friction of a traditional agency.',
    'process.eyebrow': 'UNIFIED METHODOLOGY',
    'process.how': 'HOW THE',
    'process.operates': 'HYDRA OPERATES',
    'process.intro':
      'Eliminating the friction of multiple agency departments. A single master creative engine managing footage pacing, graphic animations, and voice narration in tight synergy.',
    'process.phase': 'PHASE',
    'process.deliverable': 'DELIVERABLE',
    'process.comparisonEyebrow': 'WHY WORK DIRECTLY WITH HYDRA SAMO?',
    'process.narrativeTitle': 'MANY HEADS.',
    'process.narrativeTitleGrad': 'ONE UNIFIED VISION.',
    'process.fragmentedTitle': 'THE FRAGMENTED WORKFLOW',
    'process.unifiedTitle': 'THE UNIFIED VISION',
    'process.fragmentedDesc':
      'An agency splits your project across siloed departments — account managers, email chains, and slow internal handoffs that dilute intent.',
    'process.unifiedDesc':
      'One creator directs the video head, the motion head, and the voice head under a single will. Zero handoffs. No lost narrative intent.',
    'process.agency': 'TRADITIONAL AGENCY',
    'process.vs': 'VS',
    'process.hydraEngine': 'HYDRA SAMO',
    'process.metricHeader': 'Evaluation Metric',
    'process.agencyHeader': 'Traditional Agency',
    'process.hydraHeader': 'Hydra Samo Solo Engine',
    'about.eyebrow': 'ORIGIN & CREATIVE PHILOSOPHY',
    'about.headingOne': 'MANY HEADS.',
    'about.headingTwo': 'ONE ORIGIN.',
    'about.badgeName': 'BENDALI ISSAM EDDINE',
    'about.p1a': 'My name is',
    'about.p1b': ', known in the visual and broadcast industry as',
    'about.p1c': '.',
    'about.p2':
      'In ancient mythology, the Hydra was feared for its relentless multi-headed versatility. I channel that same intensity into my workflow. I am not a bloated agency with endless account managers; I am a single, highly specialized creative engine.',
    'about.p3':
      'I handle high-end video editing, kinetic motion graphics, and professional voice-over narration as a single unified discipline. This means zero hand-offs, no lost narrative intent, and agency-level speed with the direct clarity of a dedicated partner.',
    'about.adv1': 'No Agency Overhead',
    'about.adv2': 'Direct Founder Communication',
    'about.adv3': 'Precision Delivery Deadlines',
    'about.adv4': 'Integrated Video + Voice + Motion',
    'work.eyebrow': 'SELECTED HYDRA PRODUCTIONS',
    'work.selected': 'SELECTED',
    'work.works': 'WORKS',
    'work.cat.all': 'All Works',
    'work.cat.video': 'Video Editing',
    'work.cat.motion': 'Motion & 3D',
    'work.cat.direction': 'Full Direction',
    'work.client': 'CLIENT:',
    'work.caseStudy': 'CASE STUDY AVAILABLE',
    'work.inspect': 'Inspect',
    'work.streaming': 'STREAMING ASSETS...',
    'work.emptyTitle': 'Real Projects Loading',
    'work.emptyDesc':
      'Selected case studies are being prepared for the vault. Until then, the master showreel below gives you the raw pacing and rhythm.',
    'voice.eyebrow': 'THE VOCAL HEAD — BENDALI ISSAM EDDINE',
    'voice.headingProf': 'PROFESSIONAL',
    'voice.headingOver': 'VOICE-OVER',
    'voice.intro':
      'I provide the frequency to match the frame. From gritty cinematic trailer narration to sleek tech commercial delivery and intense character performance.',
    'voice.cat.all': 'All',
    'voice.cat.dramatic': 'Dramatic',
    'voice.cat.commercial': 'Commercial',
    'voice.cat.tech': 'Tech & AI',
    'voice.cat.gaming': 'Gaming & Character',
    'voice.unmute': 'Unmute preview',
    'voice.mute': 'Mute preview',
    'voice.scriptReader': 'Script Reader',
    'voice.nowPlaying': 'NOW PLAYING — SAMPLE',
    'voice.audioComingSoon':
      'AUDIO SAMPLE COMING SOON — read the script below in the meantime',
    'voice.scriptTranscript': 'NARRATION SCRIPT TRANSCRIPT',
    'voice.customTitle': 'Need a custom voice test for your script?',
    'voice.customDesc': 'I provide free 15-second sample reads for serious inquiries.',
    'voice.audioNotUploaded': 'Audio sample not uploaded yet',
    'panel.headActive': 'HEAD 0{n} ACTIVE',
    'panel.reeval': 'DISCIPLINE REEVALUATION',
    'panel.inspectReel': 'Inspect {head} Reel',
    'panel.tapToCycle': 'HEAD 0{n} // TAP TO CYCLE',
    'modal.reelTitle': 'HYDRA SAMO // MASTER REEL 2025',
    'modal.reelClient': 'MULTI-DISCIPLINE COMPILATION',
    'modal.video': 'Video',
    'modal.grading': 'Color Grade',
    'modal.raw': 'RAW FOOTAGE',
    'modal.grade': 'HYDRA COLOR GRADE',
    'modal.brief': 'CLIENT BRIEF & PRODUCTION DIRECTION',
    'modal.software': 'SOFTWARE STACK',
    'modal.deliverables': 'DELIVERABLES',
    'contact.eyebrowModal': 'PROJECT BRIEF CONSTRUCTOR',
    'contact.headingLet': 'LET\'S BUILD',
    'contact.headingTogether': 'TOGETHER',
    'contact.successTitle': 'BRIEF RECEIVED // HYDRA DISPATCHED',
    'contact.successPrefix': 'Thanks,',
    'contact.successBody':
      '— your brief has been dispatched. Expect a direct reply with a proposal, turnaround, and pricing within 24 hours.',
    'contact.labelServices': 'SELECT REQUIRED SERVICES',
    'contact.service.video': 'High-End Video Editing',
    'contact.service.motion': 'Motion & 3D VFX',
    'contact.service.voice': 'Voice-Over Narration',
    'contact.service.full': 'Full Hydra Package',
    'contact.labelName': 'Your Name *',
    'contact.labelEmail': 'Your Email *',
    'contact.labelCompany': 'Company / Brand',
    'contact.labelBudget': 'Estimated Budget Range',
    'contact.labelTimeline': 'Target Timeline',
    'contact.labelProject': 'Project Brief / Goals',
    'contact.budget.under1k': 'Under $1,000',
    'contact.budget.1to3': '$1,000 - $3,000',
    'contact.budget.3to7': '$3,000 - $7,000',
    'contact.budget.7plus': '$7,000+ (Extended Engagement)',
    'contact.timeline.asap': 'ASAP (< 7 Days)',
    'contact.timeline.1to2': '1 - 2 Weeks',
    'contact.timeline.3to4': '3 - 4 Weeks',
    'contact.timeline.flexible': 'Flexible / Planning Phase',
    'contact.phName': 'e.g. Alex Mercer',
    'contact.phEmail': 'alex@brand.com',
    'contact.phCompany': 'Optional',
    'contact.phProject':
      'Tell me about your footage, visual style goals, voice requirements, or target launch date...',
    'contact.errorRequired': 'Please fill in your name and email so I know who to reply to.',
    'contact.errorNotConfigured': 'The contact form endpoint is not configured yet. Please try again soon.',
    'contact.errorFailed': 'Something went wrong sending your brief. Please try again.',
    'contact.noticePre':
      'Brief submissions are not configured yet — set',
    'contact.noticePost': 'in your .env (see .env.example) to start receiving briefs.',
    'splash.status1': 'ACCESSING HYDRA\'S SAMO...',
    'splash.status2': 'UNLOCKING HYDRA\'S SAMO...',
    'splash.status3': 'LOADING HD SHOWCASES & REELS...',
    'splash.status4': 'GRANTING ACCESS...',
    'splash.status5': 'SAMO UNLOCKED',
    'splash.restricted': 'RESTRICTED CREATIVE SAMO',
    'splash.welcomeTo': 'WELCOME TO',
    'splash.title': 'HYDRA\'S',
    'splash.titleGrad': 'SAMO',
    'splash.subtitle': 'BENDALI ISSAM EDDINE • CREATIVE ARCHITECTURE',
    'splash.service.video': 'VIDEO EDITING',
    'splash.service.motion': 'MOTION DESIGN',
    'splash.service.voice': 'VOICE OVER',
    'splash.rights': '© {year} HYDRA SAMO • ALL RIGHTS RESERVED',
    'splash.skip': 'Tap anywhere to skip',
    'app.redirecting': 'REDIRECTING // HYDRA SAMO',
    'pre.eyebrow': 'WELCOME TO HYDRA SAMO',
    'pre.hint': 'SELECT YOUR LANGUAGE & THEME TO CONTINUE',
    'pre.enter': 'ENTER HYDRA SAMO',
  },

  fr: {
    'nav.work': 'Travaux',
    'nav.voice': 'Voix',
    'nav.process': 'Processus',
    'nav.origin': 'Origine',
    'btn.startProject': 'Lancer un Projet',
    'btn.startProjectShort': 'Lancer un Projet',
    'btn.watchMasterShowreel': 'Voir le Master Showreel',
    'btn.inspect': 'Inspecter',
    'btn.requestVoiceAudition': 'Demander une Audition Vocale',
    'btn.submitAnotherBrief': 'Envoyer un Autre Brief',
    'btn.sendBrief': 'Envoyer le Brief',
    'btn.transmitting': 'Transmission du brief...',
    'btn.formNotConfigured': 'Formulaire non configuré',
    'btn.requestSimilar': 'Demander une Production Similaire',
    'theme.interfaceTheme': 'Thème de l\'interface',
    'theme.darkMode': 'Mode Sombre',
    'theme.lightMode': 'Mode Clair',
    'lang.label': 'Langue',
    'lang.selectAria': 'Choisir la langue d\'affichage',
    'hero.headingVideo': 'Vidéo.',
    'hero.headingMotion': 'Motion.',
    'hero.headingVoice': 'Voix.',
    'hero.description':
      'est Hydra Samo. Une force créative unifiée offrant montage vidéo haut de gamme, motion 3D et narration vocale, sans les frictions d\'une agence traditionnelle.',
    'process.eyebrow': 'MÉTHODOLOGIE UNIFIÉE',
    'process.how': 'COMMENT',
    'process.operates': 'HYDRA OPÈRE',
    'process.intro':
      'Éliminer la friction des multiples départements d\'agence. Un seul moteur créatif maître qui gère le rythme des rushes, les animations graphiques et la narration vocale en synergie complète.',
    'process.phase': 'PHASE',
    'process.deliverable': 'LIVRABLE',
    'process.comparisonEyebrow': 'POURQUOI TRAVAILLER DIRECTEMENT AVEC HYDRA SAMO ?',
    'process.narrativeTitle': 'PLUSIEURS TÊTES.',
    'process.narrativeTitleGrad': 'UNE SEULE VISION.',
    'process.fragmentedTitle': 'LE FLUX DE TRAVAIL FRAGMENTÉ',
    'process.unifiedTitle': 'LA VISION UNIFIÉE',
    'process.fragmentedDesc':
      'Une agence éclate votre projet entre des services cloisonnés — chefs de compte, chaînes d\'emails et transferts internes lents qui diluent votre intention.',
    'process.unifiedDesc':
      'Un seul créateur orchestre la tête vidéo, la tête motion et la tête vocale sous une même volonté. Zéro transfert. Aucune perte de sens.',
    'process.agency': 'AGENCE TRADITIONNELLE',
    'process.vs': 'VS',
    'process.hydraEngine': 'HYDRA SAMO',
    'process.metricHeader': 'Critère d\'évaluation',
    'process.agencyHeader': 'Agence traditionnelle',
    'process.hydraHeader': 'Moteur solo Hydra Samo',
    'about.eyebrow': 'ORIGINE & PHILOSOPHIE CRÉATIVE',
    'about.headingOne': 'PLUSIEURS TÊTES.',
    'about.headingTwo': 'UNE SEULE ORIGINE.',
    'about.badgeName': 'BENDALI ISSAM EDDINE',
    'about.p1a': 'Je suis',
    'about.p1b': ', connu dans l\'industrie de l\'image et de la diffusion sous le nom de',
    'about.p1c': '.',
    'about.p2':
      'Dans la mythologie, l\'Hydre inspirait la crainte par sa polyvalence à plusieurs têtes, infatigable. Je canalise cette même intensité dans mon travail. Je ne suis pas une agence gonflée par des chefs de compte à l\'infini : je suis un moteur créatif unique, hautement spécialisé.',
    'about.p3':
      'Je maîtrise le montage vidéo haut de gamme, le motion design cinétique et la narration vocale professionnelle comme une seule discipline unifiée. Cela signifie zéro perte de main, aucun fil narratif perdu, et une vitesse d\'agence avec la clarté directe d\'un partenaire dédié.',
    'about.adv1': 'Sans Frais d\'Agence',
    'about.adv2': 'Communication Directe avec le Fondateur',
    'about.adv3': 'Délais de Livraison Précis',
    'about.adv4': 'Vidéo + Voix + Motion Intégrés',
    'work.eyebrow': 'PRODUCTIONS HYDRA SÉLECTIONNÉES',
    'work.selected': 'TRAVAUX',
    'work.works': 'SÉLECTIONNÉS',
    'work.cat.all': 'Tous les Travaux',
    'work.cat.video': 'Montage Vidéo',
    'work.cat.motion': 'Motion & 3D',
    'work.cat.direction': 'Direction Complète',
    'work.client': 'CLIENT :',
    'work.caseStudy': 'ÉTUDE DE CAS DISPONIBLE',
    'work.inspect': 'Inspecter',
    'work.streaming': 'CHARGEMENT DES CONTENUS...',
    'work.emptyTitle': 'Études de cas en préparation',
    'work.emptyDesc':
      'Les études de cas sélectionnées sont en préparation pour le coffre. En attendant, le master showreel ci-dessous vous montre le rythme et le tempo bruts.',
    'voice.eyebrow': 'LA TÊTE VOCALE — BENDALI ISSAM EDDINE',
    'voice.headingProf': 'VOIX',
    'voice.headingOver': 'PROFESSIONNELLE',
    'voice.intro':
      'Je fournis la fréquence qui correspond à l\'image. De la narration cinématographique intense des bandes-annonces aux spots tech soignés et aux performances de personnages.',
    'voice.cat.all': 'Toutes',
    'voice.cat.dramatic': 'Dramatique',
    'voice.cat.commercial': 'Commercial',
    'voice.cat.tech': 'Tech & IA',
    'voice.cat.gaming': 'Gaming & Personnage',
    'voice.unmute': 'Réactiver le son',
    'voice.mute': 'Couper le son',
    'voice.scriptReader': 'Lecteur de Script',
    'voice.nowPlaying': 'EXTRAIT EN LECTURE —',
    'voice.audioComingSoon':
      'EXTRAIT AUDIO À VENIR — lisez le script ci-dessous en attendant',
    'voice.scriptTranscript': 'TRANSCRIPTION DU SCRIPT',
    'voice.customTitle': 'Besoin d\'un test vocal personnalisé pour votre script ?',
    'voice.customDesc': 'Je fournis des extraits gratuits de 15 secondes pour les demandes sérieuses.',
    'voice.audioNotUploaded': 'Extrait audio pas encore disponible',
    'panel.headActive': 'TÊTE 0{n} ACTIVE',
    'panel.reeval': 'RÉÉVALUATION DE LA DISCIPLINE',
    'panel.inspectReel': 'Voir la Démo {head}',
    'panel.tapToCycle': 'TÊTE 0{n} // TAPEZ POUR CHANGER',
    'modal.reelTitle': 'HYDRA SAMO // MASTER REEL 2025',
    'modal.reelClient': 'COMPILATION MULTI-DISCIPLINE',
    'modal.video': 'Vidéo',
    'modal.grading': 'Étalonnage',
    'modal.raw': 'RUSH ORIGINAL',
    'modal.grade': 'ÉTALONNAGE HYDRA',
    'modal.brief': 'BRIEF CLIENT & DIRECTION DE PRODUCTION',
    'modal.software': 'LOGICIELS',
    'modal.deliverables': 'LIVRABLES',
    'contact.eyebrowModal': 'CONSTRUCTEUR DE BRIEF',
    'contact.headingLet': 'CRÉONS',
    'contact.headingTogether': 'ENSEMBLE',
    'contact.successTitle': 'BRIEF REÇU // HYDRA ENVOYÉ',
    'contact.successPrefix': 'Merci,',
    'contact.successBody':
      '— votre brief a bien été envoyé. Attendez-vous à une réponse directe avec proposition, délais et tarifs sous 24 heures.',
    'contact.labelServices': 'SÉLECTIONNEZ LES SERVICES',
    'contact.service.video': 'Montage Vidéo Haut de Gamme',
    'contact.service.motion': 'Motion & 3D VFX',
    'contact.service.voice': 'Narration Vocale',
    'contact.service.full': 'Pack Hydra Complet',
    'contact.labelName': 'Votre Nom *',
    'contact.labelEmail': 'Votre Email *',
    'contact.labelCompany': 'Entreprise / Marque',
    'contact.labelBudget': 'Fourchette de Budget Estimée',
    'contact.labelTimeline': 'Délai Visé',
    'contact.labelProject': 'Brief / Objectifs du Projet',
    'contact.budget.under1k': 'Moins de 1 000 $',
    'contact.budget.1to3': '1 000 $ - 3 000 $',
    'contact.budget.3to7': '3 000 $ - 7 000 $',
    'contact.budget.7plus': '7 000 $+ (Mission étendue)',
    'contact.timeline.asap': 'Rapide (< 7 jours)',
    'contact.timeline.1to2': '1 - 2 semaines',
    'contact.timeline.3to4': '3 - 4 semaines',
    'contact.timeline.flexible': 'Flexible / Phase de planification',
    'contact.phName': 'ex. Alex Mercer',
    'contact.phEmail': 'alex@brand.com',
    'contact.phCompany': 'Optionnel',
    'contact.phProject':
      'Parlez-moi de vos rushes, de vos objectifs de style visuel, de vos besoins vocaux ou de votre date de lancement...',
    'contact.errorRequired': 'Veuillez renseigner votre nom et votre email pour que je sache à qui répondre.',
    'contact.errorNotConfigured': 'Le point d\'envoi du formulaire n\'est pas encore configuré. Veuillez réessayer bientôt.',
    'contact.errorFailed': 'Une erreur est survenue lors de l\'envoi de votre brief. Veuillez réessayer.',
    'contact.noticePre': 'L\'envoi des briefs n\'est pas encore configuré — définissez',
    'contact.noticePost': 'dans votre .env (voir .env.example) pour commencer à recevoir des briefs.',
    'splash.status1': 'ACCÈS À HYDRA SAMO...',
    'splash.status2': 'DÉVERROUILLAGE D\'HYDRA SAMO...',
    'splash.status3': 'CHARGEMENT DES SHOWCASE HD & DÉMOS...',
    'splash.status4': 'ACCÈS AUTORISÉ...',
    'splash.status5': 'HYDRA SAMO DÉVERROUILLÉ',
    'splash.restricted': 'ESPACE CRÉATIF RESTREINT',
    'splash.welcomeTo': 'BIENVENUE DANS',
    'splash.title': 'HYDRA',
    'splash.titleGrad': 'HYDRA',
    'splash.subtitle': 'BENDALI ISSAM EDDINE • ARCHITECTURE CRÉATIVE',
    'splash.service.video': 'MONTAGE VIDÉO',
    'splash.service.motion': 'MOTION DESIGN',
    'splash.service.voice': 'VOIX OFF',
    'splash.rights': '© {year} HYDRA SAMO • TOUS DROITS RÉSERVÉS',
    'splash.skip': 'Touchez n\'importe où pour passer',
    'app.redirecting': 'REDIRECTION // HYDRA SAMO',
    'pre.eyebrow': 'BIENVENUE DANS HYDRA SAMO',
    'pre.hint': 'CHOISISSEZ VOTRE LANGUE & THÈME POUR CONTINUER',
    'pre.enter': 'ENTRER DANS HYDRA SAMO',
  },

  ar: {
    'nav.work': 'الأعمال',
    'nav.voice': 'الصوت',
    'nav.process': 'المنهجية',
    'nav.origin': 'البداية',
    'btn.startProject': 'ابدأ مشروعك',
    'btn.startProjectShort': 'ابدأ مشروعك',
    'btn.watchMasterShowreel': 'شاهد العرض الرئيسي',
    'btn.inspect': 'استكشف',
    'btn.requestVoiceAudition': 'اطلب تجربة صوتية مخصصة',
    'btn.submitAnotherBrief': 'إرسال موجز آخر',
    'btn.sendBrief': 'إرسال الموجز',
    'btn.transmitting': 'جارٍ إرسال الموجز...',
    'btn.formNotConfigured': 'النموذج غير مُهيأ',
    'btn.requestSimilar': 'اطلب إنتاجاً مشابهاً',
    'theme.interfaceTheme': 'واجهة التصميم',
    'theme.darkMode': 'الوضع الداكن',
    'theme.lightMode': 'الوضع الفاتح',
    'lang.label': 'اللغة',
    'lang.selectAria': 'اختر لغة العرض',
    'hero.headingVideo': 'فيديو.',
    'hero.headingMotion': 'موشن.',
    'hero.headingVoice': 'صوت.',
    'hero.description':
      'هو هيدرا سامو. قوة إبداعية موحّدة تقدم مونتاج فيديو راقياً، وموشن ثلاثي الأبعاد، وسرداً صوتياً احترافياً دون تعقيدات الوكالات التقليدية.',
    'process.eyebrow': 'منهجية موحّدة',
    'process.how': 'كيف',
    'process.operates': 'يعمل هيدرا',
    'process.intro':
      'إزالة تعقيد أقسام الوكالات المتعددة. محرّك إبداعي رئيسي واحد يدير إيقاع اللقطات والرسوم المتحركة والسرد الصوتي بتناغم تام.',
    'process.phase': 'المرحلة',
    'process.deliverable': 'التسليم',
    'process.comparisonEyebrow': 'لماذا العمل مباشرة مع هيدرا سامو؟',
    'process.narrativeTitle': 'رؤوس متعددة.',
    'process.narrativeTitleGrad': 'رؤية موحّدة.',
    'process.fragmentedTitle': 'مسار العمل المجزّأ',
    'process.unifiedTitle': 'الرؤية الموحّدة',
    'process.fragmentedDesc':
      'الوكالة توزّع مشروعك بين أقسام منعزلة — مديرو حسابات وسلاسل بريد ومراحل نقل بطيئة تضعف نيّتك.',
    'process.unifiedDesc':
      'مبدع واحد يدير الرأس الفيديو والرأس الحركي والرأس الصوتي تحت إرادة واحدة. صفر انتقالات. بلا فقدان للمعنى.',
    'process.agency': 'وكالة تقليدية',
    'process.vs': 'مقابل',
    'process.hydraEngine': 'هيدرا سامو',
    'process.metricHeader': 'معيار التقييم',
    'process.agencyHeader': 'وكالة تقليدية',
    'process.hydraHeader': 'المحرّك الفردي هيدرا سامو',
    'about.eyebrow': 'الأصل والفلسفة الإبداعية',
    'about.headingOne': 'رؤوس متعددة.',
    'about.headingTwo': 'أصل واحد.',
    'about.badgeName': 'بن دالي عصام الدين',
    'about.p1a': 'اسمي',
    'about.p1b': '، المعروف في صناعة البصر والإذاعة باسم',
    'about.p1c': '.',
    'about.p2':
      'في الأساطير القديمة، كان الهيدرا يُخشى بسبب تعدد رؤوسه وقدرته اللا محدودة. أوظّف تلك الكثافة نفسها في أسلوب عملي. لستُ وكالة متضخمة بالمديرين؛ أنا محرّك إبداعي واحد شديد التخصص.',
    'about.p3':
      'أتولى المونتاج الفيديو الراقي، والموشن جرافيك الحركي، والسرد الصوتي الاحترافي كتخصص واحد موحّد. يعني ذلك صفر تسليمات متكررة، ولا ضياع للرؤية الإبداعية، وسرعة الوكالات مع وضوح الشريك المباشر.',
    'about.adv1': 'بدون أعباء الوكالات',
    'about.adv2': 'تواصل مباشر مع المؤسس',
    'about.adv3': 'التزام دقيق بالمواعيد',
    'about.adv4': 'فيديو + صوت + موشن متكامل',
    'work.eyebrow': 'إنتاجات هيدرا المختارة',
    'work.selected': 'أعمال',
    'work.works': 'مختارة',
    'work.cat.all': 'كل الأعمال',
    'work.cat.video': 'مونتاج فيديو',
    'work.cat.motion': 'موشن و3D',
    'work.cat.direction': 'إخراج كامل',
    'work.client': 'العميل:',
    'work.caseStudy': 'دراسة حالة متاحة',
    'work.inspect': 'استكشف',
    'work.streaming': 'جارٍ تحميل المحتوى...',
    'work.emptyTitle': 'دراسات الحالة قيد التجهيز',
    'work.emptyDesc':
      'يتم الآن تجهيز دراسات الحالة المختارة. وإلى ذلك الحين، يعرض العرض الرئيسي بالأسفل الإيقاع والإحساس الخام.',
    'voice.eyebrow': 'الرأس الصوتي — بن دالي عصام الدين',
    'voice.headingProf': 'تعليق',
    'voice.headingOver': 'صوتي احترافي',
    'voice.intro':
      'أمنح التردد الذي يطابق الإطار. من السرد السينمائي الحاد للترايلرات إلى إعلانات التقنية الأنيقة والأداء الصوتي المكثف للشخصيات.',
    'voice.cat.all': 'الكل',
    'voice.cat.dramatic': 'درامي',
    'voice.cat.commercial': 'تجاري',
    'voice.cat.tech': 'تقني وذكاء اصطناعي',
    'voice.cat.gaming': 'ألعاب وشخصيات',
    'voice.unmute': 'تشغيل الصوت',
    'voice.mute': 'كتم الصوت',
    'voice.scriptReader': 'قارئ النص',
    'voice.nowPlaying': 'عينة قيد التشغيل —',
    'voice.audioComingSoon': 'العينة الصوتية قريباً — اقرأ النص بالأسفل في هذه الأثناء',
    'voice.scriptTranscript': 'نص السرد الحرفي',
    'voice.customTitle': 'تحتاج تجربة صوتية مخصصة لنصك؟',
    'voice.customDesc': 'أقدم عينات مجانية لمدة 15 ثانية للاستفسارات الجادة.',
    'voice.audioNotUploaded': 'العينة الصوتية لم تُرفع بعد',
    'panel.headActive': 'الرأس 0{n} نشط',
    'panel.reeval': 'إعادة تقييم التخصص',
    'panel.inspectReel': 'شاهد ديمو {head}',
    'panel.tapToCycle': 'الرأس 0{n} // اضغط للتبديل',
    'modal.reelTitle': 'هيدرا سامو // العرض الرئيسي 2025',
    'modal.reelClient': 'تجميعة متعددة التخصصات',
    'modal.video': 'فيديو',
    'modal.grading': 'معالجة لونية',
    'modal.raw': 'لقطات خام',
    'modal.grade': 'معالجة هيدرا اللونية',
    'modal.brief': 'موجز العميل وتوجيه الإنتاج',
    'modal.software': 'البرامج المستخدمة',
    'modal.deliverables': 'التسليمات',
    'contact.eyebrowModal': 'منشئ موجز المشروع',
    'contact.headingLet': 'لنصنع',
    'contact.headingTogether': 'معاً',
    'contact.successTitle': 'تم استلام الموجز // هيدرا في الطريق',
    'contact.successPrefix': 'شكراً،',
    'contact.successBody':
      '— تم إرسال موجزك. توقع رداً مباشراً يتضمن المقترح والمدة والتسعير خلال 24 ساعة.',
    'contact.labelServices': 'اختر الخدمات المطلوبة',
    'contact.service.video': 'مونتاج فيديو راقٍ',
    'contact.service.motion': 'موشن ومؤثرات 3D',
    'contact.service.voice': 'تعليق صوتي',
    'contact.service.full': 'باقة هيدرا الكاملة',
    'contact.labelName': 'اسمك *',
    'contact.labelEmail': 'بريدك الإلكتروني *',
    'contact.labelCompany': 'الشركة / العلامة',
    'contact.labelBudget': 'الميزانية التقديرية',
    'contact.labelTimeline': 'المدة المستهدفة',
    'contact.labelProject': 'موجز / أهداف المشروع',
    'contact.budget.under1k': 'أقل من 1,000 $',
    'contact.budget.1to3': '1,000 $ - 3,000 $',
    'contact.budget.3to7': '3,000 $ - 7,000 $',
    'contact.budget.7plus': '7,000 $+ (مشروع ممتد)',
    'contact.timeline.asap': 'عاجل (أقل من 7 أيام)',
    'contact.timeline.1to2': 'أسبوع - أسبوعان',
    'contact.timeline.3to4': '3 - 4 أسابيع',
    'contact.timeline.flexible': 'مرن / مرحلة التخطيط',
    'contact.phName': 'مثال: أحمد',
    'contact.phEmail': 'alex@brand.com',
    'contact.phCompany': 'اختياري',
    'contact.phProject':
      'حدثني عن لقطاتك، أهدافك في الأسلوب البصري، متطلباتك الصوتية، أو تاريخ الإطلاق المستهدف...',
    'contact.errorRequired': 'يرجى إدخال اسمك وبريدك حتى أعرف من أرد عليه.',
    'contact.errorNotConfigured': 'نقطة إرسال النموذج غير مُهيأة بعد. يرجى المحاولة قريباً.',
    'contact.errorFailed': 'حدث خطأ أثناء إرسال موجزك. يرجى المحاولة مجدداً.',
    'contact.noticePre': 'إرسال الموجز غير مُهيأ بعد — عرّف',
    'contact.noticePost': 'في ملف .env (راجع .env.example) لبدء استلام الموجزات.',
    'splash.status1': 'الوصول إلى هيدرا سامو...',
    'splash.status2': 'جارٍ فتح هيدرا سامو...',
    'splash.status3': 'تحميل العروض والديموهات...',
    'splash.status4': 'منح الإذن...',
    'splash.status5': 'تم فتح هيدرا سامو',
    'splash.restricted': 'مساحة إبداعية خاصة',
    'splash.welcomeTo': 'مرحباً بك في',
    'splash.title': 'هيدرا',
    'splash.titleGrad': 'هيدرا',
    'splash.subtitle': 'بن دالي عصام الدين • هندسة إبداعية',
    'splash.service.video': 'مونتاج فيديو',
    'splash.service.motion': 'موشن ديزاين',
    'splash.service.voice': 'تعليق صوتي',
    'splash.rights': '© {year} هيدرا سامو • جميع الحقوق محفوظة',
    'splash.skip': 'اضغط في أي مكان للتخطي',
    'app.redirecting': 'جارٍ التحويل // هيدرا سامو',
    'pre.eyebrow': 'مرحباً بك في هيدرا سامو',
    'pre.hint': 'اختر لغتك ووضع العرض للمتابعة',
    'pre.enter': 'ادخل إلى هيدرا سامو',
  },
};

/**
 * Data-driven content overlay. `en` is intentionally empty — the English copy
 * lives in `src/data/portfolioData.ts` and is the fallback for every language.
 * Translations keyed by stable ids are applied on top, never in the data file.
 */
export interface ContentDict {
  disciplines: Record<
    string,
    { title?: string; subtitle?: string; desc?: string; longDesc?: string; stats?: string }
  >;
  voiceTracks: Record<string, { title?: string; description?: string; script?: string }>;
  processSteps: Record<
    string,
    { title?: string; subtitle?: string; description?: string; deliverable?: string }
  >;
  comparison: Record<string, { feature?: string; agency?: string; hydra?: string }>;
}

export const content: Record<Lang, ContentDict> = {
  en: { disciplines: {}, voiceTracks: {}, processSteps: {}, comparison: {} },

  fr: {
    disciplines: {
      video: {
        title: 'Montage Vidéo Haut de Gamme',
        subtitle: 'Rythme, Montage & Cadence',
        desc: 'Montage rythmé et cadence cinématographique pour des marques de classe mondiale.',
        longDesc:
          'Je taille les rushes multi-caméras bruts en récits visuels percutants, portés par l\'émotion. Maîtrise du timing, des match cuts, du design sonore et de l\'étalonnage sur DaVinci Resolve & Premiere Pro.',
        stats: 'Coupes précises à la frame, pensées pour la rétention, pas seulement pour le polish',
      },
      motion: {
        title: 'Motion & Design Graphique',
        subtitle: '3D, VFX & Identité de Marque',
        desc: 'Effets visuels sur-mesure et identité de marque qui captent l\'attention.',
        longDesc:
          'Transformer des éléments statiques en expériences visuelles dynamiques. Typographie cinétique percutante, rendus 3D de produits, interfaces HUD et compositing VFX sans couture.',
        stats: 'Rendus 3D sur-mesure et systèmes visuels cinétiques',
      },
      voice: {
        title: 'Comédien de Doublage',
        subtitle: 'Résonance, Cadence & Âme',
        desc: 'Prestation audio professionnelle avec ampleur, précision et âme.',
        longDesc:
          'Présence vocale résonante et polyvalente, formée pour les bandes-annonces cinématographiques, les lancements tech soignés et les narrations de personnages intenses, avec une clarté acoustique de studio.',
        stats: 'Studio 24 bits / 96 kHz qualité diffusion',
      },
    },
    voiceTracks: {
      'voice-1': {
        title: 'Le Gardien des Ténèbres',
        description:
          'Narration profonde, rocailleuse et grave pour bandes-annonces, dark fantasy et récits cinématographiques à fort enjeu.',
        script:
          'Quand la dernière lumière s\'éteint sous les cendres, les hommes ne se tournent pas vers les rois pour le salut. Ils plongent dans le noir... et attendent le sentinelle.',
      },
      'voice-2': {
        title: 'Lancement Aura X1',
        description:
          'Délivery tech commerciale, élégante et confiante, avec une cadence percutante et une autorité premium.',
        script:
          'La précision n\'est pas une option. C\'est la ligne de base. Voici Aura X1 : conçue sans compromis, bâtie pour ceux qui façonnent demain.',
      },
      'voice-3': {
        title: 'Nœud Neural Quantique',
        description:
          'Narrateur fluide et articulé pour documentaires sur l\'IA, keynotes corporate et immersions produit.',
        script:
          'Des milliards de milliards de calculs par microseconde. Une matrice synthétique qui apprend à la vitesse de la lumière. Bienvenue dans l\'ère de l\'informatique cognitive.',
      },
      'voice-4': {
        title: 'Le Seigneur de Guerre Kazimir',
        description:
          'Voix de personnage graveleuse et menaçante, avec une résonance thoracique tonitruante et un grain rocailleux.',
        script:
          'Vous apportez des cure-dents à un siège, général ? Enfoncez leurs portes ! Qu\'il ne reste pas une seule pierre debout !',
      },
    },
    processSteps: {
      '01': {
        title: 'Brief Direct',
        subtitle: 'Zéro intermédiaire',
        description:
          'Vous parlez directement avec moi — le monteur, le motion designer et l\'artiste vocal. Nous définissons le ton visuel, la cadence et les objectifs sonores en une seule session.',
        deliverable: 'Outline créatif & styleboard',
      },
      '02': {
        title: 'Rythme & Assemblage',
        subtitle: 'La tête vidéo',
        description:
          'Les rushes sont taillés au cadre près. Synchronisation sur le beat, fluidité du mouvement et rythme narratif verrouillés dans un montage solide.',
        deliverable: 'Draft vidéo verrouillé',
      },
      '03': {
        title: 'Motion & Polish Visuel',
        subtitle: 'La tête graphique',
        description:
          'Titres cinétiques, overlays VFX sur-mesure, éléments 3D et étalonnage élégant intégrés sans couture dans la timeline.',
        deliverable: 'Passage FX & motion',
      },
      '04': {
        title: 'Résonance Vocale & Son',
        subtitle: 'La tête audio',
        description:
          'La voix-off est enregistrée en interne avec une précision micro de studio, accompagnée d\'effets sonores sur-mesure et d\'un mix audio maître.',
        deliverable: 'Audio maître 24 bits & mix',
      },
      '05': {
        title: 'Livraison Finale Hydra',
        subtitle: 'Master de production',
        description:
          'Export en très haute résolution pour Diffusion, Cinéma, Web et Réseaux sociaux. Découpes multi-ratios incluses.',
        deliverable: 'Pack master complet',
      },
    },
    comparison: {
      Communication: {
        feature: 'Communication',
        agency: 'Chefs de compte, chaînes d\'emails, délais',
        hydra: '1-à-1 direct avec Issam Eddine (Hydra Samo)',
      },
      'Turnaround Speed': {
        feature: 'Délai de livraison',
        agency: '2 à 4 semaines avec transferts internes',
        hydra: '3 à 7 jours avec un flux unifié intégré',
      },
      'Creative Cohesion': {
        feature: 'Cohésion créative',
        agency: 'Fragmenteé (Monteur vs Motion vs Audio)',
        hydra: '100 % unifiée (Vidéo + Motion + Voix en synergie)',
      },
      'Cost Efficiency': {
        feature: 'Rentabilité',
        agency: 'Frais élevés de studio et de management',
        hydra: 'Tarification directe et légère pour un rendu d\'agence',
      },
    },
  },

  ar: {
    disciplines: {
      video: {
        title: 'مونتاج فيديو راقٍ',
        subtitle: 'إيقاع، تركيب ووتيرة',
        desc: 'مونتاج بإيقاع محكم وتوقيت سينمائي للعلامات العالمية.',
        longDesc:
          'قصّ اللقطات الخام متعددة الكاميرات إلى حكايات بصرية مؤثرة ومليئة بالإحساس. إتقان التوقيت، والمطابقات اللحظية، وتصميم الصوت، ومعالجة الألوان في DaVinci Resolve وPremiere Pro.',
        stats: 'قصّ دقيق للإطار مصمم للاحتفاظ بالمشاهد، لا للتلميع فقط',
      },
      motion: {
        title: 'موشن وغرافيك ديزاين',
        subtitle: '3D، مؤثرات وهوية بصرية',
        desc: 'مؤثرات بصرية مخصصة وهوية علامة تجارية تلفت الانتباه.',
        longDesc:
          'تحويل العناصر الثابتة إلى تجارب بصرية ديناميكية. كتابة حركية عالية التأثير، وعروض منتجات ثلاثية الأبعاد، وواجهات HUD، ودمج مؤثرات بصرية سلس.',
        stats: 'عروض 3D مخصصة وأنظمة بصرية حركية',
      },
      voice: {
        title: 'فنان تعليق صوتي',
        subtitle: 'صدى، إيقاع وروح',
        desc: 'أداء صوتي احترافي بمدى ودقة وإحساس.',
        longDesc:
          'حضور صوتي رنان ومتعدد المواهب، مُدرب على الترايلرات السينمائية وإعلانات إطلاق التقنية الأنيقة وسرد الشخصيات المكثف، بوضوح أكوستيكي بجودة الاستوديو.',
        stats: 'استوديو بجودة البث 24-bit / 96kHz',
      },
    },
    voiceTracks: {
      'voice-1': {
        title: 'الحارس المظلم',
        description:
          'سرد صوتي عميق وخفيف وجهوري للترايلرات والفانتازيا المظلمة والقصص السينمائية عالية الرهانات.',
        script:
          'عندما تخفت آخر شعلة تحت الرماد، لا يلتفت الناس إلى الملوك طلباً للنجاة. بل يتحدّقون في الظلام... وينتظرون الحارس.',
      },
      'voice-2': {
        title: 'إطلاق أورا X1',
        description:
          'أداء إعلاني تقني أنيق وواثق، بإيقاع حاد وحضور مميز.',
        script:
          'الدقة ليست خياراً، إنها الخط الأساس. إليكم أورا X1: مصممة بلا مساومة، لأولئك الذين يشكلون الغد.',
      },
      'voice-3': {
        title: 'عقدة نيوترال الكمية',
        description:
          'راوٍ انسيابي وفصيح لأفلام وثائقية عن الذكاء الاصطناعي والخطابات المؤسسية والغوص في المنتجات.',
        script:
          'تريليونات الحسابات في كل جزء من الثانية. مصفوفة اصطناعية تتعلم بسرعة الضوء. أهلاً بكم في عصر الحوسبة الإدراكية.',
      },
      'voice-4': {
        title: 'السيد الحربي كازيمير',
        description:
          'صوت شخصية خشن ومهدد، برنين صدري مدوٍ وخشونة جرئية.',
        script:
          'تأتون بعيدان أسنان إلى حصار يا جنرال؟ اكسروا أبوابهم! لا تتركوا حجراً فوق حجر!',
      },
    },
    processSteps: {
      '01': {
        title: 'الموجز المباشر',
        subtitle: 'صفر وسطاء',
        description:
          'تتحدث مباشرة معي — المحرر، ومصمم الموشن، والفنان الصوتي. نحدد النبرة البصرية والإيقاع وأهداف تصميم الصوت في جلسة واحدة.',
        deliverable: 'خطة إبداعية ولوحة أسلوب',
      },
      '02': {
        title: 'الإيقاع وقصّ المونتاج',
        subtitle: 'الرأس الفيديو',
        description:
          'يتم قصّ اللقطات الخام بدقة الإطار. مطابقة النبض، وسلاسة الحركة، والإيقاع السردي تُثبَّت في مونتاج قوي.',
        deliverable: 'مسودة مونتاج نهائية',
      },
      '03': {
        title: 'الموشن والصقل البصري',
        subtitle: 'الرأس الجرافيكي',
        description:
          'عناوين حركية، وتأثيرات بصرية مخصصة، وعناصر ثلاثية الأبعاد، ومعالجة ألوان أنيقة تُدمج بسلاسة في المخطط الزمني.',
        deliverable: 'تمريرة مؤثرات وموشن',
      },
      '04': {
        title: 'الصدى الصوتي والصوت',
        subtitle: 'الرأس الصوتي',
        description:
          'يُسجَّل التعليق الصوتي داخلياً بدقة ميكروفون الاستوديو، مصحوباً بمؤثرات صوتية مخصصة ومكساج رئيسي.',
        deliverable: 'صوت رئيسي 24-bit ومكساج',
      },
      '05': {
        title: 'التسليم النهائي هيدرا',
        subtitle: 'الماستر الإنتاجي',
        description:
          'تصدير بجودة فائقة الوضوح للبث والسينما والويب والسوشيال ميديا. مع مقاطع متعددة الأبعاد.',
        deliverable: 'حزمة الماستر الكاملة',
      },
    },
    comparison: {
      Communication: {
        feature: 'التواصل',
        agency: 'مديرو حسابات وسلاسل بريد وتأخير',
        hydra: 'تواصل مباشر 1-1 مع عصام الدين (هيدرا سامو)',
      },
      'Turnaround Speed': {
        feature: 'سرعة التسليم',
        agency: 'من 2 إلى 4 أسابيع مع تحويلات داخلية',
        hydra: 'من 3 إلى 7 أيام بعملية موحّدة متكاملة',
      },
      'Creative Cohesion': {
        feature: 'الترابط الإبداعي',
        agency: 'مقسّم (مونتاج مقابل موشن مقابل صوت)',
        hydra: 'موحّد 100% (فيديو + موشن + صوت بتناغم)',
      },
      'Cost Efficiency': {
        feature: 'كفاءة التكلفة',
        agency: 'تكاليف استوديو وإدارة مرتفعة',
        hydra: 'تسعير مباشر ومرن بإنتاج بجودة الوكالات',
      },
    },
  },
};

/** Apply the translated discipline fields, falling back to the source data. */
export function localizeDisciplines<
  T extends { id: string; title: string; subtitle: string; desc: string; longDesc: string; stats: string }
>(list: T[], lang: Lang): T[] {
  return list.map((item) => {
    const o = content[lang].disciplines[item.id];
    if (!o) return item;
    return {
      ...item,
      title: o.title ?? item.title,
      subtitle: o.subtitle ?? item.subtitle,
      desc: o.desc ?? item.desc,
      longDesc: o.longDesc ?? item.longDesc,
      stats: o.stats ?? item.stats,
    };
  });
}

/** Apply the translated voice-track fields, falling back to the source data. */
export function localizeVoiceTracks<
  T extends { id: string; title: string; description: string; script: string }
>(list: T[], lang: Lang): T[] {
  return list.map((item) => {
    const o = content[lang].voiceTracks[item.id];
    if (!o) return item;
    return {
      ...item,
      title: o.title ?? item.title,
      description: o.description ?? item.description,
      script: o.script ?? item.script,
    };
  });
}

/** Apply the translated process-step fields, falling back to the source data. */
export function localizeProcessSteps<
  T extends { number: string; title: string; subtitle: string; description: string; deliverable: string }
>(list: T[], lang: Lang): T[] {
  return list.map((item) => {
    const o = content[lang].processSteps[item.number];
    if (!o) return item;
    return {
      ...item,
      title: o.title ?? item.title,
      subtitle: o.subtitle ?? item.subtitle,
      description: o.description ?? item.description,
      deliverable: o.deliverable ?? item.deliverable,
    };
  });
}

/** Apply the translated comparison-matrix rows, falling back to the source data. */
export function localizeComparison<
  T extends { feature: string; agency: string; hydra: string }
>(list: T[], lang: Lang): T[] {
  return list.map((item) => {
    const o = content[lang].comparison[item.feature];
    if (!o) return item;
    return {
      ...item,
      feature: o.feature ?? item.feature,
      agency: o.agency ?? item.agency,
      hydra: o.hydra ?? item.hydra,
    };
  });
}
