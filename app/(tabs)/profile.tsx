import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Phone, Mail, MapPin, Star, Calendar, TrendingUp, Package, Clock, ChevronLeft, ChevronRight, CreditCard as Edit } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

// Mock orders data with different dates
const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'John Smith',
    status: 'completed',
    payment: '$25.50',
    date: new Date().toDateString(),
    time: '2:30 PM',
    goods: 'Electronics Package',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Sarah Johnson',
    status: 'completed',
    payment: '$18.75',
    date: new Date().toDateString(),
    time: '4:15 PM',
    goods: 'Food Delivery',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Davis',
    status: 'pending',
    payment: '$32.25',
    date: new Date(Date.now() + 86400000).toDateString(), // Tomorrow
    time: '6:00 PM',
    goods: 'Documents',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Emily Wilson',
    status: 'completed',
    payment: '$22.00',
    date: new Date(Date.now() - 86400000).toDateString(), // Yesterday
    time: '1:00 PM',
    goods: 'Clothing Package',
  },
];

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  const generateDates = () => {
    const dates = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365); // Start from 1 year ago
    
    for (let i = 0; i <= 730; i++) { // 2 years total
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

  // Filter orders by selected date
  const ordersForDate = mockOrders.filter(order => order.date === selectedDate.toDateString());


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Profile" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.avatarContainer}>
            <Text style={[styles.avatarText, { backgroundColor: colors.primary }]}>JD</Text>
            <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.driverName, { color: colors.text }]}>John Driver</Text>
            <Text style={[styles.driverEmail, { color: colors.textSecondary }]}>john.driver@email.com</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.accent} fill={colors.accent} />
              <Text style={[styles.rating, { color: colors.accent }]}>4.9</Text>
              <Text style={[styles.ratingText, { color: colors.textSecondary }]}>(127 reviews)</Text>
            </View>
          </View>
          
          <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.surface }]}>
            <Edit size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Calendar size={20} color={colors.primary} />
            <Text style={[styles.statNumber, { color: colors.text }]}>45</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Days Active</Text>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TrendingUp size={20} color={colors.success} />
            <Text style={[styles.statNumber, { color: colors.text }]}>342</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Deliveries</Text>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Star size={20} color={colors.accent} />
            <Text style={[styles.statNumber, { color: colors.text }]}>4.9</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rating</Text>
          </View>
        </View>

        {/* Date Scroller for Orders */}
        <View style={styles.ordersSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Orders History</Text>
          
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
            </View>
          </View>

          {/* Orders for Selected Date */}
          <View style={styles.ordersContainer}>
            {ordersForDate.length === 0 ? (
              <View style={[styles.emptyOrders, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Package size={40} color={colors.border} />
                <Text style={[styles.emptyOrdersText, { color: colors.textSecondary }]}>No orders for this date</Text>
              </View>
            ) : (
              ordersForDate.map((order) => (
                <View key={order.id} style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={styles.orderHeader}>
                    <View>
                      <Text style={[styles.orderNumber, { color: colors.accent }]}>{order.orderNumber}</Text>
                      <Text style={[styles.orderCustomer, { color: colors.text }]}>{order.customer}</Text>
                    </View>
                    <View style={styles.orderRight}>
                      <Text style={[styles.orderPayment, { color: colors.success }]}>{order.payment}</Text>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: order.status === 'completed' ? colors.success : colors.warning }
                      ]}>
                        <Text style={[styles.statusText, { color: colors.background }]}>{order.status}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.orderDetails}>
                    <View style={styles.orderDetailItem}>
                      <Clock size={14} color={colors.textSecondary} />
                      <Text style={[styles.orderDetailText, { color: colors.textSecondary }]}>{order.time}</Text>
                    </View>
                    <View style={styles.orderDetailItem}>
                      <Package size={14} color={colors.textSecondary} />
                      <Text style={[styles.orderDetailText, { color: colors.textSecondary }]}>{order.goods}</Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Information</Text>
          
          <View style={[styles.infoItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Phone size={20} color={colors.textSecondary} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Phone</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>+1 (555) 123-4567</Text>
            </View>
          </View>
          
          <View style={[styles.infoItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Mail size={20} color={colors.textSecondary} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>john.driver@email.com</Text>
            </View>
          </View>
          
          <View style={[styles.infoItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MapPin size={20} color={colors.textSecondary} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Location</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>New York, NY</Text>
            </View>
          </View>
        </View>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>MoveExpress v1.0.0</Text>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>© 2024 MoveExpress Inc.</Text>
        </View>
      </ScrollView>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarText: {
    width: 60,
    height: 60,
    borderRadius: 30,
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 60,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  driverEmail: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  editButton: {
    padding: 10,
    borderRadius: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statItem: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
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
    textAlign: 'center',
  },
  ordersSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  dateScrollerContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateNavButton: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  currentDateContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 180,
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
  ordersContainer: {
    gap: 8,
  },
  emptyOrders: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderRadius: 12,
    borderWidth: 1,
  },
  emptyOrdersText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  orderCard: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderCustomer: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderPayment: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  orderDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  orderDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderDetailText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
});