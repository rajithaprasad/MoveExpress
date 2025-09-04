import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Phone, Mail, MessageCircle, FileText, CircleHelp as HelpCircle, ExternalLink } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const faqData = [
  {
    id: '1',
    question: 'How do I accept a delivery job?',
    answer: 'Browse available jobs on the Home screen, tap "View" to see details, then slide to accept or tap the "Accept" button.',
  },
  {
    id: '2',
    question: 'When will I receive payment?',
    answer: 'Payments are processed weekly and automatically released to your Stripe account.',
  },
  {
    id: '3',
    question: 'What documents do I need to upload?',
    answer: 'You need a valid driver\'s license, vehicle registration, insurance certificate, background check, and vehicle inspection report.',
  },
  {
    id: '4',
    question: 'How do I update my profile information?',
    answer: 'Go to your Profile tab and tap the edit button next to your information to make changes.',
  },
  {
    id: '5',
    question: 'What should I do if I have an accident?',
    answer: 'Contact emergency services if needed, then immediately call our 24/7 support line at (555) 911-HELP.',
  },
];

export default function HelpScreen() {
  const { colors } = useTheme();
  const [expandedFaq, setExpandedFaq] = React.useState<string | null>(null);

  const handleCall = () => {
    Linking.openURL('tel:+15559114357');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@drivedelivery.com');
  };

  const handleChat = () => {
    router.push('/(tabs)/chat');
  };

  const handleDocumentation = () => {
    Alert.alert('Documentation', 'Opening driver handbook...');
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Support</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Get Help</Text>
          
          <View style={styles.contactGrid}>
            <TouchableOpacity style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleCall}>
              <View style={[styles.contactIcon, { backgroundColor: `${colors.success}20` }]}>
                <Phone size={24} color={colors.success} />
              </View>
              <Text style={[styles.contactTitle, { color: colors.text }]}>Call Support</Text>
              <Text style={[styles.contactSubtitle, { color: colors.textSecondary }]}>24/7 Available</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleEmail}>
              <View style={[styles.contactIcon, { backgroundColor: `${colors.primary}20` }]}>
                <Mail size={24} color={colors.primary} />
              </View>
              <Text style={[styles.contactTitle, { color: colors.text }]}>Email Us</Text>
              <Text style={[styles.contactSubtitle, { color: colors.textSecondary }]}>Response in 2-4h</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.chatButton, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleChat}>
            <MessageCircle size={20} color={colors.primary} />
            <Text style={[styles.chatButtonText, { color: colors.text }]}>Live Chat Support</Text>
            <Text style={[styles.chatButtonSubtext, { color: colors.textSecondary }]}>Average response time: 2 minutes</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          
          <TouchableOpacity style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleDocumentation}>
            <View style={styles.actionLeft}>
              <FileText size={20} color={colors.primary} />
              <View style={styles.actionInfo}>
                <Text style={[styles.actionTitle, { color: colors.text }]}>Driver Handbook</Text>
                <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>
                  Complete guide for drivers
                </Text>
              </View>
            </View>
            <ExternalLink size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
          
          {faqData.map((faq) => (
            <View key={faq.id} style={[styles.faqCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TouchableOpacity style={styles.faqHeader} onPress={() => toggleFaq(faq.id)}>
                <View style={styles.faqLeft}>
                  <HelpCircle size={16} color={colors.primary} />
                  <Text style={[styles.faqQuestion, { color: colors.text }]}>{faq.question}</Text>
                </View>
                <Text style={[styles.faqToggle, { color: colors.textSecondary }]}>
                  {expandedFaq === faq.id ? '−' : '+'}
                </Text>
              </TouchableOpacity>
              
              {expandedFaq === faq.id && (
                <View style={[styles.faqAnswer, { borderTopColor: colors.border }]}>
                  <Text style={[styles.faqAnswerText, { color: colors.textSecondary }]}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Emergency Contact */}
        <View style={[styles.emergencyCard, { backgroundColor: colors.error, borderColor: colors.error }]}>
          <Text style={styles.emergencyTitle}>Emergency Support</Text>
          <Text style={styles.emergencyText}>
            For urgent issues or emergencies during deliveries, call MoveExpress 24/7 hotline:
          </Text>
          <TouchableOpacity style={styles.emergencyButton} onPress={() => Linking.openURL('tel:+15559114357')}>
            <Phone size={16} color="#ffffff" />
            <Text style={styles.emergencyButtonText}>(555) 911-HELP</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  contactCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  chatButtonSubtext: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 12,
    fontWeight: '500',
  },
  faqCard: {
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  faqToggle: {
    fontSize: 20,
    fontWeight: '300',
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 12,
  },
  faqAnswerText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  emergencyCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  emergencyTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emergencyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.9,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emergencyButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});