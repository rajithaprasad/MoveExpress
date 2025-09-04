import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, FileText, Download, Upload, Eye, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

const mockDocuments = [
  {
    id: '1',
    name: 'Driver License',
    type: 'license',
    status: 'verified',
    uploadDate: '2024-01-10',
    expiryDate: '2025-12-15',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Vehicle Registration',
    type: 'registration',
    status: 'verified',
    uploadDate: '2024-01-10',
    expiryDate: '2024-08-20',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Insurance Certificate',
    type: 'insurance',
    status: 'pending',
    uploadDate: '2024-01-14',
    expiryDate: '2024-12-31',
    size: '3.1 MB',
  },
  {
    id: '4',
    name: 'Background Check',
    type: 'background',
    status: 'verified',
    uploadDate: '2024-01-08',
    expiryDate: '2025-01-08',
    size: '1.2 MB',
  },
  {
    id: '5',
    name: 'Vehicle Inspection',
    type: 'inspection',
    status: 'expired',
    uploadDate: '2023-12-01',
    expiryDate: '2024-01-01',
    size: '2.7 MB',
  },
];

export default function DocumentsScreen() {
  const { colors } = useTheme();
  const [documents] = useState(mockDocuments);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={16} color={colors.success} />;
      case 'pending':
        return <Clock size={16} color={colors.warning} />;
      case 'expired':
        return <AlertCircle size={16} color={colors.error} />;
      default:
        return <FileText size={16} color={colors.textSecondary} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'expired':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const handleUpload = () => {
    Alert.alert('Upload Document', 'Document upload functionality would be implemented here.');
  };

  const handleView = (docName: string) => {
    Alert.alert('View Document', `Opening ${docName}...`);
  };

  const handleDownload = (docName: string) => {
    Alert.alert('Download Document', `Downloading ${docName}...`);
  };


  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Documents</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={[styles.titleContainer, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Document Management</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Manage your driver documents and certifications</Text>
      </View>

      {/* Upload Button */}
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <LinearGradient
            colors={['#f59e0b', '#d97706']}
            style={styles.uploadButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Upload size={20} color="#ffffff" />
            <Text style={[styles.uploadButtonText, { color: '#ffffff' }]}>Upload New Document</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Documents List */}
        {documents.map((document) => (
          <View key={document.id} style={[
            styles.documentCard,
            { backgroundColor: colors.card, borderColor: colors.border },
            document.status === 'expired' && { borderLeftWidth: 4, borderLeftColor: colors.error, backgroundColor: colors.surface },
            isExpiringSoon(document.expiryDate) && { borderLeftWidth: 4, borderLeftColor: colors.warning, backgroundColor: colors.surface }
          ]}>
            <View style={styles.documentHeader}>
              <View style={styles.documentLeft}>
                <View style={[
                  styles.documentIcon,
                  { backgroundColor: `${getStatusColor(document.status)}20` }
                ]}>
                  <FileText size={24} color={getStatusColor(document.status)} />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={[styles.documentName, { color: colors.text }]}>{document.name}</Text>
                  <Text style={[styles.documentSize, { color: colors.textSecondary }]}>{document.size}</Text>
                </View>
              </View>
              
              <View style={[styles.statusContainer, { backgroundColor: colors.surface }]}>
                {getStatusIcon(document.status)}
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(document.status) }
                ]}>
                  {document.status}
                </Text>
              </View>
            </View>

            <View style={styles.documentDetails}>
              <View style={styles.dateContainer}>
                <View style={styles.dateItem}>
                  <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>Uploaded</Text>
                  <Text style={[styles.dateValue, { color: colors.text }]}>{document.uploadDate}</Text>
                </View>
                <View style={styles.dateItem}>
                  <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>Expires</Text>
                  <Text style={[
                    styles.dateValue,
                    { color: colors.text },
                    isExpiringSoon(document.expiryDate) && { color: colors.warning, fontWeight: '700' },
                    document.status === 'expired' && { color: colors.error, fontWeight: '700' }
                  ]}>
                    {document.expiryDate}
                  </Text>
                </View>
              </View>

              {isExpiringSoon(document.expiryDate) && (
                <View style={[styles.warningBanner, { backgroundColor: `${colors.warning}20` }]}>
                  <AlertCircle size={16} color={colors.warning} />
                  <Text style={[styles.warningText, { color: colors.warning }]}>
                    Expires in {Math.ceil((new Date(document.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                  </Text>
                </View>
              )}

              {document.status === 'expired' && (
                <View style={[styles.expiredBanner, { backgroundColor: `${colors.error}20` }]}>
                  <AlertCircle size={16} color={colors.error} />
                  <Text style={[styles.expiredText, { color: colors.error }]}>Document has expired - please upload a new version</Text>
                </View>
              )}
            </View>

            <View style={styles.documentActions}>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.primary }]}
                onPress={() => handleView(document.name)}
              >
                <Eye size={16} color={colors.primary} />
                <Text style={[styles.actionButtonText, { color: colors.primary }]}>View</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.primary }]}
                onPress={() => handleDownload(document.name)}
              >
                <Download size={16} color={colors.primary} />
                <Text style={[styles.actionButtonText, { color: colors.primary }]}>Download</Text>
              </TouchableOpacity>
              
              {(document.status === 'expired' || isExpiringSoon(document.expiryDate)) && (
                <TouchableOpacity 
                  style={[styles.updateButton, { backgroundColor: colors.warning }]}
                  onPress={handleUpload}
                >
                  <Upload size={16} color="#ffffff" />
                  <Text style={[styles.updateButtonText, { color: '#ffffff' }]}>Update</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Document Requirements */}
        <View style={[styles.requirementsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.requirementsTitle, { color: colors.text }]}>Required Documents</Text>
          <Text style={[styles.requirementsText, { color: colors.textSecondary }]}>
            All drivers must maintain current versions of the following documents:
          </Text>
          
          <View style={styles.requirementsList}>
            <Text style={[styles.requirementItem, { color: colors.text }]}>• Valid Driver's License</Text>
            <Text style={[styles.requirementItem, { color: colors.text }]}>• Vehicle Registration</Text>
            <Text style={[styles.requirementItem, { color: colors.text }]}>• Insurance Certificate</Text>
            <Text style={[styles.requirementItem, { color: colors.text }]}>• Background Check</Text>
            <Text style={[styles.requirementItem, { color: colors.text }]}>• Vehicle Inspection Report</Text>
          </View>
          
          <Text style={[styles.requirementsNote, { color: colors.textSecondary }]}>
            Documents must be renewed before expiry to maintain active driver status.
          </Text>
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
  uploadContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  uploadButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  uploadButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  documentCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  documentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  documentSize: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  documentDetails: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  expiredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  expiredText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  documentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  updateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  updateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  requirementsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  requirementsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  requirementsText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 16,
  },
  requirementsList: {
    marginBottom: 16,
  },
  requirementItem: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  requirementsNote: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});