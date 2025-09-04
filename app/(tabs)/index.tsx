import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { MapPin, Clock, DollarSign, Package, Star, Navigation, ChevronLeft, ChevronRight, Search, Calendar, CircleCheck as CheckCircle } from 'lucide-react-native';
import DatePicker from 'react-native-date-picker';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

const mockJobs = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'John Smith',
    customerPhone: '+1 (555) 123-4567',
    customerRating: 4.8,
    pickupAddress: '123 Main St, Downtown',
    dropAddress: '456 Oak Ave, Uptown',
    time: '2:30 PM',
    distance: '3.2 km',
    payment: '$25.50',
    goods: 'Electronics Package',
    notes: 'Handle with care - fragile items inside',
    priority: 'high',
    date: new Date().toDateString(),
    status: 'available',
    vanType: 'small',
    items: 'Electronics Package, Documents, Small Boxes',
    helperNeeded: true,
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Sarah Johnson',
    customerPhone: '+1 (555) 987-6543',
    customerRating: 4.9,
    pickupAddress: '789 Pine St, Midtown',
    dropAddress: '321 Elm St, Westside',
    time: '4:15 PM',
    distance: '2.8 km',
    payment: '$18.75',
    goods: 'Food Delivery',
    notes: 'Ring doorbell twice',
    priority: 'normal',
    date: new Date().toDateString(),
    status: 'available',
    vanType: 'small',
    items: 'Food Containers, Beverages',
    helperNeeded: false,
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Davis',
    customerPhone: '+1 (555) 456-7890',
    customerRating: 4.7,
    pickupAddress: '555 Broadway, Central',
    dropAddress: '888 Park Ave, Eastside',
    time: '6:00 PM',
    distance: '4.1 km',
    payment: '$32.25',
    goods: 'Documents',
    notes: 'Business delivery - ask for signature',
    priority: 'urgent',
    date: new Date().toDateString(),
    status: 'scheduled',
    vanType: 'medium',
    items: 'Piano, Large Furniture, Boxes',
    helperNeeded: true,
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Emily Wilson',
    customerPhone: '+1 (555) 321-9876',
    customerRating: 4.6,
    pickupAddress: '999 Cedar Rd, Northside',
    dropAddress: '111 Maple Dr, Southside',
    time: '1:00 PM',
    distance: '5.5 km',
    payment: '$28.00',
    goods: 'Clothing Package',
    notes: 'Leave at front door if no answer',
    priority: 'normal',
    date: new Date().toDateString(),
    status: 'completed',
    vanType: 'small',
    items: 'Clothing Bags, Shoes',
    helperNeeded: false,
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const [jobs, setJobs] = useState(mockJobs);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'find' | 'schedule' | 'completed'>('find');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const generateDates = () => {
    const dates = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    for (let i = 0; i <= 60; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const todayIndex = dates.findIndex(date => 
    date.toDateString() === new Date().toDateString()
  );

  React.useEffect(() => {
    setCurrentDateIndex(todayIndex);
    setSelectedDate(dates[todayIndex]);
  }, []);

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
    };
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, currentDateIndex - 1)
      : Math.min(dates.length - 1, currentDateIndex + 1);
    
    setCurrentDateIndex(newIndex);
    setSelectedDate(dates[newIndex]);
  };

  const handleDateSelect = (date: Date) => {
    const newIndex = dates.findIndex(date => 
      date.toDateString() === date.toDateString()
    );
    if (newIndex !== -1) {
      setCurrentDateIndex(newIndex);
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  // Filter jobs by selected date and tab
  const jobsForDate = jobs.filter(job => job.date === selectedDate.toDateString());
  const filteredJobs = jobsForDate.filter(job => {
    switch (activeTab) {
      case 'find':
        return job.status === 'available';
      case 'schedule':
        return job.status === 'scheduled';
      case 'completed':
        return job.status === 'completed';
      default:
        return true;
    }
  });

  const handleViewJob = (job: any) => {
    router.push({
      pathname: '/job-details',
      params: {
        id: job.id,
        orderNumber: job.orderNumber,
        customer: job.customer,
        customerPhone: job.customerPhone,
        customerRating: job.customerRating.toString(),
        pickupAddress: job.pickupAddress,
        dropAddress: job.dropAddress,
        time: job.time,
        date: job.date,
        distance: job.distance,
        payment: job.payment,
        goods: job.goods,
        notes: job.notes,
        status: job.status,
        vanType: job.vanType || 'small',
        items: job.items || 'Electronics Package, Documents, Small Boxes',
        helperNeeded: (job.helperNeeded || false).toString(),
      },
    });
  };

  const handleCompleteJob = (jobId: string) => {
    Alert.alert(
      'Complete Delivery',
      'Are you sure you want to mark this delivery as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes, Complete', 
          onPress: () => {
            router.push({
              pathname: '/signature',
              params: { jobId }
            });
          }
        }
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return colors.error;
      case 'high':
        return colors.warning;
      default:
        return colors.success;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'URGENT';
      case 'high':
        return 'HIGH';
      default:
        return 'NORMAL';
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'find':
        return <Search size={16} color={activeTab === tab ? '#ffffff' : colors.text} />;
      case 'schedule':
        return <Calendar size={16} color={activeTab === tab ? '#ffffff' : colors.text} />;
      case 'completed':
        return <CheckCircle size={16} color={activeTab === tab ? '#ffffff' : colors.text} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Jobs" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Scroller */}
        <View style={[styles.dateSection, { marginTop: 20 }]}>
          <View style={[styles.dateScrollerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.dateNavigationContainer}>
              <TouchableOpacity 
                style={[styles.dateNavButton, { backgroundColor: colors.surface }]} 
                onPress={() => navigateDate('prev')}
                disabled={currentDateIndex === 0}
              >
                <ChevronLeft size={20} color={currentDateIndex === 0 ? colors.border : colors.primary} />
              </TouchableOpacity>
              
              <View style={[styles.currentDateContainer, { backgroundColor: colors.surface }]}>
                <Text style={[styles.currentDateText, { color: colors.text }]}>
                  {formatDate(selectedDate).month} {formatDate(selectedDate).date}, {formatDate(selectedDate).year}
                </Text>
                <Text style={[styles.currentDayText, { color: colors.primary }]}>
                  {formatDate(selectedDate).day}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.dateNavButton, { backgroundColor: colors.surface }]} 
                onPress={() => navigateDate('next')}
                disabled={currentDateIndex === dates.length - 1}
              >
                <ChevronRight size={20} color={currentDateIndex === dates.length - 1 ? colors.border : colors.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.calendarButton, { backgroundColor: colors.primary }]} 
                onPress={openDatePicker}
              >
                <Calendar size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Job Tabs */}
        <View style={styles.tabsContainer}>
          <View style={[styles.tabsWrapper, { backgroundColor: colors.surface }]}>
            {[
              { key: 'find', label: 'Find Jobs' },
              { key: 'schedule', label: 'Schedule' },
              { key: 'completed', label: 'Completed' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  {
                    backgroundColor: activeTab === tab.key ? colors.primary : 'transparent',
                  }
                ]}
                onPress={() => setActiveTab(tab.key as any)}
              >
                {getTabIcon(tab.key)}
                <Text style={[
                  styles.tabText,
                  { color: activeTab === tab.key ? '#ffffff' : colors.text }
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Jobs List */}
        <View style={styles.jobsContainer}>
          {filteredJobs.length === 0 ? (
            <View style={[styles.emptyJobs, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Package size={40} color={colors.border} />
              <Text style={[styles.emptyJobsText, { color: colors.textSecondary }]}>
                No {activeTab === 'find' ? 'available' : activeTab} jobs for this date
              </Text>
            </View>
          ) : (
            filteredJobs.map((job) => (
              <View key={job.id} style={[styles.jobCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                {/* Priority Badge */}
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(job.priority) }]}>
                  <Text style={styles.priorityText}>{getPriorityLabel(job.priority)}</Text>
                </View>

                {/* Job Header */}
                <View style={styles.jobHeader}>
                  <View style={styles.jobLeft}>
                    <Text style={[styles.orderNumber, { color: colors.accent }]}>{job.orderNumber}</Text>
                    <Text style={[styles.customerName, { color: colors.text }]}>{job.customer}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={12} color={colors.accent} fill={colors.accent} />
                      <Text style={[styles.ratingText, { color: colors.accent }]}>{job.customerRating}</Text>
                    </View>
                  </View>
                  <View style={styles.jobRight}>
                    <Text style={[styles.paymentAmount, { color: colors.success }]}>{job.payment}</Text>
                    <View style={[styles.timeContainer, { backgroundColor: colors.surface }]}>
                      <Clock size={12} color={colors.accent} />
                      <Text style={[styles.timeText, { color: colors.accent }]}>{job.time}</Text>
                    </View>
                  </View>
                </View>

                {/* Locations */}
                <View style={styles.locationsContainer}>
                  <View style={styles.locationItem}>
                    <View style={[styles.locationDot, { backgroundColor: colors.accent }]} />
                    <Text style={[styles.locationText, { color: colors.text }]}>{job.pickupAddress}</Text>
                  </View>
                  <View style={[styles.routeLine, { backgroundColor: colors.border }]} />
                  <View style={styles.locationItem}>
                    <View style={[styles.locationDot, { backgroundColor: colors.primary }]} />
                    <Text style={[styles.locationText, { color: colors.text }]}>{job.dropAddress}</Text>
                  </View>
                </View>

                {/* Package Info */}
                <View style={[styles.packageInfo, { backgroundColor: colors.surface }]}>
                  <Package size={16} color={colors.textSecondary} />
                  <Text style={[styles.packageText, { color: colors.text }]}>{job.goods}</Text>
                  <View style={styles.distanceContainer}>
                    <Navigation size={12} color={colors.textSecondary} />
                    <Text style={[styles.distanceText, { color: colors.textSecondary }]}>{job.distance}</Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.viewButton, { backgroundColor: colors.primary }]}
                    onPress={() => handleViewJob(job)}
                  >
                    <Text style={[styles.viewButtonText, { color: '#ffffff' }]}>View Details</Text>
                  </TouchableOpacity>
                  
                  {activeTab === 'schedule' && (
                    <TouchableOpacity 
                      style={[styles.completeButton, { backgroundColor: colors.success }]}
                      onPress={() => handleCompleteJob(job.id)}
                    >
                      <CheckCircle size={16} color="#ffffff" />
                      <Text style={[styles.completeButtonText, { color: '#ffffff' }]}>Complete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modern Date Picker */}
      <DatePicker
        modal
        open={showDatePicker}
        date={selectedDate}
        mode="date"
        onConfirm={handleDateSelect}
        onCancel={() => setShowDatePicker(false)}
        title="Select Date"
        confirmText="Select"
        cancelText="Cancel"
        theme="light"
        textColor="#1e293b"
        dividerColor="#e2e8f0"
        buttonColor={colors.primary}
        backgroundColor="#ffffff"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  dateScrollerContainer: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateNavButton: {
    padding: 8,
    borderRadius: 8,
  },
  currentDateContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 12,
  },
  currentDateText: {
    fontSize: 16,
    fontWeight: '700',
  },
  currentDayText: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  calendarButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabsWrapper: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  jobsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  emptyJobs: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderRadius: 12,
    borderWidth: 1,
  },
  emptyJobsText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  jobCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    position: 'relative',
  },
  priorityBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 60,
  },
  jobLeft: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  jobRight: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  locationsContainer: {
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 16,
    marginLeft: 3,
    marginVertical: 2,
  },
  packageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  packageText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  completeButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 6,
  },
});