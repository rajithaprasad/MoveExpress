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
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function PrivacyScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Privacy & Security</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Privacy Overview */}
        <View style={[styles.overviewCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.overviewIcon, { backgroundColor: `${colors.primary}20` }]}>
            <Shield size={32} color={colors.primary} />
          </View>
          <Text style={[styles.overviewTitle, { color: colors.text }]}>Your Privacy Matters</Text>
          <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
            We are committed to protecting your personal information and ensuring your data remains secure.
          </Text>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy Controls</Text>
          
          <TouchableOpacity style={[styles.privacyItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.privacyLeft}>
              <Eye size={20} color={colors.primary} />
              <View style={styles.privacyInfo}>
                <Text style={[styles.privacyTitle, { color: colors.text }]}>Data Visibility</Text>
                <Text style={[styles.privacyDescription, { color: colors.textSecondary }]}>
                  Control what information is visible to customers
                </Text>
              </View>
            </View>
            <Text style={[styles.privacyArrow, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.privacyItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.privacyLeft}>
              <Lock size={20} color={colors.primary} />
              <View style={styles.privacyInfo}>
                <Text style={[styles.privacyTitle, { color: colors.text }]}>Account Security</Text>
                <Text style={[styles.privacyDescription, { color: colors.textSecondary }]}>
                  Manage password and two-factor authentication
                </Text>
              </View>
            </View>
            <Text style={[styles.privacyArrow, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.privacyItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.privacyLeft}>
              <Database size={20} color={colors.primary} />
              <View style={styles.privacyInfo}>
                <Text style={[styles.privacyTitle, { color: colors.text }]}>Data Management</Text>
                <Text style={[styles.privacyDescription, { color: colors.textSecondary }]}>
                  Download or delete your personal data
                </Text>
              </View>
            </View>
            <Text style={[styles.privacyArrow, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.privacyItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.privacyLeft}>
              <UserCheck size={20} color={colors.primary} />
              <View style={styles.privacyInfo}>
                <Text style={[styles.privacyTitle, { color: colors.text }]}>Consent Management</Text>
                <Text style={[styles.privacyDescription, { color: colors.textSecondary }]}>
                  Review and update your privacy preferences
                </Text>
              </View>
            </View>
            <Text style={[styles.privacyArrow, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Information Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Information</Text>
          
          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>Data Collection</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              We collect location data, delivery information, and performance metrics to provide our services. 
              All data is encrypted and stored securely.
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>Data Sharing</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              Your personal information is never sold to third parties. We only share necessary delivery 
              information with customers to complete orders.
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>Your Rights</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              You have the right to access, correct, or delete your personal data at any time. 
              Contact support for assistance with data requests.
            </Text>
          </View>
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
  overviewCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  overviewText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  privacyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  privacyInfo: {
    marginLeft: 12,
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  privacyDescription: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  privacyArrow: {
    fontSize: 20,
    fontWeight: '300',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});