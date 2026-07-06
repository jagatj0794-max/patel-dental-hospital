import React, { useState, useMemo, useEffect } from 'react';
import { 
  CalendarDays, 
  Search, 
  Phone, 
  MessageSquare, 
  X, 
  Pencil, 
  Eye, 
  Check, 
  XCircle, 
  CheckCircle2, 
  RotateCcw, 
  Download, 
  User, 
  Mail, 
  Clock, 
  Stethoscope, 
  ChevronRight, 
  Filter,
  Activity,
  Calendar,
  AlertCircle,
  FileText,
  MessageCircle,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AdminAppointment, 
  appointmentService, 
  AppointmentFilters,
  AppointmentStats 
} from '../utils/appointmentData';
import { supabase } from '../utils/supabase';

function formatDateAdminTable(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) return dateStr;
  return `${day.padStart(2, '0')} ${months[monthIndex]} ${year}`;
}

function formatDateDetails(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  if (isNaN(dateObj.getTime())) return dateStr;
  
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const weekday = weekdays[dateObj.getDay()];
  const monthName = fullMonths[dateObj.getMonth()];
  return `${weekday}, ${day.padStart(2, '0')} ${monthName} ${year}`;
}

const handlePrintSlip = (apt: AdminAppointment) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print the appointment slip.');
    return;
  }
  printWindow.document.write(`
    <html>
      <head>
        <title>Appointment Slip - \${apt.patientName}</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px; text-align: center; }
          .title { font-size: 24px; font-weight: bold; color: #0f172a; margin-bottom: 5px; }
          .subtitle { font-size: 14px; color: #64748b; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #0d9488; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; }
          .value { font-size: 14px; color: #0f172a; font-weight: 500; }
          .full-width { grid-column: span 2; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Patel Dental Hospital</div>
          <div class="subtitle">Official Appointment Slip</div>
        </div>
        
        <div class="section">
          <div class="section-title">Patient Information</div>
          <div class="grid">
            <div>
              <div class="label">Patient Name</div>
              <div class="value">\${apt.patientName}</div>
            </div>
            <div>
              <div class="label">Mobile Number</div>
              <div class="value">\${apt.mobileNumber}</div>
            </div>
            <div>
              <div class="label">Age</div>
              <div class="value">\${apt.age} Yrs</div>
            </div>
            <div>
              <div class="label">Gender</div>
              <div class="value">\${apt.gender}</div>
            </div>
            <div class="full-width">
              <div class="label">Email Address</div>
              <div class="value">\${apt.email || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Appointment Details</div>
          <div class="grid">
            <div>
              <div class="label">Appointment ID</div>
              <div class="value">\${apt.id}</div>
            </div>
            <div>
              <div class="label">Clinic Branch</div>
              <div class="value">\${apt.branch}</div>
            </div>
            <div>
              <div class="label">Scheduled Date</div>
              <div class="value">\${formatDateDetails(apt.appointmentDate)}</div>
            </div>
            <div>
              <div class="label">Scheduled Time</div>
              <div class="value">\${apt.appointmentTime}</div>
            </div>
            <div>
              <div class="label">Assigned Specialist</div>
              <div class="value">\${apt.doctor}</div>
            </div>
            <div>
              <div class="label">Medical Service</div>
              <div class="value">\${apt.service}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Clinical Notes & Symptoms</div>
          <div class="grid">
            <div class="full-width">
              <div class="label">Symptoms / Patient Complaints</div>
              <div class="value" style="background: #f8fafc; padding: 10px; border-radius: 6px; margin-top: 5px;">
                \${apt.symptoms || 'No specific complaints described.'}
              </div>
            </div>
            <div class="full-width" style="margin-top: 10px;">
              <div class="label">Administration/Clinical Remarks</div>
              <div class="value" style="background: #f8fafc; padding: 10px; border-radius: 6px; margin-top: 5px;">
                \${apt.notes || 'No comments added.'}
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          Thank you for choosing Patel Dental Hospital. Please arrive 10 minutes prior to your scheduled time.<br>
          Gayatrinagar Branch: Gayatrinagar Main Road, Rajkot | Mavdi Branch: Mavdi Main Road, Rajkot
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

export default function Appointments() {
  // Main data state
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadAppointments = async () => {
      try {
        setIsLoading(true);
        const data = await appointmentService.getAllAppointments();
        if (active) {
          setAppointments(data);
        }
      } catch (err) {
        console.error('Error loading appointments from Supabase:', err);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    loadAppointments();
    return () => {
      active = false;
    };
  }, []);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'appointments' | 'calendar'>('appointments');

  // Filter States
  const [filters, setFilters] = useState<AppointmentFilters>({
    searchPatient: '',
    searchMobile: '',
    doctor: 'All',
    branch: 'All',
    status: 'All',
    date: ''
  });

  // Selected item states for drawer & edit modal
  const [selectedAppointment, setSelectedAppointment] = useState<AdminAppointment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [localNotes, setLocalNotes] = useState<string>('');
  
  const [editingAppointment, setEditingAppointment] = useState<AdminAppointment | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Calendar selected date (Default to context 'today' - 2026-07-05)
  const [calendarDate, setCalendarDate] = useState<string>('2026-07-05');

  // Success feedback message state
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  // 1. Calculate active statistics dynamically from state
  const stats = useMemo<AppointmentStats>(() => {
    return appointmentService.getStats(appointments);
  }, [appointments]);

  // 2. Filter logic
  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      // Patient Name Search
      if (filters.searchPatient.trim() && 
          !apt.patientName.toLowerCase().includes(filters.searchPatient.toLowerCase())) {
        return false;
      }
      // Mobile Number Search
      if (filters.searchMobile.trim() && 
          !apt.mobileNumber.includes(filters.searchMobile.trim())) {
        return false;
      }
      // Doctor Filter
      if (filters.doctor !== 'All' && apt.doctor !== filters.doctor) {
        return false;
      }
      // Branch Filter
      if (filters.branch !== 'All' && apt.branch !== filters.branch) {
        return false;
      }
      // Status Filter
      if (filters.status !== 'All' && apt.status !== filters.status) {
        return false;
      }
      // Date Filter
      if (filters.date && apt.appointmentDate !== filters.date) {
        return false;
      }
      return true;
    });
  }, [appointments, filters]);

  // Handle individual filter updates
  const handleFilterChange = (key: keyof AppointmentFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      searchPatient: '',
      searchMobile: '',
      doctor: 'All',
      branch: 'All',
      status: 'All',
      date: ''
    });
    showFeedback('Filters have been reset successfully.');
  };

  // Export CSV Function
  const handleExportCSV = () => {
    if (filteredAppointments.length === 0) {
      alert('No data available to export.');
      return;
    }

    // Define CSV headers
    const headers = [
      'Appointment ID',
      'Patient Name',
      'Mobile Number',
      'Email',
      'Age',
      'Gender',
      'Branch',
      'Doctor',
      'Service',
      'Appointment Date',
      'Appointment Time',
      'Booking Date',
      'Status',
      'Symptoms',
      'Notes'
    ];

    // Map appointments to CSV rows
    const csvRows = [
      headers.join(','), // join headers
      ...filteredAppointments.map(apt => [
        `"${apt.id}"`,
        `"${apt.patientName.replace(/"/g, '""')}"`,
        `"${apt.mobileNumber}"`,
        `"${apt.email || ''}"`,
        apt.age,
        `"${apt.gender}"`,
        `"${apt.branch}"`,
        `"${apt.doctor.replace(/"/g, '""')}"`,
        `"${apt.service.replace(/"/g, '""')}"`,
        `"${apt.appointmentDate}"`,
        `"${apt.appointmentTime}"`,
        `"${apt.bookingDate}"`,
        `"${apt.status}"`,
        `"${(apt.symptoms || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${(apt.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
      ].join(','))
    ];

    // Download file
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PDH_Appointments_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showFeedback(`Exported ${filteredAppointments.length} appointments to CSV.`);
  };

  // Action: Confirm Appointment
  const handleConfirm = async (id: string) => {
    const updated = await appointmentService.updateStatus(id, 'Confirmed');
    setAppointments(updated);
    showFeedback(`Appointment ${id} has been confirmed.`);
  };

  // Action: Complete Appointment
  const handleComplete = async (id: string) => {
    const updated = await appointmentService.updateStatus(id, 'Completed');
    setAppointments(updated);
    showFeedback(`Appointment ${id} has been completed.`);
  };

  // Action: Cancel Appointment
  const handleCancel = async (id: string) => {
    const updated = await appointmentService.updateStatus(id, 'Cancelled');
    setAppointments(updated);
    showFeedback(`Appointment ${id} has been cancelled.`);
  };

  // Save Edits from Edit Modal
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAppointment) return;

    // Check duplicate slot before save (ignoring Cancelled status and the current editing appointment ID)
    const { data: duplicates, error: dupError } = await supabase.client
      .from('appointments')
      .select('id')
      .eq('appointment_date', editingAppointment.appointmentDate)
      .eq('appointment_time', editingAppointment.appointmentTime)
      .eq('branch', editingAppointment.branch)
      .neq('id', editingAppointment.id)
      .neq('status', 'Cancelled')
      .limit(1);

    if (duplicates && duplicates.length > 0) {
      showFeedback("This appointment slot has already been booked. Please select another available time.");
      return;
    }

    const updated = await appointmentService.saveAppointment(editingAppointment);
    setAppointments(updated);
    setIsEditModalOpen(false);
    setEditingAppointment(null);
    showFeedback(`Appointment ${editingAppointment.id} updated successfully.`);
  };

  // Communication Handlers (Simulated)
  const handleCall = (mobile: string, name: string) => {
    window.open(`tel:${mobile}`, '_blank');
    showFeedback(`Initiated call to ${name} (${mobile})`);
  };

  const handleWhatsApp = (mobile: string, name: string, date: string, time: string, doctor: string) => {
    const message = `Hello ${name}, this is Patel Dental Hospital. This is to follow up on your appointment scheduled with ${doctor} on ${date} at ${time}.`;
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/91${mobile}?text=${encodedText}`, '_blank');
    showFeedback(`Opened WhatsApp communication for ${name}`);
  };

  // Helper for Status Badge styling
  const renderStatusBadge = (status: AdminAppointment['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 border border-orange-100 text-orange-600 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse shrink-0"></span>
            Pending
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 border border-blue-100 text-blue-600 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 shrink-0"></span>
            Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-100 text-emerald-600 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 shrink-0"></span>
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 border border-red-100 text-red-600 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 shrink-0"></span>
            Cancelled
          </span>
        );
    }
  };

  // Doctor calendar categorization
  const doctorsMapForCalendar = useMemo(() => {
    const dateApts = appointments.filter(apt => apt.appointmentDate === calendarDate);
    const drKinjal = dateApts.filter(apt => apt.doctor === 'Dr. Kinjal Patel');
    const drVipul = dateApts.filter(apt => apt.doctor === 'Dr. Vipul Patel');
    
    return {
      'Dr. Kinjal Patel': drKinjal,
      'Dr. Vipul Patel': drVipul
    };
  }, [appointments, calendarDate]);

  return (
    <div className="space-y-6" id="appointments-module-root">
      
      {/* 1. Header with View Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <CalendarDays className="h-4.5 w-4.5 text-blue-500" />
            <span>Clinical Schedule</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900" id="appointments-title">
            Appointment Management
          </h1>
          <p className="text-slate-500 text-xs md:text-sm" id="appointments-subtitle">
            Manage patient appointments, confirmations, schedules and booking workflow.
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start xl:self-auto shrink-0" id="appointments-view-tabs">
          <button
            type="button"
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'appointments' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            id="tab-view-appointments"
          >
            <FileText className="h-4 w-4" />
            <span>Appointments</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            id="tab-view-calendar"
          >
            <Calendar className="h-4 w-4" />
            <span>Calendar View</span>
          </button>
        </div>
      </div>

      {/* Dynamic Feedback Toast */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="p-4 bg-blue-600 border border-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg flex items-center gap-3"
            id="appointment-success-toast"
          >
            <CheckCircle2 className="h-5 w-5 text-white shrink-0" />
            <span>{feedbackMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Responsive Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4" id="appointments-stats-cards">
        {/* Card 1: Today's Appointments */}
        {(stats.todayAppointments > 0 || appointments.length === 0) && (
          <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-3xs hover:border-blue-200 hover:shadow-xs transition duration-250 flex flex-col justify-between">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Today's Appts</span>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-black text-slate-900 leading-none">{stats.todayAppointments}</span>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-md">July 5</span>
            </div>
          </div>
        )}

        {/* Card 2: Pending */}
        {stats.pending > 0 && (
          <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-3xs hover:border-amber-200 hover:shadow-xs transition duration-250 flex flex-col justify-between">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Pending</span>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-black text-amber-600 leading-none">{stats.pending}</span>
              <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md">Awaiting</span>
            </div>
          </div>
        )}

        {/* Card 3: Confirmed */}
        {stats.confirmed > 0 && (
          <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-3xs hover:border-blue-200 hover:shadow-xs transition duration-250 flex flex-col justify-between">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Confirmed</span>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-black text-blue-600 leading-none">{stats.confirmed}</span>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-md">Secured</span>
            </div>
          </div>
        )}

        {/* Card 4: Completed */}
        {stats.completed > 0 && (
          <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-3xs hover:border-emerald-200 hover:shadow-xs transition duration-250 flex flex-col justify-between">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Completed</span>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-black text-emerald-600 leading-none">{stats.completed}</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md">Done</span>
            </div>
          </div>
        )}

        {/* Card 5: Cancelled */}
        {stats.cancelled > 0 && (
          <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-3xs hover:border-rose-200 hover:shadow-xs transition duration-250 flex flex-col justify-between">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Cancelled</span>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-black text-rose-600 leading-none">{stats.cancelled}</span>
              <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded-md">Void</span>
            </div>
          </div>
        )}
      </div>

      {activeTab === 'appointments' ? (
        <>
          {/* 3. Filter Bar (Compact Redesign) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-3xs space-y-3" id="appointments-filter-bar">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                <Filter className="h-4 w-4 text-slate-500" />
                <span>Search & Filter Records</span>
                <span className="text-[10px] text-slate-400 font-normal normal-case ml-2" id="filter-results-count">
                  ({filteredAppointments.length} matching)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider border border-slate-200 rounded-lg transition cursor-pointer flex items-center gap-1.5"
                  id="btn-reset-filters"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/10"
                  id="btn-export-csv"
                >
                  <Download className="h-3 w-3" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              
              {/* Patient Name Search */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Search Patient</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 pointer-events-none">
                    <Search className="h-3 w-3" />
                  </span>
                  <input
                    type="text"
                    value={filters.searchPatient}
                    onChange={(e) => handleFilterChange('searchPatient', e.target.value)}
                    placeholder="Patient name..."
                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-800"
                    id="filter-patient-name"
                  />
                </div>
              </div>

              {/* Mobile Number Search */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Search Mobile</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 pointer-events-none">
                    <Phone className="h-3 w-3" />
                  </span>
                  <input
                    type="text"
                    value={filters.searchMobile}
                    onChange={(e) => handleFilterChange('searchMobile', e.target.value)}
                    placeholder="Mobile number..."
                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-800"
                    id="filter-mobile-number"
                  />
                </div>
              </div>

              {/* Doctor Dropdown */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Doctor</label>
                <select
                  value={filters.doctor}
                  onChange={(e) => handleFilterChange('doctor', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-800 bg-white"
                  id="filter-doctor"
                >
                  <option value="All">All Specialists</option>
                  <option value="Dr. Kinjal Patel">Dr. Kinjal Patel</option>
                  <option value="Dr. Vipul Patel">Dr. Vipul Patel</option>
                </select>
              </div>

              {/* Branch Dropdown */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Branch</label>
                <select
                  value={filters.branch}
                  onChange={(e) => handleFilterChange('branch', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-800 bg-white"
                  id="filter-branch"
                >
                  <option value="All">All Branches</option>
                  <option value="Gayatrinagar Branch">Gayatrinagar Branch</option>
                  <option value="Mavdi Branch">Mavdi Branch</option>
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-800 bg-white"
                  id="filter-status"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Date Picker */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-800 bg-white"
                  id="filter-date"
                />
              </div>

            </div>
          </div>

          {/* 4. Appointments Table */}
          {filteredAppointments.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-150 shadow-3xs overflow-hidden" id="appointments-table-container">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse" id="appointments-data-table">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-150">
                      <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Appointment ID</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Doctor</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Branch</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Appointment Date</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((apt) => (
                      <tr 
                        key={apt.id} 
                        className="hover:bg-slate-50/30 transition-all duration-150"
                        id={`appointment-row-${apt.id}`}
                      >
                        {/* ID */}
                        <td className="px-4 py-3 text-xs font-mono text-slate-400">
                          {apt.id}
                        </td>
                        
                        {/* Patient Name */}
                        <td className="px-4 py-3 text-xs font-semibold text-slate-800">
                          {apt.patientName}
                        </td>

                        {/* Doctor */}
                        <td className="px-4 py-3 text-xs text-slate-600">
                          {apt.doctor}
                        </td>

                        {/* Branch */}
                        <td className="px-4 py-3 text-xs">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${apt.branch === 'Gayatrinagar Branch' ? 'bg-sky-50 text-sky-700 border border-sky-100/50' : 'bg-indigo-50 text-indigo-700 border border-indigo-100/50'}`}>
                            {apt.branch}
                          </span>
                        </td>

                        {/* Appointment Date */}
                        <td className="px-4 py-2 text-xs text-slate-600">
                          {formatDateAdminTable(apt.appointmentDate)}
                        </td>

                        {/* Appointment Time */}
                        <td className="px-4 py-2 text-xs font-medium text-slate-800">
                          {apt.appointmentTime}
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-2">
                          {renderStatusBadge(apt.status)}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-2 text-right pr-6">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAppointment(apt);
                                setLocalNotes(apt.notes || '');
                                setIsDrawerOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer flex items-center gap-1 font-semibold text-[11px]"
                              title="View Details"
                              id={`btn-view-${apt.id}`}
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View</span>
                            </button>

                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAppointment({ ...apt });
                                setIsEditModalOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg text-amber-600 hover:bg-amber-50 transition cursor-pointer flex items-center gap-1 font-semibold text-[11px]"
                              title="Edit Schedule"
                              id={`btn-edit-${apt.id}`}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>

                            {/* Cancel Button */}
                            {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                              <button
                                type="button"
                                onClick={() => handleCancel(apt.id)}
                                className="px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer flex items-center gap-1 font-semibold text-[11px]"
                                title="Cancel Appointment"
                                id={`btn-cancel-${apt.id}`}
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                <span>Cancel</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* 5. Professional Empty State Panel */
            <div className="bg-white rounded-2xl border border-slate-150 shadow-3xs p-12 text-center" id="appointments-empty-state">
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="mb-6 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-teal-50 rounded-full scale-150 animate-pulse opacity-40"></div>
                  <div className="p-4 bg-teal-100/50 text-teal-600 rounded-2xl border border-teal-100/50 relative z-10">
                    <Calendar className="h-10 w-10 stroke-[1.5]" />
                  </div>
                </div>
                {appointments.length === 0 ? (
                  <>
                    <h3 className="text-base font-bold font-display text-slate-800 mb-2">
                      No appointments available.
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      Appointments booked from the website will automatically appear here.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-base font-bold font-display text-slate-800 mb-2">
                      No matches found.
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      No matches found with selected filter parameters. Try adjusting your query.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                      id="empty-state-reset-btn"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Calendar View Tab */
        <div className="space-y-6" id="calendar-view-root">
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs space-y-4">
            
            {/* Calendar Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Select Scheduled Day</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Viewing schedule matching doctors' availability roster</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2" id="calendar-day-picker">
                <input
                  type="date"
                  value={calendarDate}
                  onChange={(e) => setCalendarDate(e.target.value)}
                  className="px-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-bold text-slate-800 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setCalendarDate('2026-07-05')}
                  className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
                >
                  Go to Today
                </button>
              </div>
            </div>

            {/* Calendar Doctor Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="calendar-split-grid">
              
              {/* Doctor 1: Dr. Kinjal Patel */}
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-150 space-y-4" id="calendar-col-dr-kinjal">
                <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-150 shadow-4xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                      KP
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">Dr. Kinjal Patel</h4>
                      <p className="text-[9px] text-[#0D9488] font-bold uppercase tracking-widest">Dental Specialist</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-lg">
                    {doctorsMapForCalendar['Dr. Kinjal Patel'].length} Booked
                  </span>
                </div>

                <div className="space-y-3">
                  {doctorsMapForCalendar['Dr. Kinjal Patel'].length > 0 ? (
                    doctorsMapForCalendar['Dr. Kinjal Patel'].map((apt) => (
                      <div 
                        key={apt.id}
                        className="bg-white border border-slate-150 p-4 rounded-xl hover:border-blue-300 shadow-5xs hover:shadow-2xs transition-all duration-200 group relative overflow-hidden"
                        id={`calendar-apt-dr-kinjal-${apt.id}`}
                      >
                        {/* Colored status strip left side */}
                        <div className={`absolute top-0 bottom-0 left-0 w-1 ${apt.status === 'Confirmed' ? 'bg-blue-500' : apt.status === 'Pending' ? 'bg-amber-500' : apt.status === 'Completed' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        
                        <div className="pl-1.5 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{apt.patientName}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              <span className="text-[11px] font-black text-slate-700">{apt.appointmentTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 font-medium">
                            <span>Service: <strong className="text-slate-700 font-semibold">{apt.service}</strong></span>
                            {renderStatusBadge(apt.status)}
                          </div>

                          {apt.symptoms && (
                            <p className="text-[10px] text-slate-400 line-clamp-1 border-t border-slate-100 pt-1.5 mt-1">
                              {apt.symptoms}
                            </p>
                          )}

                          <div className="flex items-center justify-end gap-1.5 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAppointment(apt);
                                setLocalNotes(apt.notes || '');
                                setIsDrawerOpen(true);
                              }}
                              className="text-[9px] text-blue-600 hover:bg-blue-50 font-bold px-2 py-1 rounded transition"
                            >
                              Inspect Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAppointment({ ...apt });
                                setIsEditModalOpen(true);
                              }}
                              className="text-[9px] text-amber-600 hover:bg-amber-50 font-bold px-2 py-1 rounded transition"
                            >
                              Edit Slot
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white/80 border border-dashed border-slate-200 p-8 text-center rounded-xl">
                      <p className="text-xs text-slate-400 font-semibold">No appointments scheduled today.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor 2: Dr. Vipul Patel */}
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-150 space-y-4" id="calendar-col-dr-vipul">
                <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-150 shadow-4xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0D9488]/10 flex items-center justify-center text-[#0D9488] font-bold text-xs uppercase">
                      VP
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">Dr. Vipul Patel</h4>
                      <p className="text-[9px] text-[#0D9488] font-bold uppercase tracking-widest">Cosmetic & Implant Specialist</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-teal-50 border border-teal-100 text-teal-700 font-bold px-2 py-0.5 rounded-lg">
                    {doctorsMapForCalendar['Dr. Vipul Patel'].length} Booked
                  </span>
                </div>

                <div className="space-y-3">
                  {doctorsMapForCalendar['Dr. Vipul Patel'].length > 0 ? (
                    doctorsMapForCalendar['Dr. Vipul Patel'].map((apt) => (
                      <div 
                        key={apt.id}
                        className="bg-white border border-slate-150 p-4 rounded-xl hover:border-teal-300 shadow-5xs hover:shadow-2xs transition-all duration-200 group relative overflow-hidden"
                        id={`calendar-apt-dr-vipul-${apt.id}`}
                      >
                        {/* Colored status strip left side */}
                        <div className={`absolute top-0 bottom-0 left-0 w-1 ${apt.status === 'Confirmed' ? 'bg-blue-500' : apt.status === 'Pending' ? 'bg-amber-500' : apt.status === 'Completed' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        
                        <div className="pl-1.5 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 leading-snug">{apt.patientName}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              <span className="text-[11px] font-black text-slate-700">{apt.appointmentTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 font-medium">
                            <span>Service: <strong className="text-slate-700 font-semibold">{apt.service}</strong></span>
                            {renderStatusBadge(apt.status)}
                          </div>

                          {apt.symptoms && (
                            <p className="text-[10px] text-slate-400 line-clamp-1 border-t border-slate-100 pt-1.5 mt-1">
                              {apt.symptoms}
                            </p>
                          )}

                          <div className="flex items-center justify-end gap-1.5 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAppointment(apt);
                                setLocalNotes(apt.notes || '');
                                setIsDrawerOpen(true);
                              }}
                              className="text-[9px] text-blue-600 hover:bg-blue-50 font-bold px-2 py-1 rounded transition"
                            >
                              Inspect Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAppointment({ ...apt });
                                setIsEditModalOpen(true);
                              }}
                              className="text-[9px] text-amber-600 hover:bg-amber-50 font-bold px-2 py-1 rounded transition"
                            >
                              Edit Slot
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white/80 border border-dashed border-slate-200 p-8 text-center rounded-xl">
                      <p className="text-xs text-slate-400 font-semibold">No appointments scheduled today.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. PATIENT DETAILS DRAWER (RIGHT SIDE SLIDEOVER) */}
      {/* ========================================== */}
      <AnimatePresence>
        {isDrawerOpen && selectedAppointment && (
          <>
            {/* Backdrop cover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900 z-50 cursor-pointer"
              id="drawer-backdrop"
            />

            {/* Slider panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 border-l border-slate-150 flex flex-col justify-between"
              id="patient-details-drawer"
            >
              
              {/* Header section */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#081C3A] uppercase tracking-wide">Patient Information</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Record ID: {selectedAppointment.id}</p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition cursor-pointer"
                  id="drawer-close-btn"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Central Information View scroll area */}
              <div className="p-6 flex-grow overflow-y-auto space-y-5">
                
                {/* Badge Status */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider">Appointment Status</span>
                  {renderStatusBadge(selectedAppointment.status)}
                </div>

                {/* Patient Profile Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">{selectedAppointment.patientName}</h4>
                    <span className="text-[10px] text-slate-500 font-bold bg-white px-2 py-0.5 rounded border border-slate-150">
                      ID: {selectedAppointment.id.slice(0, 8)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Age:</span>
                      <strong className="text-slate-800">{selectedAppointment.age} Yrs</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gender:</span>
                      <strong className="text-slate-800">{selectedAppointment.gender}</strong>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-slate-400">Contact Number:</span>
                      <strong className="text-slate-800">{selectedAppointment.mobileNumber}</strong>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-slate-400">Email:</span>
                      <strong className="text-slate-800 truncate max-w-[200px]">{selectedAppointment.email || 'N/A'}</strong>
                    </div>
                  </div>
                </div>

                {/* Schedule details */}
                <div className="space-y-3.5">
                  <h5 className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1">
                    <Stethoscope className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Appointment Details</span>
                  </h5>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Specialist Doctor</span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        {selectedAppointment.doctor}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Clinic Branch</span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                        {selectedAppointment.branch}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Scheduled Date</span>
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 text-slate-400 shrink-0" />
                        {formatDateDetails(selectedAppointment.appointmentDate)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Scheduled Time</span>
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                        {selectedAppointment.appointmentTime}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Medical Service</span>
                    <span className="text-xs font-semibold text-[#0369A1] bg-[#E0F2FE] border border-[#BAE6FD] px-2.5 py-1 rounded-lg inline-block">
                      {selectedAppointment.service}
                    </span>
                  </div>
                </div>

                {/* Medical Notes (Symptoms + Custom notes textarea) */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <h5 className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-[#0D9488]" />
                    <span>Clinical & Intake Notes</span>
                  </h5>
                  
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Symptoms / Complaints</span>
                    <div className="p-2.5 bg-white border border-slate-150 rounded-lg text-xs text-slate-600 font-medium leading-relaxed">
                      {selectedAppointment.symptoms || 'No symptoms or special requests described during online booking.'}
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Administrative & Clinical Remarks</span>
                    <textarea
                      value={localNotes}
                      onChange={(e) => setLocalNotes(e.target.value)}
                      placeholder="Type internal clinical observations, prescribed medications, or follow-up notes..."
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0D9488] min-h-[75px] resize-none"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const updatedApt = { ...selectedAppointment, notes: localNotes };
                        const updatedList = await appointmentService.saveAppointment(updatedApt);
                        setAppointments(updatedList);
                        setSelectedAppointment(updatedApt);
                        showFeedback('Clinical notes saved successfully.');
                      }}
                      className="mt-1 w-full py-1.5 bg-[#0D9488] hover:bg-[#0b7e74] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      <Check className="h-3 w-3" />
                      <span>Save Clinical Remarks</span>
                    </button>
                  </div>
                </div>

                {/* Appointment History Timeline */}
                <div className="space-y-4 pt-1">
                  <h5 className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-slate-500 shrink-0" />
                    <span>Appointment History & Lifecycle</span>
                  </h5>

                  <div className="relative pl-6 border-l-2 border-slate-100 ml-3 space-y-5 py-1">
                    {/* Event 1: Created */}
                    <div className="relative">
                      <span className="absolute -left-[31px] top-0.5 bg-blue-100 border-2 border-white rounded-full p-1 text-blue-600 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      </span>
                      <div>
                        <span className="text-[11px] font-bold text-slate-900 block leading-tight">Appointment Registered</span>
                        <span className="text-[10px] text-slate-400 block font-medium mt-0.5">
                          {formatDateAdminTable(selectedAppointment.bookingDate)} • 09:30 AM
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1 block bg-slate-50 border border-slate-100 p-1.5 rounded-lg">
                          Booking received from Patel Dental online booking system.
                        </span>
                      </div>
                    </div>

                    {/* Event 2: Confirmed (If status is Confirmed, Completed) */}
                    {(selectedAppointment.status === 'Confirmed' || selectedAppointment.status === 'Completed') && (
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 bg-sky-100 border-2 border-white rounded-full p-1 text-sky-600 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-sky-600 rounded-full"></span>
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-slate-900 block leading-tight">Slot Confirmed</span>
                          <span className="text-[10px] text-slate-400 block font-medium mt-0.5">
                            {formatDateAdminTable(selectedAppointment.bookingDate)} • 02:45 PM
                          </span>
                          <span className="text-[10px] text-slate-500 mt-1 block bg-slate-50 border border-slate-100 p-1.5 rounded-lg">
                            Schedule verified. SMS and WhatsApp alerts dispatched to patient.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Event 3: Completed */}
                    {selectedAppointment.status === 'Completed' && (
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 bg-emerald-100 border-2 border-white rounded-full p-1 text-emerald-600 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-slate-900 block leading-tight">Clinical Check-Out</span>
                          <span className="text-[10px] text-slate-400 block font-medium mt-0.5">
                            {formatDateAdminTable(selectedAppointment.appointmentDate)} • {selectedAppointment.appointmentTime}
                          </span>
                          <span className="text-[10px] text-slate-500 mt-1 block bg-slate-50 border border-slate-150 p-1.5 rounded-lg">
                            Dental treatment rendered. Marked completed by {selectedAppointment.doctor}.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Event 4: Cancelled */}
                    {selectedAppointment.status === 'Cancelled' && (
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 bg-rose-100 border-2 border-white rounded-full p-1 text-rose-600 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-slate-900 block leading-tight">Appointment Cancelled</span>
                          <span className="text-[10px] text-slate-400 block font-medium mt-0.5">
                            {formatDateAdminTable(selectedAppointment.appointmentDate)} • 11:30 AM
                          </span>
                          <span className="text-[10px] text-rose-800 mt-1 block bg-rose-50 border border-rose-100/50 p-1.5 rounded-lg">
                            Slot released. Patient notified of cancellation.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Popup Actions Footer Grid */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/85 space-y-2 shrink-0">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(
                      selectedAppointment.mobileNumber,
                      selectedAppointment.patientName,
                      selectedAppointment.appointmentDate,
                      selectedAppointment.appointmentTime,
                      selectedAppointment.doctor
                    )}
                    className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-5xs cursor-pointer"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp Patient</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleCall(selectedAppointment.mobileNumber, selectedAppointment.patientName)}
                    className="py-2 px-3 bg-[#081C3A] hover:bg-[#051124] text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-5xs cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5 text-blue-400" />
                    <span>Call Patient</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAppointment({ ...selectedAppointment });
                      setIsEditModalOpen(true);
                    }}
                    className="py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-5xs cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    <span>Edit Appointment</span>
                  </button>

                  {selectedAppointment.status === 'Pending' && (
                    <button
                      type="button"
                      onClick={() => {
                        handleConfirm(selectedAppointment.id);
                        setSelectedAppointment({ ...selectedAppointment, status: 'Confirmed' });
                      }}
                      className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-5xs cursor-pointer"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Confirm Appointment</span>
                    </button>
                  )}

                  {selectedAppointment.status === 'Confirmed' && (
                    <button
                      type="button"
                      onClick={() => {
                        handleComplete(selectedAppointment.id);
                        setSelectedAppointment({ ...selectedAppointment, status: 'Completed' });
                      }}
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-5xs cursor-pointer"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Complete Appointment</span>
                    </button>
                  )}

                  {selectedAppointment.status !== 'Cancelled' && selectedAppointment.status !== 'Completed' && (
                    <button
                      type="button"
                      onClick={() => {
                        handleCancel(selectedAppointment.id);
                        setSelectedAppointment({ ...selectedAppointment, status: 'Cancelled' });
                      }}
                      className="py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-5xs cursor-pointer"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Cancel Appointment</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/50">
                  <button
                    type="button"
                    onClick={() => handlePrintSlip(selectedAppointment)}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-5xs cursor-pointer border border-slate-200"
                  >
                    <Download className="h-3.5 w-3.5 text-slate-500" />
                    <span>Print Slip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-5xs cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5 text-slate-600" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* 7. EDIT SCHEDULE MODAL */}
      {/* ========================================== */}
      <AnimatePresence>
        {isEditModalOpen && editingAppointment && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 bg-slate-900 cursor-pointer"
              id="edit-modal-backdrop"
            />

            {/* Modal container content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-150 overflow-hidden z-50 flex flex-col"
              id="edit-appointment-modal"
            >
              
              {/* Header bar */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <Pencil className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Edit Schedule Parameters</h3>
                    <p className="text-[10px] text-slate-400 font-semibold">Editing: {editingAppointment.patientName}</p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition cursor-pointer"
                  id="edit-modal-close-btn"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form container */}
              <form onSubmit={handleSaveEdit} className="p-6 space-y-4" id="edit-appointment-form">
                
                {/* Doctor selection & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Assigned Doctor</label>
                    <select
                      value={editingAppointment.doctor}
                      onChange={(e) => setEditingAppointment(prev => prev ? { ...prev, doctor: e.target.value } : null)}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold text-slate-800 bg-white"
                      id="edit-doctor-select"
                    >
                      <option value="Dr. Kinjal Patel">Dr. Kinjal Patel</option>
                      <option value="Dr. Vipul Patel">Dr. Vipul Patel</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Branch</label>
                    <select
                      value={editingAppointment.branch}
                      onChange={(e) => setEditingAppointment(prev => prev ? { ...prev, branch: e.target.value as 'Gayatrinagar Branch' | 'Mavdi Branch' } : null)}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold text-slate-800 bg-white"
                      id="edit-branch-select"
                    >
                      <option value="Gayatrinagar Branch">Gayatrinagar Branch</option>
                      <option value="Mavdi Branch">Mavdi Branch</option>
                    </select>
                  </div>
                </div>

                {/* Appointment date and timeslot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Scheduled Date</label>
                    <input
                      type="date"
                      value={editingAppointment.appointmentDate}
                      onChange={(e) => setEditingAppointment(prev => prev ? { ...prev, appointmentDate: e.target.value } : null)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-bold text-slate-800 bg-white"
                      id="edit-date-input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Slot Time</label>
                    <input
                      type="text"
                      value={editingAppointment.appointmentTime}
                      onChange={(e) => setEditingAppointment(prev => prev ? { ...prev, appointmentTime: e.target.value } : null)}
                      placeholder="e.g. 10:30 AM"
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-bold text-slate-800 bg-white"
                      id="edit-time-input"
                    />
                  </div>
                </div>

                {/* Booking status selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Booking Status</label>
                  <select
                    value={editingAppointment.status}
                    onChange={(e) => setEditingAppointment(prev => prev ? { ...prev, status: e.target.value as AdminAppointment['status'] } : null)}
                    className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold text-slate-800 bg-white"
                    id="edit-status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Internal clinical/admin notes */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Internal Administration Notes</label>
                  <textarea
                    rows={3}
                    value={editingAppointment.notes}
                    onChange={(e) => setEditingAppointment(prev => prev ? { ...prev, notes: e.target.value } : null)}
                    placeholder="Enter special clinician requirements, payment notes or scheduling remarks..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium text-slate-800 bg-white resize-none"
                    id="edit-notes-textarea"
                  />
                </div>

                {/* Bottom Action buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200 rounded-xl transition cursor-pointer"
                    id="edit-cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md shadow-blue-500/10"
                    id="edit-save-btn"
                  >
                    Save Changes
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
