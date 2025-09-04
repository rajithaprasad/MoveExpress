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
import { CreditCard, TrendingUp, DollarSign, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

const mockTransactions = [
  {
    id: '1',
    type: 'earning',
    amount: 25.50,
    description: 'Delivery #ORD-2024-001',
    date: '2024-01-15',
    time: '2:30 PM',
    status: 'completed'
  },
  {
    id: '2',
    type: 'earning',
    amount: 18.75,
    description: 'Delivery #ORD-2024-002',
    date: '2024-01-15',
    time: '4:15 PM',
    status: 'completed'
  },
  {
    id: '3',
    type: 'withdraw',
    amount: -200.00,
    description: 'Bank Transfer',
    date: '2024-01-14',
    time: '10:00 AM',
    status: 'completed'
  },
  {
    id: '4',
    type: 'earning',
    amount: 32.25,
    description: 'Delivery #ORD-2024-003',
    date: '2024-01-14',
    time: '6:00 PM',
    status: 'pending'
  },
];

export default function WalletScreen() {
  const { colors } = useTheme();
  const [balance] = useState(1247.89);
  const [transactions] = useState(mockTransactions);
  const [accountStatus] = useState<'active' | 'hold'>('active');


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Wallet" />

      <ScrollView style={[styles.content, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: accountStatus === 'active' ? '#10b981' : '#ef4444' }
            ]}>
              <Text style={styles.statusText}>{accountStatus.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
          <View style={styles.balanceFooter}>
            <Text style={styles.balanceFooterText}>MoveExpress Earnings</Text>
          </View>
        </LinearGradient>

        {/* Release Info */}
        <View style={[styles.releaseInfoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.releaseInfoText, { color: colors.textSecondary }]}>
            This fund will automatically release to Stripe on 2024-02-15
          </Text>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={[styles.transactionItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'earning' ? colors.success : colors.error }
                ]}>
                  {transaction.type === 'earning' ? (
                    <ArrowDownLeft size={16} color="#fff" />
                  ) : (
                    <ArrowUpRight size={16} color="#fff" />
                  )}
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={[styles.transactionDescription, { color: colors.text }]}>{transaction.description}</Text>
                  <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>
                    {transaction.date} • {transaction.time}
                  </Text>
                </View>
              </View>
              
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? colors.success : colors.error }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
                <Text style={[
                  styles.transactionStatus,
                  { 
                    color: transaction.status === 'completed' ? colors.success : colors.warning,
                    backgroundColor: transaction.status === 'completed' ? `${colors.success}20` : `${colors.warning}20`
                  }
                ]}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          ))}
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
    paddingHorizontal: 20,
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 16,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceFooterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  releaseInfoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  releaseInfoText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  transactionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  transactionStatus: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});