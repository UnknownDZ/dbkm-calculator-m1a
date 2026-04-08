// ========================================
// ملف الترجمة - عربي / إنجليزي / فرنسي
// ========================================

const translations = {
    ar: {
        // عام
        app_title: "حاسبة المعدل",
        app_subtitle: "القانون الإداري - ماستر 1",
        faculty: "كلية الحقوق والعلوم السياسية",
        welcome_text1: "هذه الحاسبة مخصصة لتخصص سنة أولى ماستر القانون الإداري لكلا السداسيين",
        welcome_text2: "تقوم هذه الحاسبة بدقة تامة مع مراعاة جميع القوانين الحسابية",
        choose_semester: "اختر السداسي الذي تريد حساب معدله:",
        semester1: "السداسي الأول",
        semester2: "السداسي الثاني",
        contact_us: "تواصل معنا",
        facebook: "فيسبوك",
        instagram: "إنستغرام",
        email: "البريد الجامعي",
        copyright: "حاسبة المعدل الجامعي - الجيلالي بونعامة",
        developer: "تم التطوير من طرف الطالب 'عمراوي سيدأحمد'",
        
        // صفحة الحاسبة
        total_coefficient: "مجموع المعاملات",
        subjects_count: "عدد المواد",
        pass_mark: "معدل النجاح",
        calculate: "حساب المعدل",
        reset: "إعادة تعيين",
        final_result: "النتيجة النهائية",
        total_points: "مجموع النقاط",
        total_coeff: "مجموع المعاملات",
        status: "الحالة",
        passed: "ناجح",
        failed: "راسب",
        success_message: "مبروك! لقد نجحت في السداسي",
        fail_message: "آسف، يجب أن تحصل على معدل 10 على الأقل للنجاح",
        
        // أنواع المواد
        td_cour: "أعمال موجهة + امتحان",
        td_only: "أعمال موجهة فقط",
        cour_only: "امتحان فقط",
        single: "مادة واحدة",
        
        // حقول الإدخال
        td_grade: "أعمال موجهة (TD)",
        exam_grade: "امتحان (COUR)",
        final_grade: "الدرجة النهائية",
        subject_average: "المعدل النهائي للمادة",
        
        // تنبيهات
        incomplete_subjects: "مواد غير مكتملة",
        please_enter_grades: "يرجى إدخال درجات المواد التالية:",
        reset_confirm: "هل أنت متأكد من إعادة تعيين جميع الدرجات؟",
        reset_success: "تم إعادة تعيين جميع الدرجات بنجاح"
    },
    
    en: {
        // General
        app_title: "Grade Calculator",
        app_subtitle: "Administrative Law - Master 1",
        faculty: "Faculty of Law and Political Science",
        welcome_text1: "This calculator is dedicated to first-year Master of Administrative Law for both semesters",
        welcome_text2: "This calculator works with complete accuracy following all calculation rules",
        choose_semester: "Choose the semester you want to calculate:",
        semester1: "Semester 1",
        semester2: "Semester 2",
        contact_us: "Contact Us",
        facebook: "Facebook",
        instagram: "Instagram",
        email: "University Email",
        copyright: "University Grade Calculator - Djilali Bounaama",
        developer: "Developed by student 'Amraoui Sidahmed'",
        
        // Calculator page
        total_coefficient: "Total Coefficient",
        subjects_count: "Number of Subjects",
        pass_mark: "Passing Grade",
        calculate: "Calculate",
        reset: "Reset",
        final_result: "Final Result",
        total_points: "Total Points",
        total_coeff: "Total Coefficient",
        status: "Status",
        passed: "Passed",
        failed: "Failed",
        success_message: "Congratulations! You passed the semester",
        fail_message: "Sorry, you need at least 10/20 to pass",
        
        // Subject types
        td_cour: "TD + Exam",
        td_only: "TD Only",
        cour_only: "Exam Only",
        single: "Single Grade",
        
        // Input fields
        td_grade: "TD Grade",
        exam_grade: "Exam Grade",
        final_grade: "Final Grade",
        subject_average: "Subject Average",
        
        // Alerts
        incomplete_subjects: "Incomplete Subjects",
        please_enter_grades: "Please enter grades for:",
        reset_confirm: "Are you sure you want to reset all grades?",
        reset_success: "All grades have been reset successfully"
    },
    
    fr: {
        // Général
        app_title: "Calculateur de Notes",
        app_subtitle: "Droit Administratif - Master 1",
        faculty: "Faculté de Droit et des Sciences Politiques",
        welcome_text1: "Ce calculateur est dédié à la première année Master en Droit Administratif pour les deux semestres",
        welcome_text2: "Ce calculateur fonctionne avec une précision totale en respectant toutes les règles de calcul",
        choose_semester: "Choisissez le semestre à calculer :",
        semester1: "Semestre 1",
        semester2: "Semestre 2",
        contact_us: "Contactez-nous",
        facebook: "Facebook",
        instagram: "Instagram",
        email: "Email Universitaire",
        copyright: "Calculateur de Notes Universitaire - Djilali Bounaama",
        developer: "Développé par l'étudiant 'Amraoui Sidahmed'",
        
        // Page calculatrice
        total_coefficient: "Coefficient Total",
        subjects_count: "Nombre de Matières",
        pass_mark: "Note de Réussite",
        calculate: "Calculer",
        reset: "Réinitialiser",
        final_result: "Résultat Final",
        total_points: "Points Totaux",
        total_coeff: "Coefficient Total",
        status: "Statut",
        passed: "Réussi",
        failed: "Échoué",
        success_message: "Félicitations ! Vous avez réussi le semestre",
        fail_message: "Désolé, vous devez obtenir au moins 10/20 pour réussir",
        
        // Types de matières
        td_cour: "TD + Examen",
        td_only: "TD Uniquement",
        cour_only: "Examen Uniquement",
        single: "Note Unique",
        
        // Champs de saisie
        td_grade: "Note TD",
        exam_grade: "Note Examen",
        final_grade: "Note Finale",
        subject_average: "Moyenne de la matière",
        
        // Alertes
        incomplete_subjects: "Matières Incomplètes",
        please_enter_grades: "Veuillez saisir les notes pour :",
        reset_confirm: "Êtes-vous sûr de vouloir réinitialiser toutes les notes ?",
        reset_success: "Toutes les notes ont été réinitialisées avec succès"
    }
};

let currentLang = localStorage.getItem('appLanguage') || 'ar';

function t(key) {
    return translations[currentLang][key] || translations.ar[key] || key;
}

function updatePageLanguage() {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t(key);
            } else {
                el.textContent = t(key);
            }
        }
    });
    
    const langText = document.getElementById('langText');
    if (langText) {
        if (currentLang === 'ar') langText.textContent = 'AR';
        else if (currentLang === 'en') langText.textContent = 'EN';
        else langText.textContent = 'FR';
    }
    
    localStorage.setItem('appLanguage', currentLang);
}

function toggleLanguage() {
    if (currentLang === 'ar') currentLang = 'en';
    else if (currentLang === 'en') currentLang = 'fr';
    else currentLang = 'ar';
    
    updatePageLanguage();
    
    const event = new CustomEvent('languageChanged', { detail: { lang: currentLang } });
    document.dispatchEvent(event);
}