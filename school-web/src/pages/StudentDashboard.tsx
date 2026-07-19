import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut, Award, ListTodo, Flame, Users } from 'lucide-react';

type SegmentType = 'primary' | 'middle' | 'senior';
type MediumType = 'english' | 'hindi' | 'both';
type TabType = 'attendance' | 'performance' | 'assignments' | 'result' | 'lectures';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [studentName, setStudentName] = useState('');
  
  // States from your hand-drawn sketch
  const [selectedSegment, setSelectedSegment] = useState<SegmentType>('senior');
  const [selectedMedium, setSelectedMedium] = useState<MediumType>('english');
  const [activeTab, setActiveTab] = useState<TabType>('lectures');

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      navigate('/portal/student');
      return;
    }
    const user = JSON.parse(cachedUser);
    if (user.role !== 'student') {
      navigate('/portal');
      return;
    }
    setStudentName(user.name);
    if (user.medium) {
      setSelectedMedium(user.medium);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/portal');
  };

  // Mock schedule data depending on selection
  const getLecturesList = () => {
    if (selectedSegment === 'primary') {
      return [
        { period: '1st Period', time: '08:30 AM - 09:15 AM', subjectEn: 'Mathematics (Basic Arithmetic)', subjectHi: 'गणित (बुनियादी अंकगणित)', room: 'Room 101' },
        { period: '2nd Period', time: '09:15 AM - 10:00 AM', subjectEn: 'Environmental Studies (EVS)', subjectHi: 'पर्यावरण अध्ययन (EVS)', room: 'Room 101' },
        { period: '3rd Period', time: '10:15 AM - 11:00 AM', subjectEn: 'Hindi Grammar', subjectHi: 'हिंदी व्याकरण', room: 'Room 101' },
        { period: '4th Period', time: '11:00 AM - 11:45 AM', subjectEn: 'English Recitation', subjectHi: 'अंग्रेजी कविता पाठ', room: 'Room 102' }
      ];
    } else if (selectedSegment === 'middle') {
      return [
        { period: '1st Period', time: '08:30 AM - 09:15 AM', subjectEn: 'General Science', subjectHi: 'सामान्य विज्ञान', room: 'Lab A' },
        { period: '2nd Period', time: '09:15 AM - 10:00 AM', subjectEn: 'Social Science (Geography)', subjectHi: 'सामाजिक विज्ञान (भूगोल)', room: 'Room 204' },
        { period: '3rd Period', time: '10:15 AM - 11:00 AM', subjectEn: 'Sanskrit Grammar', subjectHi: 'संस्कृत व्याकरण', room: 'Room 204' },
        { period: '4th Period', time: '11:00 AM - 11:45 AM', subjectEn: 'Computer Literacy', subjectHi: 'कंप्यूटर साक्षरता', room: 'IT Lab' }
      ];
    } else {
      return [
        { period: '1st Period', time: '08:30 AM - 09:15 AM', subjectEn: 'Physics (Mechanics)', subjectHi: 'भौतिक विज्ञान (यांत्रिकी)', room: 'Physics Lab' },
        { period: '2nd Period', time: '09:15 AM - 10:00 AM', subjectEn: 'Chemistry (Organic)', subjectHi: 'रसायन विज्ञान (कार्बनिक)', room: 'Chemistry Lab' },
        { period: '3rd Period', time: '10:15 AM - 11:00 AM', subjectEn: 'Mathematics (Calculus)', subjectHi: 'गणित (कलन)', room: 'Room 302' },
        { period: '4th Period', time: '11:00 AM - 11:45 AM', subjectEn: 'English Core (Literature)', subjectHi: 'अंग्रेजी कोर (साहित्य)', room: 'Room 302' }
      ];
    }
  };

  const getAssignments = () => {
    if (selectedSegment === 'primary') {
      return [
        { titleEn: 'Draw and color seasonal fruits', titleHi: 'मौसमी फलों का चित्र बनाकर रंग भरें', due: 'Tomorrow' },
        { titleEn: 'Learn tables from 2 to 10', titleHi: '2 से 10 तक पहाड़ा याद करें', due: 'In 2 days' }
      ];
    } else if (selectedSegment === 'middle') {
      return [
        { titleEn: 'Sanskrit translation exercise (Ch 4)', titleHi: 'संस्कृत अनुवाद अभ्यास (अध्याय 4)', due: 'Monday' },
        { titleEn: 'Define photosynthesis in notebook', titleHi: 'नोटबुक में प्रकाश संश्लेषण की व्याख्या करें', due: 'In 3 days' }
      ];
    } else {
      return [
        { titleEn: 'Solve Physics Mechanics worksheet 3.2', titleHi: 'भौतिकी यांत्रिकी कार्यपत्रक 3.2 हल करें', due: 'Tomorrow' },
        { titleEn: 'Chemistry Organic reaction mechanisms log', titleHi: 'रसायन विज्ञान कार्बनिक प्रतिक्रिया तंत्र लॉग', due: 'Next week' }
      ];
    }
  };

  const getPerformance = () => {
    return {
      rankEn: '4th in Class Section',
      rankHi: 'कक्षा संभाग में चौथा स्थान',
      gpa: '9.2 / 10.0',
      streakEn: '15 Days Coding Streak',
      streakHi: '15 दिनों की कोडिंग निरंतरता'
    };
  };

  return (
    <div className="py-12 md:py-16 bg-cream min-h-[calc(100vh-100px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-primary text-cream p-6 sm:p-8 rounded-xl border border-accent/25 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <span className="text-[10px] text-accent font-bold uppercase tracking-widest block font-sans">
              🎓 {isHindi ? 'छात्र पोर्टल सक्रिय सत्र' : 'ACTIVE STUDENT PORTAL SESSION'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-sans mt-1">
              {isHindi ? `स्वागत है, ${studentName}` : `Welcome, ${studentName}`}
            </h2>
            <span className="text-xs text-cream-dark/75 mt-0.5 block">
              Vidya Vihar Inter College Student Dashboard
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

        {/* Dynamic Class Segment and Medium Selectors (For ease of Student use, as requested) */}
        <div className="bg-white p-6 rounded-lg border border-slate-200/50 shadow-xs mb-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center font-sans text-left">
          
          {/* Class Segments (K-5, 6-8, 9-12) */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              🏫 {isHindi ? 'कक्षा वर्ग चुनें' : 'Select Class Level'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSegment('primary')}
                className={`px-4 py-2 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                  selectedSegment === 'primary'
                    ? 'bg-primary text-cream border-primary shadow-xs'
                    : 'bg-cream/40 text-slate-600 border-slate-200 hover:bg-cream/70'
                }`}
              >
                {isHindi ? 'प्राथमिक (1 - 5)' : 'Primary (1 - 5)'}
              </button>
              <button
                onClick={() => setSelectedSegment('middle')}
                className={`px-4 py-2 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                  selectedSegment === 'middle'
                    ? 'bg-primary text-cream border-primary shadow-xs'
                    : 'bg-cream/40 text-slate-600 border-slate-200 hover:bg-cream/70'
                }`}
              >
                {isHindi ? 'माध्यमिक (6 - 8)' : 'Middle (6 - 8)'}
              </button>
              <button
                onClick={() => setSelectedSegment('senior')}
                className={`px-4 py-2 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                  selectedSegment === 'senior'
                    ? 'bg-primary text-cream border-primary shadow-xs'
                    : 'bg-cream/40 text-slate-600 border-slate-200 hover:bg-cream/70'
                }`}
              >
                {isHindi ? 'उच्च माध्यमिक (9 - 12)' : 'High / Inter (9 - 12)'}
              </button>
            </div>
          </div>

          {/* Medium selectors (English, Hindi, Both) */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              🌐 {isHindi ? 'माध्यम चुनें' : 'Select Medium / Language'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMedium('english')}
                className={`px-4 py-2 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                  selectedMedium === 'english'
                    ? 'bg-accent text-primary-dark border-accent shadow-xs'
                    : 'bg-cream/40 text-slate-600 border-slate-200 hover:bg-cream/70'
                }`}
              >
                English Medium
              </button>
              <button
                onClick={() => setSelectedMedium('hindi')}
                className={`px-4 py-2 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                  selectedMedium === 'hindi'
                    ? 'bg-accent text-primary-dark border-accent shadow-xs'
                    : 'bg-cream/40 text-slate-600 border-slate-200 hover:bg-cream/70'
                }`}
              >
                Hindi Medium
              </button>
              <button
                onClick={() => setSelectedMedium('both')}
                className={`px-4 py-2 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                  selectedMedium === 'both'
                    ? 'bg-accent text-primary-dark border-accent shadow-xs'
                    : 'bg-cream/40 text-slate-600 border-slate-200 hover:bg-cream/70'
                }`}
              >
                {isHindi ? 'दोनों (Both)' : 'Both'}
              </button>
            </div>
          </div>

        </div>

        {/* Notebook-Style Tabbed Content Section */}
        <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm overflow-hidden flex flex-col">
          
          {/* Notebook Tab Bar (Attendance, Performance, Assignments, Result, Lectures) */}
          <div className="bg-slate-50 border-b border-slate-100 grid grid-cols-5 font-sans text-xs font-bold text-center">
            
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-4 transition-all border-b-3 cursor-pointer ${
                activeTab === 'attendance'
                  ? 'border-primary text-primary bg-white'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              📊 {isHindi ? 'उपस्थिति (Atte)' : 'Attendance (Atte)'}
            </button>

            <button
              onClick={() => setActiveTab('performance')}
              className={`py-4 transition-all border-b-3 cursor-pointer ${
                activeTab === 'performance'
                  ? 'border-primary text-primary bg-white'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              🔥 {isHindi ? 'प्रदर्शन (Perf)' : 'Performance (Perf)'}
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`py-4 transition-all border-b-3 cursor-pointer ${
                activeTab === 'assignments'
                  ? 'border-primary text-primary bg-white'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              📝 {isHindi ? 'गृहकार्य (Assig)' : 'Assignments (Assig)'}
            </button>

            <button
              onClick={() => setActiveTab('result')}
              className={`py-4 transition-all border-b-3 cursor-pointer ${
                activeTab === 'result'
                  ? 'border-primary text-primary bg-white'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              🏆 {isHindi ? 'परिणाम' : 'Result'}
            </button>

            <button
              onClick={() => setActiveTab('lectures')}
              className={`py-4 transition-all border-b-3 cursor-pointer ${
                activeTab === 'lectures'
                  ? 'border-primary text-primary bg-white'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              📖 {isHindi ? 'व्याख्यान (Lectures)' : 'Lectures'}
            </button>

          </div>

          {/* Active Tab Frame Panel */}
          <div className="p-6 sm:p-8 text-left min-h-[300px]">
            
            {/* 1. LECTURES TAB */}
            {activeTab === 'lectures' && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <h4 className="text-base font-bold text-primary">
                    📅 {isHindi ? 'दैनिक व्याख्यान कार्यक्रम' : 'Today\'s Lecture Timetable'}
                  </h4>
                  <span className="text-xs text-slate-400 font-bold tracking-wider">
                    {selectedSegment.toUpperCase()} • {selectedMedium.toUpperCase()} MEDIUM
                  </span>
                </div>

                <div className="space-y-4">
                  {getLecturesList().map((lec, idx) => {
                    // Decide subject text translation based on medium choice
                    const subjectText = 
                      selectedMedium === 'english' 
                        ? lec.subjectEn 
                        : selectedMedium === 'hindi' 
                          ? lec.subjectHi 
                          : `${lec.subjectEn} / ${lec.subjectHi}`;

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-accent/30 transition-all gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary text-cream px-3 py-1 rounded text-xs font-extrabold uppercase">
                            {lec.period}
                          </div>
                          <div>
                            <span className="font-bold text-primary text-sm sm:text-base block">{subjectText}</span>
                            <span className="text-[10px] text-slate-400 font-semibold block sm:hidden">{lec.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 text-xs text-slate-500">
                          <span className="hidden sm:inline-block font-semibold">{lec.time}</span>
                          <span className="bg-cream border border-slate-200 px-2 py-0.5 rounded font-bold text-slate-600">
                            {lec.room}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. ATTENDANCE TAB */}
            {activeTab === 'attendance' && (
              <div className="space-y-6 animate-fade-in font-sans">
                <h4 className="text-base font-bold text-primary border-b border-slate-50 pb-2">
                  📊 {isHindi ? 'कक्षा उपस्थिति रिपोर्ट' : 'Student Attendance Metrics'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Attendance Meter */}
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 flex flex-col justify-center items-center text-center">
                    <div className="text-4xl font-black text-primary mb-2">92.4%</div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {isHindi ? 'कुल मासिक उपस्थिति' : 'Cumulative Attendance'}
                    </span>
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-3">
                      🟢 {isHindi ? 'सुरक्षित सीमा (85% से अधिक)' : 'SAFE SEGMENT (Above 85%)'}
                    </span>
                  </div>

                  {/* Summary grid */}
                  <div className="space-y-3 justify-center flex flex-col">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs text-slate-500 font-semibold">Total Lectures Logged</span>
                      <span className="font-bold text-primary">120 Sessions</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs text-slate-500 font-semibold">Days Attended</span>
                      <span className="font-bold text-green-600">111 Classes</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs text-slate-500 font-semibold">Days Absent</span>
                      <span className="font-bold text-red-600">9 Classes</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 3. ASSIGNMENTS TAB */}
            {activeTab === 'assignments' && (
              <div className="space-y-6 animate-fade-in font-sans">
                <h4 className="text-base font-bold text-primary border-b border-slate-50 pb-2">
                  📝 {isHindi ? 'लंबित कार्य और होमवर्क' : 'Active Homework & Tasks'}
                </h4>

                <div className="space-y-3">
                  {getAssignments().map((ass, idx) => {
                    const taskTitle = 
                      selectedMedium === 'english' 
                        ? ass.titleEn 
                        : selectedMedium === 'hindi' 
                          ? ass.titleHi 
                          : `${ass.titleEn} / ${ass.titleHi}`;

                    return (
                      <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3">
                          <ListTodo className="text-accent shrink-0 mt-0.5" size={16} />
                          <div>
                            <span className="font-bold text-primary block text-sm sm:text-base">{taskTitle}</span>
                            <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase">Academic Task</span>
                          </div>
                        </div>
                        <span className="bg-red-50 text-red-700 border border-red-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0">
                          Due: {ass.due}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. PERFORMANCE TAB */}
            {activeTab === 'performance' && (
              <div className="space-y-6 animate-fade-in font-sans">
                <h4 className="text-base font-bold text-primary border-b border-slate-50 pb-2">
                  🔥 {isHindi ? 'शैक्षणिक और को-करिकुलर प्रदर्शन' : 'Performance Analytics'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                    <Award size={24} className="text-accent mx-auto mb-2" />
                    <span className="text-xl font-black text-primary block">{getPerformance().gpa}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mt-1">Class GPA score</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                    <Users size={24} className="text-accent mx-auto mb-2" />
                    <span className="text-sm font-bold text-primary block leading-tight py-1">
                      {selectedMedium === 'hindi' ? getPerformance().rankHi : getPerformance().rankEn}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mt-1">Academic Rank</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                    <Flame size={24} className="text-accent mx-auto mb-2" />
                    <span className="text-sm font-bold text-primary block leading-tight py-1">
                      {selectedMedium === 'hindi' ? getPerformance().streakHi : getPerformance().streakEn}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mt-1">Consistency log</span>
                  </div>

                </div>
              </div>
            )}

            {/* 5. RESULTS TAB */}
            {activeTab === 'result' && (
              <div className="space-y-6 animate-fade-in font-sans">
                <h4 className="text-base font-bold text-primary border-b border-slate-50 pb-2">
                  🏆 {isHindi ? 'परीक्षा परिणाम पत्र' : 'Academic Marks Ledger'}
                </h4>

                <div className="overflow-x-auto border border-slate-150 rounded-lg">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider py-2">
                        <th className="py-2.5 px-4">TEST TYPE</th>
                        <th className="py-2.5 px-4">MAX MARKS</th>
                        <th className="py-2.5 px-4">MARKS SECURED</th>
                        <th className="py-2.5 px-4">PERCENTAGE</th>
                        <th className="py-2.5 px-4 text-center">GRADE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr>
                        <td className="py-3 px-4 font-bold text-primary">Unit Test 1 (July 2026)</td>
                        <td className="py-3 px-4 text-slate-500">100</td>
                        <td className="py-3 px-4 font-bold text-primary">94</td>
                        <td className="py-3 px-4 text-slate-500">94.0%</td>
                        <td className="py-3 px-4 text-center text-green-700 font-bold">A+</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-primary">Unit Test 2 (Scheduled)</td>
                        <td className="py-3 px-4 text-slate-500">100</td>
                        <td className="py-3 px-4 text-slate-400 italic">Pending</td>
                        <td className="py-3 px-4 text-slate-400 italic">-</td>
                        <td className="py-3 px-4 text-center text-slate-400 font-bold">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
