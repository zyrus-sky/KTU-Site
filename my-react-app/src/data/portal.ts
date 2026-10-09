export const today = new Date('2026-10-09')

export const student = {
  name: 'Skyrus',
  regNo: 'STI23026',
  college: 'STIST',
  branch: 'Computer Science and Engineering',
  scheme: '2019 Scheme',
  semester: 'S7',
  cgpa: 8.46,
  credits: 132,
  totalCredits: 162,
  activityPoints: 84,
  backlogs: 1,
}

export const sgpa = [
  { sem: 'S1', value: 8.12 },
  { sem: 'S2', value: 8.31 },
  { sem: 'S3', value: 8.05 },
  { sem: 'S4', value: 8.72 },
  { sem: 'S5', value: 8.64 },
  { sem: 'S6', value: 8.9 },
]

export const timeline = [
  { date: '2026-07-27', title: 'Classes begin', note: 'S3, S5 and S7 odd semester' },
  { date: '2026-08-31', title: 'Series test 1', note: 'Conducted by colleges, 50 marks' },
  { date: '2026-10-19', title: 'Series test 2', note: 'Internal marks upload opens after this' },
  { date: '2026-11-06', title: 'Exam registration closes', note: 'Late fee of Rs 250 after this date' },
  { date: '2026-11-20', title: 'Last working day', note: 'Attendance is frozen on this day' },
  { date: '2026-12-01', title: 'End semester exams', note: 'Timetable on the Examination page' },
  { date: '2026-12-23', title: 'Exams end', note: 'Practical exams finish by Dec 30' },
  { date: '2027-01-18', title: 'Even semester begins', note: 'S4, S6 and S8 classes' },
]

export const subjects = [
  { code: 'CST401', name: 'Artificial Intelligence', attended: 38, total: 46 },
  { code: 'CST403', name: 'Computer Graphics', attended: 29, total: 41 },
  { code: 'CST405', name: 'Compiler Design', attended: 41, total: 44 },
  { code: 'CST413', name: 'Machine Learning', attended: 31, total: 43 },
  { code: 'MCN401', name: 'Industrial Safety Engineering', attended: 18, total: 22 },
  { code: 'CSL411', name: 'Compiler Lab', attended: 12, total: 14 },
  { code: 'CSQ413', name: 'Seminar', attended: 7, total: 10 },
]

export type ResultRow = { code: string; name: string; credits: number; grade: string }

export const gradePoint: Record<string, number> = { S: 10, 'A+': 9, A: 8.5, 'B+': 8, B: 7.5, 'C+': 7, C: 6.5, D: 6, P: 5.5, F: 0 }

export const results: Record<string, ResultRow[]> = {
  S6: [
    { code: 'CST302', name: 'Compiler Design', credits: 4, grade: 'A+' },
    { code: 'CST304', name: 'Computer Graphics and Image Processing', credits: 4, grade: 'S' },
    { code: 'CST306', name: 'Algorithm Analysis and Design', credits: 4, grade: 'A+' },
    { code: 'CST312', name: 'Foundations of Machine Learning', credits: 3, grade: 'S' },
    { code: 'HUT300', name: 'Industrial Economics and Foreign Trade', credits: 3, grade: 'A' },
    { code: 'CSD334', name: 'Mini Project', credits: 2, grade: 'S' },
    { code: 'CSL332', name: 'Networking Lab', credits: 2, grade: 'A+' },
  ],
  S5: [
    { code: 'CST301', name: 'Formal Languages and Automata Theory', credits: 4, grade: 'A' },
    { code: 'CST303', name: 'Computer Networks', credits: 4, grade: 'A+' },
    { code: 'CST305', name: 'System Software', credits: 4, grade: 'A+' },
    { code: 'CST307', name: 'Microprocessors and Microcontrollers', credits: 4, grade: 'F' },
    { code: 'CST309', name: 'Management of Software Systems', credits: 3, grade: 'S' },
    { code: 'CSL331', name: 'System Software and Microprocessors Lab', credits: 2, grade: 'S' },
    { code: 'CSL333', name: 'Database Management Systems Lab', credits: 2, grade: 'A+' },
  ],
  S4: [
    { code: 'MAT206', name: 'Graph Theory', credits: 4, grade: 'A+' },
    { code: 'CST202', name: 'Computer Organization and Architecture', credits: 4, grade: 'A' },
    { code: 'CST204', name: 'Database Management Systems', credits: 4, grade: 'S' },
    { code: 'CST206', name: 'Operating Systems', credits: 4, grade: 'A+' },
    { code: 'EST200', name: 'Design and Engineering', credits: 2, grade: 'A' },
    { code: 'CSL202', name: 'Digital Lab', credits: 2, grade: 'S' },
    { code: 'CSL204', name: 'Operating Systems Lab', credits: 2, grade: 'A+' },
  ],
  S3: [
    { code: 'MAT203', name: 'Discrete Mathematical Structures', credits: 4, grade: 'B+' },
    { code: 'CST201', name: 'Data Structures', credits: 4, grade: 'A+' },
    { code: 'CST203', name: 'Logic System Design', credits: 4, grade: 'A' },
    { code: 'CST205', name: 'Object Oriented Programming using Java', credits: 4, grade: 'A' },
    { code: 'HUT200', name: 'Professional Ethics', credits: 2, grade: 'A+' },
    { code: 'CSL201', name: 'Data Structures Lab', credits: 2, grade: 'S' },
    { code: 'CSL203', name: 'OOP Lab (Java)', credits: 2, grade: 'A' },
  ],
}

export const examSchedule = [
  { date: '2026-12-01', code: 'CST401', name: 'Artificial Intelligence', session: 'FN' },
  { date: '2026-12-04', code: 'CST403', name: 'Computer Graphics', session: 'FN' },
  { date: '2026-12-08', code: 'CST405', name: 'Compiler Design', session: 'FN' },
  { date: '2026-12-09', code: 'CST307', name: 'Microprocessors and Microcontrollers (supply)', session: 'AN' },
  { date: '2026-12-11', code: 'CST413', name: 'Machine Learning', session: 'AN' },
  { date: '2026-12-15', code: 'MCN401', name: 'Industrial Safety Engineering', session: 'FN' },
  { date: '2026-12-18', code: 'CET415', name: 'Environmental Impact Assessment', session: 'AN' },
]

export const notices = [
  { date: '2026-10-08', title: 'B.Tech S7 (R/S) exam registration opens on Oct 14', tag: 'Exam' },
  { date: '2026-10-06', title: 'Revaluation results for S6 May 2026 published', tag: 'Result' },
  { date: '2026-10-03', title: 'Activity point upload portal closes Oct 31 for S8 students', tag: 'Academic' },
  { date: '2026-09-29', title: 'Holiday on Oct 2 for all affiliated colleges', tag: 'General' },
  { date: '2026-09-24', title: 'M.Tech S3 timetable revised, check the exam section', tag: 'Exam' },
]

export const uniStats = [
  { label: 'Affiliated colleges', value: 142 },
  { label: 'Registered students', value: 158420 },
  { label: 'Exams this semester', value: 1276 },
  { label: 'Results published (2026)', value: 38 },
]

export const branchPass = [
  { branch: 'CSE', pass: 71 },
  { branch: 'ECE', pass: 63 },
  { branch: 'EEE', pass: 58 },
  { branch: 'ME', pass: 49 },
  { branch: 'CE', pass: 54 },
  { branch: 'IT', pass: 68 },
  { branch: 'AI&DS', pass: 74 },
]

export const regionStats = [
  { zone: 'Thiruvananthapuram', colleges: 31 },
  { zone: 'Kollam', colleges: 18 },
  { zone: 'Kottayam', colleges: 22 },
  { zone: 'Ernakulam', colleges: 34 },
  { zone: 'Thrissur', colleges: 19 },
  { zone: 'Kozhikode', colleges: 18 },
]

export const backlogs = [{ code: 'CST307', name: 'Microprocessors and Microcontrollers', sem: 'S5' }]

export const members: Record<string, number> = { CST401: 214, CST403: 187, CST405: 203, CST413: 176, MCN401: 241, CSL411: 98, CSQ413: 64, CST307: 39 }

export const pyqSessions = ['Dec 2025', 'May 2025', 'Dec 2024', 'May 2024']
