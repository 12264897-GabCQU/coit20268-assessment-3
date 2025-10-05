document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formContainer = document.getElementById('contact-form');
    const thankYouContainer = document.getElementById('thank-you-container');
    const errorSummary = document.getElementById('error-summary');

    const fields = ['fullName', 'email', 'phone', 'age', 'topic', 'message', 'consent'];

    /* FORM VALIDATION */
    const validateField = (field) => {
        const input = document.getElementById(field);
        const value = input.type === 'checkbox' ? input.checked : input.value.trim();
        let valid = true;
        let error = '';

        switch (field) {
            case 'fullName':
                if (!value) {
                    valid = false;
                    error = 'Name is required.';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    valid = false;
                    error = 'Email is required.';
                } else if (!emailRegex.test(value)) {
                    valid = false;
                    error = 'Email must be a valid format.';
                }
                break;
            case 'phone':
                const phoneRegex = /^(?:\+61|0)4\d{8}$/;
                if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
                    valid = false;
                    error = 'Phone must match Australian mobile format.';
                }
                break;
            case 'age':
                const ageNum = parseInt(value, 10);
                if (!value) {
                    valid = false;
                    error = 'Age is required.';
                } else if (isNaN(ageNum) || ageNum < 16 || ageNum > 80) {
                    valid = false;
                    error = 'Age must be a number between 16 and 80.';
                }
                break;
            case 'topic':
                if (!value) {
                    valid = false;
                    error = 'Topic is required.';
                }
                break;
            case 'message':
                if (!value) {
                    valid = false;
                    error = 'Message is required.';
                } else if (value.length < 50 || value.length > 500) {
                    valid = false;
                    error = 'Message must be between 50 and 500 characters.';
                }
                break;
            case 'consent':
                if (!value) {
                    valid = false;
                    error = 'You must consent to the privacy terms.';
                }
                break;
        }
        displayError(field, error);
        return valid;
    };

    const displayError = (field, message) => {
        const errorDiv = document.getElementById(`${field}-error`);
        const input = document.getElementById(field);
        if (message) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            input.setAttribute('aria-invalid', 'true');
        } else {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
            input.setAttribute('aria-invalid', 'false');
        }
    };

    const clearErrors = () => {
        fields.forEach(field => displayError(field, ''));
        errorSummary.innerHTML = '';
    };

    /* FORM SUBMISSION */
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        let isFormValid = true;
        const errors = [];

        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
                const label = document.querySelector(`label[for=${field}]`).textContent;
                errors.push({ field, label, message: document.getElementById(`${field}-error`).textContent });
            }
        });

        if (!isFormValid) {
            const firstErrorField = document.querySelector('[aria-invalid="true"]');
            if (firstErrorField) {
                firstErrorField.focus();
            }
            errorSummary.innerHTML = `<h3>Please correct the following errors:</h3><ul>${errors.map(err => `<li><a href="#${err.field}"><strong>${err.label}:</strong> ${err.message}</a></li>`).join('')}</ul>`;
            return;
        }

        /* UI BEHAVIOR */
        submitBtn.disabled = true;
        setTimeout(() => {
            const formData = new FormData(form);
            const submission = {
                name: formData.get('fullName').trim(),
                email: formData.get('email').trim(),
                phone: formData.get('phone').trim(),
                age: parseInt(formData.get('age'), 10),
                topic: formData.get('topic'),
                message: formData.get('message').trim(),
                isoTimestamp: new Date().toISOString(),
                timezone: 'Australia/Brisbane'
            };

            /* SESSION STORAGE */
            saveSubmission(submission);

            /* VIEW SWAP */
            showThankYou(submission);
            submitBtn.disabled = false;
        }, 400);
    });

    /* STORAGE */
    const saveSubmission = (submission) => {
        sessionStorage.setItem('contact_last', JSON.stringify(submission));
        let submissions = JSON.parse(sessionStorage.getItem('contact_submissions')) || [];
        submissions.unshift(submission);
        if (submissions.length > 20) {
            submissions = submissions.slice(0, 20);
        }
        sessionStorage.setItem('contact_submissions', JSON.stringify(submissions));
    };

    /* THANK YOU VIEW */
    const showThankYou = (submission) => {
        document.getElementById('user-first-name').textContent = submission.name.split(' ')[0];
        document.getElementById('summary-topic').textContent = submission.topic;
        document.getElementById('summary-date').textContent = new Date(submission.isoTimestamp).toLocaleDateString('en-AU', {
            dateStyle: 'full',
            timeZone: submission.timezone
        });

        formContainer.classList.add('u-visually-hidden');
        thankYouContainer.classList.remove('u-visually-hidden');
    };

    /* OTHER UI BEHAVIOR */
    document.getElementById('clear-btn').addEventListener('click', () => {
        form.reset();
        clearErrors();
    });

    document.getElementById('new-message-btn').addEventListener('click', () => {
        form.reset();
        clearErrors();
        thankYouContainer.classList.add('u-visually-hidden');
        formContainer.classList.remove('u-visually-hidden');
    });
});