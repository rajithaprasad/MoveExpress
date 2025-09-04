import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, RotateCcw, CircleCheck as CheckCircle, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function SignatureScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const { jobId } = params;
  const [signature, setSignature] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const path = useRef<any[]>([]).current;

  const handleStartDrawing = (x: number, y: number) => {
    setIsDrawing(true);
    path.length = 0; // Clear previous path
    path.push({ x, y });
    setSignature([...signature, path]);
  };

  const handleDrawing = (x: number, y: number) => {
    if (!isDrawing) return;
    path.push({ x, y });
    setSignature([...signature.slice(0, -1), path]);
  };

  const handleEndDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setSignature([]);
  };

  const handleConfirm = () => {
    if (signature.length === 0) {
      Alert.alert('Signature Required', 'Please provide a signature before confirming delivery.');
      return;
    }

    Alert.alert(
      'Delivery Completed!',
      'The delivery has been marked as completed successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/(tabs)');
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Signature',
      'Are you sure you want to cancel? The delivery will not be marked as completed.',
      [
        { text: 'Continue Signing', style: 'cancel' },
        { text: 'Cancel', onPress: () => router.back() }
      ]
    );
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      handleStartDrawing(locationX, locationY);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      handleDrawing(locationX, locationY);
    },
    onPanResponderRelease: () => {
      handleEndDrawing();
    },
    onPanResponderTerminate: () => {
      handleEndDrawing();
    },
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={handleCancel}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Customer Signature</Text>
        <TouchableOpacity style={[styles.cancelButton, { backgroundColor: colors.surface }]} onPress={handleCancel}>
          <X size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.instructionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.instructionTitle, { color: colors.text }]}>Delivery Confirmation</Text>
          <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
            Please ask the customer to sign below to confirm delivery completion.
          </Text>
        </View>

        <View style={[styles.signatureContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.signatureLabel, { color: colors.text }]}>Customer Signature</Text>
          
          <View style={[styles.canvasContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <View
              style={styles.canvas}
              {...panResponder.panHandlers}
            >
              {signature.map((stroke, index) => (
                <View key={index} style={styles.strokeContainer}>
                  {stroke.map((point: any, pointIndex: number) => {
                    if (pointIndex === 0) return null;
                    const prevPoint = stroke[pointIndex - 1];
                    return (
                      <View
                        key={pointIndex}
                        style={[
                          styles.stroke,
                          {
                            left: prevPoint.x,
                            top: prevPoint.y,
                            width: Math.sqrt(Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2)),
                            transform: [
                              {
                                rotate: `${Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x)}rad`
                              }
                            ],
                            backgroundColor: colors.primary,
                          }
                        ]}
                      />
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.signatureActions}>
            <TouchableOpacity 
              style={[styles.clearButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={handleClear}
            >
              <RotateCcw size={16} color={colors.textSecondary} />
              <Text style={[styles.clearButtonText, { color: colors.textSecondary }]}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={[styles.cancelActionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={handleCancel}
          >
            <Text style={[styles.cancelActionText, { color: colors.text }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.confirmButton,
              { opacity: signature.length > 0 ? 1 : 0.5 }
            ]}
            onPress={handleConfirm}
            disabled={signature.length === 0}
          >
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.confirmButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <CheckCircle size={20} color="#ffffff" />
              <Text style={styles.confirmButtonText}>Confirm Delivery</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
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
  cancelButton: {
    padding: 10,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  instructionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  signatureContainer: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  signatureLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  canvasContainer: {
    flex: 1,
    minHeight: 300,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    position: 'relative',
  },
  strokeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  stroke: {
    position: 'absolute',
    height: 3,
    borderRadius: 1.5,
  },
  signatureActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelActionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelActionText: {
    fontSize: 16,
    fontWeight: '700',
  },
  confirmButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  confirmButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});