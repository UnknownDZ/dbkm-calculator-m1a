// ========================================
// الوظائف المشتركة - حاسبة المعدل
// ========================================

let subjectsData = [];
let gradeInputs = [];

// تهيئة صفحة الحاسبة
function initSemesterPage(data) {
    subjectsData = data.subjects;
    semesterId = data.id;
    
    renderSubjects();
    attachEventListeners();
    loadTheme();
    updateCalculateButtonState();
    
    // تحديث اللغة
    updatePageLanguage();
    
    // استماع لتغيير اللغة
    document.addEventListener('languageChanged', () => {
        renderSubjects(); // إعادة رسم البطاقات باللغة الجديدة
        attachEventListeners();
    });
}

// عرض المواد
function renderSubjects() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    subjectsData.forEach(subject => {
        const card = createSubjectCard(subject);
        container.appendChild(card);
        updateSubjectAverage(subject.id);
    });
}

// إنشاء بطاقة مادة
function createSubjectCard(subject) {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.dataset.id = subject.id;
    
    // تحديد نوع المادة باللغة الحالية
    let typeText = '';
    let icon = '';
    
    if (subject.type === 'td-cour') {
        typeText = t('td_cour');
        icon = 'clipboard-list';
    } else if (subject.type === 'td') {
        typeText = t('td_only');
        icon = 'edit';
    } else if (subject.type === 'cour') {
        typeText = t('cour_only');
        icon = 'file-alt';
    } else {
        typeText = t('single');
        icon = 'book';
    }
    
    // اسم المادة حسب اللغة
    let subjectName = subject.name;
    if (currentLang === 'en' && subject.name_en) subjectName = subject.name_en;
    if (currentLang === 'fr' && subject.name_fr) subjectName = subject.name_fr;
    
    let gradesHTML = '';
    
    if (subject.hasTwoGrades) {
        gradesHTML = `
            <div class="grades-input">
                <div class="grade-input-group">
                    <div class="grade-label">${t('td_grade')}</div>
                    <div class="grade-controls">
                        <button type="button" class="grade-btn decrease" data-grade="grade1">−</button>
                        <input type="text" class="grade-input" value="${subject.grade1.toFixed(2)}" data-grade="grade1" inputmode="decimal">
                        <button type="button" class="grade-btn increase" data-grade="grade1">+</button>
                    </div>
                </div>
                <div class="grade-input-group">
                    <div class="grade-label">${t('exam_grade')}</div>
                    <div class="grade-controls">
                        <button type="button" class="grade-btn decrease" data-grade="grade2">−</button>
                        <input type="text" class="grade-input" value="${subject.grade2.toFixed(2)}" data-grade="grade2" inputmode="decimal">
                        <button type="button" class="grade-btn increase" data-grade="grade2">+</button>
                    </div>
                </div>
            </div>
            <div class="subject-average">
                <div class="average-label">${t('subject_average')}</div>
                <div class="average-value" id="avg${subject.id}">0.00</div>
            </div>
        `;
    } else {
        gradesHTML = `
            <div class="grades-input">
                <div class="grade-input-group" style="flex: 1;">
                    <div class="grade-label">${t('final_grade')}</div>
                    <div class="grade-controls">
                        <button type="button" class="grade-btn decrease" data-grade="grade1">−</button>
                        <input type="text" class="grade-input" value="${subject.grade1.toFixed(2)}" data-grade="grade1" inputmode="decimal">
                        <button type="button" class="grade-btn increase" data-grade="grade1">+</button>
                    </div>
                </div>
            </div>
            <div class="subject-average">
                <div class="average-label">${t('subject_average')}</div>
                <div class="average-value" id="avg${subject.id}">0.00</div>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="subject-header">
            <div>
                <div class="subject-name">${subjectName}</div>
                <div class="subject-type">
                    <i class="fas fa-${icon}"></i>
                    ${typeText}
                </div>
            </div>
            <div class="subject-coefficient">${t('total_coefficient')} ${subject.coefficient}</div>
        </div>
        ${gradesHTML}
    `;
    
    return card;
}

// تحديث معدل المادة
function updateSubjectAverage(subjectId) {
    const subject = subjectsData.find(s => s.id === subjectId);
    if (!subject) return;
    
    let average;
    if (subject.hasTwoGrades) {
        average = (subject.grade1 + subject.grade2) / 2;
    } else {
        average = subject.grade1;
    }
    
    const avgElement = document.getElementById(`avg${subjectId}`);
    if (avgElement) {
        avgElement.textContent = average.toFixed(2);
        avgElement.className = 'average-value';
        if (average >= 10) avgElement.classList.add('success');
        else if (average > 0) avgElement.classList.add('danger');
    }
    
    updateGradeButtonsState(subjectId);
}

// تحديث حالة أزرار الزيادة والنقصان
function updateGradeButtonsState(subjectId) {
    const subject = subjectsData.find(s => s.id === subjectId);
    if (!subject) return;
    
    const card = document.querySelector(`.subject-card[data-id="${subjectId}"]`);
    if (!card) return;
    
    const grade1Decrease = card.querySelector('.decrease[data-grade="grade1"]');
    const grade1Increase = card.querySelector('.increase[data-grade="grade1"]');
    
    if (grade1Decrease) grade1Decrease.disabled = subject.grade1 <= 0;
    if (grade1Increase) grade1Increase.disabled = subject.grade1 >= 20;
    
    if (subject.hasTwoGrades) {
        const grade2Decrease = card.querySelector('.decrease[data-grade="grade2"]');
        const grade2Increase = card.querySelector('.increase[data-grade="grade2"]');
        
        if (grade2Decrease) grade2Decrease.disabled = subject.grade2 <= 0;
        if (grade2Increase) grade2Increase.disabled = subject.grade2 >= 20;
    }
}

// تغيير الدرجة
function changeGrade(subjectId, gradeType, change) {
    const subject = subjectsData.find(s => s.id === subjectId);
    if (!subject) return;
    
    let newGrade = subject[gradeType] + change;
    if (newGrade < 0) newGrade = 0;
    if (newGrade > 20) newGrade = 20;
    
    subject[gradeType] = parseFloat(newGrade.toFixed(2));
    
    const input = document.querySelector(`.subject-card[data-id="${subjectId}"] input[data-grade="${gradeType}"]`);
    if (input) {
        input.value = subject[gradeType].toFixed(2);
        updateSubjectAverage(subjectId);
    }
    
    updateCalculateButtonState();
}

// إدخال يدوي
function handleManualInput(subjectId, gradeType, value) {
    const subject = subjectsData.find(s => s.id === subjectId);
    if (!subject) return;
    
    let numValue = parseFloat(value);
    if (isNaN(numValue)) numValue = 0;
    if (numValue < 0) numValue = 0;
    if (numValue > 20) numValue = 20;
    
    subject[gradeType] = parseFloat(numValue.toFixed(2));
    updateSubjectAverage(subjectId);
    updateCalculateButtonState();
}

// تحديث حالة زر الحساب
function updateCalculateButtonState() {
    const calculateBtn = document.getElementById('calculateBtn');
    if (!calculateBtn) return;
    
    let allFilled = true;
    
    for (const subject of subjectsData) {
        if (subject.hasTwoGrades) {
            if (subject.grade1 === 0 && subject.grade2 === 0) {
                allFilled = false;
                break;
            }
        } else {
            if (subject.grade1 === 0) {
                allFilled = false;
                break;
            }
        }
    }
    
    calculateBtn.disabled = !allFilled;
}

// حساب المعدل النهائي
function calculateFinalAverage() {
    let totalWeighted = 0;
    let totalCoeff = 0;
    let emptySubjects = [];
    
    for (const subject of subjectsData) {
        if (subject.hasTwoGrades) {
            if (subject.grade1 === 0 && subject.grade2 === 0) {
                emptySubjects.push(subject.name);
            } else {
                const avg = (subject.grade1 + subject.grade2) / 2;
                totalWeighted += avg * subject.coefficient;
                totalCoeff += subject.coefficient;
            }
        } else {
            if (subject.grade1 === 0) {
                emptySubjects.push(subject.name);
            } else {
                totalWeighted += subject.grade1 * subject.coefficient;
                totalCoeff += subject.coefficient;
            }
        }
    }
    
    if (emptySubjects.length > 0) {
        showToast(`${t('please_enter_grades')} ${emptySubjects.join('، ')}`);
        return null;
    }
    
    const finalAvg = totalWeighted / totalCoeff;
    displayResult(finalAvg, totalWeighted, totalCoeff);
    return finalAvg;
}

// عرض النتيجة
function displayResult(avg, points, coeff) {
    const resultCard = document.getElementById('resultCard');
    const finalGrade = document.getElementById('finalGrade');
    const totalPoints = document.getElementById('totalPoints');
    const totalCoeff = document.getElementById('totalCoeff');
    const statusEl = document.getElementById('status');
    const resultMessage = document.getElementById('resultMessage');
    
    if (!resultCard) return;
    
    finalGrade.textContent = avg.toFixed(2);
    totalPoints.textContent = points.toFixed(2);
    totalCoeff.textContent = coeff;
    
    if (avg >= 10) {
        statusEl.textContent = t('passed');
        resultMessage.textContent = t('success_message');
        resultCard.classList.add('success');
        resultCard.classList.remove('danger');
        launchConfetti();
    } else {
        statusEl.textContent = t('failed');
        resultMessage.textContent = t('fail_message');
        resultCard.classList.add('danger');
        resultCard.classList.remove('success');
    }
    
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// إطلاق الاحتفال
function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669']
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#10b981', '#34d399']
        });
    }, 200);
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#10b981', '#34d399']
        });
    }, 400);
}

// إعادة تعيين الدرجات
function resetAllGrades() {
    if (!confirm(t('reset_confirm'))) return;
    
    for (const subject of subjectsData) {
        subject.grade1 = 0;
        subject.grade2 = 0;
        
        const inputs = document.querySelectorAll(`.subject-card[data-id="${subject.id}"] .grade-input`);
        inputs.forEach(input => {
            input.value = '0.00';
        });
        
        updateSubjectAverage(subject.id);
    }
    
    const resultCard = document.getElementById('resultCard');
    if (resultCard) resultCard.style.display = 'none';
    
    updateCalculateButtonState();
    showToast(t('reset_success'));
}

// عرض تنبيه منبثق
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// تحميل الوضع الليلي
function loadTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}

// تبديل الوضع الليلي
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// ربط الأحداث
function attachEventListeners() {
    // أزرار الزيادة والنقصان
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.removeEventListener('click', handleGradeButtonClick);
        btn.addEventListener('click', handleGradeButtonClick);
    });
    
    // الإدخال اليدوي
    document.querySelectorAll('.grade-input').forEach(input => {
        input.removeEventListener('input', handleInputEvent);
        input.addEventListener('input', handleInputEvent);
        
        input.removeEventListener('blur', handleBlurEvent);
        input.addEventListener('blur', handleBlurEvent);
        
        input.removeEventListener('keypress', handleKeyPress);
        input.addEventListener('keypress', handleKeyPress);
    });
    
    // أزرار التحكم الرئيسية
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    
    if (calculateBtn) {
        calculateBtn.removeEventListener('click', calculateFinalAverage);
        calculateBtn.addEventListener('click', calculateFinalAverage);
    }
    
    if (resetBtn) {
        resetBtn.removeEventListener('click', resetAllGrades);
        resetBtn.addEventListener('click', resetAllGrades);
    }
    
    if (themeToggle) {
        themeToggle.removeEventListener('click', toggleTheme);
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (langToggle) {
        langToggle.removeEventListener('click', toggleLanguage);
        langToggle.addEventListener('click', toggleLanguage);
    }
}

// معالج زر الدرجة
function handleGradeButtonClick(e) {
    const btn = e.target;
    const card = btn.closest('.subject-card');
    const subjectId = parseInt(card.dataset.id);
    const gradeType = btn.dataset.grade;
    const change = btn.classList.contains('increase') ? 0.25 : -0.25;
    
    changeGrade(subjectId, gradeType, change);
}

// معالج الإدخال
function handleInputEvent(e) {
    const input = e.target;
    const card = input.closest('.subject-card');
    const subjectId = parseInt(card.dataset.id);
    const gradeType = input.dataset.grade;
    
    handleManualInput(subjectId, gradeType, input.value);
}

// معالج فقدان التركيز
function handleBlurEvent(e) {
    const input = e.target;
    let value = input.value.replace(',', '.');
    const num = parseFloat(value);
    input.value = isNaN(num) ? '0.00' : num.toFixed(2);
    
    const card = input.closest('.subject-card');
    const subjectId = parseInt(card.dataset.id);
    const gradeType = input.dataset.grade;
    
    handleManualInput(subjectId, gradeType, input.value);
}

// منع الأحرف غير الرقمية
function handleKeyPress(e) {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode !== 46 && charCode !== 44 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
    }
}

// تهيئة الصفحة الرئيسية
function initHomePage() {
    loadTheme();
    updatePageLanguage();
    
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (langToggle) langToggle.addEventListener('click', toggleLanguage);
}

// تشغيل التهيئة حسب الصفحة
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('subjectsContainer')) {
        // هذه صفحة حاسبة، التهيئة تتم عبر initSemesterPage الموجود في الصفحة
    } else {
        initHomePage();
    }
});