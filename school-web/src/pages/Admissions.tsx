import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardCheck, FileCheck, Users, CreditCard, CheckCircle2, Ticket } from 'lucide-react';
import { BilingualHeading } from '../components/BilingualHeading';

interface EnquiryFormValues {
  studentName: string;
  parentName: string;
  classApplying: string;
  mobileNumber: string;
}

interface FormErrors {
  studentName?: string;
  parentName?: string;
  classApplying?: string;
  mobileNumber?: string;
}

export const Admissions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  // Form States
  const [formValues, setFormValues] = useState<EnquiryFormValues>({
    studentName: '',
    parentName: '',
    classApplying: '',
    mobileNumber: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ ticketId: string; phone: string } | null>(null);

  // Available classes lists
  const schoolClasses = [
    'Nursery', 'LKG', 'UKG',
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11 (Science - PCM)', 'Class 11 (Science - PCB)', 'Class 11 (Commerce)',
    'Class 12 (Science - PCM)', 'Class 12 (Science - PCB)', 'Class 12 (Commerce)'
  ];

  // Validation handler
  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formValues.studentName.trim()) {
      tempErrors.studentName = t('admissions.validation.studentNameReq');
      isValid = false;
    }

    if (!formValues.parentName.trim()) {
      tempErrors.parentName = t('admissions.validation.parentNameReq');
      isValid = false;
    }

    if (!formValues.classApplying) {
      tempErrors.classApplying = t('admissions.validation.classApplyingReq');
      isValid = false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formValues.mobileNumber.trim()) {
      tempErrors.mobileNumber = t('admissions.validation.mobileNumberReq');
      isValid = false;
    } else if (!phoneRegex.test(formValues.mobileNumber)) {
      tempErrors.mobileNumber = t('admissions.validation.mobileNumberInvalid');
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // Clear field error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API Submissions
      setTimeout(() => {
        setIsSubmitting(false);
        const randomTicketNum = Math.floor(100000 + Math.random() * 900000);
        setSuccessData({
          ticketId: `VV-2026-${randomTicketNum}`,
          phone: formValues.mobileNumber,
        });
      }, 1200);
    }
  };

  const handleResetForm = () => {
    setFormValues({
      studentName: '',
      parentName: '',
      classApplying: '',
      mobileNumber: '',
    });
    setErrors({});
    setSuccessData(null);
  };

  // Step Icon Matcher
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ClipboardCheck size={24} />;
      case 1:
        return <FileCheck size={24} />;
      case 2:
        return <Users size={24} />;
      case 3:
        return <CreditCard size={24} />;
      default:
        return <ClipboardCheck size={24} />;
    }
  };

  return (
    <div className="py-12 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-12">
          <BilingualHeading
            english={t('admissions.title')}
            hindi={t('admissions.title')}
            level={1}
          />
          <p className={`text-slate-500 mt-3 text-sm sm:text-base ${isHindi ? 'font-devanagari text-[16px]' : ''}`}>
            {t('admissions.subtitle')}
          </p>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left panel: Steps process */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className={`text-2xl font-bold text-primary ${isHindi ? 'font-devanagari leading-normal' : 'font-serif'}`}>
              {t('admissions.stepsTitle')}
            </h3>

            <div className="space-y-6">
              {['step1', 'step2', 'step3', 'step4'].map((stepKey, idx) => (
                <div key={stepKey} className="flex gap-4 bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                  <div className="bg-primary text-accent p-3.5 rounded-lg self-start shadow-inner">
                    {getStepIcon(idx)}
                  </div>
                  <div>
                    <span className="text-xs text-accent font-bold uppercase tracking-wider block font-sans">
                      {isHindi ? `चरण ${idx + 1}` : `Step ${idx + 1}`}
                    </span>
                    <h4 className={`text-lg font-bold text-primary mt-0.5 ${isHindi ? 'font-devanagari leading-normal' : 'font-serif'}`}>
                      {t(`admissions.steps.${stepKey}.title`)}
                    </h4>
                    <p className={`text-slate-500 text-sm mt-1 leading-relaxed ${isHindi ? 'font-devanagari text-[14.5px] leading-relaxed' : ''}`}>
                      {t(`admissions.steps.${stepKey}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Enquiry form / Success state */}
          <div className="lg:col-span-6 bg-white rounded-lg border border-accent/15 shadow-md p-6 sm:p-8">
            
            {!successData ? (
              // 1. Interactive Form State
              <>
                <h3 className={`text-2xl font-bold text-primary mb-2 ${isHindi ? 'font-devanagari leading-normal' : 'font-serif'}`}>
                  {t('admissions.formTitle')}
                </h3>
                <p className={`text-slate-400 text-sm leading-relaxed mb-6 ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
                  {t('admissions.formSub')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  {/* Child's name */}
                  <div>
                    <label className={`block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ${isHindi ? 'font-devanagari text-[13px]' : ''}`}>
                      {t('admissions.labels.studentName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formValues.studentName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-accent text-sm ${
                        errors.studentName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.studentName && (
                      <p className={`text-red-500 text-xs font-bold mt-1 ${isHindi ? 'font-devanagari text-[12.5px]' : ''}`}>
                        ⚠️ {errors.studentName}
                      </p>
                    )}
                  </div>

                  {/* Parent name */}
                  <div>
                    <label className={`block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ${isHindi ? 'font-devanagari text-[13px]' : ''}`}>
                      {t('admissions.labels.parentName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formValues.parentName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-accent text-sm ${
                        errors.parentName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.parentName && (
                      <p className={`text-red-500 text-xs font-bold mt-1 ${isHindi ? 'font-devanagari text-[12.5px]' : ''}`}>
                        ⚠️ {errors.parentName}
                      </p>
                    )}
                  </div>

                  {/* Class selection dropdown */}
                  <div>
                    <label className={`block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ${isHindi ? 'font-devanagari text-[13px]' : ''}`}>
                      {t('admissions.labels.classApplying')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="classApplying"
                      value={formValues.classApplying}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-accent text-sm bg-white ${
                        errors.classApplying ? 'border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">-- {t('admissions.labels.selectClass')} --</option>
                      {schoolClasses.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                    {errors.classApplying && (
                      <p className={`text-red-500 text-xs font-bold mt-1 ${isHindi ? 'font-devanagari text-[12.5px]' : ''}`}>
                        ⚠️ {errors.classApplying}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className={`block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ${isHindi ? 'font-devanagari text-[13px]' : ''}`}>
                      {t('admissions.labels.mobileNumber')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formValues.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-accent text-sm ${
                        errors.mobileNumber ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className={`text-red-500 text-xs font-bold mt-1 ${isHindi ? 'font-devanagari text-[12.5px]' : ''}`}>
                        ⚠️ {errors.mobileNumber}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 bg-accent text-primary-dark hover:bg-lime-400 font-extrabold rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-6 ${
                      isHindi ? 'font-devanagari text-[16px]' : ''
                    } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? t('admissions.labels.submitting') : t('admissions.labels.submit')}
                  </button>
                </form>
              </>
            ) : (
              // 2. Success Ticket Confirmation State
              <div className="flex flex-col items-center text-center py-6">
                <div className="text-success bg-green-50 p-4 rounded-full border border-green-100 shadow-inner mb-6">
                  <CheckCircle2 size={48} className="stroke-[2.5]" />
                </div>

                <h3 className={`text-2xl font-bold text-primary mb-3 ${isHindi ? 'font-devanagari leading-normal' : 'font-serif'}`}>
                  {t('admissions.labels.successTitle')}
                </h3>

                <p className={`text-slate-500 text-sm leading-relaxed mb-6 px-4 ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
                  {t('admissions.labels.successMsg')}{' '}
                  <strong className="text-primary font-sans">
                    +91 {successData.phone}
                  </strong>
                  .
                </p>

                {/* Styled Ticket */}
                <div className="w-full max-w-sm bg-accent-light/40 border-2 border-dashed border-accent/40 rounded-xl p-5 mb-8 relative overflow-hidden font-sans">
                  {/* Decorative tickets holes */}
                  <div className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 w-5 h-5 bg-white border-r border-accent/30 rounded-full" />
                  <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 w-5 h-5 bg-white border-l border-accent/30 rounded-full" />
                  
                  <div className="flex justify-between items-center border-b border-accent/20 pb-3 mb-3 text-xs font-semibold text-slate-500">
                    <span>VIDYA VIHAR ENQUIRY</span>
                    <Ticket size={16} className="text-accent" />
                  </div>

                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">STUDENT NAME:</span>
                      <span className="text-sm font-bold text-primary uppercase">{formValues.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">CLASS ENQUIRY:</span>
                      <span className="text-sm font-bold text-primary">{formValues.classApplying}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">PARENT NAME:</span>
                      <span className="text-sm font-bold text-primary uppercase">{formValues.parentName}</span>
                    </div>
                  </div>

                  <div className="border-t border-accent/20 pt-3.5 mt-3.5 text-center">
                    <span className="text-[10px] text-slate-400 block tracking-widest uppercase">
                      {t('admissions.labels.ticketNum')}
                    </span>
                    <span className="text-lg font-extrabold text-primary font-mono tracking-wider mt-1 block">
                      {successData.ticketId}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleResetForm}
                  className={`px-5 py-2.5 bg-primary text-cream hover:bg-primary-dark font-semibold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                    isHindi ? 'font-devanagari text-[13px]' : ''
                  }`}
                >
                  {isHindi ? 'दूसरा फॉर्म जमा करें' : 'Submit Another Enquiry'}
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
