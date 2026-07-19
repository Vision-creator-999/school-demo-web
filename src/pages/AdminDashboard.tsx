import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileSpreadsheet, Download, RefreshCw, LogOut, CheckCircle2, AlertTriangle, Database, Users, GraduationCap, Clock } from 'lucide-react';


interface ParsedStudentRow {
  id: number;
  name: string;
  roll: string;
  dob: string;
  email: string;
  status: 'valid' | 'warning';
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [adminName, setAdminName] = useState('');
  const [activeTab, setActiveTab] = useState<'import' | 'backup'>('import');

  // Excel Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedStudentRow[]>([]);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authenticate Admin
  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      navigate('/portal/admin');
      return;
    }
    const user = JSON.parse(cachedUser);
    if (user.role !== 'admin') {
      navigate('/portal');
      return;
    }
    setAdminName(user.name);
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
        setSelectedFile(file);
        setImportSuccess(false);
        setParsedRows([]);
        processMockExcel();
      } else {
        alert(isHindi ? 'कृपया केवल एक्सेल (.xlsx) या .csv फाइल अपलोड करें।' : 'Please upload only Excel (.xlsx) or CSV files.');
      }
    }
  };

  const processMockExcel = () => {
    setIsProcessing(true);
    // Simulate Excel parsing delay
    setTimeout(() => {
      setIsProcessing(false);
      setParsedRows([
        { id: 1, name: 'Aarav Pandey', roll: 'VV-2026-0815', dob: '2009-08-15', email: 'aarav@vidyavihar.org', status: 'valid' },
        { id: 2, name: 'Anjali Singh', roll: 'VV-2026-0228', dob: '2010-02-28', email: 'anjali@vidyavihar.org', status: 'valid' },
        { id: 3, name: 'Rohan Verma', roll: 'VV-2026-1112', dob: '2009-11-12', email: 'rohan@vidyavihar.org', status: 'valid' },
        { id: 4, name: 'Neha Gupta', roll: 'VV-2026-0418', dob: '2010-04-18', email: 'neha@vidyavihar.org', status: 'valid' },
        { id: 5, name: 'Vikram Malhotra', roll: 'VV-2026-0925', dob: '2009-09-25', email: 'vikram@vidyavihar.org', status: 'valid' },
        { id: 6, name: 'Siddharth Rao', roll: '', dob: '2009-06-14', email: 'sid@vidyavihar.org', status: 'warning' } // missing roll
      ]);
    }, 1500);
  };

  const handleCommitImport = () => {
    if (parsedRows.length === 0) return;
    setIsProcessing(true);
    // Simulate database insertion (calling API POST /api/admin/import/students)
    setTimeout(() => {
      setIsProcessing(false);
      setImportSuccess(true);
      setParsedRows([]);
      setSelectedFile(null);
    }, 1800);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/portal');
  };

  return (
    <div className="py-12 md:py-16 bg-cream min-h-[calc(100vh-100px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-primary text-cream p-6 sm:p-8 rounded-xl border border-accent/25 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <span className="text-[10px] text-accent font-bold uppercase tracking-widest block font-sans">
              🔒 PRIVILEGED ADMINISTRATOR CONTROL PANEL
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-sans mt-1">
              {isHindi ? `स्वागत है, ${adminName}` : `Welcome, ${adminName}`}
            </h2>
            <span className="text-xs text-cream-dark/75 mt-0.5 block">
              Vidya Vihar Inter College School Management System (SMS)
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-dark/80 hover:bg-red-900 border border-white/10 rounded-md text-xs font-bold uppercase tracking-wider text-cream transition-colors cursor-pointer font-sans"
          >
            <LogOut size={14} />
            <span>{isHindi ? 'लॉगआउट' : 'Sign Out'}</span>
          </button>
        </div>

        {/* System Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 font-sans">
          
          <div className="bg-white p-5 rounded-lg border border-slate-200/40 shadow-xs flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase">Total Students</span>
              <span className="text-xl font-extrabold text-primary block mt-0.5">1,250</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200/40 shadow-xs flex items-center gap-4">
            <div className="bg-blue-50 text-blue-700 p-3 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase">Educators</span>
              <span className="text-xl font-extrabold text-primary block mt-0.5">45</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200/40 shadow-xs flex items-center gap-4">
            <div className="bg-purple-50 text-purple-700 p-3 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase">Pending Enquiries</span>
              <span className="text-xl font-extrabold text-primary block mt-0.5">12</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200/40 shadow-xs flex items-center gap-4">
            <div className="bg-amber-50 text-amber-700 p-3 rounded-lg">
              <Database size={24} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase">DB Backups</span>
              <span className="text-sm font-bold text-secondary block mt-1.5 uppercase tracking-wide">🟢 100% OK</span>
            </div>
          </div>

        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 mb-8 gap-4 font-sans text-sm font-bold">
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 border-b-2 px-2 transition-all cursor-pointer ${
              activeTab === 'import' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            📥 {isHindi ? 'एक्सेल बल्क इम्पोर्ट' : 'Excel Bulk Import'}
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-3 border-b-2 px-2 transition-all cursor-pointer ${
              activeTab === 'backup' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            💾 {isHindi ? 'बैकअप और ऑडिट लॉग्स' : 'Database backups & Logs'}
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'import' ? (
          
          <div className="bg-white rounded-lg border border-slate-200/50 p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Widget Info */}
            <div className="text-left space-y-1.5 border-b border-slate-50 pb-4">
              <h3 className={`text-xl font-bold text-primary ${isHindi ? 'font-devanagari' : 'font-sans'}`}>
                📄 {isHindi ? 'नया छात्र दाखिला अपलोड करें' : 'Upload Student Intake Sheets'}
              </h3>
              <p className={`text-slate-400 text-xs sm:text-sm leading-relaxed ${isHindi ? 'font-devanagari text-[14.5px]' : ''}`}>
                {isHindi
                  ? 'छात्र डेटा को बल्क अपलोड करने के लिए एक्सेल टेम्पलेट (.xlsx) डाउनलोड करें, उसे भरें और यहाँ ड्रैग/ड्रॉप करें।'
                  : 'Download the Excel onboarding template, fill out student rows, and upload the spreadsheet to bulk register students.'}
              </p>
            </div>

            {importSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2.5 animate-fade-in font-sans">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>{isHindi ? '5 नए छात्र रिकॉर्ड्स सफलतापूर्वक डेटाबेस में संग्रहीत किए गए!' : '5 new student profiles saved to PostgreSQL database successfully!'}</span>
              </div>
            )}

            {/* Drag-and-drop file container */}
            <div
              onClick={triggerFileSelect}
              className={`border-3 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                selectedFile ? 'border-primary bg-emerald-50/10' : 'border-slate-200 hover:border-accent hover:bg-slate-50/50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
                className="hidden"
              />
              <FileSpreadsheet size={48} className="text-accent mb-4 animate-pulse" />
              
              <div className="font-sans text-sm font-bold text-primary mb-1">
                {selectedFile ? selectedFile.name : (isHindi ? 'एक्सेल फाइल चुनें या ड्रैग करें' : 'Select or Drop Excel Spreadsheet')}
              </div>
              <span className="font-sans text-xs text-slate-400">
                {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Formats supported: .xlsx, .xls, .csv'}
              </span>
            </div>

            {/* Processing state loader */}
            {isProcessing && (
              <div className="flex items-center justify-center gap-3 py-6 font-sans text-sm text-primary font-bold">
                <RefreshCw size={20} className="animate-spin text-accent" />
                <span>{isHindi ? 'एक्सेल शीट को पार्स और वैलिडेट किया जा रहा है...' : 'Parsing spreadsheet and running structural validations...'}</span>
              </div>
            )}

            {/* Parsed spreadsheet preview table */}
            {parsedRows.length > 0 && !isProcessing && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-sans text-sm font-bold text-primary text-left uppercase tracking-wide">
                  📋 Spreadsheet Parsing Preview (Showing first 6 rows)
                </h4>

                <div className="overflow-x-auto border border-slate-100 rounded-lg">
                  <table className="w-full text-left text-sm border-collapse font-sans">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">FULL NAME</th>
                        <th className="py-3 px-4">ROLL NUMBER</th>
                        <th className="py-3 px-4">DOB</th>
                        <th className="py-3 px-4">EMAIL</th>
                        <th className="py-3 px-4 text-center">VALIDATION STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {parsedRows.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-bold text-primary">{row.name}</td>
                          <td className="py-3 px-4 font-mono text-xs">{row.roll || <span className="text-red-500 italic">Missing</span>}</td>
                          <td className="py-3 px-4 text-xs text-slate-500">{row.dob}</td>
                          <td className="py-3 px-4 text-xs text-slate-500">{row.email}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              {row.status === 'valid' ? (
                                <span className="flex items-center gap-1 text-[10px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-bold uppercase">
                                  <CheckCircle2 size={10} />
                                  <span>Ready</span>
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold uppercase">
                                  <AlertTriangle size={10} />
                                  <span>Warning</span>
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => { setParsedRows([]); setSelectedFile(null); }}
                    className="px-5 py-2.5 border border-slate-200 hover:border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-500 rounded-md transition-colors cursor-pointer font-sans"
                  >
                    {isHindi ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleCommitImport}
                    className="px-6 py-2.5 bg-primary text-cream hover:bg-primary-dark font-extrabold rounded-md shadow-sm text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer font-sans"
                  >
                    <Download size={14} />
                    {isHindi ? 'डेटाबेस में इम्पोर्ट करें' : 'Import Validated to SQL DB'}
                  </button>
                </div>

              </div>
            )}

          </div>
        ) : (
          // System Backups layout
          <div className="bg-white rounded-lg border border-slate-200/50 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className={`text-lg font-bold text-primary ${isHindi ? 'font-devanagari text-xl' : 'font-sans'}`}>
              💾 {isHindi ? 'डेटाबेस स्वचालित बैकअप रजिस्टर' : 'Automated Database Backups'}
            </h3>
            
            <div className="space-y-4 font-sans text-sm text-left">
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 text-emerald-800 rounded-md">
                ⚡ **Cloud Storage Destination:** Amazon S3 (ap-south-1 Mumbai bucket: `vv-backup-r2-prod`) - **Operational**
              </div>

              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase py-2">
                      <th className="py-2.5 px-4">BACKUP FILE NAME</th>
                      <th className="py-2.5 px-4">SIZE</th>
                      <th className="py-2.5 px-4">TIMESTAMP</th>
                      <th className="py-2.5 px-4 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-3 px-4 font-mono">vv_sms_db_dump_2026-07-19.sql.gz</td>
                      <td className="py-3 px-4 text-slate-500">14.8 MB</td>
                      <td className="py-3 px-4 text-slate-500">2026-07-19 02:00 AM</td>
                      <td className="py-3 px-4 text-center text-green-600 font-bold">🟢 Completed</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono">vv_sms_db_dump_2026-07-18.sql.gz</td>
                      <td className="py-3 px-4 text-slate-500">14.6 MB</td>
                      <td className="py-3 px-4 text-slate-500">2026-07-18 02:00 AM</td>
                      <td className="py-3 px-4 text-center text-green-600 font-bold">🟢 Completed</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono">vv_sms_db_dump_2026-07-17.sql.gz</td>
                      <td className="py-3 px-4 text-slate-500">14.2 MB</td>
                      <td className="py-3 px-4 text-slate-500">2026-07-17 02:00 AM</td>
                      <td className="py-3 px-4 text-center text-green-600 font-bold">🟢 Completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
