import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, CircleAlert as AlertCircle, Info, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const mockNotifications = [
  {
    id: '1',
    type: 'urgent',
    title: 'System Maintenance',
    message: 'The app will be under maintenance from 2:00 AM to 4:00 AM tonight. Please complete all deliveries before this time.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New Route Optimization',
    message: 'We\'ve updated our route optimization algorithm to help you save time and fuel. Check out the new features in your next delivery.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Payment Processed',
    message: 'Your weekly earnings of $342.75 have been processed and will be available in your account within 24 hours.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Weather Alert',
    message: 'Heavy rain expected in your area today. Please drive safely and allow extra time for deliveries.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'urgent',
    title: 'Policy Update',
    message: 'Important updates to our delivery policies. Please review the new guidelines in the driver handbook.',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const { colors } = useTheme();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle size={20} color={colors.error} />;
      case 'success':
        return <CheckCircle size={20} color={colors.success} />;
      case 'info':
      default:
        return <Info size={20} color={colors.primary} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return colors.error;
      case 'success':
        return colors.success;
      case 'info':
      default:
        return colors.primary;
    }
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={[styles.titleContainer, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Admin Broadcasts</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Important messages from management</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((notification) => (
          <View key={notification.id} style={[
            styles.notificationCard,
            { backgroundColor: colors.card, borderColor: colors.border },
            !notification.read && { borderLeftWidth: 4, borderLeftColor: colors.primary, backgroundColor: colors.surface }
          ]}>
            <View style={styles.notificationHeader}>
              <View style={styles.notificationLeft}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: `${getNotificationColor(notification.type)}20` }
                ]}>
                  {getNotificationIcon(notification.type)}
                </View>
                <View style={styles.notificationInfo}>
                  <Text style={[styles.notificationTitle, { color: colors.text }]}>{notification.title}</Text>
                  <View style={styles.timeContainer}>
                    <Clock size={12} color={colors.textSecondary} />
                    <Text style={[styles.notificationTime, { color: colors.textSecondary }]}>{notification.time}</Text>
                  </View>
                </View>
              </View>
              {!notification.read && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
            </View>
            
            <Text style={[styles.notificationMessage, { color: colors.text }]}>{notification.message}</Text>
            
            {notification.type === 'urgent' && (
              <View style={[styles.urgentBanner, { backgroundColor: colors.error }]}>
                <Text style={styles.urgentText}>URGENT - Requires Attention</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerRight: {
    width: 44,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notificationCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notificationMessage: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 12,
  },
  urgentBanner: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  urgentText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});