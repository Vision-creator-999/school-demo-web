import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, X, Clock, LogOut, UserCheck, CheckCircle } from 'lucide-react';

interface StudentRosterItem {
  id: number;
  roll: string;
  nameEn: string;
  nameHi: string;
  gender: string;
}

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [teacherName, setTeacherName] = useState('');
  const [selectedSection, setSelectedSection] = useState('11-pcm');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Attendance States: Mapping student ID -> 'present' | 'absent' | 'late'
  const [attendanceMap, setAttendanceMap] = useState<Record<number, 'present' | 'absent' | 'late'>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Authenticate check
  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      navigate('/portal/teacher');
      return;
    }
    const user = JSON.parse(cachedUser);
    if (user.role !== 'teacher') {
      navigate('/portal');
      return;
    }
    setTeacherName(user.name);
  }, [navigate]);

  // Mock Students Database
  const studentsRoster: StudentRosterItem[] = [
    { id: 101, roll: '26-PCM-01', nameEn: 'Aarav Pandey', nameHi: 'आरव पांडेय', gender: 'M' },
    { id: 102, roll: '26-PCM-02', nameEn: 'Anjali Singh', nameHi: 'अंजलि सिंह', gender: 'F' },
    { id: 103, roll: '26-PCM-03', nameEn: 'Rohan Verma', nameHi: 'रोहन वर्मा', gender: 'M' },
    { id: 104, roll: '26-PCM-04', nameEn: 'Neha Gupta', nameHi: 'नेहा गुप्ता', gender: 'F' },
    { id: 105, roll: '26-PCM-05', nameEn: 'Vikram Malhotra', nameHi: 'विक्रम मल्होत्रा', gender: 'M' },
    { id: 106, roll: '26-PCM-06', nameEn: 'Priya Sharma', nameHi: 'प्रिया शर्मा', gender: 'F' }
  ];

  // Initialize all students as 'present' by default
  useEffect(() => {
    const initialMap: Record<number, 'present' | 'absent' | 'late'> = {};
    studentsRoster.forEach((std) => {
      initialMap[std.id] = 'present';
    });
    setAttendanceMap(initialMap);
  }, []);

  const handleStatusChange = (studentId: number, status: 'present' | 'absent' | 'late') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: 'present' | 'absent' | 'late') => {
    const nextMap: Record<number, 'present' | 'absent' | 'late'> = {};
    studentsRoster.forEach((std) => {
      nextMap[std.id] = status;
    });
    setAttendanceMap(nextMap);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg('');

    // Prepare API Payload structure
    const records = Object.keys(attendanceMap).map((id) => ({
      studentId: parseInt(id),
      status: attendanceMap[parseInt(id)]
    }));

    // Simulate sending to backend POST /api/teacher/attendance
    setTimeout(() => {
      setIsSubmitting(false);
      
      const counts = records.reduce(
        (acc, curr) => {
          acc[curr.status]++;
          return acc;
        },
        { present: 0, absent: 0, late: 0 }
      );

      setSuccessMsg(
        isHindi
          ? `दैनिक हाजिरी सफलतापूर्वक दर्ज की गई! (उपस्थित: ${counts.present}, अनुपस्थित: ${counts.absent}, विलंब: ${counts.late})`
          : `Daily register submitted successfully! (P: ${counts.present}, A: ${counts.absent}, L: ${counts.late})`
      );
      
      // Auto-hide alert after 6s
      setTimeout(() => setSuccessMsg(''), 6000);
    }, 1200);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/portal');
  };

  return (
    <div className="py-12 md:py-16 bg-cream min-h-[calc(100vh-100px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header bar */}
        <div className="bg-primary text-cream p-6 sm:p-8 rounded-xl border border-accent/25 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <span className="text-[10px] text-accent font-bold uppercase tracking-widest block font-sans">
              💻 ACTIVE TEACHER PORTAL SESSION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-sans mt-1">
              {isHindi ? `स्वागत है, ${teacherName}` : `Welcome, ${teacherName}`}
            </h2>
            <span className="text-xs text-cream-dark/75 mt-0.5 block">
              Vidya Vihar Inter College Staff Directory
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

        {/* Dashboard Panels Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Class selection info */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-slate-200/50 shadow-sm space-y-6">
            <h3 className={`text-lg font-bold text-primary pb-2 border-b border-slate-100 ${isHindi ? 'font-devanagari' : 'font-sans'}`}>
              📂 {isHindi ? 'कक्षा और दिनांक चुनें' : 'Select Class & Date'}
            </h3>

            <div className="space-y-4 font-sans text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isHindi ? 'कक्षा संभाग' : 'Class Section'}
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-accent text-sm bg-white"
                >
                  <option value="11-pcm">Class 11 A - Science (PCM)</option>
                  <option value="11-pcb">Class 11 B - Science (PCB)</option>
                  <option value="11-com">Class 11 C - Commerce</option>
                  <option value="12-pcm">Class 12 A - Science (PCM)</option>
                  <option value="12-pcb">Class 12 B - Science (PCB)</option>
                  <option value="12-com">Class 12 C - Commerce</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isHindi ? 'रजिस्टर की दिनांक' : 'Register Date'}
                </label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-accent text-sm"
                />
              </div>
            </div>

            {/* Quick bulk marks buttons */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider text-left">
                {isHindi ? 'त्वरित संशोधन' : 'Quick Mass Actions'}
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                <button
                  onClick={() => handleMarkAll('present')}
                  className="py-1.5 px-2 bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100/60 cursor-pointer"
                >
                  {isHindi ? 'सभी उपस्थित' : 'All Present'}
                </button>
                <button
                  onClick={() => handleMarkAll('absent')}
                  className="py-1.5 px-2 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100/60 cursor-pointer"
                >
                  {isHindi ? 'सभी अनुपस्थित' : 'All Absent'}
                </button>
                <button
                  onClick={() => handleMarkAll('late')}
                  className="py-1.5 px-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded hover:bg-yellow-100/60 cursor-pointer"
                >
                  {isHindi ? 'सभी विलंब' : 'All Late'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel: Attendance student list */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-lg border border-slate-200/50 shadow-sm">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100 mb-6">
              <h3 className={`text-lg font-bold text-primary ${isHindi ? 'font-devanagari' : 'font-sans'}`}>
                📝 {isHindi ? 'छात्र उपस्थिति नामावली' : 'Class Register'}
              </h3>
              <span className="text-xs bg-accent/25 text-primary px-3 py-1 rounded-full font-bold font-sans">
                🟢 Session: 2026-27
              </span>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2.5 animate-fade-in font-sans">
                <CheckCircle size={18} className="shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Attendance list form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="py-3 px-2 text-center w-12">ROLL</th>
                      <th className="py-3 px-4">STUDENT NAME</th>
                      <th className="py-3 px-2 text-center w-48">ATTENDANCE STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {studentsRoster.map((std) => {
                      const currentStatus = attendanceMap[std.id] || 'present';
                      return (
                        <tr key={std.id} className="hover:bg-slate-50/50 transition-colors">
                          {/* Roll */}
                          <td className="py-3.5 px-2 text-center text-xs font-bold text-slate-400">
                            {std.roll.split('-')[2]}
                          </td>
                          {/* Name */}
                          <td className="py-3.5 px-4 font-bold text-primary">
                            <div className="flex flex-col">
                              <span>{isHindi ? std.nameHi : std.nameEn}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{std.roll}</span>
                            </div>
                          </td>
                          {/* Status Toggles */}
                          <td className="py-3.5 px-2">
                            <div className="flex justify-center items-center gap-3">
                              {/* Present Check */}
                              <button
                                type="button"
                                onClick={() => handleStatusChange(std.id, 'present')}
                                className={`p-2 rounded-full border transition-all cursor-pointer ${
                                  currentStatus === 'present'
                                    ? 'bg-green-100 text-green-800 border-green-300 scale-110 shadow-xs'
                                    : 'border-slate-200 text-slate-400 hover:bg-slate-100'
                                }`}
                                title="Present"
                              >
                                <Check size={14} className="stroke-[2.5]" />
                              </button>

                              {/* Absent Check */}
                              <button
                                type="button"
                                onClick={() => handleStatusChange(std.id, 'absent')}
                                className={`p-2 rounded-full border transition-all cursor-pointer ${
                                  currentStatus === 'absent'
                                    ? 'bg-red-100 text-red-800 border-red-300 scale-110 shadow-xs'
                                    : 'border-slate-200 text-slate-400 hover:bg-slate-100'
                                }`}
                                title="Absent"
                              >
                                <X size={14} className="stroke-[2.5]" />
                              </button>

                              {/* Late Check */}
                              <button
                                type="button"
                                onClick={() => handleStatusChange(std.id, 'late')}
                                className={`p-2 rounded-full border transition-all cursor-pointer ${
                                  currentStatus === 'late'
                                    ? 'bg-yellow-100 text-yellow-800 border-yellow-300 scale-110 shadow-xs'
                                    : 'border-slate-200 text-slate-400 hover:bg-slate-100'
                                }`}
                                title="Late"
                              >
                                <Clock size={14} className="stroke-[2.5]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Submit attendance */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-primary hover:bg-primary-dark text-cream hover:text-white font-extrabold rounded-md shadow-sm transition-colors text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <UserCheck size={15} />
                  {isSubmitting ? (isHindi ? 'दर्ज किया जा रहा है...' : 'Saving register...') : (isHindi ? 'रजिस्टर दर्ज करें' : 'Submit Attendance')}
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
