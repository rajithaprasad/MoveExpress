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
  Image,
  Linking,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Clock, User, Phone, Star, Navigation, Package, Truck, Users, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '@/contexts/ThemeContext';

export default function JobDetailsScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();

  const jobData = {
    id: params.id as string,
    orderNumber: params.orderNumber as string,
    customer: params.customer as string,
    customerPhone: params.customerPhone as string,
    pickupAddress: params.pickupAddress as string,
    dropAddress: params.dropAddress as string,
    time: params.time as string,
    date: params.date as string || new Date().toDateString(),
    distance: params.distance as string,
    payment: params.payment as string,
    goods: params.goods as string,
    customerRating: parseFloat(params.customerRating as string),
    notes: params.notes as string,
    status: params.status as string,
    vanType: params.vanType as string || 'small',
    items: params.items as string || 'Electronics Package, Documents, Small Boxes',
    helperNeeded: params.helperNeeded === 'true' || false,
  };

  // Mock coordinates for demonstration
  const pickupCoords = { latitude: 40.7128, longitude: -74.0060 };
  const dropCoords = { latitude: 40.7589, longitude: -73.9851 };

  const getVanImage = (vanType: string) => {
    switch (vanType) {
      case 'small':
        return 'https://images.pexels.com/photos/1112597/pexels-photo-1112597.jpeg?auto=compress&cs=tinysrgb&w=300&h=200';
      case 'medium':
        return 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300&h=200';
      case 'large':
        return 'https://images.pexels.com/photos/1112599/pexels-photo-1112599.jpeg?auto=compress&cs=tinysrgb&w=300&h=200';
      default:
        return 'https://images.pexels.com/photos/1112597/pexels-photo-1112597.jpeg?auto=compress&cs=tinysrgb&w=300&h=200';
    }
  };

  const getVanTypeLabel = (vanType: string) => {
    switch (vanType) {
      case 'small':
        return 'Small Van';
      case 'medium':
        return 'Medium Van';
      case 'large':
        return 'Large Van';
      default:
        return 'Small Van';
    }
  };

  const handleAcceptJob = () => {
    Alert.alert(
      'Accept Job',
      'Are you sure you want to accept this delivery job?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: () => {
            Alert.alert(
              'Job Accepted!',
              'The job has been added to your schedule.',
              [{ text: 'OK', onPress: () => router.back() }]
            );
          }
        }
      ]
    );
  };

  const handleCallCustomer = () => {
    const phoneNumber = jobData.customerPhone.replace(/[^\d+]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleGetDirections = () => {
    Alert.alert('Get Directions', 'Opening navigation to pickup location...', [
      { text: 'OK' }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Job Details</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Google Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapImage}
            initialRegion={{
              latitude: (pickupCoords.latitude + dropCoords.latitude) / 2,
              longitude: (pickupCoords.longitude + dropCoords.longitude) / 2,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            provider="google"
          >
            <Marker
              coordinate={pickupCoords}
              title="Pickup Location"
              description={jobData.pickupAddress}
              pinColor="#FFA500"
            />
            <Marker
              coordinate={dropCoords}
              title="Drop Location"
              description={jobData.dropAddress}
              pinColor="#6A0DAD"
            />
          </MapView>

          <TouchableOpacity style={styles.directionsButton} onPress={handleGetDirections}>
            <Navigation size={16} color="#ffffff" />
            <Text style={[styles.directionsText, { color: '#ffffff' }]}>Get Directions</Text>
          </TouchableOpacity>
        </View>
        {/* Order Details Card */}
        <View style={[styles.detailsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={[styles.orderNumber, { color: colors.accent }]}>{jobData.orderNumber}</Text>
              <Text style={[styles.paymentAmount, { color: colors.success }]}>{jobData.payment}</Text>
            </View>
            <View style={styles.dateTimeContainer}>
              <View style={[styles.dateContainer, { backgroundColor: colors.surface }]}>
                <Calendar size={14} color={colors.primary} />
                <Text style={[styles.dateText, { color: colors.primary }]}>{jobData.date}</Text>
              </View>
              <View style={[styles.timeContainer, { backgroundColor: colors.surface }]}>
                <Clock size={14} color={colors.accent} />
                <Text style={[styles.timeText, { color: colors.accent }]}>{jobData.time}</Text>
              </View>
            </View>
          </View>
          {/* Van Type Section */}
          <View style={styles.vanSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Vehicle Required</Text>
            <View style={[styles.vanInfo, { backgroundColor: colors.surface }]}>
              <Image
                source={{ uri: getVanImage(jobData.vanType) }}
                style={styles.vanImage}
              />
              <View style={styles.vanDetails}>
                <Text style={[styles.vanTypeText, { color: colors.text }]}>{getVanTypeLabel(jobData.vanType)}</Text>
                <View style={styles.vanSpecs}>
                  <Truck size={14} color={colors.textSecondary} />
                  <Text style={[styles.vanSpecText, { color: colors.textSecondary }]}>
                    {jobData.vanType === 'small' ? 'Up to 500kg' : jobData.vanType === 'medium' ? 'Up to 1000kg' : 'Up to 2000kg'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* Customer Information */}
          <View style={styles.customerSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Customer Details</Text>
            <View style={[styles.customerInfo, { backgroundColor: colors.surface }]}>
              <View style={styles.customerLeft}>
                <View style={[styles.customerAvatar, { backgroundColor: colors.primary }]}>
                  <User size={20} color="#fff" />
                </View>
                <View style={styles.customerDetails}>
                  <Text style={[styles.customerName, { color: colors.text }]}>{jobData.customer}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color={colors.accent} fill={colors.accent} />
                    <Text style={[styles.ratingText, { color: colors.accent }]}>{jobData.customerRating}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={[styles.callButton, { backgroundColor: colors.background, borderColor: colors.success }]} onPress={handleCallCustomer}>
                <Phone size={16} color={colors.success} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Items to Move */}
          <View style={styles.itemsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Items to Move</Text>
            <View style={[styles.itemsContainer, { backgroundColor: colors.surface }]}>
              {jobData.items.split(', ').map((item, index) => (
                <View key={index} style={[styles.itemChip, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Package size={14} color={colors.accent} />
                  <Text style={[styles.itemText, { color: colors.text }]}>{item.trim()}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Helper Information */}
          <View style={styles.helperSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Helper Required</Text>
            <View style={[styles.helperInfo, { backgroundColor: colors.surface }]}>
              <Users size={20} color={jobData.helperNeeded ? colors.success : colors.textSecondary} />
              <Text style={[styles.helperText, { color: colors.text }]}>
                {jobData.helperNeeded ? 'Helper Required' : 'No Helper Needed'}
              </Text>
              {jobData.helperNeeded && (
                <View style={[styles.helperBadge, { backgroundColor: colors.success }]}>
                  <Text style={styles.helperBadgeText}>+$15</Text>
                </View>
              )}
            </View>
          </View>
          {/* Locations */}
          <View style={styles.locationSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Delivery Route</Text>
            <View style={[styles.locationContainer, { backgroundColor: colors.surface }]}>
              <View style={styles.locationItem}>
                <View style={[styles.locationIcon, { backgroundColor: colors.background }]}>
                  <MapPin size={16} color={colors.accent} />
                </View>
                <View style={styles.locationDetails}>
                  <Text style={[styles.locationLabel, { color: colors.accent }]}>Pickup Location</Text>
                  <Text style={[styles.locationAddress, { color: colors.text }]}>{jobData.pickupAddress}</Text>
                </View>
              </View>
              <View style={[styles.routeLine, { backgroundColor: colors.border }]} />
              <View style={styles.locationItem}>
                <View style={[styles.locationIcon, { backgroundColor: colors.background }]}>
                  <MapPin size={16} color={colors.primary} />
                </View>
                <View style={styles.locationDetails}>
                  <Text style={[styles.locationLabel, { color: colors.primary }]}>Drop Location</Text>
                  <Text style={[styles.locationAddress, { color: colors.text }]}>{jobData.dropAddress}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Notes */}
          {jobData.notes && (
            <View style={styles.notesSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Delivery Notes</Text>
              <View style={[styles.notesContainer, { backgroundColor: colors.surface }]}>
                <Text style={[styles.notesText, { color: colors.text }]}>{jobData.notes}</Text>
              </View>
            </View>
          )}
          {/* Distance & Time */}
          <View style={styles.summaryContainer}>
            <View style={[styles.summaryItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Distance</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{jobData.distance}</Text>
            </View>
            <View style={[styles.summaryItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Estimated Time</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>15-20 min</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Accept Button - Only show for available jobs */}
      {jobData.status === 'available' && (
        <View style={styles.acceptContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptJob}>
            <LinearGradient
              colors={['#f59e0b', '#d97706']}
              style={styles.acceptButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.acceptButtonText}>Accept Job</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
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
  },
  mapContainer: {
    height: 250,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  directionsButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  directionsText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  detailsCard: {
    marginHorizontal: 20,
    marginBottom: 120,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  paymentAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
    fontWeight: '600',
    marginLeft: 4,
  },
  vanSection: {
    marginBottom: 24,
  },
  vanInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  vanImage: {
    width: 80,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  vanDetails: {
    flex: 1,
  },
  vanTypeText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  vanSpecs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vanSpecText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  itemsSection: {
    marginBottom: 24,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  itemChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  itemText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  helperSection: {
    marginBottom: 24,
  },
  helperInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  helperText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  helperBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  helperBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  customerSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  customerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  customerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationSection: {
    marginBottom: 24,
  },
  locationContainer: {
    padding: 16,
    borderRadius: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  locationDetails: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  routeLine: {
    width: 2,
    height: 20,
    marginLeft: 15,
    marginVertical: 4,
  },
  notesSection: {
    marginBottom: 24,
  },
  notesContainer: {
    padding: 16,
    borderRadius: 12,
  },
  notesText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  acceptContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  acceptButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  acceptButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
