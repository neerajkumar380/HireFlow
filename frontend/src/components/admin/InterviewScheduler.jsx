// components/InterviewScheduler.jsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Calendar, Clock, Mail, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const InterviewScheduler = ({ applicationId, applicantEmail }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [meetingLink, setMeetingLink] = useState('');
  const [notes, setNotes] = useState('');

  const scheduleInterview = async () => {
    try {
      const interviewData = {
        date: date.toISOString(),
        time,
        meetingLink,
        notes,
        status: 'scheduled'
      };

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/schedule/${applicationId}`,
        interviewData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success('Interview scheduled successfully!');
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to schedule interview');
    }
  };

  const addToGoogleCalendar = () => {
    const startDateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    startDateTime.setHours(hours, minutes);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Interview&dates=${
      format(startDateTime, "yyyyMMdd'T'HHmmss")
    }/${
      format(endDateTime, "yyyyMMdd'T'HHmmss")
    }&details=${encodeURIComponent(notes)}&location=${encodeURIComponent(meetingLink)}&add=${applicantEmail}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <Calendar className="h-4 w-4" />
        Schedule Interview
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <Input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Meeting Link
              </Label>
              <Input
                id="link"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="Zoom/Google Meet link"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional information"
                className="col-span-3"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={addToGoogleCalendar}
              className="gap-2"
            >
              <Mail className="h-4 w-4" />
              Add to Google Calendar
            </Button>
            <Button type="button" onClick={scheduleInterview}>
              Schedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewScheduler;