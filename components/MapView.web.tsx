import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Web fallback for MapView
export function MapView({ children, style, ...props }: any) {
  return (
    <View style={[styles.mapFallback, style]}>
      <Text style={styles.mapText}>Map View (Web Preview)</Text>
      {children}
    </View>
  );
}

// Web fallback for Marker
export function Marker({ title, description, pinColor, ...props }: any) {
  return (
    <View style={[styles.marker, { backgroundColor: pinColor || '#FF0000' }]}>
      <Text style={styles.markerText}>{title?.charAt(0) || 'M'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapFallback: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  marker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -10,
  },
  markerText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});