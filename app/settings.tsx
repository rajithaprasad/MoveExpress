import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Lock, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const { colors } = useTheme();

  const handleChangePhoto = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => Alert.alert('Camera', 'Camera functionality would be implemented here') },
        { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Gallery selection would be implemented here') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleChangePassword = () => {
    router.push('/change-password');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Profile</Text>
          
          <TouchableOpacity 
            style={[styles.photoContainer, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleChangePhoto}
          >
            <View style={styles.photoLeft}>
              <View style={[styles.currentPhoto, { backgroundColor: colors.primary }]}>
                <Text style={styles.photoInitials}>JD</Text>
              </View>
              <View style={styles.photoInfo}>
                <Text style={[styles.photoTitle, { color: colors.text }]}>Profile Photo</Text>
                <Text style={[styles.photoDescription, { color: colors.textSecondary }]}>
                  Update your profile picture
                </Text>
              </View>
            </View>
            <View style={[styles.cameraButton, { backgroundColor: colors.surface }]}>
              <Camera size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Security</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleChangePassword}
          >
            <View style={styles.settingLeft}>
              <Lock size={20} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Change Password</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Update your account password
                </Text>
              </View>
            </View>
            <Text style={[styles.settingArrow, { color: colors.textSecondary }]}>›</Text>
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
  photoContainer: {
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
  photoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currentPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  photoInitials: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  photoInfo: {
    flex: 1,
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  photoDescription: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  cameraButton: {
    padding: 12,
    borderRadius: 12,
  },
  settingItem: {
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  settingArrow: {
    fontSize: 20,
    fontWeight: '300',
  },
});