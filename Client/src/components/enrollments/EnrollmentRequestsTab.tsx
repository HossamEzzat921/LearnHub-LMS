import { useState } from 'react';
import { EnrollmentRequest, mockEnrollmentRequests } from '@/data/enrollmentData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, UserCheck, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const EnrollmentRequestsTab = () => {
  const [requests, setRequests] = useState<EnrollmentRequest[]>(mockEnrollmentRequests);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
    const req = requests.find(r => r.id === id);
    toast.success(`Approved access for ${req?.studentName} to ${req?.courseName}`);
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
    const req = requests.find(r => r.id === id);
    toast.error(`Rejected access for ${req?.studentName}`);
  };

  const handleApproveAll = () => {
    const pendingIds = requests.filter(r => r.status === 'pending').length;
    setRequests(prev => prev.map(r => r.status === 'pending' ? { ...r, status: 'approved' as const } : r));
    toast.success(`Approved ${pendingIds} pending requests`);
  };

  const statusBadge = (status: EnrollmentRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800 gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 dark:bg-green-950 dark:border-green-800 gap-1"><CheckCircle className="h-3 w-3" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800 gap-1"><XCircle className="h-3 w-3" />Rejected</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="font-display font-semibold text-xl">Enrollment Requests</h2>
          {pendingCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {pendingCount} request{pendingCount > 1 ? 's' : ''} waiting for approval
            </p>
          )}
        </div>
        {pendingCount > 0 && (
          <Button 
            className="hero-gradient text-primary-foreground gap-2 w-fit"
            onClick={handleApproveAll}
          >
            <UserCheck className="h-4 w-4" />
            Approve All ({pendingCount})
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
            className="capitalize gap-1"
          >
            {f === 'pending' && <Clock className="h-3 w-3" />}
            {f === 'approved' && <CheckCircle className="h-3 w-3" />}
            {f === 'rejected' && <XCircle className="h-3 w-3" />}
            {f === 'all' && <Filter className="h-3 w-3" />}
            {f} {f === 'pending' && pendingCount > 0 && `(${pendingCount})`}
          </Button>
        ))}
      </div>

      {/* Requests List */}
      {filteredRequests.length > 0 ? (
        <div className="bg-card rounded-xl card-shadow overflow-hidden">
          <div className="divide-y divide-border">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <span className="font-medium text-sm">
                      {request.studentName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium">{request.studentName}</p>
                    <p className="text-sm text-muted-foreground truncate">{request.studentEmail}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-sm">
                  <p className="font-medium">{request.courseName}</p>
                  <p className="text-muted-foreground">
                    {request.paymentMethod} · ${request.paymentAmount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Requested: {request.requestedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {request.status === 'pending' ? (
                    <>
                      <Button 
                        size="sm" 
                        className="gap-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleApprove(request.id)}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => handleReject(request.id)}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    statusBadge(request.status)
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl p-8 text-center card-shadow">
          <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No {filter !== 'all' ? filter : ''} requests</h3>
          <p className="text-muted-foreground">
            {filter === 'pending' 
              ? 'All enrollment requests have been handled.' 
              : 'No enrollment requests found.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EnrollmentRequestsTab;
